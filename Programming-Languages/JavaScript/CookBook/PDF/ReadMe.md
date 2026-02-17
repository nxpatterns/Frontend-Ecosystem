# NodeJS & PDF

## Create empty pdf document

```js
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createEmptyPdf() {
  const targetSize = 1 * 1024 * 1024;
  const folderPath = './PDF/100KB';
  const name = '1MB_';
  const count = 60;

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  for (let i = 1; i <= count; i++) {
    const pdfDoc = await PDFDocument.create();
    const pdfBytes = await pdfDoc.save();
    const padding = ' '.repeat(targetSize - pdfBytes.length);
    const outputBytes = Buffer.concat([
      pdfBytes,
      Buffer.from(padding),
    ]);
    const fileName = `${name}${i}.pdf`;
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, outputBytes);
    console.log(`Created file: ${filePath}`);
  }
}

createEmptyPdf();
```
