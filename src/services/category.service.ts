import { db } from '@/database/index';
import { categoryRepository } from '@/repositories/index';
import { NotFoundException } from '../exceptions';

export const categoryService = {
    async create(categoryData: CategoryCreateInterface) {
        // 카테고리 생성 로직
        const category = await categoryRepository.create(categoryData);
        return category;
    },

    async getCategory(categoryId: CategoryGetInterface) {
        // 카테고리 조회 로직
        const category = await categoryRepository.getCategory(categoryId);
        return category;
    },

    async deleteCategory(categoryData: CategoryDeleteInterface) {
        const category = await categoryRepository.getCategory({
            // categoryRepository를 사용
            categoryId: categoryData.categoryId,
        });

        if (!category) {
            throw NotFoundException('Category not found');
        }

        await category.destroy(); // 오타도 수정했습니다. destory -> destroy
    },
};
