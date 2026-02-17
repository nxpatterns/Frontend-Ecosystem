# Routing

## Routing Issue at Server

That may help:

```ts
// Excerpt app-routing.module.ts

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
```
