# dependency-cruiser

## Basic Usage

```shell
npm i -g dependency-cruiser
# e.g Change to an Angular Project and run
depcruise --init
```

```shell
  WARNING: You're running a globally installed dependency-cruiser.

           We recommend to install and run it as a local devDependency in
           your project instead. There it has your project's environment and
           transpilers at its disposal. That will ensure it can find e.g.
           TypeScript, Vue or Svelte modules and dependencies.

✔ Where do your source files live? … src
✔ Do your test files live in a separate folder? … no
✔ Looks like you're using a 'tsconfig.json'. Use that? … yes
✔ Full path to your 'tsconfig.json › tsconfig.json
✔ Also regard TypeScript dependencies that exist only before compilation? … yes

  ✔ Successfully created '.dependency-cruiser.js'
```

```shell
depcruise src --include-only "^src" --output-type dot | dot -T svg > ./tmp/dependency-graph.svg
```

### Produced Graph

![Dependency Graph](./tmp/dependency-graph.svg)

## Advanced Usage

```shell
depcruise src --include-only "^src" --output-type dot | dot -T svg | npx depcruise-wrap-stream-in-html > ./tmp/dependency-graph.html
```

### Produced Graph

see [dependency-graph.html](./tmp/dependency-graph.html)
