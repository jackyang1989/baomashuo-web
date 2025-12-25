/**
 * 产品对比服务层
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import { MOCK_COMPARE_PRODUCTS, MOCK_DIMENSIONS, MOCK_PARAMS, MOCK_ALTERNATIVES } from '@/mocks/compareMock';

// ============ 类型定义 ============

export interface CompareProduct {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
    recommendRate: number;
    stillUsingRate: number;
    repurchaseRate: number;
    pros: string[];
    cons: string[];
}

export interface CompareDimension {
    id: string;
    name: string;
    scores: (number | null)[];
    unit: string;
}

export interface CompareParams {
    name: string;
    values: (string | null)[];
}

// ============ Service ============

class CompareService {
    private useMock = true;

    async getCompareProducts(ids?: string[]): Promise<(CompareProduct | null)[]> {
        if (this.useMock) {
            return MOCK_COMPARE_PRODUCTS;
        }
        const response = await fetch(buildUrl(`/compare?ids=${ids?.join(',')}`));
        return response.json();
    }

    async getDimensions(): Promise<CompareDimension[]> {
        return MOCK_DIMENSIONS;
    }

    async getParams(): Promise<CompareParams[]> {
        return MOCK_PARAMS;
    }

    async getAlternatives(): Promise<CompareProduct[]> {
        return MOCK_ALTERNATIVES;
    }

    async searchProducts(query: string): Promise<CompareProduct[]> {
        return MOCK_ALTERNATIVES.filter(p => p.name.includes(query) || p.brand.includes(query));
    }
}

export const compareService = new CompareService();
