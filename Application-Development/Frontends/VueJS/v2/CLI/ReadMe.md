# Vue CLI 

## Change Package Manager NPM to Yarn vice versa

```
~/.vuerc

{
  "packageManager": "npm",
  ...

```

## Vue CLI behind proxy workaround (quick & dirty) :

Modifying 

Before Beta 15 `..\AppData(Roaming)\npm\node_modules\@vue\cli\lib\util\getVersions.js`

after Beta 15  `..\AppData(Roaming)\npm\node_modules\@vue\cli\lib\util\getPackageVersion.js`
    
    const registry = options.useTaobaoRegistry 
    ? `https://registry.npm.taobao.org` 
    : `https://myOwn/artifactory/api/npm/npm-remote/`;

Setting an environment variable to avoid self signed certificate errors (= setting up for a MitM attack)
    
    NODE_TLS_REJECT_UNAUTHORIZED=0
