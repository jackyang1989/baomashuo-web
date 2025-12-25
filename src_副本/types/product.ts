/**
 * 宝妈说 - 产品与评价类型定义
 * Product and Review Schema v1.0
 */

// ==========================================
// 1. 基础枚举类型
// ==========================================

/** 宝宝月龄段 */
export type BabyAgeRange = '0-3' | '3-6' | '6-12' | '12+';

/** 产品分类 */
export type ProductCategory = 'bottle' | 'nipple' | 'accessory';

/** 推荐态度 */
export type RecommendType = 'recommend' | 'not_recommend';

/** 使用时长 */
export type UsageDuration = '3days' | '1week' | '1month' | '3months+';

/** 常见问题类型 */
export type IssueType = 'bloat' | 'reject' | 'leak' | 'clean' | 'other';

/** 购买平台 */
export type PlatformType = 'jd' | 'tmall' | 'pdd' | 'official';

// ==========================================
// 2. 产品相关类型
// ==========================================

/** 购买链接 */
export interface BuyLink {
    platform: PlatformType;
    name: string;
    price: number;
    url: string;
    isOfficial: boolean;
}

/** 产品基本信息 */
export interface Product {
    id: string;
    brand: string;
    name: string;
    category: ProductCategory;
    capacity?: string;        // 奶瓶容量，如 "160ml"
    material?: string;        // 材质，如 "玻璃", "PPSU"
    neckType?: 'wide' | 'standard';  // 口径类型
    priceRange: string;       // 价格区间，如 "80-120"
    imageUrl: string;

    // 统计数据（计算得出）
    recommendRate: number;    // 推荐率百分比
    reviewCount: number;      // 评价总数

    // CPS 购买链接
    buyLinks: BuyLink[];

    // 元数据
    createdAt: string;
    updatedAt: string;
}

/** 产品列表项（简化版，用于列表展示） */
export interface ProductListItem {
    id: string;
    brand: string;
    name: string;
    category: ProductCategory;
    imageUrl: string;
    priceRange: string;
    recommendRate: number;
    reviewCount: number;
}

// ==========================================
// 3. 评价相关类型
// ==========================================

/** 评价基本信息 */
export interface Review {
    id: string;
    productId: string;

    // 必填信息
    babyAge: BabyAgeRange;
    recommend: RecommendType;
    comment: string;          // 一句话感受（20字）

    // 选填信息
    usageDuration?: UsageDuration;
    issues?: IssueType[];
    imageUrl?: string;

    // 统计数据
    helpfulCount: number;     // 有用数
    meeTooCount: number;      // "我也遇到"数

    // 元数据
    createdAt: string;

    // 追评（可选）
    followUp?: {
        comment: string;
        createdAt: string;
    };
}

/** 提交评价表单 */
export interface ReviewSubmitForm {
    productId: string;
    babyAge: BabyAgeRange;
    recommend: RecommendType;
    comment: string;
    usageDuration?: UsageDuration;
    issues?: IssueType[];
    imageUrl?: string;
}

// ==========================================
// 4. 避坑榜类型
// ==========================================

/** 避坑产品 */
export interface PitfallProduct {
    productId: string;
    product: ProductListItem;
    notRecommendRate: number;   // 不推荐率
    notRecommendCount: number;  // 不推荐数
    topReasons: IssueType[];    // 主要问题
    recentReviews: Review[];    // 最近负面评价
}

// ==========================================
// 5. 用户相关类型
// ==========================================

/** 用户宝宝资料 */
export interface BabyProfile {
    ageRange: BabyAgeRange;
    feedingType?: 'breast' | 'formula' | 'mixed';
    issues?: IssueType[];
}

// ==========================================
// 6. 工具函数
// ==========================================

/** 计算月龄段显示文案 */
export const getAgeRangeLabel = (age: BabyAgeRange): string => {
    const labels: Record<BabyAgeRange, string> = {
        '0-3': '0-3个月',
        '3-6': '3-6个月',
        '6-12': '6-12个月',
        '12+': '12个月以上',
    };
    return labels[age];
};

/** 获取问题类型显示文案 */
export const getIssueLabel = (issue: IssueType): string => {
    const labels: Record<IssueType, string> = {
        bloat: '胀气',
        reject: '拒奶',
        leak: '漏奶',
        clean: '清洗麻烦',
        other: '其他问题',
    };
    return labels[issue];
};

/** 获取使用时长显示文案 */
export const getDurationLabel = (duration: UsageDuration): string => {
    const labels: Record<UsageDuration, string> = {
        '3days': '3天内',
        '1week': '1周',
        '1month': '1个月',
        '3months+': '3个月以上',
    };
    return labels[duration];
};

/** 获取平台显示文案 */
export const getPlatformLabel = (platform: PlatformType): string => {
    const labels: Record<PlatformType, string> = {
        jd: '京东',
        tmall: '天猫',
        pdd: '拼多多',
        official: '官方旗舰店',
    };
    return labels[platform];
};

/** 获取分类显示文案 */
export const getCategoryLabel = (category: ProductCategory): string => {
    const labels: Record<ProductCategory, string> = {
        bottle: '奶瓶',
        nipple: '奶嘴',
        accessory: '配件',
    };
    return labels[category];
};
