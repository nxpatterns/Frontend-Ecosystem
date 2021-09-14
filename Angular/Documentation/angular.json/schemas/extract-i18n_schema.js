export const i18Schema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'Extract i18n Target',
  description: 'Extract i18n target options for Build Facade.',
  type: 'object',
  properties: {
    browserTarget: {
      type: 'string',
      description:
        'A browser builder target to extract i18n messages in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.',
      pattern: '^[^:\\s]+:[^:\\s]+(:[^\\s]+)?$',
    },
    format: {
      type: 'string',
      description: 'Output format for the generated file.',
      default: 'xlf',
      enum: [
        'xmb',
        'xlf',
        'xlif',
        'xliff',
        'xlf2',
        'xliff2',
        'json',
        'arb',
        'legacy-migrate',
      ],
    },
    progress: {
      type: 'boolean',
      description: 'Log progress to the console.',
      default: true,
    },
    outputPath: {
      type: 'string',
      description: 'Path where output will be placed.',
    },
    outFile: {
      type: 'string',
      description: 'Name of the file to output.',
    },
  },
  additionalProperties: false,
  required: ['browserTarget'],
};
