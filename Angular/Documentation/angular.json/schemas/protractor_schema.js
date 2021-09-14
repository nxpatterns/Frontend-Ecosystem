export const protractorSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'Protractor Target',
  description: 'Protractor target options for Build Facade.',
  type: 'object',
  properties: {
    protractorConfig: {
      type: 'string',
      description: 'The name of the Protractor configuration file.',
    },
    devServerTarget: {
      type: 'string',
      description:
        'A dev-server builder target to run tests against in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.',
      pattern: '^([^:\\s]+:[^:\\s]+(:[^\\s]+)?)?$',
    },
    grep: {
      type: 'string',
      description:
        'Execute specs whose names match the pattern, which is internally compiled to a RegExp.',
    },
    invertGrep: {
      type: 'boolean',
      description:
        "Invert the selection specified by the 'grep' option.",
      default: false,
    },
    specs: {
      type: 'array',
      description: 'Override specs in the protractor config.',
      default: [],
      items: {
        type: 'string',
        description: 'Spec name.',
      },
    },
    suite: {
      type: 'string',
      description: 'Override suite in the protractor config.',
    },
    webdriverUpdate: {
      type: 'boolean',
      description: 'Try to update webdriver.',
      default: true,
    },
    port: {
      type: 'number',
      description: 'The port to use to serve the application.',
    },
    host: {
      type: 'string',
      description: 'Host to listen on.',
    },
    baseUrl: {
      type: 'string',
      description: 'Base URL for protractor to connect to.',
    },
  },
  additionalProperties: false,
  required: ['protractorConfig'],
};
