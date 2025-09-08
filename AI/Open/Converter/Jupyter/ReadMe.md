# Convert Messages to Jupyter Notebooks

## MacOS/Linux

```python
import json
import os
import subprocess
import sys
from datetime import datetime


def get_downloads_path():
    downloads = "./tmp"
    if not os.path.exists(downloads):
        os.makedirs(downloads)
    return downloads


def install_and_import(package):
    try:
        module = __import__(package)
    except ImportError:
        try:
            # Install the package silently with pip
            print("")
            print(f"Installing {package}...")
            print("")
            subprocess.check_call(
                [sys.executable, "-m", "pip", "install", package],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            module = __import__(package)
        except subprocess.CalledProcessError:
            # If pip fails, try pip3
            try:
                subprocess.check_call(
                    [sys.executable, "-m", "pip3", "install", package],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                )
            except subprocess.CalledProcessError:
                print(f"Failed to install package {package}.")
                return
    finally:
        globals()[package] = module
    return module


def jupyter(data, filename):
    # Dynamically install nbformat if not already installed
    nbformat = install_and_import("nbformat")
    from nbformat.v4 import new_notebook, new_code_cell, new_markdown_cell

    downloads = get_downloads_path()
    notebook_path = os.path.join(downloads, filename)
    nb = new_notebook()
    cells = []

    for msg in data:
        if msg["role"] == "user" and msg["type"] == "message":
            # Prefix user messages with '>' to render them as block quotes, so they stand out
            content = f"> {msg['content']}"
            cells.append(new_markdown_cell(content))
        elif msg["role"] == "assistant" and msg["type"] == "message":
            cells.append(new_markdown_cell(msg["content"]))
        elif msg["type"] == "code":
            # Handle the language of the code cell
            if "format" in msg and msg["format"]:
                language = msg["format"]
            else:
                language = "python"  # Default to Python if no format specified
            code_cell = new_code_cell(msg["content"])
            code_cell.metadata.update({"language": language})
            cells.append(code_cell)

    nb["cells"] = cells

    with open(notebook_path, "w", encoding="utf-8") as f:
        nbformat.write(nb, f)


# Load all json files in the current directory
json_files = [f for f in os.listdir(".") if f.endswith(".json")]

for json_file in json_files:
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Skip if array has fewer than 3 elements
    if len(data) < 3:
        continue

    # Get first element (index 0) and first 30 characters
    element = str(data[0])[:30]

    file_time = datetime.fromtimestamp(os.path.getmtime(json_file))
    formatted_time = file_time.strftime("%Y_%m_%d__%H_%M")
    notebook_filename = f"o-{formatted_time}-{os.path.splitext(json_file)[0]}.ipynb"
    jupyter(data, notebook_filename)
```
