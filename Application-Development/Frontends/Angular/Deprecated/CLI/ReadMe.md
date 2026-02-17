# Angular CLI

    DEPRECATED!

- [Config Schema](https://github.com/angular/angular-cli/wiki/angular-cli)
- [Examples & Stories](https://github.com/angular/angular-cli/wiki/stories)

## Generating and Serving

```
ng new PROJECT-NAME --routing
cd PROJECT-NAME
ng serve
```

### Default HTTP Host and Port

```
ng serve --host 0.0.0.0 --port 4201
```

### Tests & Builds

```
ng test
ng test --code-coverage
ng test -cc
ng e2e
ng build
```

### Generating Components etc.

| Part      | Comand                          |
| :-------- | ------------------------------- | --- |
| Component | ng g component my-new-component |
| Directive | ng g directive my-new-directive |     |
| Pipe      | ng g pipe my-new-pipe           |
| Service   | ng g service my-new-service     |
| Class     | ng g class my-new-class         |
| Guard     | ng g guard my-new-guard         |
| Interface | ng g interface my-new-interface |
| Enum      | ng g enum my-new-enum           |
| Module    | ng g module my-module           |

#### Custom Modules and Components

1. ` ng g module foo-module`
2. ` ng g component foo-module/bar-component`

### Additional Commands

#### ng lint

```
--fix            # default: false
--force
--type-check
--format         # default: prose
```

Linting using tslint, default format prose, other formats:

```
    prose, json, stylish,
    verbose, pmd, msbuild,
    checkstyle, vso, fileslist
```

#### ng get/ng set

Get a value from the configuration or set a value in the configuration in JSON path format.

```
--global        default: false
```

#### ng doc [search term]

opens the official Angular API documentation for a given keyword on angular.io

#### ng eject

ejects your app and output the proper webpack configuration and scripts. If you want to undo the rejection remove the line in `angular-cli.json`. [See more details here](https://github.com/angular/angular-cli/wiki/eject)

#### ng xi18n

Extracts i18n messages from the templates. [See more details here](https://github.com/angular/angular-cli/wiki/xi18n)
