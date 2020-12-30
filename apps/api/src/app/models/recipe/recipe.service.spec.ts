import { RecipeService } from './recipe.service';
import { PrismaService } from '../prisma.service';

describe('RecipeService', () => {
  const prisma = new PrismaService();

  const service: RecipeService = new RecipeService(prisma);

  describe('creation', () => {
    it('should create rows also in other tables when creating a new recipe', () => {
      const spy = spyOn(service['prisma'].recipe, 'create').and.stub();
      const expected = {
        data: {
          IngredientAmount: { create: [{ Ingredient: { connect: { id: '111' } }, amount: 2, id: '213' }] },
          SupplyAmount: { create: [{ Supply: { connect: { id: '111' } }, amount: 2, id: '213' }] },
          id: 'sda',
          name: 'test',
        },
      };
      service.create(
        { id: 'sda', name: 'test' },
        [{ id: '213', amount: 2, ingredientId: '111', recipeId: 'sda' }],
        [{ id: '213', amount: 2, supplyId: '111', recipeId: 'sda' }]
      );

      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe('reading', () => {
    it('should get from other tables also when calling getMany', () => {
      const spy = spyOn(service['prisma'].recipe, 'findMany').and.stub();
      const expected = {
        include: { IngredientAmount: { include: { Ingredient: true } }, SupplyAmount: { include: { Supply: true } } },
      };
      service.getMany({});
      expect(spy).toBeCalledWith(expected);
    });
    it('should get from other tables also when calling get', () => {
      const spy = spyOn(service['prisma'].recipe, 'findOne').and.stub();
      const expected = {
        include: { IngredientAmount: { include: { Ingredient: true } }, SupplyAmount: { include: { Supply: true } } },
        where: { id: '1' },
      };
      service.get({ id: '1' });
      expect(spy).toBeCalledWith(expected);
    });
  });

  describe('updating', () => {
    it('should not change any parameter when calling updateMany', () => {
      const spy = spyOn(service['prisma'].recipe, 'updateMany').and.stub();
      const expected = { where: { id: '1' }, data: { name: 'bla' } };
      service.updateMany(expected.where, expected.data);
      expect(spy).toBeCalledWith(expected);
    });
    it('should not change any parameter when calling update', () => {
      const spy = spyOn(service['prisma'].recipe, 'update').and.stub();
      const expected = { where: { id: '1' }, data: { name: 'bla' } };
      service.update(expected.where, expected.data);
      expect(spy).toBeCalledWith(expected);
    });
  });

  describe('deletion', () => {
    it('should call deletion from other tables and recipe table when calling deleteMany', async () => {
      const expected = { where: { recipeId: { in: ['1'] } } };

      const calls = [
        { spy: spyOn(service['prisma'].ingredientAmount, 'deleteMany').and.stub(), expected },
        { spy: spyOn(service['prisma'].supplyAmount, 'deleteMany').and.stub(), expected },
      ];
      const spy = spyOn(service['prisma'].recipe, 'deleteMany').and.stub();
      const recipeDeleteManyExpected = { where: { id: { in: ['1'] } } };
      await service.deleteMany(['1']);
      expect(spy).toBeCalledWith(recipeDeleteManyExpected);
      calls.every(call => expect(call.spy).toBeCalledWith(call.expected));
    });

    it('should call deletion from other tables and recipe table when calling delete', async () => {
      const expected = { where: { recipeId: { equals: '1' } } };

      const calls = [
        { spy: spyOn(service['prisma'].ingredientAmount, 'deleteMany').and.stub(), expected },
        { spy: spyOn(service['prisma'].supplyAmount, 'deleteMany').and.stub(), expected },
      ];
      const spy = spyOn(service['prisma'].recipe, 'delete').and.stub();
      const recipeDeleteExpected = { where: { id: '1' } };
      await service.delete('1');
      expect(spy).toBeCalledWith(recipeDeleteExpected);
      calls.every(call => expect(call.spy).toBeCalledWith(call.expected));
    });
  });
});
