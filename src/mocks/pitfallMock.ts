/**
 * 避坑榜 Mock 数据
 */

import type { PitfallProduct, ScenarioGroup, PitfallReason, CategoryOption } from '@/services/pitfallService';

export const MOCK_AGE_GROUPS = ['0-3个月', '3-6个月', '6-12个月', '1-2岁'];

export const MOCK_CATEGORIES: CategoryOption[] = [
    { id: 'all', name: '全部', count: 23 },
    { id: 'bottle', name: '奶瓶', count: 8 },
    { id: 'bowl', name: '辅食碗', count: 5 },
    { id: 'toys', name: '玩具', count: 4 },
    { id: 'warmer', name: '温奶器', count: 3 },
];

export const MOCK_PITFALL_PRODUCTS: PitfallProduct[] = [
    {
        id: 'pit1',
        rank: 1,
        name: 'XX品牌防胀气奶瓶',
        brand: 'XX品牌',
        image: '🍼',
        notRecommendCount: 78,
        totalReviews: 145,
        notRecommendRate: 54,
        severity: 'high',
        mainIssues: [
            { issue: '仍然胀气严重', percent: 42, count: 32 },
            { issue: '奶嘴太硬宝宝不接受', percent: 36, count: 28 },
            { issue: '漏奶严重', percent: 22, count: 18 },
        ],
        typicalCase: {
            user: '小雨妈妈',
            babyAge: '3个月宝宝',
            useDays: 15,
            summary: '宣传防胀气，但我家宝宝用了还是胀气，后来换了YY品牌就好了',
        },
        alternative: { name: 'YY品牌防胀气奶瓶', recommendRate: 85, price: 98 },
    },
    {
        id: 'pit2',
        rank: 2,
        name: 'ZZ电动吸奶器',
        brand: 'ZZ品牌',
        image: '🤱',
        notRecommendCount: 124,
        totalReviews: 189,
        notRecommendRate: 66,
        severity: 'high',
        mainIssues: [
            { issue: '使用1个月后故障', percent: 45, count: 56 },
            { issue: '吸力不足', percent: 32, count: 40 },
            { issue: '噪音太大', percent: 23, count: 28 },
        ],
        typicalCase: {
            user: '晴天妈妈',
            babyAge: '产后2个月',
            useDays: 30,
            summary: '用了一个月就坏了，客服说过保不给换，气死了',
        },
        alternative: { name: 'AA品牌吸奶器', recommendRate: 78, price: 299 },
    },
    {
        id: 'pit3',
        rank: 3,
        name: 'BB吸盘辅食碗',
        brand: 'BB品牌',
        image: '🥣',
        notRecommendCount: 89,
        totalReviews: 156,
        notRecommendRate: 57,
        severity: 'medium',
        mainIssues: [
            { issue: '吸盘不牢固', percent: 68, count: 60 },
            { issue: '容易打翻', percent: 45, count: 40 },
            { issue: '清洗麻烦', percent: 25, count: 22 },
        ],
        typicalCase: {
            user: '暖暖妈咪',
            babyAge: '6个月宝宝',
            useDays: 7,
            summary: '吸盘根本吸不住，宝宝一拉就掉，用了3次就闲置了',
        },
        alternative: { name: 'CC品牌辅食碗', recommendRate: 82, price: 68 },
    },
    {
        id: 'pit4',
        rank: 4,
        name: 'DD温奶器',
        brand: 'DD品牌',
        image: '🔥',
        notRecommendCount: 67,
        totalReviews: 203,
        notRecommendRate: 33,
        severity: 'medium',
        mainIssues: [
            { issue: '实际使用率低', percent: 68, count: 46 },
            { issue: '占空间', percent: 45, count: 30 },
            { issue: '功能鸡肋', percent: 28, count: 19 },
        ],
        typicalCase: {
            user: '萌萌妈',
            babyAge: '4个月宝宝',
            useDays: 90,
            summary: '买回来用了几次就闲置了，直接用热水泡也能解决，不值得买',
        },
    },
];

export const MOCK_SCENARIOS: ScenarioGroup[] = [
    {
        scenario: '夜奶场景',
        icon: '🌙',
        pitfalls: [
            { product: '需要插电的温奶器', reason: '夜里插电不方便', count: 45 },
            { product: '玻璃奶瓶', reason: '夜里容易摔碎', count: 38 },
        ],
    },
    {
        scenario: '外出场景',
        icon: '🚗',
        pitfalls: [
            { product: '体积过大的消毒器', reason: '完全带不出去', count: 56 },
            { product: '易碎的玻璃制品', reason: '外出容易摔坏', count: 42 },
        ],
    },
    {
        scenario: '辅食期',
        icon: '🍚',
        pitfalls: [
            { product: '吸盘不牢的碗', reason: '宝宝会拉掉打翻', count: 89 },
            { product: '太深的碗', reason: '宝宝够不到底部', count: 34 },
        ],
    },
];

export const MOCK_REASONS: PitfallReason[] = [
    { reason: '虚假宣传', description: '宣传功能与实际效果不符', count: 156, examples: ['防胀气无效', '抗菌功能存疑', '智能功能鸡肋'] },
    { reason: '质量问题', description: '使用一段时间后出现故障', count: 124, examples: ['短期内损坏', '材质劣化', '功能失效'] },
    { reason: '设计缺陷', description: '产品设计不合理影响使用', count: 98, examples: ['吸盘不牢', '容易打翻', '清洗困难'] },
    { reason: '实际使用率低', description: '买了发现用不上，闲置率高', count: 203, examples: ['功能重复', '占空间', '使用场景少'] },
];
