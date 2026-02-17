# Android (Under Construction)

## PKG Mgm

### Azure Storage

Prerequisites: Azure account, Azure CLI

#### Create an Azure Storage account:

If you don't already have one, create an Azure Storage account using the Azure portal or Azure CLI.

#### Create a Blob container:

In your storage account, create a new blob container. You can do this via the Azure portal or using Azure CLI:

```shell
az storage container create \
    --name your-container-name \
    --account-name your-storage-account-name \
    --public-access blob
```
