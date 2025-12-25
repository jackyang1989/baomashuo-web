/**
 * 产品服务 - 数据与业务逻辑
 */
import type { BabyAgeRange } from '@/types/review';

// ============ 类型定义 ============

export interface ProductDetail {
    id: string;
    brand: string;
    name: string;
    imageUrl: string;
    images: string[];
    currentPrice: number;
    originalPrice?: number;

    // 评分统计
    rating: number;
    reviewCount: number;
    recommendRate: number;

    // 决策维度评分
    ratings: {
        antiColic: number;
        babyAcceptance: number;
        easyToClean: number;
        valueForMoney: number;
        durability: number;
    };

    // 使用统计
    stats: {
        stillInUseCount: number;
        stillInUseRate: number;
        usageOver30Days: number;
        usageOver30DaysRate: number;
        abandonedRate: number;
        repurchaseRate: number;
    };

    // 按月龄推荐率
    ageRecommendRates: { age: BabyAgeRange; rate: number; count: number }[];

    // 产品特点
    features: string[];

    // 规格
    specs: { label: string; value: string }[];

    // CPS链接
    buyLink: string;
}

// ============ Mock 数据 ============

const MOCK_PRODUCTS: Record<string, ProductDetail> = {
    'comotomo-250': {
        id: 'comotomo-250',
        brand: 'Comotomo',
        name: '可么多么硅胶奶瓶 250ml',
        imageUrl: '/images/products/comotomo-bottle.png',
        images: [],
        currentPrice: 128,
        originalPrice: 189,
        rating: 4.8,
        reviewCount: 234,
        recommendRate: 85,
        ratings: {
            antiColic: 4.7,
            babyAcceptance: 4.9,
            easyToClean: 4.6,
            valueForMoney: 4.3,
            durability: 4.5,
        },
        stats: {
            stillInUseCount: 156,
            stillInUseRate: 67,
            usageOver30Days: 189,
            usageOver30DaysRate: 81,
            abandonedRate: 12,
            repurchaseRate: 45,
        },
        ageRecommendRates: [
            { age: '0-3', rate: 88, count: 89 },
            { age: '3-6', rate: 85, count: 78 },
            { age: '6-12', rate: 79, count: 45 },
        ],
        features: ['防胀气设计', '硅胶材质', '仿母乳奶嘴', '宽口易清洗'],
        specs: [
            { label: '容量', value: '250ml' },
            { label: '材质', value: '医用级硅胶' },
            { label: '适用月龄', value: '0-12个月' },
            { label: '奶嘴流速', value: 'S/M/L可选' },
        ],
        buyLink: 'https://example.com/buy',
    },
    'dr-browns-240': {
        id: 'dr-browns-240',
        brand: "Dr.Brown's",
        name: '布朗博士防胀气奶瓶 240ml',
        imageUrl: '/images/products/dr-browns.png',
        images: [],
        currentPrice: 98,
        originalPrice: 148,
        rating: 4.4,
        reviewCount: 189,
        recommendRate: 79,
        ratings: {
            antiColic: 4.8,
            babyAcceptance: 4.2,
            easyToClean: 3.8,
            valueForMoney: 4.5,
            durability: 4.4,
        },
        stats: {
            stillInUseCount: 112,
            stillInUseRate: 59,
            usageOver30Days: 145,
            usageOver30DaysRate: 77,
            abandonedRate: 18,
            repurchaseRate: 38,
        },
        ageRecommendRates: [
            { age: '0-3', rate: 82, count: 67 },
            { age: '3-6', rate: 78, count: 58 },
            { age: '6-12', rate: 74, count: 34 },
        ],
        features: ['专利导气系统', '医院推荐', '防胀气效果好', '配件可单独购买'],
        specs: [
            { label: '容量', value: '240ml' },
            { label: '材质', value: 'PPSU' },
            { label: '适用月龄', value: '0-24个月' },
            { label: '奶嘴流速', value: '多档可调' },
        ],
        buyLink: 'https://example.com/buy',
    },
};

// ============ 服务类 ============

class ProductService {
    async getDetail(id: string): Promise<ProductDetail | null> {
        // TODO: 替换为真实 API 调用
        return MOCK_PRODUCTS[id] || null;
    }

    async getList(category?: string): Promise<ProductDetail[]> {
        return Object.values(MOCK_PRODUCTS);
    }
}

export const productService = new ProductService();
