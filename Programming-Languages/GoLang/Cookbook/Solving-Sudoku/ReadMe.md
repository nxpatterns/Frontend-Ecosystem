# Solving Sudoku with Go

```go
package main

import (
    "fmt"
    "html/template"
    "net/http"
    "strconv"
)

var tpl *template.Template

const (
    blank = 0
    size  = 9
)

type Sudoku [size][size]int

func (s *Sudoku) isSafe(row, col, num int) bool {
    // Check row
    for i := 0; i < size; i++ {
        if s[row][i] == num {
            return false
        }
    }

    // Check column
    for i := 0; i < size; i++ {
        if s[i][col] == num {
            return false
        }
    }

    // Check box
    startRow := row - row%3
    startCol := col - col%3
    for i := startRow; i < startRow+3; i++ {
        for j := startCol; j < startCol+3; j++ {
            if s[i][j] == num {
                return false
            }
        }
    }

    return true
}

func (s *Sudoku) findBlank() (int, int) {
    for row := 0; row < size; row++ {
        for col := 0; col < size; col++ {
            if s[row][col] == blank {
                return row, col
            }
        }
    }
    return -1, -1
}

func (s *Sudoku) solve() bool {
    row, col := s.findBlank()

    if row == -1 && col == -1 {
        return true
    }

    for num := 1; num <= size; num++ {
        if s.isSafe(row, col, num) {
            s[row][col] = num
            if s.solve() {
                return true
            }
            s[row][col] = blank
        }
    }
    return false
}

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodPost {
            s := Sudoku{}
            for i := 0; i < size; i++ {
                for j := 0; j < size; j++ {
                    num, _ := strconv.Atoi(r.FormValue(fmt.Sprintf("%d-%d", i, j)))
                    s[i][j] = num
                }
            }

            if s.solve() {
                tpl.Execute(w, s)
            } else {
                fmt.Fprint(w, "This sudoku cannot be solved.")
            }
        } else {
            tpl.Execute(w, nil)
        }
    })

    tpl = template.Must(template.ParseFiles("sudoku.gohtml"))

    http.ListenAndServe(":8080", nil)
}

```

sudoku.gohtml

```html
<form method="post">
  <table>
    {{range $i, $row := .}}
    <tr>
      {{range $j, $cell := $row}}
      <td>
        <input
          type="text"
          name="{{$i}}-{{$j}}"
          value="{{$cell}}"
          size="1"
        />
      </td>
      {{end}}
    </tr>
    {{end}}
  </table>
  <input type="submit" value="Solve" />
</form>
```
