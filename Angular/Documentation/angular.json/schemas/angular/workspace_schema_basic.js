export const workspaceSchemaBasic = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'SchematicsAngularWorkspace',
  title: 'Angular Workspace Options Schema',
  description:
    'Initializes an empty workspace and adds the necessary dependencies required by an Angular application.',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      description: 'The name of the workspace.',
      type: 'string',
      format: 'html-selector',
      $default: {
        $source: 'argv',
        index: 0,
      },
    },
    newProjectRoot: {
      description: 'The path where new projects will be created.',
      type: 'string',
      visible: 'false',
    },
    version: {
      type: 'string',
      description: 'The version of the Angular CLI to use.',
      visible: false,
      $default: {
        $source: 'ng-cli-version',
      },
    },
    minimal: {
      description:
        'Create a workspace without any testing frameworks. (Use for learning purposes only.)',
      type: 'boolean',
      default: false,
      'x-user-analytics': 14,
    },
    strict: {
      description:
        'Create a workspace with stricter type checking options. This setting helps improve maintainability and catch bugs ahead of time. For more information, see https://angular.io/strict',
      type: 'boolean',
      default: true,
      'x-user-analytics': 7,
    },
    packageManager: {
      description:
        'The package manager used to install dependencies.',
      type: 'string',
      enum: ['npm', 'yarn', 'pnpm', 'cnpm'],
    },
  },
  required: ['name', 'version'],
};
