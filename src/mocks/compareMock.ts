/**
 * 产品对比 Mock 数据
 */

import type { CompareProduct, CompareDimension, CompareParams } from '@/services/compareService';

export const MOCK_COMPARE_PRODUCTS: (CompareProduct | null)[] = [
    {
        id: 'p1',
        name: 'Comotomo可么多么硅胶奶瓶',
        brand: 'Comotomo',
        image: '🍼',
        price: 128,
        originalPrice: 189,
        rating: 4.8,
        reviewCount: 234,
        recommendRate: 82,
        stillUsingRate: 81,
        repurchaseRate: 38,
        pros: ['奶嘴柔软度接近母乳（89%）', '防胀气效果明显（76%）', '宽口设计易清洗（68%）'],
        cons: ['价格偏高（32%）', '奶嘴偏软流速快（18%）', '硅胶易沾灰（15%）'],
    },
    {
        id: 'p2',
        name: 'Dr.Brown布朗博士防胀气奶瓶',
        brand: 'Dr.Brown',
        image: '🍼',
        price: 98,
        originalPrice: 158,
        rating: 4.6,
        reviewCount: 189,
        recommendRate: 76,
        stillUsingRate: 74,
        repurchaseRate: 32,
        pros: ['专利导管防胀气（82%）', '医生推荐率高（71%）', '价格相对实惠（65%）'],
        cons: ['配件多清洗麻烦（45%）', '导管容易堵（28%）', '奶嘴偏硬（22%）'],
    },
    null,
];

export const MOCK_DIMENSIONS: CompareDimension[] = [
    { id: 'd1', name: '防胀气效果', scores: [4.7, 4.5, null], unit: '分' },
    { id: 'd2', name: '宝宝接受度', scores: [4.6, 4.3, null], unit: '分' },
    { id: 'd3', name: '清洗难度', scores: [4.8, 4.2, null], unit: '分' },
    { id: 'd4', name: '耐用性', scores: [4.4, 4.6, null], unit: '分' },
    { id: 'd5', name: '性价比', scores: [4.3, 4.5, null], unit: '分' },
];

export const MOCK_PARAMS: CompareParams[] = [
    { name: '材质', values: ['硅胶', 'PP', null] },
    { name: '容量', values: ['150ml/250ml', '120ml/240ml', null] },
    { name: '适用月龄', values: ['0-18个月', '0-12个月', null] },
    { name: '防胀气设计', values: ['硅胶瓶身', '专利导管', null] },
    { name: '奶嘴型号', values: ['慢速/中速', '0-4级', null] },
    { name: '产地', values: ['韩国', '美国', null] },
];

export const MOCK_ALTERNATIVES: CompareProduct[] = [
    { id: 'p3', name: 'NUK自然实感奶瓶', brand: 'NUK', image: '🍼', price: 78, originalPrice: 108, rating: 4.5, reviewCount: 156, recommendRate: 72, stillUsingRate: 68, repurchaseRate: 29, pros: [], cons: [] },
    { id: 'p4', name: 'Pigeon贝亲奶瓶', brand: 'Pigeon', image: '🍼', price: 68, originalPrice: 89, rating: 4.4, reviewCount: 203, recommendRate: 70, stillUsingRate: 65, repurchaseRate: 26, pros: [], cons: [] },
];
