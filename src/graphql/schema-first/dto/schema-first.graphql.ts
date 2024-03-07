
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateSchemaFirstInput {
    exampleField?: Nullable<string>;
}

export class SchemaFirst {
    id: number;
    exampleField?: Nullable<string>;
}

export class CreateSchemaFirstPayload {
    schemaFirst?: Nullable<SchemaFirst>;
}

export abstract class IQuery {
    abstract schemaFirst(id: number): Nullable<SchemaFirst> | Promise<Nullable<SchemaFirst>>;
}

export abstract class IMutation {
    abstract createSchemaFirst(createSchemaFirstInput: CreateSchemaFirstInput): CreateSchemaFirstPayload | Promise<CreateSchemaFirstPayload>;
}

type Nullable<T> = T | null;
