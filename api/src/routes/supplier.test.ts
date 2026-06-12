import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import express from 'express';
import request from 'supertest';
import supplierRouter from './supplier';
import { runMigrations } from '../db/migrate';
import { closeDatabase, getDatabase } from '../db/sqlite';
import { errorHandler } from '../utils/errors';

let app: express.Express;

describe('Supplier API', () => {
  beforeEach(async () => {
    await closeDatabase();
    await getDatabase(true);
    await runMigrations(true);

    app = express();
    app.use(express.json());
    app.use('/suppliers', supplierRouter);
    app.use(errorHandler);
  });

  afterEach(async () => {
    await closeDatabase();
  });

  async function createSupplier(overrides: {
    name?: string;
    active?: boolean;
    verified?: boolean;
  } = {}): Promise<number> {
    const db = await getDatabase();
    const result = await db.run(
      'INSERT INTO suppliers (name, description, contact_person, email, phone, active, verified) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        overrides.name ?? 'Test Supplier',
        'Supplier description',
        'Test Contact',
        `${(overrides.name ?? 'test').toLowerCase().replace(/\s+/g, '.')}@example.com`,
        '555-0100',
        (overrides.active ?? true) ? 1 : 0,
        (overrides.verified ?? false) ? 1 : 0,
      ],
    );

    return result.lastID as number;
  }

  it('returns INACTIVE for inactive suppliers', async () => {
    const supplierId = await createSupplier({
      name: 'Inactive Supplier',
      active: false,
      verified: true,
    });

    const response = await request(app).get(`/suppliers/${supplierId}/status`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'INACTIVE' });
  });

  it('returns PENDING for active unverified suppliers', async () => {
    const supplierId = await createSupplier({
      name: 'Pending Supplier',
      active: true,
      verified: false,
    });

    const response = await request(app).get(`/suppliers/${supplierId}/status`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'PENDING' });
  });

  it('returns APPROVED for active verified suppliers', async () => {
    const supplierId = await createSupplier({
      name: 'Approved Supplier',
      active: true,
      verified: true,
    });

    const response = await request(app).get(`/suppliers/${supplierId}/status`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'APPROVED' });
  });
});
