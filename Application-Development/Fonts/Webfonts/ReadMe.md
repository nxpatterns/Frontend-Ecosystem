# Web Fonts

## Use Google Fonts as Offline Web Fonts

Visit: <https://gwfh.mranftl.com/fonts>

BTW: Bulletproof Font Face Syntax in General (see [CSS Tricks](https://css-tricks.com/snippets/css/using-font-face/))

**Important -> Angular:** `/assets/...` in the URL, beginning with a slash!

- Visit [Google Fonts](https://fonts.google.com/) and select the fonts you want to use.
- Click on the "Download" button to get the font files.
- Extract the downloaded ZIP file and copy the font files (usually .ttf) to your project's font directory.
- Convert the .ttf files to web-friendly formats like .woff and .woff2
  - Online
    - using a tool like [Transfonter](https://transfonter.org/)
    - or [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator).
  - Offline
    - using a tool like `woff2_compress`
- Update your CSS to use the local font files. For example:

```css
@font-face {
  font-family: 'YourFontName';
  src: url('fonts/YourFontName.woff2') format('woff2'),
       url('fonts/YourFontName.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
```

5. Use the font in your styles:

```css
body {
  font-family: 'YourFontName', sans-serif;
}
```

By following these steps, you can use Google Fonts as offline web fonts in your project.
