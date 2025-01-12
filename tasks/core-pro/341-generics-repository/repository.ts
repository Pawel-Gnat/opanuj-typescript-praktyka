import { DataAccess } from './DataAccess.ts';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export class Repository<T extends { id?: number }> {
  private dataAccess: DataAccess;
  private tableName: string;

  constructor(dataAccess: DataAccess, tableName: string) {
    this.dataAccess = dataAccess;
    this.tableName = tableName;
  }

  async getById(id: number): Promise<T> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const values = [id];
    const res = await this.dataAccess.query<T>(query, values);
    return res.rows[0];
  }

  async getAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    const res = await this.dataAccess.query<T>(query);
    return res.rows;
  }

  async insert(item: Omit<T, 'id'>): Promise<T> {
    const columns = Object.keys(item).filter((key) => key !== 'id');
    const values = columns.map((_, i) => `$${i + 1}`);
    const placeholders = columns.map((col) => (item as any)[col]);

    const query = `
    INSERT INTO ${this.tableName} (${columns.join(', ')})
    VALUES (${values.join(', ')})
    RETURNING *
  `;

    const res = await this.dataAccess.query<T>(query, placeholders);
    return res.rows[0];
  }
}
