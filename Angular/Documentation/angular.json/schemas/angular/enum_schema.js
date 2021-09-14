export const enumSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'SchematicsAngularEnum',
  title: 'Angular Enum Options Schema',
  type: 'object',
  description:
    'Generates a new, generic enum definition for the given or default project.',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      description: 'The name of the enum.',
      $default: {
        $source: 'argv',
        index: 0,
      },
      'x-prompt': 'What name would you like to use for the enum?',
    },
    path: {
      type: 'string',
      format: 'path',
      description:
        'The path at which to create the enum definition, relative to the current workspace.',
      visible: false,
    },
    project: {
      type: 'string',
      description:
        'The name of the project in which to create the enum. Default is the configured default project for the workspace.',
      $default: {
        $source: 'projectName',
      },
    },
    type: {
      type: 'string',
      description:
        'Adds a developer-defined type to the filename, in the format "name.type.ts".',
    },
  },
  required: ['name'],
};
