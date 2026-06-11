import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductsRepository } from './productsRepo';

vi.mock('../db/sqlite', () => ({
  getDatabase: vi.fn(),
}));

describe('ProductsRepository', () => {
  let repository: ProductsRepository;
  let mockDb: {
    db: object;
    run: ReturnType<typeof vi.fn>;
    get: ReturnType<typeof vi.fn>;
    all: ReturnType<typeof vi.fn>;
    close: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockDb = {
      db: {},
      run: vi.fn(),
      get: vi.fn(),
      all: vi.fn(),
      close: vi.fn(),
    };

    repository = new ProductsRepository(mockDb as never);
    vi.clearAllMocks();
  });

  describe('findByName', () => {
    it('should return products matching name pattern using a bound parameter', async () => {
      const mockResults = [
        {
          product_id: 1,
          supplier_id: 2,
          name: 'Test Product',
          sku: 'SKU-001',
          description: 'Test description',
          price: 9.99,
          quantity: 12,
        },
      ];
      mockDb.all.mockResolvedValue(mockResults);

      const result = await repository.findByName('Test');

      expect(mockDb.all).toHaveBeenCalledWith(
        'SELECT * FROM products WHERE name LIKE ? ORDER BY name',
        ['%Test%'],
      );
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        productId: 1,
        supplierId: 2,
        name: 'Test Product',
      });
    });
  });
});
