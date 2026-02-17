# Colorize Logs 

See colors: <https://www.ditig.com/256-colors-cheat-sheet>

```shell
#!/bin/zsh

BLUE='\033[48;5;57m'
GREEN='\033[48;5;46m'
RED='\033[48;5;196m'
YELLOW='\033[48;5;226m'
PURPLE='\033[48;5;99m'
ORANGE='\033[48;5;202m'
CYAN='\033[48;5;51m'
PINK='\033[48;5;198m'
TEAL='\033[48;5;30m'
GRAY='\033[48;5;238m'
DARKBLUE='\033[48;5;17m'
DARKGREEN='\033[48;5;22m'
DARKRED='\033[48;5;52m'
DARKYELLOW='\033[48;5;58m'
DARKPURPLE='\033[48;5;53m'
DARKORANGE='\033[48;5;166m'
DARKCYAN='\033[48;5;23m'
DARKPINK='\033[48;5;162m'
DARKTEAL='\033[48;5;24m'
DARKGRAY='\033[48;5;237m'

RESET='\033[0m'
PADDING="  "

colorize_logs() {

  script -q /dev/null npm run my_npm_script | while IFS= read -r line; do
    colored_line="$line"
    if echo "$line" | grep -q "WORD1"; then
      # Colorize "WORD1" in red
      colored_line="${colored_line//WORD1/${CYAN}${PADDING}WORD1$${PADDING}{RESET}}"
    fi
    if echo "$line" | grep -q "word2"; then
      # Colorize "API" in yellow
      colored_line="${colored_line//word2/${YELLOW}word2${RESET}}"
    fi
    if echo "$line" | grep -q "GET"; then
      # Colorize "GET" in blue
      colored_line="${colored_line//GET/${BLUE}GET${RESET}}"
    fi
    # Print the colored line
    echo -e "$colored_line"
  done

}

colorize_logs

```
