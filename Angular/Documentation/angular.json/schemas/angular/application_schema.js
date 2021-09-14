export const applicationSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'SchematicsAngularApp',
  title: 'Angular Application Options Schema',
  type: 'object',
  description:
    'Generates a new basic app definition in the "projects" subfolder of the workspace.',
  additionalProperties: false,
  properties: {
    projectRoot: {
      description: 'The root directory of the new app.',
      type: 'string',
      visible: false,
    },
    name: {
      description: 'The name of the new app.',
      type: 'string',
      $default: {
        $source: 'argv',
        index: 0,
      },
      'x-prompt':
        'What name would you like to use for the application?',
    },
    inlineStyle: {
      description:
        'Include styles inline in the root component.ts file. Only CSS styles can be included inline. Default is false, meaning that an external styles file is created and referenced in the root component.ts file.',
      type: 'boolean',
      alias: 's',
      'x-user-analytics': 9,
    },
    inlineTemplate: {
      description:
        'Include template inline in the root component.ts file. Default is false, meaning that an external template file is created and referenced in the root component.ts file. ',
      type: 'boolean',
      alias: 't',
      'x-user-analytics': 10,
    },
    viewEncapsulation: {
      description:
        'The view encapsulation strategy to use in the new application.',
      enum: ['Emulated', 'None', 'ShadowDom'],
      type: 'string',
      'x-user-analytics': 11,
    },
    routing: {
      type: 'boolean',
      description: 'Create a routing NgModule.',
      default: false,
      'x-prompt': 'Would you like to add Angular routing?',
      'x-user-analytics': 17,
    },
    prefix: {
      type: 'string',
      format: 'html-selector',
      description: 'A prefix to apply to generated selectors.',
      default: 'app',
      alias: 'p',
    },
    style: {
      description:
        'The file extension or preprocessor to use for style files.',
      type: 'string',
      default: 'css',
      enum: ['css', 'scss', 'sass', 'less'],
      'x-prompt': {
        message: 'Which stylesheet format would you like to use?',
        type: 'list',
        items: [
          { value: 'css', label: 'CSS' },
          {
            value: 'scss',
            label:
              'SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]',
          },
          {
            value: 'sass',
            label:
              'Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]',
          },
          {
            value: 'less',
            label:
              'Less   [ http://lesscss.org                                             ]',
          },
        ],
      },
      'x-user-analytics': 5,
    },
    skipTests: {
      description:
        'Do not create "spec.ts" test files for the application.',
      type: 'boolean',
      default: false,
      alias: 'S',
      'x-user-analytics': 12,
    },
    skipPackageJson: {
      type: 'boolean',
      default: false,
      description:
        'Do not add dependencies to the "package.json" file.',
    },
    minimal: {
      description:
        'Create a bare-bones project without any testing frameworks. (Use for learning purposes only.)',
      type: 'boolean',
      default: false,
      'x-user-analytics': 14,
    },
    skipInstall: {
      description: 'Skip installing dependency packages.',
      type: 'boolean',
      default: false,
    },
    strict: {
      description:
        'Creates an application with stricter bundle budgets settings.',
      type: 'boolean',
      default: true,
      'x-user-analytics': 7,
    },
  },
  required: ['name'],
};
