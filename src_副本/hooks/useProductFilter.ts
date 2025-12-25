import { useState, useMemo } from 'react';
import type { BabyAgeRange, ProductListItem } from '@/types/product';
import { getProductListItems, getProductsByCategory } from '@/mocks/products';

export const useProductFilter = (category: 'bottle' | 'nipple' | 'accessory') => {
    const [selectedAge, setSelectedAge] = useState<BabyAgeRange>('0-3');

    // 获取原始数据（实际项目中替换为 API 请求）
    const allProducts = useMemo(() => {
        return getProductListItems(getProductsByCategory(category));
    }, [category]);

    // 筛选逻辑（当前 Mock 数据暂无月龄字段，后续可扩展）
    // 实际逻辑：前端过滤或后端 Search API
    const filteredProducts = useMemo(() => {
        // 模拟不同月龄下的排序权重变化
        // 这里简单返回所有，实际可根据 selectedAge 过滤
        if (category === 'bottle') {
            // 模拟 shuffle 或 排序变化
            return [...allProducts].sort((a, b) => {
                // 简单的伪随机让列表看起来不一样
                if (selectedAge === '0-3') return b.recommendRate - a.recommendRate;
                if (selectedAge === '3-6') return b.reviewCount - a.reviewCount;
                return 0; // 默认序
            });
        }
        return allProducts;
    }, [allProducts, selectedAge, category]);

    return {
        selectedAge,
        setSelectedAge,
        products: filteredProducts,
    };
};
