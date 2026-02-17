# Open API

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Basics](#basics)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Bootstrap](#bootstrap)
  - [Document options](#document-options)
  - [Setup options](#setup-options)
  - [Example](#example)
- [Types and Parameters](#types-and-parameters)
  - [Arrays](#arrays)
  - [Circular dependencies](#circular-dependencies)
  - [Generics and interfaces](#generics-and-interfaces)
  - [Enums](#enums)
  - [Enums schema](#enums-schema)
  - [Raw definitions](#raw-definitions)
  - [Extra models](#extra-models)
  - [oneOf, anyOf, allOf](#oneof-anyof-allof)
- [Operations](#operations)
  - [Tags](#tags)
  - [Headers](#headers)
  - [Responses](#responses)
  - [File upload](#file-upload)
  - [Extensions](#extensions)
  - [Advanced: Generic `ApiResponse`](#advanced-generic-apiresponse)
- [Security](#security)
- [Mapped Types](#mapped-types)
- [Open API Decorators](#open-api-decorators)
- [Open API CLI Plugin & Test Configuration](#open-api-cli-plugin--test-configuration)
- [Other Features](#other-features)
  - [Global Prefix](#global-prefix)
  - [Global Parameters](#global-parameters)
  - [Multiple Specifications](#multiple-specifications)
- [Migration Guide](#migration-guide)

<!-- /code_chunk_output -->

## Basics

### Introduction

The [OpenAPI](https://swagger.io/specification/) specification is a language-agnostic definition format used to describe RESTful APIs. Nest provides a dedicated [module](https://github.com/nestjs/swagger) which allows generating such a specification by leveraging decorators.

### Installation

To begin using it, we first install the required dependency.

```bash

$ npm install --save @nestjs/swagger
```

### Bootstrap

Once the installation process is complete, open the `main.ts` file and initialize Swagger using the `SwaggerModule` class:

main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

> **Hint**`document` (returned by the `SwaggerModule#createDocument()` method) is a serializable object conforming to [OpenAPI Document](https://swagger.io/specification/#openapi-document). Instead of hosting it via HTTP, you could also save it as a JSON/YAML file, and consume it in different ways.

The `DocumentBuilder` helps to structure a base document that conforms to the OpenAPI Specification. It provides several methods that allow setting such properties as title, description, version, etc. In order to create a full document (with all HTTP routes defined) we use the `createDocument()` method of the `SwaggerModule` class. This method takes two arguments, an application instance and a Swagger options object. Alternatively, we can provide a third argument, which should be of type `SwaggerDocumentOptions`. More on this in the [Document options section](https://docs.nestjs.com/openapi/introduction#document-options).

Once we create a document, we can call the `setup()` method. It accepts:

1. The path to mount the Swagger UI
2. An application instance
3. The document object instantiated above
4. Optional configuration parameter (read more [here](https://docs.nestjs.com/openapi/introduction#document-options))

Now you can run the following command to start the HTTP server:

```bash
npm run start
```

While the application is running, open your browser and navigate to `http://localhost:3000/api`. You should see the Swagger UI.

<figure><img src="https://docs.nestjs.com/assets/swagger1.png"/></figure>

As you can see, the `SwaggerModule` automatically reflects all of your endpoints.

> **Hint** To generate and download a Swagger JSON file, navigate to `http://localhost:3000/api-json` (assuming that your Swagger documentation is available under `http://localhost:3000/api`).

### Document options

The `SwaggerModule#createDocument()` method accepts an optional third argument, which should be of type `SwaggerDocumentOptions`. This object allows you to configure the Swagger document. It provides the following properties:

- `addGlobalResponseHeaders` - a boolean flag indicating whether the global response headers should be added (default: `true`)
- `additionalProperties` - a boolean flag indicating whether the additional properties should be allowed (default: `true`)
- `consumes` - an array of MIME types the API can consume (default: `[]`)
- `deepLinking` - a boolean flag indicating whether the deep linking should be enabled (default: `false`)
- `deepObjectErrors` - a boolean flag indicating whether the errors should be displayed in a deep object (default: `false`)
- `deepScanRoutes` - a boolean flag indicating whether the routes should be scanned deeply (default: `false`)
- `defaultModelExpandDepth` - a number indicating the default model expand depth (default: `0`)
- `defaultModelRendering` - a string indicating the default model rendering (default: `ModelRendering.EXAMPLE`)
- `defaultModelsExpandDepth` - a number indicating the default model expand depth (default: `0`)
- `defaultSchemaExpandDepth` - a number indicating the default schema expand depth (default: `0`)
- `displayOperationId` - a boolean flag indicating whether the operationId should be displayed (default: `false`)
- `displayRequestDuration` - a boolean flag indicating whether the request duration should be displayed (default: `false`)
- `docExpansion` - a string indicating the doc expansion (default: `DocExpansion.LIST`)
- `extraModels` - an array of additional models to include (default: `[]`)
- `filter` - a boolean flag indicating whether the filter should be enabled (default: `false`)
- `ignoreGlobalPrefix` - a boolean flag indicating whether the global prefix should be ignored (default: `false`)
- `include` - an array of modules to include (default: `[]`)
- `maxDisplayedTags` - a number indicating the maximum number of tags to be displayed (default: `null`)
- `operationIdFactory` - a function that allows you to customize the operationId generation process (default: `null`)
- `operationsSorter` - a function that allows you to customize the operations sorting process (default: `null`)
- `produces` - an array of MIME types the API can produce (default: `[]`)
- `securitySchemes` - an object describing the security schemes used in the document (default: `null`)
- `servers` - an array of servers used in the document (default: `null`)
- `showCommonExtensions` - a boolean flag indicating whether the common extensions should be displayed (default: `false`)
- `showExtensions` - a boolean flag indicating whether the extensions should be displayed (default: `false`)
- `showMutatedRequest` - a boolean flag indicating whether the mutated request should be displayed (default: `true`)
- `showMutatedResponse` - a boolean flag indicating whether the mutated response should be displayed (default: `true`)
- `sortTagsByName` - a boolean flag indicating whether the tags should be sorted by name (default: `false`)
- `tags` - an array of tags used by the document (default: `[]`)
- `validatorUrl` - a string containing the URL for the online validator (default: `null`)

For example, if you want to make sure that the library generates operation names like `createUser` instead of `UserController_createUser`, you can set the following:

```typescript
const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) =>
    methodKey,
};
const document = SwaggerModule.createDocument(app, config, options);
```

### Setup options

The `SwaggerModule#setup()` method accepts an optional fourth argument, which should be of type `SwaggerCustomOptions`. This object allows you to configure the Swagger UI. It provides the following properties:

```typescript
export interface ExpressSwaggerCustomOptions {
  explorer?: boolean;
  swaggerOptions?: Record<string, any>;
  customCss?: string;
  customCssUrl?: string;
  customJs?: string;
  customfavIcon?: string;
  swaggerUrl?: string;
  customSiteTitle?: string;
  validatorUrl?: string;
  url?: string;
  urls?: Record<'url' | 'name', string>[];
  patchDocumentOnRequest?: <TRequest = any, TResponse = any>(
    req: TRequest,
    res: TResponse,
    document: OpenAPIObject,
  ) => OpenAPIObject;
}
```

### Example

Source: <https://docs.nestjs.com/openapi/introduction#example>

A working example is available [here](https://github.com/nestjs/nest/tree/master/sample/11-swagger).

## Types and Parameters

The `SwaggerModule` searches for all `@Body()`, `@Query()`, and `@Param()` decorators in route handlers to generate the API document. It also creates corresponding model definitions by taking advantage of reflection. Consider the following code:

```typescript

@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

> **Hint** To explicitly set the body definition use the `@ApiBody()` decorator (imported from the `@nestjs/swagger` package).

Based on the `CreateCatDto`, the following model definition Swagger UI will be created:

<figure><img src="https://docs.nestjs.com/assets/swagger-dto.png"/></figure>

As you can see, the definition is empty although the class has a few declared properties. In order to make the class properties visible to the `SwaggerModule`, we have to either annotate them with the `@ApiProperty()` decorator or use the CLI plugin (read more in the **Plugin** section) which will do it automatically:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
```

> **Hint** Instead of manually annotating each property, consider using the Swagger plugin (see [Plugin](https://docs.nestjs.com/openapi/cli-plugin) section) which will automatically provide this for you.

Let's open the browser and verify the generated `CreateCatDto` model:

  <figure><img src="https://docs.nestjs.com/assets/swagger-dto2.png"/></figure>

In addition, the `@ApiProperty()` decorator allows setting various [Schema Object](https://swagger.io/specification/#schemaObject) properties:

```typescript

@ApiProperty({
  description: 'The age of a cat',
  minimum: 1,
  default: 1,
})
age: number;
```

> **Hint** Instead of explicitly typing the `@ApiProperty({ required: false })` you can use the `@ApiPropertyOptional()` short-hand decorator.

In order to explicitly set the type of the property, use the `type` key:

```typescript

@ApiProperty({
  type: Number,
})
age: number;
```

### Arrays

Source: <https://docs.nestjs.com/openapi/types-and-parameters#arrays>

When the property is an array, we must manually indicate the array type as shown below:

```typescript

@ApiProperty({ type: [String] })
names: string[];
```

> **Hint** Consider using the Swagger plugin (see [Plugin](https://docs.nestjs.com/openapi/cli-plugin) section) which will automatically detect arrays.

Either include the type as the first element of an array (as shown above) or set the `isArray` property to `true`.

### Circular dependencies

Source: <https://docs.nestjs.com/openapi/types-and-parameters#circular-dependencies>

When you have circular dependencies between classes, use a lazy function to provide the `SwaggerModule` with type information:

```typescript

@ApiProperty({ type: () => Node })
node: Node;
```

> **Hint** Consider using the Swagger plugin (see [Plugin](https://docs.nestjs.com/openapi/cli-plugin) section) which will automatically detect circular dependencies.

### Generics and interfaces

Source: <https://docs.nestjs.com/openapi/types-and-parameters#generics-and-interfaces>

Since TypeScript does not store metadata about generics or interfaces, when you use them in your DTOs, `SwaggerModule` may not be able to properly generate model definitions at runtime. For instance, the following code won't be correctly inspected by the Swagger module:

```typescript

createBulk(@Body() usersDto: CreateUserDto[])
```

In order to overcome this limitation, you can set the type explicitly:

```typescript

@ApiBody({ type: [CreateUserDto] })
createBulk(@Body() usersDto: CreateUserDto[])
```

### Enums

Source: <https://docs.nestjs.com/openapi/types-and-parameters#enums>

To identify an `enum`, we must manually set the `enum` property on the `@ApiProperty` with an array of values.

```typescript

@ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
role: UserRole;
```

Alternatively, define an actual TypeScript enum as follows:

```typescript
export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}
```

You can then use the enum directly with the `@Query()` parameter decorator in combination with the `@ApiQuery()` decorator.

```typescript

@ApiQuery({ name: 'role', enum: UserRole })
async filterByRole(@Query('role') role: UserRole = UserRole.User) {}
```

![](https://docs.nestjs.com/assets/enum_query.gif)

With `isArray` set to **true**, the `enum` can be selected as a **multi-select**:

![](https://docs.nestjs.com/assets/enum_query_array.gif)

### Enums schema

Source: <https://docs.nestjs.com/openapi/types-and-parameters#enums-schema>

By default, the `enum` property will add a raw definition of [Enum](https://swagger.io/docs/specification/data-models/enums/) on the `parameter`.

```yaml
- breed:
    type: 'string'
    enum:
      - Persian
      - Tabby
      - Siamese
```

The above specification works fine for most cases. However, if you are utilizing a tool that takes the specification as **input** and generates **client-side** code, you might run into a problem with the generated code containing duplicated `enums`. Consider the following code snippet:

```typescript
// generated client-side code
export class CatDetail {
  breed: CatDetailEnum;
}

export class CatInformation {
  breed: CatInformationEnum;
}

export enum CatDetailEnum {
  Persian = 'Persian',
  Tabby = 'Tabby',
  Siamese = 'Siamese',
}

export enum CatInformationEnum {
  Persian = 'Persian',
  Tabby = 'Tabby',
  Siamese = 'Siamese',
}
```

> **Hint** The above snippet is generated using a tool called [NSwag](https://github.com/RicoSuter/NSwag).

You can see that now you have two `enums` that are exactly the same. To address this issue, you can pass an `enumName` along with the `enum` property in your decorator.

```typescript
export class CatDetail {
  @ApiProperty({ enum: CatBreed, enumName: 'CatBreed' })
  breed: CatBreed;
}
```

The `enumName` property enables `@nestjs/swagger` to turn `CatBreed` into its own `schema` which in turns makes `CatBreed` enum reusable. The specification will look like the following:

```yaml

CatDetail:
  type: 'object'
  properties:
    ...
    - breed:
        schema:
          $ref: '#/components/schemas/CatBreed'
CatBreed:
  type: string
  enum:
    - Persian
    - Tabby
    - Siamese
```

> **Hint** Any **decorator** that takes `enum` as a property will also take `enumName`.

### Raw definitions

Source: <https://docs.nestjs.com/openapi/types-and-parameters#raw-definitions>

In some specific scenarios (e.g., deeply nested arrays, matrices), you may want to describe your type by hand.

```typescript

@ApiProperty({
  type: 'array',
  items: {
    type: 'array',
    items: {
      type: 'number',
    },
  },
})
coords: number[][];
```

Likewise, in order to define your input/output content manually in controller classes, use the `schema` property:

```typescript

@ApiBody({
  schema: {
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
})
async create(@Body() coords: number[][]) {}
```

### Extra models

Source: <https://docs.nestjs.com/openapi/types-and-parameters#extra-models>

To define additional models that are not directly referenced in your controllers but should be inspected by the Swagger module, use the `@ApiExtraModels()` decorator:

```typescript
@ApiExtraModels(ExtraModel)
export class CreateCatDto {}
```

> **Hint** You only need to use `@ApiExtraModels()` once for a specific model class.

Alternatively, you can pass an options object with the `extraModels` property specified to the `SwaggerModule#createDocument()` method, as follows:

```typescript
const document = SwaggerModule.createDocument(app, options, {
  extraModels: [ExtraModel],
});
```

To get a reference (`$ref`) to your model, use the `getSchemaPath(ExtraModel)` function:

```typescript

'application/vnd.api+json': {
   schema: { $ref: getSchemaPath(ExtraModel) },
},
```

### oneOf, anyOf, allOf

Source: <https://docs.nestjs.com/openapi/types-and-parameters#oneof-anyof-allof>

To combine schemas, you can use the `oneOf`, `anyOf` or `allOf` keywords ([read more](https://swagger.io/docs/specification/data-models/oneof-anyof-allof-not/)).

```typescript

@ApiProperty({
  oneOf: [
    { $ref: getSchemaPath(Cat) },
    { $ref: getSchemaPath(Dog) },
  ],
})
pet: Cat | Dog;
```

If you want to define a polymorphic array (i.e., an array whose members span multiple schemas), you should use a raw definition (see above) to define your type by hand.

```typescript

type Pet = Cat | Dog;

@ApiProperty({
  type: 'array',
  items: {
    oneOf: [
      { $ref: getSchemaPath(Cat) },
      { $ref: getSchemaPath(Dog) },
    ],
  },
})
pets: Pet[];
```

> **Hint** The `getSchemaPath()` function is imported from `@nestjs/swagger`.

Both `Cat` and `Dog` must be defined as extra models using the `@ApiExtraModels()` decorator (at the class-level).

## Operations

In OpenAPI terms, paths are endpoints (resources), such as `/users` or `/reports/summary`, that your API exposes, and operations are the HTTP methods used to manipulate these paths, such as `GET`, `POST` or `DELETE`.

### Tags

Source: <https://docs.nestjs.com/openapi/operations#tags>

To attach a controller to a specific tag, use the `@ApiTags(...tags)` decorator.

```typescript
@ApiTags('cats')
@Controller('cats')
export class CatsController {}
```

### Headers

Source: <https://docs.nestjs.com/openapi/operations#headers>

To define custom headers that are expected as part of the request, use `@ApiHeader()`.

```typescript
@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})
@Controller('cats')
export class CatsController {}
```

### Responses

Source: <https://docs.nestjs.com/openapi/operations#responses>

To define a custom HTTP response, use the `@ApiResponse()` decorator.

```typescript

@Post()
@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

Nest provides a set of short-hand **API response** decorators that inherit from the `@ApiResponse` decorator:

- `@ApiOkResponse()`
- `@ApiCreatedResponse()`
- `@ApiAcceptedResponse()`
- `@ApiNoContentResponse()`
- `@ApiMovedPermanentlyResponse()`
- `@ApiFoundResponse()`
- `@ApiBadRequestResponse()`
- `@ApiUnauthorizedResponse()`
- `@ApiNotFoundResponse()`
- `@ApiForbiddenResponse()`
- `@ApiMethodNotAllowedResponse()`
- `@ApiNotAcceptableResponse()`
- `@ApiRequestTimeoutResponse()`
- `@ApiConflictResponse()`
- `@ApiPreconditionFailedResponse()`
- `@ApiTooManyRequestsResponse()`
- `@ApiGoneResponse()`
- `@ApiPayloadTooLargeResponse()`
- `@ApiUnsupportedMediaTypeResponse()`
- `@ApiUnprocessableEntityResponse()`
- `@ApiInternalServerErrorResponse()`
- `@ApiNotImplementedResponse()`
- `@ApiBadGatewayResponse()`
- `@ApiServiceUnavailableResponse()`
- `@ApiGatewayTimeoutResponse()`
- `@ApiDefaultResponse()`

```typescript

@Post()
@ApiCreatedResponse({ description: 'The record has been successfully created.'})
@ApiForbiddenResponse({ description: 'Forbidden.'})
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

To specify a return model for a request, we must create a class and annotate all properties with the `@ApiProperty()` decorator.

```typescript
export class Cat {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
```

Then the `Cat` model can be used in combination with the `type` property of the response decorator.

```typescript
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Cat,
  })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }
}
```

Let's open the browser and verify the generated `Cat` model:

![](/assets/swagger-response-type.png)

### File upload

Source: <https://docs.nestjs.com/openapi/operations#file-upload>

You can enable file upload for a specific method with the `@ApiBody` decorator together with `@ApiConsumes()`. Here's a full example using the [File Upload](https://docs.nestjs.com/techniques/file-upload) technique:

```typescript

@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'List of cats',
  type: FileUploadDto,
})
uploadFile(@UploadedFile() file) {}
```

Where `FileUploadDto` is defined as follows:

```typescript
class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
```

To handle multiple files uploading, you can define `FilesUploadDto` as follows:

```typescript
class FilesUploadDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  files: any[];
}
```

### Extensions

Source: <https://docs.nestjs.com/openapi/operations#extensions>

To add an Extension to a request use the `@ApiExtension()` decorator. The extension name must be prefixed with `x-`.

```typescript

@ApiExtension('x-foo', { hello: 'world' })
```

### Advanced: Generic `ApiResponse`

Source: <https://docs.nestjs.com/openapi/operations#advanced-generic-apiresponse>

With the ability to provide [Raw Definitions](https://docs.nestjs.com/openapi/types-and-parameters#raw-definitions), we can define Generic schema for Swagger UI. Assume we have the following DTO:

```ts
export class PaginatedDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  results: TData[];
}
```

We skip decorating `results` as we will be providing a raw definition for it later. Now, let's define another DTO and name it, for example, `CatDto`, as follows:

```ts
export class CatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
```

With this in place, we can define a `PaginatedDto<CatDto>` response, as follows:

```ts

@ApiOkResponse({
  schema: {
    allOf: [
      { $ref: getSchemaPath(PaginatedDto) },
      {
        properties: {
          results: {
            type: 'array',
            items: { $ref: getSchemaPath(CatDto) },
          },
        },
      },
    ],
  },
})
async findAll(): Promise<PaginatedDto<CatDto>> {}
```

In this example, we specify that the response will have allOf `PaginatedDto` and the `results` property will be of type `Array<CatDto>`.

- `getSchemaPath()` function that returns the OpenAPI Schema path from within the OpenAPI Spec File for a given model.
- `allOf` is a concept that OAS 3 provides to cover various Inheritance related use-cases.

Lastly, since `PaginatedDto` is not directly referenced by any controller, the `SwaggerModule` will not be able to generate a corresponding model definition just yet. In this case, we must add it as an [Extra Model](https://docs.nestjs.com/openapi/types-and-parameters#extra-models). For example, we can use the `@ApiExtraModels()` decorator on the controller level, as follows:

```ts
@Controller('cats')
@ApiExtraModels(PaginatedDto)
export class CatsController {}
```

If you run Swagger now, the generated `swagger.json` for this specific endpoint should have the following response defined:

```json

"responses": {
  "200": {
    "description": "",
    "content": {
      "application/json": {
        "schema": {
          "allOf": [
            {
              "$ref": "#/components/schemas/PaginatedDto"
            },
            {
              "properties": {
                "results": {
                  "$ref": "#/components/schemas/CatDto"
                }
              }
            }
          ]
        }
      }
    }
  }
}
```

To make it reusable, we can create a custom decorator for `PaginatedDto`, as follows:

```ts
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
```

> **Hint**`Type<any>` interface and `applyDecorators` function are imported from the `@nestjs/common` package.

To ensure that `SwaggerModule` will generate a definition for our model, we must add it as an extra model, like we did earlier with the `PaginatedDto` in the controller.

With this in place, we can use the custom `@ApiPaginatedResponse()` decorator on our endpoint:

```ts

@ApiPaginatedResponse(CatDto)
async findAll(): Promise<PaginatedDto<CatDto>> {}
```

For client generation tools, this approach poses an ambiguity in how the `PaginatedResponse<TModel>` is being generated for the client. The following snippet is an example of a client generator result for the above `GET /` endpoint.

```typescript

// Angular
findAll(): Observable<{ total: number, limit: number, offset: number, results: CatDto[] }>
```

As you can see, the **Return Type** here is ambiguous. To workaround this issue, you can add a `title` property to the `schema` for `ApiPaginatedResponse`:

```typescript
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          // ...
        ],
      },
    }),
  );
};
```

Now the result of the client generator tool will become:

```ts

// Angular
findAll(): Observable<PaginatedResponseOfCatDto>
```

## Security

See online <https://docs.nestjs.com/openapi/security>

## Mapped Types

See online <https://docs.nestjs.com/openapi/mapped-types>

## Open API Decorators

See online <https://docs.nestjs.com/openapi/decorators>

## Open API CLI Plugin & Test Configuration

See online <https://docs.nestjs.com/openapi/cli-plugin>

## Other Features

See online <https://docs.nestjs.com/openapi/other-features>

### Global Prefix

See online <https://docs.nestjs.com/openapi/other-features#global-prefix>

### Global Parameters

See online <https://docs.nestjs.com/openapi/other-features#global-parameters>

### Multiple Specifications

See online <https://docs.nestjs.com/openapi/other-features#multiple-specifications>

## Migration Guide

If you're currently using `@nestjs/swagger@3.*`, note the following breaking/API changes in version 4.0.

See online: https://docs.nestjs.com/openapi/migration-guide
