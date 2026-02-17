# Azure Kubernetes Service (AKS)

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Setup](#setup)
  - [Install Azure CLI](#install-azure-cli)
  - [Install Kubernetes CLI](#install-kubernetes-cli)
  - [Verify Installation](#verify-installation)
- [Resource Groups](#resource-groups)
  - [Create Resource Group](#create-resource-group)
  - [List Resource Groups](#list-resource-groups)
- [AKS Cluster](#aks-cluster)
  - [Deploy AKS Cluster](#deploy-aks-cluster)
  - [Verify AKS Cluster](#verify-aks-cluster)
  - [Connect to AKS Cluster](#connect-to-aks-cluster)
  - [List AKS Cluster Nodes](#list-aks-cluster-nodes)
  - [Key Parameters](#key-parameters)
- [Deploy Application](#deploy-application)
  - [Example Manifests](#example-manifests)
    - [How Manifests Work](#how-manifests-work)
  - [Verify Deployment](#verify-deployment)
  - [Expose the Deployment](#expose-the-deployment)
  - [Check the External IP Address](#check-the-external-ip-address)
  - [Scale the Deployment](#scale-the-deployment)
    - [Autoscaling](#autoscaling)
      - [Example `hpa.yaml`](#example-hpayaml)
      - [Check HPA Status](#check-hpa-status)
      - [Monitor Cluster Autoscaler](#monitor-cluster-autoscaler)
      - [Check Metrics in Azure Monitor](#check-metrics-in-azure-monitor)
      - [Setting Up Alerts](#setting-up-alerts)
      - [Log Queries](#log-queries)
  - [Update the Deployment](#update-the-deployment)
  - [Delete the Deployment](#delete-the-deployment)
  - [Delete the Service](#delete-the-service)
  - [Delete the AKS Cluster](#delete-the-aks-cluster)
- [Monitoring and Managing AKS](#monitoring-and-managing-aks)
  - [Other Integrations](#other-integrations)
- [Best Practices](#best-practices)
- [Summary](#summary)

<!-- /code_chunk_output -->

## Setup

### Install Azure CLI

```bash
brew update && brew install azure-cli # MacOS or
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash # debian
```

### Install Kubernetes CLI

```bash
brew install kubectl # MacOS or
az aks install-cli # debian or
sudo apt-get update && sudo apt-get install -y kubectl # debian or redhat
sudo yum install kubectl # redhat
```

### Verify Installation

```bash
az --version
kubectl version --client`
```

## Resource Groups

### Create Resource Group

```bash
az group create --name myResourceGroup --location myRegion
```

### List Resource Groups

```bash
az group list
az group list --output table
az group list --query "[].{name:name, location:location}" --output table
```

## AKS Cluster

### Deploy AKS Cluster

```bash
az login

az account set --subscription "mySubscription"

az aks create \
  --resource-group myResourceGroup \
  --name myAKSCluster \
  --node-count 1 \
  --enable-addons monitoring \
  --generate-ssh-keys
```

### Verify AKS Cluster

```bash
az aks list --resource-group myResourceGroup --output table
az aks show --resource-group myResourceGroup --name myAKSCluster --query "provisioningState"
```

### Connect to AKS Cluster

```bash
az aks get-credentials --resource-group myResourceGroup --name myAKSCluster
```

### List AKS Cluster Nodes

```bash
kubectl get nodes

kubectl get nodes -o wide

kubectl get pods --all-namespaces

kubectl top nodes

kubectl top pods

az aks list --resource-group myResourceGroup --output table

az aks show

az aks show --resource-group myResourceGroup \
  --name myAKSCluster \
  --query "provisioningState"
```

### Key Parameters

Source: Adamson, Christopher. Azure Kubernetes Service (pp. 23-24).

- Subscription
  - `--subscription "mySubscription"`
- Resource Group
  - `--resource-group myResourceGroup`
- Cluster Name
  - `--name myAKSCluster`
- Region
  - `--location myRegion`
- Kubernetes Version
  - `--kubernetes-version 1.18.8`
- Node Pools
  - `--node-count 1`
- Scaling
  - `--node-count 1 --node-vm-size Standard_B2s`
- Authentication & Security
  - `--enable-addons monitoring`
  - `--generate-ssh-keys`
  - `--enable-managed-identity`

## Deploy Application

- [Kubernetes Examples](https://k8s.io/examples/application/deployment.yaml)

- Install kubernetes CLU (see above)
- Configure kubectl to use the AKS cluster
  - `az aks get-credentials --resource-group myResourceGroup --name myAKSCluster`
- Create a Kubernetes Manifest File (see below sub chapter)
- Deploy the application using the manifest file
  - `kubectl apply -f deployment.yaml`

```bash
kubectl apply -f https://k8s.io/examples/application/deployment.yaml
kubectl apply -f https://k8s.io/examples/application/service.yaml
kubectl get pods
kubectl get services
```

### Example Manifests

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:1.0
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

#### How Manifests Work

- `apiVersion`: The version of the Kubernetes API you are using.
- `kind`: The type of resource you are creating.
- `metadata`: Data that helps uniquely identify the resource.
- `spec`: The desired state of the resource.
- `replicas`: The number of pods you want to run.
- `selector`: The labels that the deployment will use to find the pods it is managing.
- `template`: The pod template.
- `containers`: The containers that will run in the pod.
- `name`: The name of the container.
- `image`: The image that the container will run.
- `ports`: The ports that the container will expose.
- `containerPort`: The port that the container will listen on.
- `targetPort`: The port that the service will forward to.
- `type`: The type of service you are creating.

and (TODO: Re-Check Names)

- `LoadBalancer`: The service will be exposed externally using an Azure Load Balancer.
- `networking.k8s.io/v1`: The version of the networking API you are using.
- `NetworkPolicy`: The type of resource you are creating.
- `Data volume`: The volume that the pod will use.
- `persistentVolumeClaim`: The claim that the pod will use to get storage.
- `storageClassName`: The class of storage that the claim will use.
- `accessModes`: The access modes that the claim will use.
- `readWriteOnce`: The claim can be mounted as read-write by a single node.
- `resources`: The resources that the pod will use.
- `requests`: The resources that the pod will request.
- `limits`: The resources that the pod will be limited to.
- `cpu`: The CPU that the pod will use.
- `memory`: The memory that the pod will use.
- `env`: The environment variables that the container will use.

### Verify Deployment

```bash
kubectl get deployments
kubectl get services
kubectl get pods
kubectl describe deployment myapp
kubectl describe service myapp
```

### Expose the Deployment

```bash
kubectl expose deployment myapp --type=LoadBalancer --name=myapp-service # or
kubectl apply -f service.yaml # or
kubectl expose deployment nginx-deployment --type=LoadBalancer --port=80 --target-port=80 --name=nginx-service
```

### Check the External IP Address

```bash
kubectl get services
```

### Scale the Deployment

```bash
kubectl scale deployment myapp --replicas=5
```

#### Autoscaling

```bash
# enable Metrics Server
kubectl get deployment metrics-server -n kube-system
# autoscale deployment
kubectl autoscale deployment myapp --min=3 --max=5 --cpu-percent=80 # or
kubectl apply -f hpa.yaml
```

##### Example `hpa.yaml`

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 3
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 80
```

##### Check HPA Status

```bash
kubectl get hpa
```

##### Monitor Cluster Autoscaler

```bash
kubectl get pods -n kube-system
kubectl logs -f deployment/cluster-autoscaler -n kube-system
kubectl -n kube-system logs -l app=cluster-autoscaler
```

##### Check Metrics in Azure Monitor

```bash
az aks show --resource-group myResourceGroup --name myAKSCluster --query "addonProfiles.monitoring.enabled"
```

##### Setting Up Alerts

```bash
az monitor metrics alert create \
--name myAlert \
--resource-group myResourceGroup \
--scopes /subscriptions/mySubscription/resourceGroups/myResourceGroup/providers/Microsoft.ContainerService/managedClusters/myAKSCluster \
--condition "avgMemoryUsed < 70" \
--description "Memory usage is below 70%" \
--evaluation-frequency 5m --severity 3 --action email
```

##### Log Queries

```bash
az monitor log-analytics query \
--workspace myWorkspace \
--analytics-query "ContainerInventory | summarize count() by Image"
```

### Update the Deployment

```bash
kubectl set image deployment/myapp myapp=myapp:2.0
```

### Delete the Deployment

```bash
kubectl delete deployment myapp
```

### Delete the Service

```bash
kubectl delete service myapp
```

### Delete the AKS Cluster

```bash
az aks delete --resource-group myResourceGroup --name myAKSCluster
```

## Monitoring and Managing AKS

- [Azure Monitor](https://docs.microsoft.com/en-us/azure/azure-monitor/overview)
- [Azure Monitor for Containers](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-overview)
- [Azure Monitor for Containers with AKS](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-onboard)
- [Azure Monitor for Containers with Prometheus](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-prometheus-integration)
- [Azure Monitor for Containers with Grafana](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-grafana-integration)

### Other Integrations

- [Azure Monitor for Containers with Log Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-log-analytics)
- [Azure Monitor for Containers with Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-application-insights)
- [Azure Monitor for Containers with Azure Policy](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-azure-policy)
- [Azure Monitor for Containers with Azure Security Center](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-security-center)
- [Azure Monitor for Containers with Azure Sentinel](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-sentinel)
- [Azure Monitor for Containers with Azure DevOps](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-devops)
- [Azure Monitor for Containers with Azure Functions](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-functions)
- [Azure Monitor for Containers with Azure Logic Apps](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-logic-apps)
- [Azure Monitor for Containers with Azure Event Grid](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-event-grid)
- [Azure Monitor for Containers with Azure API Management](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-api-management)
- [Azure Monitor for Containers with Azure Data Factory](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-data-factory)
- [Azure Monitor for Containers with Azure Databricks](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-databricks)
- [Azure Monitor for Containers with Azure Synapse Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-synapse-analytics)
- [Azure Monitor for Containers with Azure Stream Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-stream-analytics)
- [Azure Monitor for Containers with Azure Machine Learning](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-machine-learning)
- [Azure Monitor for Containers with Azure Cognitive Services](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-cognitive-services)
- [Azure Monitor for Containers with Azure IoT](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-iot)
- [Azure Monitor for Containers with Azure Blockchain](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-blockchain)
- [Azure Monitor for Containers with Azure Mixed Reality](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-mixed-reality)
- [Azure Monitor for Containers with Azure Digital Twins](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-digital-twins)
- [Azure Monitor for Containers with Azure Quantum](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-quantum)
- [Azure Monitor for Containers with Azure VMware Solution](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-vmware-solution)
- [Azure Monitor for Containers with Azure Stack](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-stack)
- [Azure Monitor for Containers with Azure Arc](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-arc)
- [Azure Monitor for Containers with Azure Sphere](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-sphere)
- [Azure Monitor for Containers with Azure Kinect](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-kinect)
- [Azure Monitor for Containers with Azure HoloLens](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-hololens)
- [Azure Monitor for Containers with Azure Digital Assistant](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-assistant)
- [Azure Monitor for Containers with Azure Virtual Assistant](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container
-insights-virtual-assistant)
- [Azure Monitor for Containers with Azure Bot Services](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-bot-services)

- [Azure Monitor for Containers with Azure Media Services](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-media-services)
- [Azure Monitor for Containers with Azure CDN](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-cdn)
- [Azure Monitor for Containers with Azure Front Door](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-front-door)
- [Azure Monitor for Containers with Azure Traffic Manager](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-traffic-manager)
- [Azure Monitor for Containers with Azure Application Gateway](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-application-gateway)
- [Azure Monitor for Containers with Azure API Gateway](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-api-gateway)
- [Azure Monitor for Containers with Azure Logic Apps](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-logic-apps)

- [Azure Monitor for Containers with Azure Event Hubs](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-event-hubs)
- [Azure Monitor for Containers with Azure Service Bus](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-service-bus)
- [Azure Monitor for Containers with Azure Relay](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-relay)
- [Azure Monitor for Containers with Azure Notification Hubs](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/container-insights-notification-hubs)

## Best Practices

[Azure Kubernetes Service Best Practices](https://docs.microsoft.com/en-us/azure/aks/best-practices)

- Maintenance
  - Regular Monitoring
  - Backup and Restore
  - Node Pool Management
  - Role-Based Access Control (RBAC)
  - Use Namespaces
- Updates
  - Regular Patching
  - Rolling Updates
  - Stage-wise Deployments
  - Version Compatibility
  - Update Node Pools Separately
  - Drain Nodes (i.e. `kubectl drain` means to evict all the pods from a node)
  - Plan for Rollbacks
  - Keep Track of Depracations

## Summary

- [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/)
- [Kubernetes CLI](https://kubernetes.io/docs/reference/kubectl/overview/)
- [Kubernetes Examples](https://k8s.io/examples/application/deployment.yaml)
