/**
 * 用户系统类型定义
 * 宝妈说 - 决策导向的用户体系
 */

// ============ 用户身份 ============

/** 用户基础信息 */
export interface UserProfile {
    id: string;
    nickname: string;
    avatar: string;
    phone?: string;
    identity: 'mom' | 'dad' | 'pregnant' | 'preparing';
    city?: string;
    createdAt: string;
}

/** 用户等级 */
export interface UserLevel {
    level: number;
    name: string;
    exp: number;
    nextLevelExp: number;
}

// ============ 宝宝档案 ============

/** 过敏史记录 */
export interface AllergyRecord {
    type: 'food' | 'drug' | 'other';
    name: string;
    severity: 'mild' | 'moderate' | 'severe';
}

/** 特殊体质标记枚举 */
export type SpecialCondition =
    | 'eczema'           // 湿疹体质
    | 'sensitive_skin'   // 敏感肌
    | 'lactose_intolerant' // 乳糖不耐
    | 'premature'        // 早产儿
    | 'reflux'           // 吐奶严重
    | 'colic';           // 肠绞痛

/** 宝宝档案 */
export interface BabyProfile {
    id: string;
    name: string;
    avatar: string;
    gender: 'boy' | 'girl';
    birthDate: string;
    isDefault: boolean;
    // 精准计算
    ageMonths: number;
    ageDays: number;
    // 特殊情况
    allergies: AllergyRecord[];
    conditions: SpecialCondition[];
}

// ============ 影响力数据 ============

/** 成就徽章 (Achievement) */
export interface Achievement {
    id: string;
    name: string;
    icon: string;
    description: string;
    earnedAt?: string;
    isLocked: boolean;
}

/** 影响力统计 */
export interface InfluenceStats {
    totalReviews: number;      // 评价总数
    helpfulCount: number;      // 被点有用次数
    resonateCount: number;     // 共鸣投票数
    helpedMoms: number;        // 帮助宝妈人数
    topContributor: boolean;   // 是否优质贡献者
}

// ============ 决策历史 ============

/** 决策链条 - 换掉了什么，留下了什么 */
export interface DecisionChain {
    productId: string;
    productName: string;
    productImage: string;
    action: 'kept' | 'replaced' | 'abandoned';
    usageDays: number;
    replacedBy?: string;       // 被什么替代
    replacedFrom?: string;     // 替代了什么
    reviewId?: string;
}

// ============ 收益钱包 ============

/** 收益记录 */
export interface EarningsRecord {
    id: string;
    type: 'cps' | 'review_bonus' | 'invite' | 'activity';
    amount: number;
    description: string;
    createdAt: string;
    status: 'pending' | 'settled' | 'withdrawn';
}

/** 钱包信息 (WalletInfo) */
export interface WalletInfo {
    todayEarnings: number;       // 今日预估收益
    totalEarnings: number;       // 累计总收益
    withdrawable: number;        // 可提现金额
    pendingSettlement: number;   // 待结算金额
}

// ============ 导出汇总 ============

/** 完整用户数据 */
export interface FullUserData {
    profile: UserProfile;
    level: UserLevel;
    babies: BabyProfile[];
    influence: InfluenceStats;
    achievements: Achievement[]; // Renamed from badges
    decisionHistory: DecisionChain[];
    wallet: WalletInfo;          // Renamed type usage
}

/** 特殊体质映射 */
export const CONDITION_LABELS: Record<SpecialCondition, string> = {
    eczema: '湿疹体质',
    sensitive_skin: '敏感肌',
    lactose_intolerant: '乳糖不耐',
    premature: '早产儿',
    reflux: '吐奶',
    colic: '肠绞痛',
};
