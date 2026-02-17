# Parallel FAQ

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

## Remove Parallel Desktop & Co. Completely

```shell
# Delete all files and folders in the following directories
ls /Applications | grep -i 'Parallels'
ls /Library/ | grep -i 'Parallels'
ls /Library/Preferences/ | grep -i 'Parallels'
ls /Library/Logs/ | grep -i 'Parallels'
ls ~/Library/Preferences/ | grep -i 'parallels'
ls ~/Library/Logs/ | grep -i 'parallels'
ls ~/Library/Application\ Support/ | grep -i 'parallels'
ls ~/Library/Caches/ | grep -i 'parallels'
ls ~/Library/Saved\ Application\ State/ | grep -i 'parallels'
```
