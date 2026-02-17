# Audio Video Animated GIFs etc.

## ffmpeg

### Install

```shell
brew install ffmpeg
```

### Converting Examples

Everything in a single line (for all examples):

```shell
ffmpeg -i input.mp4 \
  -vf scale=320:-1  # width 320px, height auto
  -r 10 # 10 frames per second
  -f image2pipe # output format
  -vcodec ppm - | \ # codec ppm (portable pixmap format)
    convert -delay 5 \ # delay between frames is 5/100 of a second
      -loop 0 \ # loop forever
        - output.gif \
```

```shell
ffmpeg -framerate 10 \ # 10 frames per second
  -i ./tmp/frame%d.png \ # input files
  -c:v libx264 \ # codec libx264 (H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10)
  -r 30 \ # 30 frames per second
  -pix_fmt yuv420p \ # pixel format
  out.mp4
```

#### Available options

##### Format

```plaintext
image2pipe, image2, image2jpeg, image2png, image2tiff,
image2webp, image2bmp, image2pam, image2tga, image2sgi,
image2iff, image2sun, image2wbmp, image2xpm, image2xwd,
image2ico, image2icns
```

## ImageMagick

### Install

```shell
brew install imagemagick
```

### Convert several frames to gif

```shell
convert -delay 5 -loop 0 *.png output.gif  # or with ffmeg

# only with sequential numbers. 2 frames (in example)
ffmpeg -i ./tmp/frame{1..2}.png test.gif

# standard configuration without detail settings
ffmpeg -i ./tmp/frame%d.png output.gif

# with detail settings
ffmpeg -i ./tmp/frame%d.png -vf scale=320:-1 -r 10 -f \
  image2pipe -vcodec ppm - | convert -delay 5 -loop 0 - output.gif
```

## webpmux

### Install

```shell
brew install webp
```

### Extract frames from webp

Everything in a single line:

```shell
i=1; \
while true; \
  do webpmux \
    -get frame $i ./<filename>.webp -o ./tmp/frame$i.png \ ||
  break; \
  i=$((i+1)); \
done
```
