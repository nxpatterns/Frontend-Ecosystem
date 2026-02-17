# Terraform in Kürze

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Was bietet Terraform in etwa?](#was-bietet-terraform-in-etwa)
- [Terraform & IAM](#terraform--iam)
- [Terraform & Kubernetes](#terraform--kubernetes)
- [Eher nicht geeignet für](#eher-nicht-geeignet-für)
- [Beispiele](#beispiele)
  - [GitHub](#github)
  - [Azure DevOps](#azure-devops)
- [Terraform-CLI (Basic Commands)](#terraform-cli-basic-commands)

<!-- /code_chunk_output -->

## Was bietet Terraform in etwa?

- Infrastruktur als Code
- Ausführungspläne
- Ressourcenabhängigkeiten
- Änderungsautomatisierung
- Anbieterneutralität
- Zustandsmanagement
- Modulare Struktur

## Terraform & IAM

- Verwaltung von IAM-Ressourcen (Identity and Access Management) in unterstützten - Cloud-Anbietern.
- Automatisierung von Benutzer- und Gruppenrichtlinien.
- Erstellung und Verwaltung von Rollen und Berechtigungen.
- Integration mit bestehenden IDM-Lösungen über Provider-APIs.

## Terraform & Kubernetes

Terraform kann Kubernetes-Ressourcen verwalten durch:

- Erstellung und Management von Kubernetes-Clustern.
- Deployment von Anwendungen.
- Konfiguration von Netzwerken, Speicher und anderen Ressourcen.
- Integration mit Kubernetes-APIs.

## Eher nicht geeignet für

- Ausführung von Code-Tests.
- Build-Prozesse von Anwendungen.
- Direktes Handling von Artefakt-Repositories.
- Überwachung des Pipeline-Status in Echtzeit.
- Auslösen von Pipelines durch Code-Änderungen (CI/CD-Trigger).
  - Hier verwenden wir je nach Umgebung:
    - Azure DevOps
    - Jenkins
    - GitLab CI/CD
    - ...

## Beispiele

### GitHub

1. **GitHub Repository Setup:**

    - Ein GitHub-Repository enthält den Terraform-Code.
2. **GitHub Actions Workflow:**

    - `.github/workflows/terraform.yml` definiert den Workflow.
3. **Workflow-Schritte:**

    - **Checkout-Code:** Der Workflow checkt den neuesten Code aus.
    - **Terraform Init:** Initialisiert Terraform.
    - **Terraform Plan:** Erstellt einen Ausführungsplan.
    - **Terraform Apply:** Wendet die Änderungen an (manuell ausgelöst für Sicherheit).
4. **Trigger:**

    - Der Workflow wird getriggert, wenn Änderungen am `main`\-Branch oder in spezifischen Verzeichnissen mit Terraform-Dateien gepusht werden.

Ein minimalistisches Beispiel für eine `.github/workflows/terraform.yml`:

```yaml
name: 'Terraform'

on:
  push:
    branches:
    - main
    paths:
    - '**.tf'

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Terraform Init
      uses: hashicorp/setup-terraform@v1
      with:
        terraform_version: '1.0.0'

    - name: Terraform Plan
      run: terraform plan

    # Terraform Apply ist manuell ausgelöst, um unbeabsichtigte Änderungen zu vermeiden
    - name: Terraform Apply
      if: github.ref == 'refs/heads/main' && github.event_name == 'push'
      run: terraform apply -auto-approve
```

### Azure DevOps

1. **Azure DevOps Repository Setup:**

    - Ein Azure DevOps-Repository enthält den Terraform-Code.
2. **Azure DevOps Pipeline:**

      - `azure-pipelines.yml` definiert die Pipeline.
3. **Pipeline-Schritte:**

      - **Checkout-Code:** Die Pipeline checkt den neuesten Code aus.
      - **Terraform Init:** Initialisiert Terraform.
      - **Terraform Plan:** Erstellt einen Ausführungsplan.
      - **Terraform Apply:** Wendet die Änderungen an (manuell ausgelöst für Sicherheit).
4. **Trigger:**

        - Die Pipeline wird getriggert, wenn Änderungen am `main`\-Branch oder in spezifischen Verzeichnissen mit Terraform-Dateien gepusht werden.

Ein minimalistisches Beispiel für eine `azure-pipelines.yml`:

```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- checkout: self
  persistCredentials: true

- task: HashiCorpInc.terraform-tool-installer.TerraformToolInstaller@0
  displayName: 'Install Terraform'
  inputs:
    terraformVersion: '1.0.0'

- script: terraform init
  displayName: 'Terraform Init'

- script: terraform plan
  displayName: 'Terraform Plan'

# Terraform Apply ist manuell ausgelöst,
# um unbeabsichtigte Änderungen zu vermeiden
- script: terraform apply -auto-approve
  displayName: 'Terraform Apply'
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
```

## Terraform-CLI (Basic Commands)

- `terraform init` - Initialisiert ein Terraform-Arbeitsverzeichnis.
- `terraform plan` - Erstellt einen Ausführungsplan.
- `terraform apply` - Wendet Änderungen an.
- `terraform destroy` - Zerstört zuvor erstellte Infrastruktur.
- `terraform validate` - Validiert die Syntax der Terraform-Dateien.
- `terraform fmt` - Formatiert Terraform-Dateien.
- `terraform taint` - Markiert eine Ressource als beschädigt.
- `terraform untaint` - Entfernt die Markierung einer Ressource als beschädigt.
- `terraform state` - Verwaltet den Zustand von Terraform-Dateien.
- `terraform output` - Gibt die Werte von Terraform-Ausgaben aus.
- `terraform import` - Importiert eine externe Konfiguration in den Terraform-Zustand.
- `terraform graph` - Erstellt eine Visualisierung der Terraform-Ressourcen.
- `terraform providers` - Zeigt eine Liste der installierten Anbieter an.
- `terraform push` - Lädt Terraform-Modul-Pakete in das Terraform-Enterprise-Modul-Repository hoch.
- `terraform login` - Erstellt oder löscht ein Terraform-Cloud-Token.
- `terraform logout` - Löscht ein Terraform-Cloud-Token.
- `terraform workspace` - Verwaltet Terraform-Arbeitsbereiche.
- `terraform upgrade` - Aktualisiert die Konfiguration auf die neueste Terraform-Version.
