/**
 * 反馈服务类型定义
 */
import type { RecommendAttitude, BabyAgeRange } from './review';

/** 产品信息（用于反馈卡片） */
export interface FeedbackProductInfo {
    id: string;
    brand: string;
    name: string;
    imageUrl: string;
    currentPrice: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
}

/** 用户信息（用于反馈卡片） */
export interface FeedbackUserInfo {
    id: string;
    name: string;
    avatar: string;
    level: number;
    babyAge: string;         // 如 "3个月宝宝"
}

/** 完整反馈数据 */
export interface FeedbackItem {
    id: string;
    user: FeedbackUserInfo;
    product: FeedbackProductInfo;

    // 核心决策数据
    attitude: RecommendAttitude;
    usageDays: number;
    summary: string;
    detail: string;
    tags: string[];

    // 替换信息
    replaceFrom?: string;
    replaceReason?: string;

    // 弃用信息
    abandoned?: boolean;
    abandonedReason?: string;

    // 互动数据
    helpfulCount: number;
    createdAt: string;
}

/** 反馈列表响应 */
export interface FeedbackListResponse {
    items: FeedbackItem[];
    total: number;
    hasMore: boolean;
}

/** 反馈筛选条件 */
export interface FeedbackFilter {
    ageRange?: BabyAgeRange;
    attitude?: RecommendAttitude;
    category?: string;
}
