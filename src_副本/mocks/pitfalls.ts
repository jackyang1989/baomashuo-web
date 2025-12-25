/**
 * 宝妈说 - 避坑榜 Mock 数据
 */
import type { PitfallProduct, PitfallScenario, BabyAgeRange } from '@/types/review';

// 避坑场景配置
export const PITFALL_SCENARIOS: { value: PitfallScenario; label: string; icon: string }[] = [
    { value: 'bloating', label: '胀气', icon: '💨' },
    { value: 'rejection', label: '拒奶', icon: '🙅' },
    { value: 'leaking', label: '漏奶', icon: '💧' },
    { value: 'quality', label: '质量差', icon: '💔' },
    { value: 'false_advertising', label: '虚假宣传', icon: '🚫' },
    { value: 'low_usage', label: '闲置率高', icon: '📦' },
];

// 月龄选项
export const AGE_RANGES: { value: BabyAgeRange; label: string }[] = [
    { value: '0-3', label: '0-3个月' },
    { value: '3-6', label: '3-6个月' },
    { value: '6-12', label: '6-12个月' },
    { value: '12-24', label: '1-2岁' },
];

// 避坑产品数据
export const PITFALL_PRODUCTS: PitfallProduct[] = [
    {
        id: 'pitfall-1',
        productId: 'product-xx-bottle',
        productName: 'XX品牌防胀气奶瓶',
        brandName: 'XX品牌',
        imageUrl: '',
        notRecommendCount: 78,
        abandonedRate: 45,
        totalReviewCount: 156,
        scenarios: ['bloating', 'rejection'],
        topIssues: [
            { issue: '仍然胀气严重', count: 50, percentage: 32 },
            { issue: '奶嘴太硬宝宝不接受', count: 44, percentage: 28 },
            { issue: '漏奶严重', count: 30, percentage: 19 },
        ],
        typicalFeedback: {
            userName: '小雨妈妈',
            babyAge: '3个月宝宝',
            usageDays: 15,
            content: '宣传防胀气，结果我家宝宝用了还是胀气，后来换了可么多么就好了',
        },
        alternativeProductId: 'comotomo-150',
        alternativeProductName: 'Comotomo可么多么奶瓶',
        alternativeRecommendRate: 85,
        ageDistribution: [
            { ageRange: '0-3', notRecommendCount: 32 },
            { ageRange: '3-6', notRecommendCount: 28 },
            { ageRange: '6-12', notRecommendCount: 18 },
        ],
        rank: 1,
        severity: 'high',
    },
    {
        id: 'pitfall-2',
        productId: 'product-yy-pump',
        productName: 'YY电动吸奶器',
        brandName: 'YY品牌',
        imageUrl: '',
        notRecommendCount: 124,
        abandonedRate: 52,
        totalReviewCount: 238,
        scenarios: ['quality', 'false_advertising'],
        topIssues: [
            { issue: '使用1个月后故障', count: 107, percentage: 45 },
            { issue: '吸力不稳定', count: 71, percentage: 30 },
            { issue: '噪音太大', count: 48, percentage: 20 },
        ],
        typicalFeedback: {
            userName: '晴天妈妈',
            babyAge: '2个月宝宝',
            usageDays: 35,
            content: '用了一个月就坏了，客服说过保修期，完全是智商税',
        },
        alternativeProductId: 'medela-swing',
        alternativeProductName: '美德乐丝韵电动吸奶器',
        alternativeRecommendRate: 92,
        ageDistribution: [
            { ageRange: '0-3', notRecommendCount: 68 },
            { ageRange: '3-6', notRecommendCount: 42 },
            { ageRange: '6-12', notRecommendCount: 14 },
        ],
        rank: 2,
        severity: 'high',
    },
    {
        id: 'pitfall-3',
        productId: 'product-zz-warmer',
        productName: 'ZZ温奶器',
        brandName: 'ZZ品牌',
        imageUrl: '',
        notRecommendCount: 89,
        abandonedRate: 68,
        totalReviewCount: 312,
        scenarios: ['low_usage', 'quality'],
        topIssues: [
            { issue: '实际使用率极低', count: 212, percentage: 68 },
            { issue: '加热太慢', count: 94, percentage: 30 },
            { issue: '占空间', count: 78, percentage: 25 },
        ],
        typicalFeedback: {
            userName: '暖暖妈咪',
            babyAge: '4个月宝宝',
            usageDays: 60,
            content: '买来后就用了几次，后来发现直接用热水温奶更快，现在完全闲置',
        },
        alternativeProductId: undefined,
        alternativeProductName: '建议直接用热水温奶',
        alternativeRecommendRate: undefined,
        ageDistribution: [
            { ageRange: '0-3', notRecommendCount: 45 },
            { ageRange: '3-6', notRecommendCount: 32 },
            { ageRange: '6-12', notRecommendCount: 12 },
        ],
        rank: 3,
        severity: 'medium',
    },
    {
        id: 'pitfall-4',
        productId: 'product-aa-bowl',
        productName: 'AA辅食碗',
        brandName: 'AA品牌',
        imageUrl: '',
        notRecommendCount: 67,
        abandonedRate: 55,
        totalReviewCount: 145,
        scenarios: ['quality', 'false_advertising'],
        topIssues: [
            { issue: '吸盘不牢固', count: 58, percentage: 40 },
            { issue: '容易打翻', count: 44, percentage: 30 },
            { issue: '材质有异味', count: 29, percentage: 20 },
        ],
        typicalFeedback: {
            userName: '糖糖妈',
            babyAge: '8个月宝宝',
            usageDays: 7,
            content: '吸盘根本吸不住，宝宝一拽就掉，买回来用了3次就闲置了',
        },
        alternativeProductId: 'oxo-bowl',
        alternativeProductName: 'OXO Tot强力吸盘碗',
        alternativeRecommendRate: 88,
        ageDistribution: [
            { ageRange: '6-12', notRecommendCount: 48 },
            { ageRange: '12-24', notRecommendCount: 19 },
        ],
        rank: 4,
        severity: 'medium',
    },
    {
        id: 'pitfall-5',
        productId: 'product-bb-sterilizer',
        productName: 'BB奶瓶消毒柜',
        brandName: 'BB品牌',
        imageUrl: '',
        notRecommendCount: 45,
        abandonedRate: 72,
        totalReviewCount: 189,
        scenarios: ['low_usage', 'quality'],
        topIssues: [
            { issue: '体积太大占空间', count: 98, percentage: 52 },
            { issue: '使用频率低', count: 85, percentage: 45 },
            { issue: '不如开水煮方便', count: 68, percentage: 36 },
        ],
        typicalFeedback: {
            userName: '小米妈妈',
            babyAge: '5个月宝宝',
            usageDays: 30,
            content: '买的时候觉得很有必要，结果发现直接用锅煮更快，后来就吃灰了',
        },
        alternativeProductId: undefined,
        alternativeProductName: '建议用不锈钢锅煮沸消毒',
        alternativeRecommendRate: undefined,
        ageDistribution: [
            { ageRange: '0-3', notRecommendCount: 28 },
            { ageRange: '3-6', notRecommendCount: 12 },
            { ageRange: '6-12', notRecommendCount: 5 },
        ],
        rank: 5,
        severity: 'low',
    },
];

// 按月龄筛选
export function getPitfallsByAge(ageRange: BabyAgeRange): PitfallProduct[] {
    return PITFALL_PRODUCTS.filter(p =>
        p.ageDistribution.some(d => d.ageRange === ageRange && d.notRecommendCount > 0)
    ).sort((a, b) => {
        const aCount = a.ageDistribution.find(d => d.ageRange === ageRange)?.notRecommendCount || 0;
        const bCount = b.ageDistribution.find(d => d.ageRange === ageRange)?.notRecommendCount || 0;
        return bCount - aCount;
    });
}

// 按场景筛选
export function getPitfallsByScenario(scenario: PitfallScenario): PitfallProduct[] {
    return PITFALL_PRODUCTS.filter(p => p.scenarios.includes(scenario))
        .sort((a, b) => b.notRecommendCount - a.notRecommendCount);
}

// 获取所有避坑产品（按不推荐数排序）
export function getAllPitfalls(): PitfallProduct[] {
    return [...PITFALL_PRODUCTS].sort((a, b) => b.notRecommendCount - a.notRecommendCount);
}
