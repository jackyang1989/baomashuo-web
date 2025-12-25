/**
 * 评价服务 - 发布评价
 */

// ============ 类型定义 ============

/** 评价态度 */
export type ReviewAttitude = 'recommend' | 'not-recommend' | 'optional';

/** 决策路径类型 */
export type DecisionPathType = 'switched_from' | 'first_buy' | 'repurchased' | 'idle';

/** 使用场景 */
export interface UseScenario {
    id: string;
    label: string;
    icon: string;
}

/** 常见问题标签 */
export interface IssueTag {
    id: string;
    label: string;
    type: 'positive' | 'negative';
}

/** 提交评价数据 */
export interface ReviewSubmitData {
    productId: string;
    attitude: ReviewAttitude;
    summary: string;
    detail: string;
    usageDays: number;
    babyAge: string;
    decisionPath: {
        type: DecisionPathType;
        fromProduct?: string;
        reason?: string;
    };
    scenarios: string[];
    tags: string[];
    images?: string[];
}

/** 搜索产品结果 */
export interface SearchProductResult {
    id: string;
    name: string;
    brand: string;
    image: string;
}

// ============ Mock 数据 ============

const USE_SCENARIOS: UseScenario[] = [
    { id: 'night-feed', label: '夜奶', icon: '🌙' },
    { id: 'out', label: '外出携带', icon: '🚗' },
    { id: 'mix-feed', label: '混合喂养', icon: '🍼' },
    { id: 'transition', label: '母乳转奶', icon: '🤱' },
    { id: 'colic', label: '防胀气', icon: '😣' },
    { id: 'clean', label: '易清洗', icon: '🧹' },
];

const POSITIVE_TAGS: IssueTag[] = [
    { id: 'anti-colic', label: '防胀气有效', type: 'positive' },
    { id: 'easy-clean', label: '易清洗', type: 'positive' },
    { id: 'baby-accept', label: '宝宝接受度高', type: 'positive' },
    { id: 'quality', label: '质量好', type: 'positive' },
    { id: 'value', label: '性价比高', type: 'positive' },
    { id: 'soft-nipple', label: '奶嘴柔软', type: 'positive' },
];

const NEGATIVE_TAGS: IssueTag[] = [
    { id: 'still-colic', label: '仍然胀气', type: 'negative' },
    { id: 'hard-clean', label: '清洗麻烦', type: 'negative' },
    { id: 'baby-refuse', label: '宝宝不接受', type: 'negative' },
    { id: 'leak', label: '容易漏奶', type: 'negative' },
    { id: 'expensive', label: '价格偏贵', type: 'negative' },
    { id: 'hard-nipple', label: '奶嘴偏硬', type: 'negative' },
];

const BABY_AGE_OPTIONS = [
    '0-1个月', '1-3个月', '3-6个月', '6-12个月', '12个月以上'
];

const USAGE_DAYS_OPTIONS = [
    { value: 7, label: '7天以内' },
    { value: 30, label: '1个月' },
    { value: 60, label: '2个月' },
    { value: 90, label: '3个月以上' },
];

const MOCK_SEARCH_RESULTS: SearchProductResult[] = [
    { id: 'comotomo-250', name: 'Comotomo可么多么硅胶奶瓶 250ml', brand: 'Comotomo', image: '🍼' },
    { id: 'dr-browns-240', name: 'Dr.Brown布朗博士防胀气奶瓶 240ml', brand: "Dr.Brown's", image: '🍼' },
    { id: 'nuk-wide', name: 'NUK自然实感宽口径奶瓶', brand: 'NUK', image: '🍼' },
    { id: 'pigeon-glass', name: '贝亲经典玻璃奶瓶 240ml', brand: '贝亲', image: '🍼' },
];

// ============ 服务类 ============

class ReviewService {
    /**
     * 获取使用场景列表
     */
    async getScenarios(): Promise<UseScenario[]> {
        return USE_SCENARIOS;
    }

    /**
     * 获取正面标签
     */
    async getPositiveTags(): Promise<IssueTag[]> {
        return POSITIVE_TAGS;
    }

    /**
     * 获取负面标签
     */
    async getNegativeTags(): Promise<IssueTag[]> {
        return NEGATIVE_TAGS;
    }

    /**
     * 获取宝宝月龄选项
     */
    async getBabyAgeOptions(): Promise<string[]> {
        return BABY_AGE_OPTIONS;
    }

    /**
     * 获取使用天数选项
     */
    async getUsageDaysOptions(): Promise<{ value: number; label: string }[]> {
        return USAGE_DAYS_OPTIONS;
    }

    /**
     * 搜索产品
     */
    async searchProducts(keyword: string): Promise<SearchProductResult[]> {
        if (!keyword.trim()) return [];
        const lower = keyword.toLowerCase();
        return MOCK_SEARCH_RESULTS.filter(p =>
            p.name.toLowerCase().includes(lower) ||
            p.brand.toLowerCase().includes(lower)
        );
    }

    /**
     * 获取产品详情（用于预填）
     */
    async getProductById(id: string): Promise<SearchProductResult | null> {
        return MOCK_SEARCH_RESULTS.find(p => p.id === id) || null;
    }

    /**
     * 提交评价
     */
    async submitReview(data: ReviewSubmitData): Promise<{ success: boolean; reviewId?: string; error?: string }> {
        // 模拟提交
        console.log('提交评价数据:', data);

        // 验证
        if (!data.productId) {
            return { success: false, error: '请选择产品' };
        }
        if (!data.summary.trim()) {
            return { success: false, error: '请填写一句话总结' };
        }
        if (data.summary.length < 5) {
            return { success: false, error: '一句话总结至少5个字' };
        }

        // 模拟成功
        return { success: true, reviewId: 'review-' + Date.now() };
    }
}

export const reviewService = new ReviewService();

export type {
    ReviewAttitude,
    DecisionPathType,
    UseScenario,
    IssueTag,
    ReviewSubmitData,
    SearchProductResult,
};
