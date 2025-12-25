/**
 * 宝妈说 - Mock 评价数据
 */

import type { Review } from '@/types/product';

export const MOCK_REVIEWS: Review[] = [
    // 贝亲评价
    {
        id: 'rev-001',
        productId: 'pigeon-wide-160',
        babyAge: '0-3',
        recommend: 'recommend',
        comment: '宝宝接受度很高，没有明显胀气，清洗也方便',
        usageDuration: '1month',
        helpfulCount: 23,
        meeTooCount: 15,
        createdAt: '2024-12-20',
    },
    {
        id: 'rev-002',
        productId: 'pigeon-wide-160',
        babyAge: '0-3',
        recommend: 'recommend',
        comment: '第一个奶瓶就选了贝亲，宝宝喝得很好',
        usageDuration: '3months+',
        helpfulCount: 45,
        meeTooCount: 28,
        createdAt: '2024-12-18',
    },
    {
        id: 'rev-003',
        productId: 'pigeon-wide-160',
        babyAge: '3-6',
        recommend: 'recommend',
        comment: '一直用到现在，没换过，很稳定',
        usageDuration: '3months+',
        helpfulCount: 56,
        meeTooCount: 32,
        createdAt: '2024-12-15',
    },

    // 可么多么评价
    {
        id: 'rev-004',
        productId: 'comotomo-150',
        babyAge: '0-3',
        recommend: 'not_recommend',
        comment: '胀气比较明显，硅胶材质清洗起来也麻烦',
        usageDuration: '1week',
        issues: ['bloat', 'clean'],
        helpfulCount: 67,
        meeTooCount: 45,
        createdAt: '2024-12-19',
    },
    {
        id: 'rev-005',
        productId: 'comotomo-150',
        babyAge: '3-6',
        recommend: 'recommend',
        comment: '换了奶嘴后好多了，材质软宝宝喜欢',
        usageDuration: '1month',
        helpfulCount: 34,
        meeTooCount: 12,
        createdAt: '2024-12-17',
    },

    // 新安怡评价
    {
        id: 'rev-006',
        productId: 'philips-natural',
        babyAge: '3-6',
        recommend: 'recommend',
        comment: '从贝亲换过来的，宝宝很快就接受了',
        usageDuration: '1month',
        helpfulCount: 18,
        meeTooCount: 8,
        createdAt: '2024-12-18',
    },
    {
        id: 'rev-007',
        productId: 'philips-natural',
        babyAge: '0-3',
        recommend: 'not_recommend',
        comment: '宝宝不太接受这个奶嘴形状',
        usageDuration: '3days',
        issues: ['reject'],
        helpfulCount: 23,
        meeTooCount: 15,
        createdAt: '2024-12-16',
    },

    // 布朗博士评价
    {
        id: 'rev-008',
        productId: 'dr-browns-wide',
        babyAge: '0-3',
        recommend: 'recommend',
        comment: '防胀气效果确实好，就是配件多清洗麻烦点',
        usageDuration: '3months+',
        issues: ['clean'],
        helpfulCount: 78,
        meeTooCount: 34,
        createdAt: '2024-12-17',
    },
    {
        id: 'rev-009',
        productId: 'dr-browns-wide',
        babyAge: '0-3',
        recommend: 'recommend',
        comment: '宝宝胀气问题解决了，值得入手',
        usageDuration: '1month',
        helpfulCount: 45,
        meeTooCount: 23,
        createdAt: '2024-12-14',
    },

    // 世喜评价
    {
        id: 'rev-010',
        productId: 'shixi-wide',
        babyAge: '0-3',
        recommend: 'recommend',
        comment: '国产良心，防胀气效果不输布朗博士',
        usageDuration: '1month',
        helpfulCount: 34,
        meeTooCount: 18,
        createdAt: '2024-12-13',
    },

    // NUK评价
    {
        id: 'rev-011',
        productId: 'nuk-nature',
        babyAge: '3-6',
        recommend: 'not_recommend',
        comment: '奶嘴形状特殊，宝宝适应不了',
        usageDuration: '1week',
        issues: ['reject'],
        helpfulCount: 29,
        meeTooCount: 21,
        createdAt: '2024-12-12',
    },
];

// 按产品ID获取评价
export const getReviewsByProductId = (productId: string): Review[] => {
    return MOCK_REVIEWS.filter(r => r.productId === productId);
};

// 按月龄获取评价
export const getReviewsByAge = (age: '0-3' | '3-6' | '6-12' | 'all'): Review[] => {
    if (age === 'all') return MOCK_REVIEWS;
    return MOCK_REVIEWS.filter(r => r.babyAge === age);
};

// 获取不推荐的评价（用于避坑榜）
export const getNotRecommendReviews = (): Review[] => {
    return MOCK_REVIEWS.filter(r => r.recommend === 'not_recommend');
};

// 按产品ID统计推荐率
export const getRecommendRateByProductId = (productId: string): number => {
    const reviews = getReviewsByProductId(productId);
    if (reviews.length === 0) return 0;
    const recommendCount = reviews.filter(r => r.recommend === 'recommend').length;
    return Math.round((recommendCount / reviews.length) * 100);
};
