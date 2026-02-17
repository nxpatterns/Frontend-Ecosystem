# Wiki HowTos

## PlantUML Diagrams Support

Eine direkte Alternative, um die doppelte Arbeit zu vermeiden und PlantUML-Diagramme direkt in Azure DevOps Wiki einzubetten, besteht darin, die Integration über Azure Pipelines und eine externe Rendering-Service wie den PlantUML-Server zu automatisieren. Hier ist ein Ansatz:

1. **Speichere deine PlantUML-Dateien im Repository**: Organisiere deine `.puml` Dateien in deinem Repository.

2. **Nutze eine Azure Pipeline zur Generierung der Bilder**: Erstelle eine Pipeline, die bei jedem Push die `.puml` Dateien nimmt, sie in Bilder umwandelt und diese Bilder irgendwo speichert, wo sie öffentlich zugänglich sind (z.B. ein Azure Blob Storage).

3. **Referenziere die Bilder im Wiki**: Nachdem die Bilder generiert und hochgeladen wurden, kannst du sie im Wiki über ihre öffentlichen URLs einbetten.

### Schritte zur Automatisierung:

- **Azure Pipeline Aufbau**:

    - Installiere PlantUML oder nutze einen PlantUML Docker Container.
    - Schreibe ein Skript, das durch deine `.puml` Dateien iteriert und für jede Datei ein Bild generiert.
    - Lade die generierten Bilder in einen Azure Blob Storage hoch und setze sie öffentlich.
    - (Optional) Generiere eine Markdown-Seite, die automatisch alle Diagramm-Bilder einbettet, und committe diese Seite zurück in dein Repo.
- **Blob Storage für Bilder**:

    - Richte einen Azure Blob Storage ein, um die generierten Bilder zu speichern.
    - Konfiguriere die CORS-Einstellungen deines Blob Storage, falls erforderlich, um den Zugriff über Azure DevOps zu ermöglichen.
- **Wiki Einbettung**:

    - Verwende die URLs der im Blob Storage gespeicherten Bilder, um sie direkt in deinem Azure DevOps Wiki mittels Markdown einzubetten.

Diese Lösung vermeidet manuelle Schritte nach der anfänglichen Einrichtung und hält deine Diagramme automatisch aktuell, indem sie bei jeder Aktualisierung der `.puml` Dateien neu generiert und hochgeladen werden. Es erfordert allerdings ein wenig Einrichtungsaufwand und die Kenntnis, wie man Azure Pipelines sowie Azure Blob Storage konfiguriert.
