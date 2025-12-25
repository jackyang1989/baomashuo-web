/**
 * 个人中心 Mock 数据
 */

/** 用户信息 */
export interface UserProfile {
    id: string;
    nickname: string;
    avatar: string;
    level: number;
    levelName: string;
    exp: number;
    nextLevelExp: number;
    badge: string;
}

/** 宝宝信息 */
export interface BabyInfo {
    id: string;
    name: string;
    avatar: string;
    birthDate: string;
    ageMonths: number;
    gender: 'boy' | 'girl';
}

/** 我的评价统计 */
export interface ReviewStats {
    total: number;
    helpful: number;
    resonate: number;
}

/** 我的评价项 */
export interface MyReviewItem {
    id: string;
    productName: string;
    productImage: string;
    attitude: 'recommend' | 'not_recommend' | 'optional';
    summary: string;
    createdAt: string;
    helpfulCount: number;
}

/** 我的收藏项 */
export interface FavoriteItem {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    productBrand: string;
    price: number;
    savedAt: string;
}

/** 菜单项 */
export interface MenuItem {
    id: string;
    icon: string;
    title: string;
    subtitle?: string;
    link: string;
    badge?: string | number;
}

// ============ Mock 数据 ============

export const MOCK_USER: UserProfile = {
    id: 'user-001',
    nickname: '小雨妈妈',
    avatar: '👩',
    level: 5,
    levelName: '金牌宝妈',
    exp: 1250,
    nextLevelExp: 2000,
    badge: '🏆',
};

export const MOCK_BABY: BabyInfo = {
    id: 'baby-001',
    name: '小雨',
    avatar: '👶',
    birthDate: '2024-09-15',
    ageMonths: 3,
    gender: 'girl',
};

export const MOCK_REVIEW_STATS: ReviewStats = {
    total: 12,
    helpful: 456,
    resonate: 189,
};

export const MOCK_MY_REVIEWS: MyReviewItem[] = [
    {
        id: 'mr1',
        productName: '可么多么硅胶奶瓶 250ml',
        productImage: '🍼',
        attitude: 'recommend',
        summary: '从贝亲换过来，宝宝接受度高，没胀气',
        createdAt: '2024-12-20',
        helpfulCount: 156,
    },
    {
        id: 'mr2',
        productName: '布朗博士防胀气奶瓶',
        productImage: '🍼',
        attitude: 'optional',
        summary: '防胀气有效但清洗太麻烦',
        createdAt: '2024-12-15',
        helpfulCount: 67,
    },
];

export const MOCK_FAVORITES: FavoriteItem[] = [
    {
        id: 'fav1',
        productId: 'comotomo-250',
        productName: '可么多么硅胶奶瓶 250ml',
        productImage: '🍼',
        productBrand: 'Comotomo',
        price: 128,
        savedAt: '2024-12-18',
    },
    {
        id: 'fav2',
        productId: 'nuk-wide',
        productName: 'NUK自然实感宽口径奶瓶',
        productImage: '🍼',
        productBrand: 'NUK',
        price: 78,
        savedAt: '2024-12-16',
    },
];

export const MENU_ITEMS: MenuItem[] = [
    { id: 'reviews', icon: '📝', title: '我的评价', subtitle: '12条评价', link: '/me/reviews' },
    { id: 'favorites', icon: '❤️', title: '我的收藏', subtitle: '8件商品', link: '/me/favorites' },
    { id: 'orders', icon: '📦', title: '我的订单', link: '/me/orders' },
    { id: 'coupons', icon: '🎫', title: '优惠券', badge: 3, link: '/me/coupons' },
    { id: 'settings', icon: '⚙️', title: '设置', link: '/me/settings' },
    { id: 'help', icon: '❓', title: '帮助与反馈', link: '/me/help' },
];
