/**
 * 选品服务 - "怎么选"智能推荐
 * 提供分步骤选品逻辑、推荐算法、数据驱动
 */

// ============ 类型定义 ============

/** 产品分类 */
export interface ProductCategory {
    id: string;
    name: string;
    icon: string;
    hot?: boolean;
}

/** 常见问题 */
export interface SelectProblem {
    id: string;
    title: string;
    desc: string;
    icon: string;
    effectiveness: string;
}

/** 预算范围 */
export interface BudgetRange {
    id: string;
    range: string;
    icon: string;
    popular?: boolean;
}

/** 推荐产品 */
export interface RecommendedProduct {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
    matchScore: number;
    reasons: string[];
    tags: string[];
    userCount: number;
    sameAgeRate: number;
}

/** 筛选条件 */
export interface SelectionFilters {
    category: string;
    problem: string;
    budget: string;
    babyAge?: string;
}

/** 推荐结果 */
export interface RecommendationResult {
    filters: {
        babyAge: string;
        problem: string;
        budget: string;
    };
    totalCount: number;
    products: RecommendedProduct[];
}

// ============ Mock 数据 ============

const CATEGORIES: ProductCategory[] = [
    { id: 'bottle', name: '奶瓶', icon: '🍼', hot: true },
    { id: 'nipple', name: '奶嘴', icon: '🍭' },
    { id: 'bowl', name: '辅食碗', icon: '🥣' },
    { id: 'warmer', name: '温奶器', icon: '🔥' },
    { id: 'sterilizer', name: '消毒器', icon: '💨' },
    { id: 'brush', name: '奶瓶刷', icon: '🧹' },
];

const PROBLEMS: SelectProblem[] = [
    {
        id: 'colic',
        title: '胀气严重',
        desc: '宝宝喝奶后经常胀气哭闹',
        icon: '😣',
        effectiveness: '76%有效率'
    },
    {
        id: 'refuse',
        title: '拒绝奶瓶',
        desc: '宝宝不接受奶瓶奶嘴',
        icon: '😤',
        effectiveness: '68%接受度'
    },
    {
        id: 'leak',
        title: '漏奶严重',
        desc: '奶瓶经常漏奶弄湿衣服',
        icon: '💧',
        effectiveness: '92%防漏'
    },
    {
        id: 'first-time',
        title: '刚开始用',
        desc: '第一次给宝宝选奶瓶',
        icon: '🆕',
        effectiveness: '新手推荐'
    }
];

const BUDGETS: BudgetRange[] = [
    { id: 'low', range: '50元以下', icon: '💰' },
    { id: 'mid', range: '50-150元', icon: '💰💰', popular: true },
    { id: 'high', range: '150-300元', icon: '💰💰💰' },
    { id: 'premium', range: '300元以上', icon: '💎' },
];

const MOCK_RECOMMENDATIONS: RecommendedProduct[] = [
    {
        id: 'comotomo-250',
        name: 'Comotomo可么多么硅胶奶瓶',
        brand: 'Comotomo',
        image: '🍼',
        price: 128,
        originalPrice: 189,
        rating: 4.8,
        reviewCount: 234,
        matchScore: 95,
        reasons: [
            '76%的同月龄妈妈推荐',
            '防胀气有效率89%',
            '宝宝接受度高达92%'
        ],
        tags: ['防胀气', '柔软仿母乳', '易清洗'],
        userCount: 156,
        sameAgeRate: 76
    },
    {
        id: 'dr-browns-240',
        name: 'Dr.Brown布朗博士防胀气奶瓶',
        brand: 'Dr.Brown',
        image: '🍼',
        price: 98,
        originalPrice: 158,
        rating: 4.6,
        reviewCount: 189,
        matchScore: 88,
        reasons: [
            '专利防胀气导管设计',
            '医生推荐率高',
            '适合胀气体质宝宝'
        ],
        tags: ['防胀气', '医生推荐', '性价比高'],
        userCount: 134,
        sameAgeRate: 68
    },
    {
        id: 'nuk-wide',
        name: 'NUK自然实感宽口径奶瓶',
        brand: 'NUK',
        image: '🍼',
        price: 78,
        originalPrice: 128,
        rating: 4.5,
        reviewCount: 167,
        matchScore: 82,
        reasons: [
            '德国品牌，品质保障',
            '宽口设计易清洗',
            '价格适中性价比好'
        ],
        tags: ['宽口径', '易清洗', '实惠'],
        userCount: 98,
        sameAgeRate: 62
    }
];

// ============ 服务类 ============

class SelectService {
    /**
     * 获取产品分类列表
     */
    async getCategories(): Promise<ProductCategory[]> {
        return CATEGORIES;
    }

    /**
     * 获取常见问题列表
     */
    async getProblems(): Promise<SelectProblem[]> {
        return PROBLEMS;
    }

    /**
     * 获取预算范围列表
     */
    async getBudgets(): Promise<BudgetRange[]> {
        return BUDGETS;
    }

    /**
     * 根据筛选条件获取推荐产品
     */
    async getRecommendations(filters: SelectionFilters): Promise<RecommendationResult> {
        // 模拟筛选逻辑
        let products = [...MOCK_RECOMMENDATIONS];

        // 根据预算筛选
        if (filters.budget === 'low') {
            products = products.filter(p => p.price < 50);
        } else if (filters.budget === 'mid') {
            products = products.filter(p => p.price >= 50 && p.price <= 150);
        } else if (filters.budget === 'high') {
            products = products.filter(p => p.price > 150 && p.price <= 300);
        } else if (filters.budget === 'premium') {
            products = products.filter(p => p.price > 300);
        }

        // 如果没有结果，返回全部（确保有数据展示）
        if (products.length === 0) {
            products = MOCK_RECOMMENDATIONS;
        }

        // 获取问题和预算的显示文案
        const problemLabel = PROBLEMS.find(p => p.id === filters.problem)?.title || '综合推荐';
        const budgetLabel = BUDGETS.find(b => b.id === filters.budget)?.range || '不限';

        return {
            filters: {
                babyAge: '3-6个月宝宝',
                problem: `${problemLabel}问题`,
                budget: `${budgetLabel}预算`,
            },
            totalCount: products.length,
            products,
        };
    }

    /**
     * 获取更多推荐产品
     */
    async loadMoreRecommendations(filters: SelectionFilters, page: number): Promise<RecommendedProduct[]> {
        // TODO: 分页加载
        return [];
    }
}

export const selectService = new SelectService();

export type {
    ProductCategory,
    SelectProblem,
    BudgetRange,
    RecommendedProduct,
    SelectionFilters,
    RecommendationResult,
};
