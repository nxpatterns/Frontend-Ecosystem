# Git Features

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [1\. Rebase und Interaktives Rebase](#1-rebase-und-interaktives-rebase)
- [2\. Merge-Konflikte](#2-merge-konflikte)
- [3\. Submodule](#3-submodule)
- [4\. Cherry-Picking](#4-cherry-picking)
- [5\. Bisect](#5-bisect)
- [6\. Hooks](#6-hooks)
- [7\. Reflog und Refspec](#7-reflog-und-refspec)
- [8\. Stash](#8-stash)
- [9\. Sparse Checkout](#9-sparse-checkout)
- [10\. Worktrees](#10-worktrees)
- [Weitere Details](#weitere-details)
  - [9\. Sparse Checkout](#9-sparse-checkout-1)
    - [Anwendung:](#anwendung)
  - [10\. Worktrees](#10-worktrees-1)
    - [Anwendung:](#anwendung-1)

<!-- /code_chunk_output -->

## 1\. Rebase und Interaktives Rebase

- **`git rebase`**: Ermöglicht es, die Basis eines Branches zu ändern, was nützlich ist, um einen sauberen Commit-Verlauf zu erhalten.
- **Interaktives Rebase (`git rebase -i`)**: Ermöglicht es, eine Reihe von Commits zu bearbeiten, zu löschen oder zusammenzuführen.

## 2\. Merge-Konflikte

- Das Auflösen von Merge-Konflikten kann kompliziert sein, insbesondere wenn mehrere Personen an demselben Code arbeiten.

## 3\. Submodule

- **`git submodule`**: Ermöglicht es, ein Git-Repository als Unterverzeichnis in einem anderen Git-Repository zu verwenden. Dies kann die Verwaltung von Abhängigkeiten komplizieren.

## 4\. Cherry-Picking

- **`git cherry-pick`**: Ermöglicht es, spezifische Commits aus einem anderen Branch in den aktuellen Branch zu übernehmen, ohne den gesamten Branch zu mergen.

## 5\. Bisect

- **`git bisect`**: Ein Debugging-Tool, das die binäre Suche verwendet, um den Commit zu finden, der einen Fehler eingeführt hat.

## 6\. Hooks

- **Git Hooks**: Skripte, die vor oder nach Ereignissen wie einem Commit oder Push ausgeführt werden. Diese können komplex sein, je nachdem, was sie tun sollen.

## 7\. Reflog und Refspec

- **`git reflog`**: Zeigt eine Historie aller Aktionen im Repository. Nützlich, um "verlorene" Commits wiederherzustellen.
- **Refspec**: Ein Muster, das verwendet wird, um Referenzen in Remote-Repositories zu beschreiben.

## 8\. Stash

- **`git stash`**: Ermöglicht es, Änderungen temporär zu speichern, ohne einen Commit zu machen. Dies kann nützlich sein, wenn man zwischen Branches wechseln muss.

## 9\. Sparse Checkout

- Ermöglicht das Klonen nur eines Teils eines Repositories, was in großen Projekten nützlich sein kann.

## 10\. Worktrees

- **`git worktree`**: Ermöglicht es, mehrere Arbeitskopien eines Repositories zu haben. Nützlich für das gleichzeitige Arbeiten an verschiedenen Branches.

## Weitere Details

### 9\. Sparse Checkout

Sparse Checkout ist eine Funktion von Git, die es ermöglicht, nur einen Teil eines Repositories auszuchecken. Das ist besonders nützlich, wenn Sie mit sehr großen Repositories arbeiten und nur einen bestimmten Unterordner oder spezifische Dateien benötigen.

#### Anwendung:

1. **Repository klonen**: Zuerst klonen Sie das Repository mit `git clone --no-checkout <repository_url>`.
2. **Sparse Checkout aktivieren**: Aktivieren Sie den Sparse-Checkout-Modus mit `git sparse-checkout init`.
3. **Ordner/Dateien auswählen**: Fügen Sie die Ordner oder Dateien hinzu, die Sie auschecken möchten, z.B. mit `git sparse-checkout set <folder_name>`.

   git clone --no-checkout https://github.com/example/repo.git
   cd repo
   git sparse-checkout init
   git sparse-checkout set some/subfolder`

### 10\. Worktrees

Git Worktrees ermöglichen es Ihnen, mehrere Arbeitskopien des gleichen Repositories zu haben. Das ist nützlich, wenn Sie an mehreren Branches gleichzeitig arbeiten möchten, ohne den aktuellen Arbeitsbereich zu beeinträchtigen.

#### Anwendung:

1. **Neuen Worktree erstellen**: Verwenden Sie `git worktree add <path> <branch>` um einen neuen Worktree zu erstellen.
2. **Zwischen Worktrees wechseln**: Sie können einfach zum Ordner des Worktrees navigieren und wie in einem normalen Git-Repository arbeiten.

```shell
git worktree add ../new-worktree-folder feature/new-feature
cd ../new-worktree-folder
```

Mit Worktrees können Sie also problemlos zwischen verschiedenen Feature-Branches wechseln, ohne den Hauptarbeitsbereich zu beeinträchtigen. Sie können auch verschiedene Worktrees für verschiedene Zwecke haben, wie z.B. Entwicklung, Testing und Produktion.
