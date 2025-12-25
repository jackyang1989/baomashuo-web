/**
 * 选品 Mock 数据
 */

import type { SelectProblem, ProductRecommendation, SelectFeatureConfig } from '@/types/select';

export const MOCK_SELECT_CONFIG: SelectFeatureConfig = {
    enableCategoryStep: false,
    enableBudgetStep: false,
    enableScenarioStep: false,
    defaultCategory: 'bottle',
    maxRecommendations: 5,
    showCompareButton: true,
};

export const MOCK_PROBLEMS: SelectProblem[] = [
    { id: 'colic', icon: '😢', title: '宝宝胀气', description: '喝奶后胀气、哭闹', userCount: 2345, color: '#EF4444' },
    { id: 'refuse', icon: '😤', title: '拒绝奶瓶', description: '不接受奶瓶、抗拒喂奶', userCount: 1890, color: '#F59E0B' },
    { id: 'choke', icon: '💦', title: '呛奶', description: '喝奶时呛咳、流速不合适', userCount: 1567, color: '#3B82F6' },
    { id: 'clean', icon: '🧹', title: '清洗困难', description: '奶瓶不好清洗、藏污纳垢', userCount: 1234, color: '#10B981' },
    { id: 'transition', icon: '🍼', title: '转奶困难', description: '母乳转奶粉不顺利', userCount: 987, color: '#8B5CF6' },
    { id: 'other', icon: '❓', title: '其他问题', description: '选择困难、不知道买哪个', userCount: 654, color: '#6B7280' },
];

export const MOCK_RECOMMENDATIONS: ProductRecommendation[] = [
    {
        id: 'rec1',
        productId: 'p1',
        name: 'Comotomo可么多么硅胶奶瓶',
        brand: 'Comotomo',
        image: '🍼',
        price: 128,
        originalPrice: 189,
        rating: 4.8,
        reviewCount: 234,
        recommendRate: 85,
        matchScore: 95,
        reasons: ['防胀气效果明显', '奶嘴柔软接近母乳', '78%同月龄宝妈推荐'],
        tags: ['防胀气', '高接受度', '易清洗'],
        sameAgeUserCount: 156,
        sameAgeRecommendRate: 78,
    },
    {
        id: 'rec2',
        productId: 'p2',
        name: 'Pigeon贝亲玻璃奶瓶',
        brand: 'Pigeon',
        image: '🍼',
        price: 98,
        originalPrice: 138,
        rating: 4.6,
        reviewCount: 189,
        recommendRate: 79,
        matchScore: 88,
        reasons: ['性价比高', '经典品牌', '玻璃材质安全'],
        tags: ['性价比', '经典', '玻璃'],
        sameAgeUserCount: 134,
        sameAgeRecommendRate: 72,
    },
    {
        id: 'rec3',
        productId: 'p3',
        name: 'Dr.Brown布朗博士防胀气奶瓶',
        brand: "Dr.Brown's",
        image: '🍼',
        price: 118,
        originalPrice: 168,
        rating: 4.5,
        reviewCount: 156,
        recommendRate: 76,
        matchScore: 82,
        reasons: ['导气管设计', '防胀气专利', '清洗稍复杂'],
        tags: ['防胀气', '专利设计'],
        sameAgeUserCount: 98,
        sameAgeRecommendRate: 68,
    },
];
