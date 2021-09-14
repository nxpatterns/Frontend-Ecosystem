export const directiveSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'SchematicsAngularE2eApp',
  title: 'Angular e2e Application Options Schema',
  type: 'object',
  additionalProperties: false,
  description:
    'Generates a new, generic end-to-end test definition for the given or default project.',
  'long-description': 'e2e-long.md',
  properties: {
    rootSelector: {
      description:
        'The HTML selector for the root component of the test app.',
      type: 'string',
      default: 'app-root',
    },
    relatedAppName: {
      description: 'The name of the app being tested.',
      type: 'string',
    },
  },
  required: ['relatedAppName'],
};
