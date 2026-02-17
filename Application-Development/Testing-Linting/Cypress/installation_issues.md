# Cypress Installation Trouble Shoot

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [Corporate Network Certificat Issue](#corporate-network-certificat-issue)
  - [(Windows Powershell) - Getting Proxy Credentials Solution](#windows-powershell---getting-proxy-credentials-solution)
    - [WEbClient-Object - Further Details](#webclient-object---further-details)
  - [Insecure Methods](#insecure-methods)
  - [Use Corporate Proxy](#use-corporate-proxy)
  - [Add Own Certificates](#add-own-certificates)
  - [Set Environment Variable](#set-environment-variable)

<!-- /code_chunk_output -->

## Corporate Network Certificat Issue

### (Windows Powershell) - Getting Proxy Credentials Solution

**PowerShell** can come to our rescue, **provided** you have the **ability to run it with administrative privileges.**

**Import or Set Proxy Settings:**

First, import your proxy settings from Internet Explorer to your system settings. This ensures that your system uses the same proxy settings that work in IE.

```powershell
netsh winhttp import proxy source=ie
```

if it does not work (no import possible or none was set), then set it manually:

```powershell
$Wcl.Proxy = New-Object System.Net.WebProxy("http://IP_Adresse:Port", $true)
```

> I just want to emphasize that even though the command `netsh winhttp import proxy source=ie` mentions Internet Explorer (IE), it actually pertains to system-wide proxy settings that could also be used by Microsoft Edge. Historically, Windows has retained the "IE" designation for these settings, even if the actual browser in use is no longer Internet Explorer.

> In some cases, Windows uses the same proxy settings for both Internet Explorer and Microsoft Edge. However, attempting to import Edge-specific settings might result in an error message, as the `netsh` command was originally developed for Internet Explorer.

**Initialize WebClient:**

Create a new WebClient object. This object allows you to send HTTP requests and receive HTTP responses.

```powershell
$Wcl = New-Object System.Net.WebClient
```

**Get Credentials:**

Check before `whoami`

```powershell
$ whoami
somedomain\someuser

# Powershell
echo $env:USERNAME

# Command Prompt
echo %USERNAME%
```

Use the Get-Credential `cmdlet` to prompt for your username and password. This will open a dialog box where you can enter your credentials.

```powershell
$Creds = Get-Credential
```

**Set Proxy Credentials:**

Finally, assign the credentials to the WebClient's proxy. This enables the WebClient to pass through the corporate proxy using the credentials you provided.

```powershell
$Wcl.Proxy.Credentials = $Creds
```

By following these steps, you should be able to bypass the issues related to network restrictions and successfully install thirdparty packages.

#### WEbClient-Object - Further Details

DownloadFile:
`$Wcl.DownloadFile($url, $path)`

DownloadString:
`$result = $Wcl.DownloadString($url)`

UploadFile:
`$Wcl.UploadFile($url, "POST", $path)`

UploadString:
`$Wcl.UploadString($url, "POST", $data)`

Headers:
`$Wcl.Headers.Add("User-Agent", "Mozilla/5.0")`

Proxy:
`$Wcl.Proxy = New-Object System.Net.WebProxy("http://IP:Port", $true)`

Timeout:
`$Wcl.Timeout = 10000 (in Millisekunden)`

Credentials:
`$Wcl.Credentials = New-Object System.Net.NetworkCredential("username", "password")`

### Insecure Methods

> Please be aware of the security risks!

We can instruct npm to ignore SSL certificate checks. **This is insecure and should only be used as a last resort.**

```shell
npm set strict-ssl false
```

### Use Corporate Proxy

If the company uses a proxy server, we need to make sure npm is configured to use it:

```shell
# IMPORTANT: registry -> `https`
npm config set registry https://registry.npmjs.org/
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### Add Own Certificates

If the company uses its own certificate, we can add it to npm:

```shell
npm config set cafile "path-to-your-certificate.pem"
```

### Set Environment Variable

We can set the `NODE_TLS_REJECT_UNAUTHORIZED` environment variable to `0`. **This is also insecure.**

```shell
set NODE_TLS_REJECT_UNAUTHORIZED=0
```
