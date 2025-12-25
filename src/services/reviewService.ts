/**
 * 评价提交服务层
 * 所有数据获取逻辑封装为函数，Page 只负责调用
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import {
    MOCK_REVIEW_CONFIG,
    MOCK_SEARCH_PRODUCTS,
    MOCK_USE_DURATION_OPTIONS,
    MOCK_ATTITUDE_OPTIONS,
    MOCK_QUICK_TAGS,
} from '@/mocks/reviewMock';
import type { RecommendAttitude, UsageDuration } from '@/types/review';

// ============ 类型定义 ============

export interface ReviewConfig {
    minContentLength: number;
    maxContentLength: number;
    maxImages: number;
    enableOrderVerification: boolean;
    orderVerificationBonus: number;
    basePoints: number;
}

export interface SearchProduct {
    id: string;
    name: string;
    brand: string;
    image: string;
}

export interface ReviewSubmitData {
    productId?: string;
    attitude: RecommendAttitude;
    summary: string;
    content: string;
    tags: string[];
    stillInUse: boolean;
    ratings: Record<string, number>;
    purchaseVerified?: boolean;
}

export interface ReviewSubmitResult {
    success: boolean;
    reviewId?: string;
    points: number;
}

// 导出常量供 Page 使用
export const USE_DURATION_OPTIONS = MOCK_USE_DURATION_OPTIONS;
export const ATTITUDE_OPTIONS = MOCK_ATTITUDE_OPTIONS;
export const QUICK_TAGS = MOCK_QUICK_TAGS;

// ============ Service ============

class ReviewService {
    private useMock = true;

    async getConfig(): Promise<ReviewConfig> {
        return MOCK_REVIEW_CONFIG;
    }

    async searchProducts(query: string): Promise<SearchProduct[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const filtered = query
                        ? MOCK_SEARCH_PRODUCTS.filter(p =>
                            p.name.toLowerCase().includes(query.toLowerCase()) ||
                            p.brand.toLowerCase().includes(query.toLowerCase())
                        )
                        : MOCK_SEARCH_PRODUCTS;
                    resolve(filtered);
                }, 200);
            });
        }
        const response = await fetch(buildUrl(`${API_CONFIG.ENDPOINTS.PRODUCTS}?q=${query}`));
        return response.json();
    }

    async submitReview(data: ReviewSubmitData): Promise<ReviewSubmitResult> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, reviewId: `rv${Date.now()}`, points: 50 });
                }, 500);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.REVIEW_SUBMIT), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async saveDraft(data: Partial<ReviewSubmitData>): Promise<boolean> {
        console.log('Saving draft:', data);
        return true;
    }
}

export const reviewService = new ReviewService();
