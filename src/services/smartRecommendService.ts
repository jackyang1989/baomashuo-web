/**
 * 智能推荐结果服务层
 */

import { buildUrl } from '@/config/apiConfig';
import { MOCK_SMART_CONCLUSION, MOCK_FILTERS, MOCK_RECOMMENDATIONS } from '@/mocks/smartRecommendMock';

// ============ 类型定义 ============

export interface SmartConclusion {
    bestMatch: {
        id: string;
        name: string;
        brand: string;
        matchScore: number;
        reason: string;
    };
    keyPoints: string[];
    alternatives: string;
}

export interface ProductPlatform {
    name: string;
    price: number;
    coupon: number;
    final: number;
}

export interface ProductStats {
    sameAgeUsers: number;
    sameAgeRate: number;
    stillUsing: number;
    repurchase: number;
    effectiveness: number;
}

export interface RecommendedProductDetail {
    id: string;
    rank: number;
    name: string;
    brand: string;
    model: string;
    image: string;
    price: number;
    originalPrice: number;
    discount: number;
    rating: number;
    reviewCount: number;
    matchScore: number;
    badges: string[];
    reasons: string[];
    pros: string[];
    cons: string[];
    stats: ProductStats;
    tags: string[];
    platforms: ProductPlatform[];
}

export interface RecommendFilters {
    babyAge: string;
    problem: string;
    budget: string;
    resultCount: number;
}

// ============ Service ============

class SmartRecommendService {
    private useMock = true;

    async getConclusion(): Promise<SmartConclusion> {
        return MOCK_SMART_CONCLUSION;
    }

    async getFilters(): Promise<RecommendFilters> {
        return MOCK_FILTERS;
    }

    async getRecommendations(sortBy?: string): Promise<RecommendedProductDetail[]> {
        let list = [...MOCK_RECOMMENDATIONS];
        if (sortBy === 'rate') {
            list.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'price-asc') {
            list.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'sales') {
            list.sort((a, b) => b.reviewCount - a.reviewCount);
        }
        return new Promise((resolve) => setTimeout(() => resolve(list), 200));
    }
}

export const smartRecommendService = new SmartRecommendService();
