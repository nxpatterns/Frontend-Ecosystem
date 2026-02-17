### DOM Template Parsing Caveats

Most notably, some elements such as `ul, ol, table` and select have 
restrictions on what elements can appear inside them, and some elements 
such as <option> can only appear inside certain other elements.

This will lead to issues when using custom components with elements that 
have such restrictions, for example:

```jsx
<table>
  <my-row>...</my-row>  // not right way
</table>
```

The custom component <my-row> will be hoisted out as invalid content, 
thus causing errors in the eventual rendered output. A workaround is to 
use the `is` special attribute:

```jsx
<table>
  <tr is="my-row"></tr>
</table>
```

It should be noted that these limitations do not apply if you are using 
string templates from one of the following sources:

- script -> type="text/x-template"
- JavaScript inline template strings
- .vue components

Therefore, prefer using string templates whenever possible.
