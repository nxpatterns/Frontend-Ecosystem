# TS Cookbook

## JSON to SQL Schema

```typescript
import * as fs from 'fs';
import { JSONSchema4 } from 'json-schema';
import { compile } from 'json-schema-to-typescript';

const jsonToSqlSchema = async (json: any, tableName: string = 'dobj') => {
  const schema: JSONSchema4 = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties: json,
  };

  const tsInterface = await compile(schema, tableName);

  return tsInterface;
};

export default jsonToSqlSchema;
```
