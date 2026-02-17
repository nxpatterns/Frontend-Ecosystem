# AWK Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [Show Sentences with specific words](#show-sentences-with-specific-words)
- [Find Book Recommendations](#find-book-recommendations)
- [Git-Diff: Remove backspace characters and the characters before them](#git-diff-remove-backspace-characters-and-the-characters-before-them)
- [Print every line from a file](#print-every-line-from-a-file)
- [Print Specific Fields](#print-specific-fields)
- [Filter Lines Containing a Word](#filter-lines-containing-a-word)
- [Filter Lines with Multiple Patterns](#filter-lines-with-multiple-patterns)
- [Specify a Field Separator](#specify-a-field-separator)
- [Custom Record Separator](#custom-record-separator)
- [Substitute Text](#substitute-text)
- [Selective Printing Based on Field Conditions](#selective-printing-based-on-field-conditions)
- [Complex Conditions](#complex-conditions)
- [Sum of a Field](#sum-of-a-field)
- [Count Lines](#count-lines)

<!-- /code_chunk_output -->

## Show Sentences with specific words

```bash
awk 'BEGIN{RS="\\. "; FS="\n"} /foo\/bar\/|baz/{print $0"."}' textdatei.txt
```

## Find Book Recommendations

```bash
# e.g. in a transcription.txt file
awk '/Buch|Bücher|lesen|Autor/{print}' transcription.txt
```

## Git-Diff: Remove backspace characters and the characters before them

```bash
awk '{gsub(/.?\010/, "", $0); print $0}' git_diff_help.txt > clean_git_diff.txt
```

## Print every line from a file

```bash
awk '{print}' file.txt
```

## Print Specific Fields
Print the first and third fields of each line, where fields are separated by spaces:

```bash
awk '{print $1, $3}' file.txt
```

## Filter Lines Containing a Word
Print all lines containing the word "foo":

```bash
awk '/foo/ {print}' file.txt
```

## Filter Lines with Multiple Patterns
Print lines that contain "foo", "bar", or "baz":

```bash
awk '/foo|bar|baz/ {print}' file.txt
```

## Specify a Field Separator
Use a comma as the field separator and print the second field:

```bash
awk -F, '{print $2}' file.txt
```

## Custom Record Separator
Use a period followed by a space as a record separator to treat sentences as records:

```bash
awk 'BEGIN{RS="\. "} {print}' file.txt
```

## Substitute Text
Substitute "foo" with "bar" in the output:

```bash
awk '{gsub(/foo/, "bar"); print}' file.txt
```

## Selective Printing Based on Field Conditions
Print lines where the first field is greater than 100:

```bash
awk '$1 > 100 {print}' file.txt
```

## Complex Conditions
Print lines where the first field is greater than 100 and the second field contains "foo":

```bash
awk '$1 > 100 && /foo/ {print}' file.txt
```

## Sum of a Field
Calculate the sum of the first field across all lines:

```bash
awk '{sum += $1} END {print sum}' file.txt
```

## Count Lines
Count lines that contain "foo":

```bash
awk '/foo/ {count++} END {print count}' file.txt
```
