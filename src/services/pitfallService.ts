/**
 * 避坑榜服务层
 * 所有数据获取逻辑封装为函数，Page 只负责调用
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import {
    MOCK_AGE_GROUPS,
    MOCK_CATEGORIES,
    MOCK_PITFALL_PRODUCTS,
    MOCK_SCENARIOS,
    MOCK_REASONS,
} from '@/mocks/pitfallMock';

// ============ 类型定义 (仅导出类型) ============

export interface PitfallIssue {
    issue: string;
    percent: number;
    count: number;
}

export interface TypicalCase {
    user: string;
    babyAge: string;
    useDays: number;
    summary: string;
}

export interface AlternativeProduct {
    name: string;
    recommendRate: number;
    price: number;
}

export interface PitfallProduct {
    id: string;
    rank: number;
    name: string;
    brand: string;
    image: string;
    notRecommendCount: number;
    totalReviews: number;
    notRecommendRate: number;
    severity: 'high' | 'medium' | 'low';
    mainIssues: PitfallIssue[];
    typicalCase: TypicalCase;
    alternative?: AlternativeProduct;
}

export interface ScenarioPitfall {
    product: string;
    reason: string;
    count: number;
}

export interface ScenarioGroup {
    scenario: string;
    icon: string;
    pitfalls: ScenarioPitfall[];
}

export interface PitfallReason {
    reason: string;
    description: string;
    count: number;
    examples: string[];
}

export interface CategoryOption {
    id: string;
    name: string;
    count: number;
}

// ============ Service ============

class PitfallService {
    private useMock = true;

    async getAgeGroups(): Promise<string[]> {
        return MOCK_AGE_GROUPS;
    }

    async getCategories(): Promise<CategoryOption[]> {
        return MOCK_CATEGORIES;
    }

    async getPitfallProducts(ageGroup?: string, category?: string): Promise<PitfallProduct[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_PITFALL_PRODUCTS), 200);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PITFALLS));
        return response.json();
    }

    async getScenarios(): Promise<ScenarioGroup[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_SCENARIOS), 200);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PITFALL_SCENARIOS));
        return response.json();
    }

    async getReasons(): Promise<PitfallReason[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_REASONS), 200);
            });
        }
        const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PITFALL_REASONS));
        return response.json();
    }

    async submitPitfall(productName: string, reason: string): Promise<boolean> {
        console.log('Submitting pitfall:', productName, reason);
        return true;
    }
}

export const pitfallService = new PitfallService();
