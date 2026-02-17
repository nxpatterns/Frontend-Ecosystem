# Zsh Cook Book

## Change git staged / unstaged string

    # e.g. within themes/agnoster.zsh-theme
    zstyle ':vcs_info:*' stagedstr '(\u2713)' # (✓) 
    zstyle ':vcs_info:*' unstagedstr '(\u00B1)' # (±)
