/**
 * 产品详情服务 - 单品决策画像
 * 完全数据驱动，所有数据来自宝妈真实反馈
 */

// ============ 类型定义 ============

/** 产品基础信息 */
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

/** 真实使用数据 */
export interface UsageData {
    totalUsers: number;
    recommendRate: number;
    notRecommendRate: number;
    optionalRate: number;
    stillUsing: number;
    abandoned: number;
    repurchase: number;
    over30Days: number;
    ageMatch: {
        age: string;
        rate: number;
        count: number;
    };
    abandonedReasons?: string;
}

/** 分维度评分 */
export interface DimensionScore {
    name: string;
    score: number;
    progress: number;
}

/** AI智能分析 */
export interface AIAnalysis {
    pros: string[];
    cons: string[];
    tips: string[];
    suitable: string;
    notSuitable: string;
}

/** 用户评价 */
export interface UserReview {
    id: number;
    user: {
        name: string;
        avatar: string;
        level: string;
        age: string;
        useDays: number;
    };
    rating: 'recommend' | 'not-recommend' | 'optional';
    summary: string;
    detail: string;
    images?: string[];
    tags: string[];
    replaceFrom?: string;
    replaceReason?: string;
    helpful: number;
    verified: boolean;
}

/** 购买渠道 */
export interface PurchaseChannel {
    platform: string;
    price: number;
    coupon: number;
    tag: string;
}

/** 产品详情完整数据 */
export interface ProductDetail {
    product: ProductBasicInfo;
    usageData: UsageData;
    dimensionScores: DimensionScore[];
    aiAnalysis: AIAnalysis;
    reviews: UserReview[];
    purchaseChannels: PurchaseChannel[];
}

// ============ Mock 数据 ============

const MOCK_PRODUCTS: Record<string, ProductDetail> = {
    'comotomo-250': {
        product: {
            id: 'comotomo-250',
            name: 'Comotomo可么多么硅胶奶瓶',
            brand: 'Comotomo',
            model: '250ml 3-6个月适用',
            images: ['🍼', '🍼', '🍼'],
            price: 128,
            originalPrice: 189,
            rating: 4.8,
            reviewCount: 234,
        },
        usageData: {
            totalUsers: 234,
            recommendRate: 82,
            notRecommendRate: 12,
            optionalRate: 6,
            stillUsing: 189,
            abandoned: 28,
            repurchase: 45,
            over30Days: 156,
            ageMatch: {
                age: '3-6个月',
                rate: 76,
                count: 98,
            },
            abandonedReasons: '价格偏贵、流速偏快',
        },
        dimensionScores: [
            { name: '防胀气效果', score: 4.7, progress: 94 },
            { name: '宝宝接受度', score: 4.6, progress: 92 },
            { name: '清洗难度', score: 4.8, progress: 96 },
            { name: '耐用性', score: 4.4, progress: 88 },
            { name: '性价比', score: 4.3, progress: 86 },
        ],
        aiAnalysis: {
            pros: [
                '奶嘴柔软度接近母乳，宝宝容易接受（89%提及）',
                '防胀气效果明显，很少出现胀气情况（76%提及）',
                '宽口设计清洗方便，不容易藏污垢（68%提及）',
            ],
            cons: [
                '价格偏高，预算有限的家庭需考虑（32%提及）',
                '奶嘴偏软，流速可能偏快（18%提及）',
                '硅胶材质容易沾灰尘（15%提及）',
            ],
            tips: [
                '建议先买180ml试用，宝宝接受再买大容量',
                '奶嘴需要定期更换，建议备2-3个',
                '清洗后倒扣晾干，避免积水',
            ],
            suitable: '适合3-6个月、容易胀气、拒绝奶瓶的宝宝',
            notSuitable: '如果宝宝吸吮力强、喜欢流速快的奶嘴，可能需要适应',
        },
        reviews: [
            {
                id: 1,
                user: {
                    name: '小雨妈妈',
                    avatar: '👩',
                    level: 'Lv5',
                    age: '3个月宝宝',
                    useDays: 45,
                },
                rating: 'recommend',
                summary: '从180ml用到现在，宝宝接受度高，没胀气',
                detail: '用了45天，宝宝一直很喜欢。之前用XX品牌玻璃奶瓶总是胀气哭闹，换了这款后明显好很多。奶嘴柔软度确实接近母乳，宝宝第一次就接受了。清洗也方便，瓶身宽口设计，手能伸进去刷干净。唯一缺点就是价格有点贵...',
                images: ['📸', '📸', '📸'],
                tags: ['防胀气有效', '易清洗', '宝宝接受度高'],
                replaceFrom: 'XX品牌玻璃奶瓶',
                replaceReason: '之前那款胀气严重',
                helpful: 234,
                verified: true,
            },
            {
                id: 2,
                user: {
                    name: '晴天妈妈',
                    avatar: '👱‍♀️',
                    level: 'Lv3',
                    age: '4个月宝宝',
                    useDays: 30,
                },
                rating: 'recommend',
                summary: '流速有点快，但整体满意',
                detail: '用了一个月，宝宝基本适应了。刚开始觉得流速偏快，宝宝有点呛到，但用了几天就好了。防胀气效果确实不错，基本不胀气。就是硅胶材质容易沾灰，需要经常擦...',
                tags: ['防胀气', '需要适应'],
                helpful: 156,
                verified: true,
            },
            {
                id: 3,
                user: {
                    name: '暖暖妈咪',
                    avatar: '🙋‍♀️',
                    level: 'Lv4',
                    age: '5个月宝宝',
                    useDays: 60,
                },
                rating: 'optional',
                summary: '质量不错但价格偏贵，性价比一般',
                detail: '用了两个月，质量确实好，没有任何问题。但是价格真的有点贵，同样效果的其他品牌可能100以内就能买到。如果预算充足可以考虑，预算有限的话可以看看其他品牌...',
                tags: ['质量好', '价格贵', '性价比一般'],
                helpful: 89,
                verified: true,
            },
        ],
        purchaseChannels: [
            { platform: '淘宝', price: 128, coupon: 20, tag: '最低价' },
            { platform: '京东', price: 135, coupon: 15, tag: '' },
            { platform: '拼多多', price: 138, coupon: 10, tag: '' },
        ],
    },
    'xx-bottle': {
        product: {
            id: 'xx-bottle',
            name: 'XX品牌防胀气奶瓶',
            brand: 'XX品牌',
            model: '240ml 0-6个月适用',
            images: ['🍼', '🍼', '🍼'],
            price: 89,
            originalPrice: 129,
            rating: 3.2,
            reviewCount: 156,
        },
        usageData: {
            totalUsers: 156,
            recommendRate: 45,
            notRecommendRate: 38,
            optionalRate: 17,
            stillUsing: 45,
            abandoned: 89,
            repurchase: 12,
            over30Days: 34,
            ageMatch: {
                age: '3-6个月',
                rate: 38,
                count: 45,
            },
            abandonedReasons: '奶嘴太硬、仍然胀气、清洗麻烦',
        },
        dimensionScores: [
            { name: '防胀气效果', score: 2.8, progress: 56 },
            { name: '宝宝接受度', score: 2.5, progress: 50 },
            { name: '清洗难度', score: 2.2, progress: 44 },
            { name: '耐用性', score: 3.8, progress: 76 },
            { name: '性价比', score: 3.5, progress: 70 },
        ],
        aiAnalysis: {
            pros: [
                '价格实惠，性价比高（56%提及）',
                '容量足够，减少冲奶次数（34%提及）',
            ],
            cons: [
                '防胀气效果有限，仍然胀气（62%提及）',
                '奶嘴偏硬，宝宝不接受（58%提及）',
                '配件太多，清洗麻烦（45%提及）',
                '刻度看不清，夜奶不方便（28%提及）',
            ],
            tips: [
                '如果宝宝接受可以继续用',
                '建议先买一个试试',
                '定期检查配件密封性',
            ],
            suitable: '对价格敏感、宝宝不挑奶嘴的家庭',
            notSuitable: '容易胀气的宝宝、追求品质的家庭',
        },
        reviews: [
            {
                id: 1,
                user: {
                    name: '晴天妈妈',
                    avatar: '👩‍🦰',
                    level: 'Lv3',
                    age: '4个月宝宝',
                    useDays: 15,
                },
                rating: 'not-recommend',
                summary: '买了就后悔，胀气根本没改善',
                detail: '冲着防胀气买的，结果用了两周宝宝还是胀气，而且配件太多洗起来很麻烦...',
                tags: ['仍然胀气', '清洗麻烦'],
                helpful: 312,
                verified: true,
            },
        ],
        purchaseChannels: [
            { platform: '淘宝', price: 89, coupon: 10, tag: '' },
            { platform: '京东', price: 95, coupon: 5, tag: '' },
            { platform: '拼多多', price: 79, coupon: 5, tag: '最低价' },
        ],
    },
};

// ============ 服务类 ============

class ProductDetailService {
    /**
     * 获取产品详情
     */
    async getProductDetail(id: string): Promise<ProductDetail | null> {
        return MOCK_PRODUCTS[id] || null;
    }

    /**
     * 获取评价列表
     */
    async getReviews(productId: string, filter?: string): Promise<UserReview[]> {
        const detail = MOCK_PRODUCTS[productId];
        if (!detail) return [];

        let reviews = detail.reviews;
        if (filter === 'recommend') {
            reviews = reviews.filter(r => r.rating === 'recommend');
        } else if (filter === 'not-recommend') {
            reviews = reviews.filter(r => r.rating === 'not-recommend');
        }
        return reviews;
    }

    /**
     * 点赞评价
     */
    async likeReview(reviewId: number): Promise<{ success: boolean; count: number }> {
        return { success: true, count: 100 };
    }
}

export const productDetailService = new ProductDetailService();

export type {
    ProductBasicInfo,
    UsageData,
    DimensionScore,
    AIAnalysis,
    UserReview,
    PurchaseChannel,
    ProductDetail,
};
