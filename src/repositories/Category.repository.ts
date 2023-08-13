import { db, defaultOptions } from '@/database/index';
import { dbException, NotFoundException } from '@/exceptions/index';

export const categoryRepository = {
    async create(categoryData: CategoryCreateInterface) {
        try {
            const category = await db.Category.create(categoryData);
            return category;
        } catch (err) {
            return dbException(err);
        }
    },

    async getCategory(categoryId: CategoryGetInterface) {
        try {
            const category = await db.Category.findOne({
                ...defaultOptions,
                where: {
                    categoryId: categoryId.categoryId, // 이 부분이 수정됐습니다.
                },
            });
            if (!category) {
                return NotFoundException('category');
            }
            return category;
        } catch (err) {
            return dbException(err);
        }
    },

    async deleteCategory(categoryId: CategoryDeleteInterface, userId: string) {
        try {
            const category = await db.Category.findOne({
                where: { categoryId: categoryId.categoryId, userId: userId }, // 이 부분이 수정됐습니다.
            });
            if (!category) {
                return NotFoundException('category');
            }
            await category.destroy();
            return true;
        } catch (err) {
            return dbException(err);
        }
    },
};
