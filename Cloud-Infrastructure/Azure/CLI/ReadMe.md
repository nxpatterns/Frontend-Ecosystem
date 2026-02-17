# Azure CLI

## Basic Commands

```shell
# Login in Azure
az login

# Show available subscriptions
az account list --output table

# Set subscription
az account set --subscription "SubscriptionID"

# Show available locations
az account list-locations --output table

# Show available resource groups
az group list --output table

# Show available resources
az resource list --output table

# Show available resources of a specific type
az resource list \
  --resource-type "Microsoft.Compute/virtualMachines" --output table

# Show available resources of a specific type in a specific location
az resource list \
  --resource-group "Name der Ressourcengruppe" \
  --output table

# Show available resources of a specific type in a specific location
az resource list \
  --resource-group "Name der Ressourcengruppe" \
  --resource-type "Microsoft.Compute/virtualMachines" \
  --output table

# Show available resources of a specific type in a specific location
az resource list \
  --resource-group "Name der Ressourcengruppe" \
  --resource-type "Microsoft.Compute/virtualMachines" \
  --location "Name der Region" \
  --output table

az resource list --resource-group "Name der Ressourcengruppe" \
  --resource-type "Microsoft.Compute/virtualMachines" \
  --location "Name der Region" \
  --query "[?properties.hardwareProfile.vmSize=='Standard_DS1_v2']" \
  --output table

```

## Log Commands

```shell

az monitor log-profiles list --output table

az monitor log-profiles list \
  --resource-group "Name der Ressourcengruppe" \
  --output table

az monitor log-profiles list \
  --resource-group "Name der Ressourcengruppe" \
  --location "Name der Region" \
  --output table

az monitor log-profiles list \
  --resource-group "Name der Ressourcengruppe" \
  --location "Name der Region" \
  --query "[?name=='default']" \
  --output table
```
