import { PrismaService } from '../prisma.service';
import { SupplyService } from './supply.service';

describe('RecipeService', () => {
  const prisma = new PrismaService();

  const service: SupplyService = new SupplyService(prisma);

  describe('creation', () => {
    it('should create rows also in other tables when creating a new recipe', () => {
      const spy = spyOn(service['prisma'].supply, 'create').and.stub();
      const expected = { data: { id: 'sda', name: 'test', price: 1 } };
      service.create({ id: 'sda', name: 'test', price: 1 });

      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe('reading', () => {
    it('should get from other tables also when calling getMany', () => {
      const spy = spyOn(service['prisma'].supply, 'findMany').and.stub();
      const expected = {};
      service.getMany({});
      expect(spy).toBeCalledWith(expected);
    });
    it('should get from other tables also when calling get', () => {
      const spy = spyOn(service['prisma'].supply, 'findOne').and.stub();
      const expected = { where: { id: '1' } };
      service.get('1');
      expect(spy).toBeCalledWith(expected);
    });
  });

  describe('updating', () => {
    it('should not change any parameter when calling updateMany', () => {
      const spy = spyOn(service['prisma'].supply, 'updateMany').and.stub();
      const expected = { where: { id: '1' }, data: { name: 'bla' } };
      service.updateMany(expected.where, expected.data);
      expect(spy).toBeCalledWith(expected);
    });
    it('should not change any parameter when calling update', () => {
      const spy = spyOn(service['prisma'].supply, 'update').and.stub();
      const expected = { where: { id: '1' }, data: { name: 'bla' } };
      service.update(expected.where, expected.data);
      expect(spy).toBeCalledWith(expected);
    });
  });

  describe('deletion', () => {
    it('should call deletion from other tables and recipe table when calling deleteMany', async () => {
      const expected = { where: { supplyId: { in: ['1'] } } };

      const calls = [{ spy: spyOn(service['prisma'].supplyAmount, 'deleteMany').and.stub(), expected }];
      const spy = spyOn(service['prisma'].supply, 'deleteMany').and.stub();
      const supplyDeleteExpected = { where: { id: { in: ['1'] } } };
      await service.deleteMany(['1']);
      expect(spy).toBeCalledWith(supplyDeleteExpected);
      calls.every(call => expect(call.spy).toBeCalledWith(call.expected));
    });

    it('should call deletion from other tables and recipe table when calling delete', async () => {
      const expected = { where: { supplyId: { equals: '1' } } };

      const calls = [{ spy: spyOn(service['prisma'].supplyAmount, 'deleteMany').and.stub(), expected }];
      const spy = spyOn(service['prisma'].supply, 'delete').and.stub();
      const supplyDeleteExpected = { where: { id: '1' } };
      await service.delete('1');
      expect(spy).toBeCalledWith(supplyDeleteExpected);
      calls.every(call => expect(call.spy).toBeCalledWith(call.expected));
    });
  });
});
