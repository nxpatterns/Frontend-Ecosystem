export const componentSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'SchematicsAngularComponent',
  title: 'Angular Component Options Schema',
  type: 'object',
  description:
    'Creates a new, generic component definition in the given or default project.',
  additionalProperties: false,
  properties: {
    path: {
      type: 'string',
      format: 'path',
      description:
        'The path at which to create the component file, relative to the current workspace. Default is a folder with the same name as the component in the project root.',
      visible: false,
    },
    project: {
      type: 'string',
      description: 'The name of the project.',
      $default: {
        $source: 'projectName',
      },
    },
    name: {
      type: 'string',
      description: 'The name of the component.',
      $default: {
        $source: 'argv',
        index: 0,
      },
      'x-prompt':
        'What name would you like to use for the component?',
    },
    displayBlock: {
      description:
        'Specifies if the style will contain `:host { display: block; }`.',
      type: 'boolean',
      default: false,
      alias: 'b',
    },
    inlineStyle: {
      description:
        'Include styles inline in the component.ts file. Only CSS styles can be included inline. By default, an external styles file is created and referenced in the component.ts file.',
      type: 'boolean',
      default: false,
      alias: 's',
      'x-user-analytics': 9,
    },
    inlineTemplate: {
      description:
        'Include template inline in the component.ts file. By default, an external template file is created and referenced in the component.ts file.',
      type: 'boolean',
      default: false,
      alias: 't',
      'x-user-analytics': 10,
    },
    viewEncapsulation: {
      description:
        'The view encapsulation strategy to use in the new component.',
      enum: ['Emulated', 'None', 'ShadowDom'],
      type: 'string',
      alias: 'v',
      'x-user-analytics': 11,
    },
    changeDetection: {
      description:
        'The change detection strategy to use in the new component.',
      enum: ['Default', 'OnPush'],
      type: 'string',
      default: 'Default',
      alias: 'c',
    },
    prefix: {
      type: 'string',
      description:
        'The prefix to apply to the generated component selector.',
      alias: 'p',
      oneOf: [
        {
          maxLength: 0,
        },
        {
          minLength: 1,
          format: 'html-selector',
        },
      ],
    },
    style: {
      description:
        "The file extension or preprocessor to use for style files, or 'none' to skip generating the style file.",
      type: 'string',
      default: 'css',
      enum: ['css', 'scss', 'sass', 'less', 'none'],
      'x-user-analytics': 5,
    },
    type: {
      type: 'string',
      description:
        'Adds a developer-defined type to the filename, in the format "name.type.ts".',
      default: 'Component',
    },
    skipTests: {
      type: 'boolean',
      description:
        'Do not create "spec.ts" test files for the new component.',
      default: false,
      'x-user-analytics': 12,
    },
    flat: {
      type: 'boolean',
      description:
        'Create the new files at the top level of the current project.',
      default: false,
    },
    skipImport: {
      type: 'boolean',
      description:
        'Do not import this component into the owning NgModule.',
      default: false,
      'x-user-analytics': 18,
    },
    selector: {
      type: 'string',
      format: 'html-selector',
      description: 'The HTML selector to use for this component.',
    },
    skipSelector: {
      type: 'boolean',
      default: false,
      description:
        'Specifies if the component should have a selector or not.',
    },
    module: {
      type: 'string',
      description: 'The declaring NgModule.',
      alias: 'm',
    },
    export: {
      type: 'boolean',
      default: false,
      description: 'The declaring NgModule exports this component.',
      'x-user-analytics': 19,
    },
  },
  required: ['name'],
};
