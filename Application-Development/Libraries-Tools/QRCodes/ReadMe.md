---
output: pdf_document
---

# QR Code Libraries

## Pandoc Table Format Example

-------------------------------------------------------------
 Centered   Default           Right Left
  Header    Aligned         Aligned Aligned
----------- ------- --------------- -------------------------
   First    row                12.0 Example of a row that
                                    spans multiple lines.

  Second    row                 5.0 Here's another one. Note
                                    the blank line between
                                    rows.
-------------------------------------------------------------

## Quick Comparison

| Library           | License    | Language   | Platforms       | Notes                                                                                   | TypeDefs existing? |
|-------------------|------------|------------|----------------|-----------------------------------------------------------------------------------------|--------------------|
| QRCode.js         | MIT        | JavaScript | Browser        | Compact and efficient, can generate and scan QR codes. Fewer features than some other libraries. | No                 |
| html5-qrcode      | MIT        | JavaScript | Browser/Mobile | Versatile, well-documented, many customization options. Somewhat older, might cause issues in some modern browsers. | No                 |
| instascan         | Apache-2.0 | JavaScript | Browser        | Fast and easy to set up. Currently not actively maintained.                             | No                 |
| jsQR              | MIT        | TypeScript | Browser/Mobile | Fast and compact QR code scanner.                                                     | Yes                |
| jsqrcode          | MIT        | JavaScript | Browser        | Compact and efficient, can generate and scan QR codes. Fewer features than some other libraries. | No                 |
| qrcode-reader     | MIT        | JavaScript | Browser        | Compact and efficient, can generate and scan QR codes. Fewer features than some other libraries. | No                 |
| zxing-js/library  | Apache-2.0 | JavaScript | Browser/Mobile | Popular and well-maintained library, brings many features from the Android world. Could be overkill for some use cases. | Yes                |
