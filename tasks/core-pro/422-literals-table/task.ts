import type { Entities } from './table-models.ts';

type TableName<TModel> = {
  [K in keyof Entities]: Entities[K] extends TModel ? K : never;
}[keyof Entities];

type Get<TModel> = {
  [Prop in `get${Capitalize<TableName<TModel>>}`]: (id: number) => TModel;
};

type Update<TModel> = {
  [Prop in `update${Capitalize<TableName<TModel>>}`]: (
    id: number,
    update: Partial<TModel>,
  ) => TModel;
};

type Delete<TModel> = {
  [Prop in `delete${Capitalize<TableName<TModel>>}`]: (id: number) => TModel;
};

export type Table<TModel> = Get<TModel> & Update<TModel> & Delete<TModel>;
