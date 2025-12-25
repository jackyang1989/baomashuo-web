/**
 * 产品详情 Mock 数据
 * 所有产品相关的模拟数据集中管理
 */

import type { ProductDetail, ReviewItem, DimensionScore, AIAnalysis, UsageStats, PurchaseChannel, ProductBasicInfo } from '@/services/productDetailService';

export const MOCK_PRODUCT_BASIC: ProductBasicInfo = {
    id: 'p1',
    name: 'Comotomo可么多么硅胶奶瓶',
    brand: 'Comotomo',
    model: '250ml 3-6个月适用',
    images: ['🍼', '🍼', '🍼'],
    price: 128,
    originalPrice: 189,
    rating: 4.8,
    reviewCount: 234,
};

export const MOCK_USAGE_STATS: UsageStats = {
    totalUsers: 234,
    recommendRate: 82,
    notRecommendRate: 12,
    optionalRate: 6,
    stillUsing: 189,
    abandoned: 28,
    repurchase: 45,
    over30Days: 156,
    ageMatch: { age: '3-6个月', rate: 76, count: 98 },
};

export const MOCK_DIMENSIONS: DimensionScore[] = [
    { name: '防胀气效果', score: 4.7, progress: 94 },
    { name: '宝宝接受度', score: 4.6, progress: 92 },
    { name: '清洗难度', score: 4.8, progress: 96 },
    { name: '耐用性', score: 4.4, progress: 88 },
    { name: '性价比', score: 4.3, progress: 86 },
];

export const MOCK_AI_ANALYSIS: AIAnalysis = {
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
};

export const MOCK_REVIEWS: ReviewItem[] = [
    {
        id: 'r1',
        user: { name: '小雨妈妈', avatar: '👩', level: 'Lv5', babyAge: '3个月宝宝', useDays: 45 },
        rating: 'recommend',
        summary: '从180ml用到现在，宝宝接受度高，没胀气',
        content: '用了45天，宝宝一直很喜欢。之前用XX品牌玻璃奶瓶总是胀气哭闹，换了这款后明显好很多。',
        images: ['📸', '📸'],
        tags: ['防胀气有效', '易清洗', '宝宝接受度高'],
        replaceFrom: 'XX品牌玻璃奶瓶',
        replaceReason: '之前那款胀气严重',
        helpful: 234,
        verified: true,
    },
    {
        id: 'r2',
        user: { name: '晴天妈妈', avatar: '👱‍♀️', level: 'Lv3', babyAge: '4个月宝宝', useDays: 30 },
        rating: 'recommend',
        summary: '流速有点快，但整体满意',
        content: '用了一个月，宝宝基本适应了。刚开始觉得流速偏快，但用了几天就好了。',
        tags: ['防胀气', '需要适应'],
        helpful: 156,
        verified: true,
    },
    {
        id: 'r3',
        user: { name: '暖暖妈咪', avatar: '🙋‍♀️', level: 'Lv4', babyAge: '5个月宝宝', useDays: 60 },
        rating: 'optional',
        summary: '质量不错但价格偏贵，性价比一般',
        content: '用了两个月，质量确实好，没有任何问题。但是价格真的有点贵。',
        tags: ['质量好', '价格贵', '性价比一般'],
        helpful: 89,
        verified: true,
    },
];

export const MOCK_CHANNELS: PurchaseChannel[] = [
    { platform: '淘宝', price: 128, coupon: 20, tag: '最低价' },
    { platform: '京东', price: 135, coupon: 15 },
    { platform: '拼多多', price: 138, coupon: 10 },
];

export const MOCK_PRODUCT_DETAIL: ProductDetail = {
    basic: MOCK_PRODUCT_BASIC,
    usage: MOCK_USAGE_STATS,
    dimensions: MOCK_DIMENSIONS,
    aiAnalysis: MOCK_AI_ANALYSIS,
    reviews: MOCK_REVIEWS,
    channels: MOCK_CHANNELS,
};
