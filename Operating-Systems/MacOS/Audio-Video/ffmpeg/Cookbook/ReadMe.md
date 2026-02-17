# ffmpeg

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Optimizing Video File Size for Static Image Content](#optimizing-video-file-size-for-static-image-content)
  - [Introduction](#introduction)
  - [Initial Attempt](#initial-attempt)
  - [Optimizing the Image](#optimizing-the-image)
  - [Optimizing the Video Encoding](#optimizing-the-video-encoding)
  - [Optimizing the Audio](#optimizing-the-audio)
  - [Final Result](#final-result)
- [Create an animated GIF from a video file](#create-an-animated-gif-from-a-video-file)

<!-- /code_chunk_output -->


## Optimizing Video File Size for Static Image Content

### Introduction

In this project, the task was to create a video file from a static image (JPEG) and an audio file (MP3), while keeping the resulting file size as small as possible without significantly degrading quality. Optimizing the file size is important for faster downloads and lower storage costs, especially when the video will be shared online.

### Initial Attempt

The first attempt used the ffmpeg command line tool with default settings:

```bash
ffmpeg -loop 1 -i image.jpg -i audio.mp3 -c:v libx264 -c:a aac -b:a 128k -shortest output.mp4
```

While this successfully combined the image and audio into a video, the resulting file size was much larger than the input files combined. Further optimization was necessary.

### Optimizing the Image

The input image was already in JPEG format, which is a compressed format suitable for photos. If the original image were in a format like PNG or BMP, converting it to JPEG first would significantly reduce the file size.

If the JPEG quality is very high, it can be reduced somewhat to decrease file size without a noticeable impact on visual quality. The degree of reduction depends on the specific image content.

### Optimizing the Video Encoding

The libx264 codec is a highly efficient implementation of the H.264/AVC video compression standard. It offers numerous settings for tuning the encoding process.

Key settings used for optimizing a static image video:

- `-preset veryslow`: This selects the slowest but most efficient compression mode. For a static image, encoding time is less of a concern than minimizing file size.
- `-crf 20`: The Constant Rate Factor controls quality/file size balance. Lower values give higher quality but larger files. 20 is a good balance for high quality.
- `-g 999999` and `-sc_threshold 0`: These minimize the number of keyframes. For a static image, ideally only the first frame needs to be a keyframe.
- `-rc_lookahead 250`: This tells the encoder to analyze more frames in advance for optimal compression decisions.

The full optimized ffmpeg command:

```bash
ffmpeg -loop 1 -i image.jpg -i audio.mp3 -c:v libx264 -tune stillimage -preset veryslow -crf 20 -g 999999 -sc_threshold 0 -rc_lookahead 250 -c:a aac -b:a 128k -shortest output.mp4
```

### Optimizing the Audio

The AAC codec is a good choice for efficiently compressing audio. A bitrate of 128k offers good quality for most purposes. If the original audio is already in a compressed format like MP3, there's limited room for further size reduction without impacting quality.

### Final Result

With the optimized image and ffmpeg settings, the output video file was only slightly larger than the input audio file, despite including the full-resolution static image for the entire duration.

The visual quality remains very high as the image compression is nearly lossless. The audio quality is also good at the 128k bitrate.

In summary, by understanding the capabilities of the codecs and tuning the encoding settings, we were able to achieve an optimized video file with minimal quality loss. The keys for a static image video are using an efficient image format (JPEG), minimizing keyframes, and using compression settings targeted for static content.

## Create an animated GIF from a video file

Converts a video file (`input.mp4`) to an animated GIF (`output.gif`).

```shell
ffmpeg -i input.mp4 output.gif
```

Converts a series of PNG images (`frame1.png`, `frame2.png`, etc.) located in the `tmp` folder into an animated GIF.

```shell
ffmpeg -i ./tmp/frame%d.png output.gif
```

Converts a series of PNG images into an MP4 video with a framerate of 10 FPS for input and 30 FPS for the output, using the `libx264` codec and YUV color space.

```shell
ffmpeg -framerate 10 -i ./tmp/frame%d.png -c \
  libx264 -r 30 -pix\_fmt yuv420p out.mp4
```

Uses `ImageMagick` to create a GIF (`destionation.gif`) from a series of PNG images. `-delay 10` controls the delay between frames, and `-loop 0` makes it loop infinitely.

```shell
convert -delay 10 -loop 0 ./tmp/\*.png destionation.gif
```

Extracts individual frames from a `.webp` animation (`200w (3).webp`) and saves them as PNG files into the `tmp` folder. The loop continues until all frames are extracted.

```shell
i=1; while true; do webpmux -get frame $i '200w (3).webp' \
  -o ./tmp/frame$i.png || break; i=$((i+1)); done
```

Resizes all PNG images in the `tmp` folder to 200px wide, preserving the aspect ratio.

```shell
mogrify -resize 200x ./tmp/\*.png
```

Optimizes and compresses the PNG frames in the `tmp` folder to create an efficient GIF (`output_optimized.gif`) with a delay of 10 between frames and infinite looping.

```shell
convert -delay 10 -loop 0 -layers Optimize ./tmp/\*.png output\_optimized.gif
```
