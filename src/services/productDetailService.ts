/**
 * 产品详情服务层
 * 处理产品信息、评价统计、AI分析等
 * 所有数据获取逻辑封装为函数，Page 只负责调用
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import { MOCK_PRODUCT_DETAIL, MOCK_REVIEWS } from '@/mocks/productMock';

// ============ 类型定义 (仅导出类型，不含数据) ============

export interface ProductDetailConfig {
    enableAIAnalysis: boolean;
    enablePurchaseChannels: boolean;
    enableCompare: boolean;
    maxReviewsPreview: number;
}

export interface ProductBasicInfo {
    id: string;
    name: string;
    brand: string;
    model: string;
    images: string[];
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
}

export interface UsageStats {
    totalUsers: number;
    recommendRate: number;
    notRecommendRate: number;
    optionalRate: number;
    stillUsing: number;
    abandoned: number;
    repurchase: number;
    over30Days: number;
    ageMatch: { age: string; rate: number; count: number };
}

export interface DimensionScore {
    name: string;
    score: number;
    progress: number;
}

export interface AIAnalysis {
    pros: string[];
    cons: string[];
    tips: string[];
    suitable: string;
    notSuitable: string;
}

export interface ReviewItem {
    id: string;
    user: { name: string; avatar: string; level: string; babyAge: string; useDays: number };
    rating: 'recommend' | 'not_recommend' | 'optional';
    summary: string;
    content: string;
    images?: string[];
    tags: string[];
    replaceFrom?: string;
    replaceReason?: string;
    helpful: number;
    verified: boolean;
}

export interface PurchaseChannel {
    platform: string;
    price: number;
    coupon: number;
    tag?: string;
}

export interface ProductDetail {
    basic: ProductBasicInfo;
    usage: UsageStats;
    dimensions: DimensionScore[];
    aiAnalysis: AIAnalysis;
    reviews: ReviewItem[];
    channels: PurchaseChannel[];
}

// ============ Service (仅逻辑，无数据) ============

class ProductDetailService {
    private useMock = true; // 开关：true=使用Mock，false=调用真实API

    async getConfig(): Promise<ProductDetailConfig> {
        return {
            enableAIAnalysis: true,
            enablePurchaseChannels: true,
            enableCompare: true,
            maxReviewsPreview: 3,
        };
    }

    async getProductDetail(productId: string): Promise<ProductDetail> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_PRODUCT_DETAIL), 300);
            });
        }
        // 真实 API 调用
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PRODUCT_DETAIL(productId)));
        return response.json();
    }

    async getReviews(productId: string, filter?: string): Promise<ReviewItem[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let reviews = [...MOCK_REVIEWS];
                    if (filter === 'recommend') {
                        reviews = reviews.filter(r => r.rating === 'recommend');
                    } else if (filter === 'not_recommend') {
                        reviews = reviews.filter(r => r.rating === 'not_recommend');
                    }
                    resolve(reviews);
                }, 200);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PRODUCT_REVIEWS(productId)));
        return response.json();
    }

    async toggleFavorite(productId: string): Promise<boolean> {
        return true;
    }

    async markHelpful(reviewId: string): Promise<number> {
        return Math.floor(Math.random() * 100) + 100;
    }
}

export const productDetailService = new ProductDetailService();
