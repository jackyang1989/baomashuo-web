/**
 * 智能推荐结果 Mock 数据
 */

import type { SmartConclusion, RecommendedProductDetail } from '@/services/smartRecommendService';

export const MOCK_SMART_CONCLUSION: SmartConclusion = {
    bestMatch: {
        id: 'p1',
        name: 'Comotomo可么多么硅胶奶瓶',
        brand: 'Comotomo',
        matchScore: 95,
        reason: '最适合你的宝宝',
    },
    keyPoints: [
        '76%的3-6个月同月龄宝妈推荐',
        '防胀气有效率89%，明显高于平均水平',
        '柔软度接近母乳，宝宝接受度92%',
        '价格略高但使用体验更好，值得投资',
    ],
    alternatives: '如果预算有限，Dr.Brown也是不错的选择',
};

export const MOCK_FILTERS = {
    babyAge: '3-6个月',
    problem: '防胀气',
    budget: '50-150元',
    resultCount: 8,
};

export const MOCK_RECOMMENDATIONS: RecommendedProductDetail[] = [
    {
        id: 'p1',
        rank: 1,
        name: 'Comotomo可么多么硅胶奶瓶',
        brand: 'Comotomo',
        model: '250ml',
        image: '🍼',
        price: 128,
        originalPrice: 189,
        discount: 32,
        rating: 4.8,
        reviewCount: 234,
        matchScore: 95,
        badges: ['最佳匹配', '宝妈首选'],
        reasons: ['76%同月龄推荐', '防胀气89%有效', '宝宝接受度92%'],
        pros: ['防胀气有效', '易清洗', '宝宝喜欢'],
        cons: ['价格稍高', '硅胶易沾灰'],
        stats: { sameAgeUsers: 156, sameAgeRate: 76, stillUsing: 189, repurchase: 45, effectiveness: 89 },
        tags: ['防胀气', '仿母乳', '易清洗'],
        platforms: [
            { name: '淘宝', price: 128, coupon: 20, final: 108 },
            { name: '京东', price: 135, coupon: 15, final: 120 },
        ],
    },
    {
        id: 'p2',
        rank: 2,
        name: 'Dr.Brown布朗博士防胀气奶瓶',
        brand: 'Dr.Brown',
        model: '240ml',
        image: '🍼',
        price: 98,
        originalPrice: 158,
        discount: 38,
        rating: 4.6,
        reviewCount: 189,
        matchScore: 88,
        badges: ['高性价比', '医生推荐'],
        reasons: ['专利防胀气设计', '医生推荐率高', '性价比出色'],
        pros: ['防胀气', '价格适中', '医生推荐'],
        cons: ['配件多', '清洗麻烦'],
        stats: { sameAgeUsers: 134, sameAgeRate: 68, stillUsing: 156, repurchase: 32, effectiveness: 82 },
        tags: ['防胀气', '医生推荐', '性价比'],
        platforms: [
            { name: '淘宝', price: 98, coupon: 10, final: 88 },
            { name: '京东', price: 102, coupon: 10, final: 92 },
        ],
    },
    {
        id: 'p3',
        rank: 3,
        name: 'NUK自然实感宽口径奶瓶',
        brand: 'NUK',
        model: '260ml',
        image: '🍼',
        price: 78,
        originalPrice: 128,
        discount: 39,
        rating: 4.5,
        reviewCount: 167,
        matchScore: 82,
        badges: ['预算友好'],
        reasons: ['德国品牌质量好', '宽口易清洗', '价格实惠'],
        pros: ['易清洗', '价格低', '质量好'],
        cons: ['防胀气一般', '奶嘴偏硬'],
        stats: { sameAgeUsers: 98, sameAgeRate: 62, stillUsing: 123, repurchase: 28, effectiveness: 76 },
        tags: ['宽口径', '易清洗', '实惠'],
        platforms: [
            { name: '淘宝', price: 78, coupon: 8, final: 70 },
            { name: '京东', price: 82, coupon: 8, final: 74 },
        ],
    },
];
