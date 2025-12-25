/**
 * 宝妈说 - Mock 产品数据
 */

import type { Product, ProductListItem } from '@/types/product';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'pigeon-wide-160',
        brand: '贝亲',
        name: '自然实感宽口玻璃奶瓶 160ml',
        category: 'bottle',
        capacity: '160ml',
        material: '玻璃',
        neckType: 'wide',
        priceRange: '80-120',
        imageUrl: '/products/pigeon-wide.jpg',
        recommendRate: 87,
        reviewCount: 156,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 89, url: '#', isOfficial: true },
            { platform: 'tmall', name: '天猫旗舰店', price: 92, url: '#', isOfficial: true },
            { platform: 'pdd', name: '拼多多', price: 79, url: '#', isOfficial: false },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'pigeon-wide-240',
        brand: '贝亲',
        name: '自然实感宽口玻璃奶瓶 240ml',
        category: 'bottle',
        capacity: '240ml',
        material: '玻璃',
        neckType: 'wide',
        priceRange: '100-140',
        imageUrl: '/products/pigeon-wide-240.jpg',
        recommendRate: 85,
        reviewCount: 98,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 109, url: '#', isOfficial: true },
            { platform: 'tmall', name: '天猫旗舰店', price: 112, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'comotomo-150',
        brand: '可么多么',
        name: '硅胶奶瓶 150ml',
        category: 'bottle',
        capacity: '150ml',
        material: '硅胶',
        neckType: 'wide',
        priceRange: '120-180',
        imageUrl: '/products/comotomo.jpg',
        recommendRate: 72,
        reviewCount: 98,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 158, url: '#', isOfficial: true },
            { platform: 'tmall', name: '天猫旗舰店', price: 168, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'comotomo-250',
        brand: '可么多么',
        name: '硅胶奶瓶 250ml',
        category: 'bottle',
        capacity: '250ml',
        material: '硅胶',
        neckType: 'wide',
        priceRange: '140-200',
        imageUrl: '/products/comotomo-250.jpg',
        recommendRate: 70,
        reviewCount: 67,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 178, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'philips-natural',
        brand: '新安怡',
        name: '自然原生玻璃奶瓶 125ml',
        category: 'bottle',
        capacity: '125ml',
        material: '玻璃',
        neckType: 'wide',
        priceRange: '90-130',
        imageUrl: '/products/philips.jpg',
        recommendRate: 81,
        reviewCount: 124,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 99, url: '#', isOfficial: true },
            { platform: 'tmall', name: '天猫旗舰店', price: 109, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'dr-browns-wide',
        brand: '布朗博士',
        name: '防胀气宽口奶瓶 150ml',
        category: 'bottle',
        capacity: '150ml',
        material: 'PPSU',
        neckType: 'wide',
        priceRange: '100-150',
        imageUrl: '/products/dr-browns.jpg',
        recommendRate: 85,
        reviewCount: 89,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 129, url: '#', isOfficial: true },
            { platform: 'tmall', name: '天猫旗舰店', price: 139, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'nuk-nature',
        brand: 'NUK',
        name: '自然母感宽口奶瓶 150ml',
        category: 'bottle',
        capacity: '150ml',
        material: 'PPSU',
        neckType: 'wide',
        priceRange: '80-120',
        imageUrl: '/products/nuk.jpg',
        recommendRate: 78,
        reviewCount: 56,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 89, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'shixi-wide',
        brand: '世喜',
        name: '防胀气玻璃奶瓶 150ml',
        category: 'bottle',
        capacity: '150ml',
        material: '玻璃',
        neckType: 'wide',
        priceRange: '130-180',
        imageUrl: '/products/shixi.jpg',
        recommendRate: 83,
        reviewCount: 45,
        buyLinks: [
            { platform: 'tmall', name: '天猫旗舰店', price: 158, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
];

// 奶嘴数据
export const MOCK_NIPPLES: Product[] = [
    {
        id: 'pigeon-nipple-ss',
        brand: '贝亲',
        name: '自然实感奶嘴 SS号',
        category: 'nipple',
        priceRange: '30-50',
        imageUrl: '/products/pigeon-nipple.jpg',
        recommendRate: 88,
        reviewCount: 234,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 39, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'pigeon-nipple-s',
        brand: '贝亲',
        name: '自然实感奶嘴 S号',
        category: 'nipple',
        priceRange: '30-50',
        imageUrl: '/products/pigeon-nipple-s.jpg',
        recommendRate: 86,
        reviewCount: 189,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 39, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'comotomo-nipple',
        brand: '可么多么',
        name: '硅胶奶嘴 慢流速',
        category: 'nipple',
        priceRange: '50-80',
        imageUrl: '/products/comotomo-nipple.jpg',
        recommendRate: 74,
        reviewCount: 78,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 68, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
];

// 配件数据
export const MOCK_ACCESSORIES: Product[] = [
    {
        id: 'dr-browns-valve',
        brand: '布朗博士',
        name: '防胀气阀门 2只装',
        category: 'accessory',
        priceRange: '30-50',
        imageUrl: '/products/dr-browns-valve.jpg',
        recommendRate: 82,
        reviewCount: 67,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 39, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
    {
        id: 'pigeon-adapter',
        brand: '贝亲',
        name: '奶瓶转换盖',
        category: 'accessory',
        priceRange: '20-40',
        imageUrl: '/products/pigeon-adapter.jpg',
        recommendRate: 79,
        reviewCount: 45,
        buyLinks: [
            { platform: 'jd', name: '京东自营', price: 29, url: '#', isOfficial: true },
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-12-20',
    },
];

// 获取简化版产品列表
export const getProductListItems = (products: Product[]): ProductListItem[] => {
    return products.map(p => ({
        id: p.id,
        brand: p.brand,
        name: p.name,
        category: p.category,
        imageUrl: p.imageUrl,
        priceRange: p.priceRange,
        recommendRate: p.recommendRate,
        reviewCount: p.reviewCount,
    }));
};

// 获取所有产品
export const getAllProducts = (): Product[] => {
    return [...MOCK_PRODUCTS, ...MOCK_NIPPLES, ...MOCK_ACCESSORIES];
};

// 按分类获取产品
export const getProductsByCategory = (category: 'bottle' | 'nipple' | 'accessory'): Product[] => {
    switch (category) {
        case 'bottle': return MOCK_PRODUCTS;
        case 'nipple': return MOCK_NIPPLES;
        case 'accessory': return MOCK_ACCESSORIES;
    }
};

// 根据ID获取产品
export const getProductById = (id: string): Product | undefined => {
    return getAllProducts().find(p => p.id === id);
};
