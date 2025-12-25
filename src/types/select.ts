/**
 * 选品模块类型定义
 * 支持后台配置开关
 */

// ============ 后台配置 ============

/** 选品模块功能开关 (后台可配) */
export interface SelectFeatureConfig {
    enableCategoryStep: boolean;
    enableBudgetStep: boolean;
    enableScenarioStep?: boolean;
    enableAgeFilter?: boolean;
    enableProblemStep?: boolean;
    defaultCategory?: string;
    maxRecommendations: number;
    showCompareButton?: boolean;
}

/** 默认配置 (MVP 简化版) */
export const DEFAULT_SELECT_CONFIG: SelectFeatureConfig = {
    enableCategoryStep: false,
    enableBudgetStep: false,
    enableScenarioStep: false,
    enableAgeFilter: true,
    enableProblemStep: true,
    maxRecommendations: 3,
    showCompareButton: true,
};

// ============ 品类选项 (预留) ============

export interface CategoryOption {
    id: string;
    name: string;
    icon: string;
    isHot?: boolean;
    enabled: boolean;  // 后台可控
}

// ============ 问题选项 ============

export interface ProblemOption {
    id: string;
    title: string;
    description: string;
    icon: string;
    effectiveness?: string;
    userCount?: number;
    color?: string;
}

/** 别名导出 */
export type SelectProblem = ProblemOption;

// ============ 预算选项 (预留) ============

export interface BudgetOption {
    id: string;
    range: string;
    icon: string;
    isPopular?: boolean;
}

// ============ 推荐结果 ============

export interface RecommendedProduct {
    id: string;
    productId?: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    recommendRate?: number;
    matchScore: number;
    reasons: string[];
    tags: string[];
    sameAgeUserCount: number;
    sameAgeRecommendRate: number;
}

/** 别名导出 */
export type ProductRecommendation = RecommendedProduct;

// ============ Wizard 状态 ============

export interface SelectWizardState {
    currentStep: number;
    category: string | null;
    problem: string | null;
    budget: string | null;
    babyAgeMonths: number | null;
}

export interface SelectCriteria {
    category?: string;
    problem?: string;
    budget?: string;
    babyAgeMonths?: number;
}
