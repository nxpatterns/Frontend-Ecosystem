export const appShellSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'App Shell Target',
  description: 'App Shell target options for Build Facade.',
  type: 'object',
  properties: {
    browserTarget: {
      type: 'string',
      description:
        'A browser builder target use for rendering the app shell in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.',
      pattern: '^[^:\\s]+:[^:\\s]+(:[^\\s]+)?$',
    },
    serverTarget: {
      type: 'string',
      description:
        'A server builder target use for rendering the app shell in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.',
      pattern: '^[^:\\s]+:[^:\\s]+(:[^\\s]+)?$',
    },
    appModuleBundle: {
      type: 'string',
      description:
        "Script that exports the Server AppModule to render. This should be the main JavaScript outputted by the server target. By default we will resolve the outputPath of the serverTarget and find a bundle named 'main' in it (whether or not there's a hash tag).",
    },
    route: {
      type: 'string',
      description: 'The route to render.',
      default: '/',
    },
    inputIndexPath: {
      type: 'string',
      description:
        'The input path for the index.html file. By default uses the output index.html of the browser target.',
    },
    outputIndexPath: {
      type: 'string',
      description:
        'The output path of the index.html file. By default will overwrite the input file.',
    },
  },
  additionalProperties: false,
  required: ['browserTarget', 'serverTarget'],
};
