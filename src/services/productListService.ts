/**
 * 产品列表服务层
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import { MOCK_PRODUCTS, MOCK_FILTER_OPTIONS } from '@/mocks/productListMock';

// ============ 类型定义 ============

export interface ProductListItem {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
    recommendRate: number;
    sameAgeUsers: number;
    tags: string[];
    badges: string[];
    highlights: string[];
    stock: string;
    shipping: string;
    hasCoupon: boolean;
    couponAmount: number;
    isHot: boolean;
    effectiveness: number;
    stillUsingRate: number;
}

export interface FilterOptions {
    age: string[];
    price: { id: string; label: string }[];
    brand: string[];
    material: string[];
    feature: string[];
}

export interface SelectedFilters {
    age: string;
    price: string[];
    brand: string[];
    material: string[];
    feature: string[];
}

// ============ Service ============

class ProductListService {
    private useMock = true;

    async getFilterOptions(): Promise<FilterOptions> {
        return MOCK_FILTER_OPTIONS;
    }

    async getProducts(filters?: SelectedFilters, sortBy?: string): Promise<ProductListItem[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let list = [...MOCK_PRODUCTS];

                    // Sort
                    if (sortBy === 'recommend') {
                        list.sort((a, b) => b.recommendRate - a.recommendRate);
                    } else if (sortBy === 'price-asc') {
                        list.sort((a, b) => a.price - b.price);
                    } else if (sortBy === 'price-desc') {
                        list.sort((a, b) => b.price - a.price);
                    } else if (sortBy === 'sales') {
                        list.sort((a, b) => b.reviewCount - a.reviewCount);
                    }

                    resolve(list);
                }, 200);
            });
        }
        const response = await fetch(buildUrl('/products'));
        return response.json();
    }

    async likeProduct(productId: string): Promise<boolean> {
        return true;
    }

    async addToCompare(productId: string): Promise<boolean> {
        return true;
    }
}

export const productListService = new ProductListService();
