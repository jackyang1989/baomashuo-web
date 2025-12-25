/**
 * 评价提交 Mock 数据
 */

import type { SearchProduct, ReviewConfig } from '@/services/reviewService';

export const MOCK_REVIEW_CONFIG: ReviewConfig = {
    minContentLength: 20,
    maxContentLength: 500,
    maxImages: 9,
    enableOrderVerification: true,
    orderVerificationBonus: 20,
    basePoints: 50,
};

export const MOCK_SEARCH_PRODUCTS: SearchProduct[] = [
    { id: 'p1', name: 'Comotomo可么多么硅胶奶瓶 250ml', brand: 'Comotomo', image: '🍼' },
    { id: 'p2', name: 'Pigeon贝亲玻璃奶瓶 160ml', brand: 'Pigeon', image: '🍼' },
    { id: 'p3', name: "Dr.Brown布朗博士防胀气奶瓶", brand: "Dr.Brown's", image: '🍼' },
    { id: 'p4', name: 'babycare辅食碗套装', brand: 'babycare', image: '🥣' },
    { id: 'p5', name: 'NUK宽口径奶瓶', brand: 'NUK', image: '🍼' },
];

export const MOCK_USE_DURATION_OPTIONS = [
    { value: 'under_7_days', label: '7天以内', badge: '新手体验' },
    { value: '7_to_30_days', label: '7-30天', badge: '初步了解' },
    { value: '1_to_3_months', label: '1-3个月', badge: '深度使用' },
    { value: 'over_3_months', label: '3个月以上', badge: '资深用户' },
] as const;

export const MOCK_ATTITUDE_OPTIONS = [
    { value: 'recommend', label: '推荐', icon: '👍', color: 'green' },
    { value: 'not_recommend', label: '不推荐', icon: '👎', color: 'red' },
    { value: 'optional', label: '可选', icon: '🤔', color: 'gray' },
] as const;

export const MOCK_QUICK_TAGS = {
    positive: ['防胀气有效', '易清洗', '宝宝接受度高', '性价比高', '颜值高', '耐用'],
    negative: ['胀气没改善', '难清洗', '宝宝不接受', '价格贵', '容易坏', '漏奶'],
};
