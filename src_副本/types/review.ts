/**
 * 宝妈说 - 决策导向评价类型定义
 * 核心差异：使用时长、推荐态度、替换记录、弃用标识
 */

// ============ 核心枚举 ============

/** 推荐态度 - 决策核心指标 */
export type RecommendAttitude = 'recommend' | 'not_recommend' | 'optional';

/** 宝宝月龄范围 */
export type BabyAgeRange = '0-3' | '3-6' | '6-12' | '12-24' | '24+';

/** 使用时长分段 */
export type UsageDuration =
    | 'less_than_week'   // 不足1周
    | 'one_month'        // 1个月
    | 'three_months'     // 3个月
    | 'six_months'       // 半年
    | 'over_year';       // 1年以上

/** 避坑场景 */
export type PitfallScenario =
    | 'bloating'         // 胀气
    | 'rejection'        // 拒奶
    | 'leaking'          // 漏奶
    | 'quality'          // 质量问题
    | 'false_advertising' // 虚假宣传
    | 'low_usage';       // 使用率低/闲置

/** 评价状态 */
export type ReviewStatus = 'pending' | 'approved' | 'rejected';

// ============ 核心评价模型 ============

/** 决策导向评价 - 完整版 */
export interface DecisionReview {
    id: string;
    productId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    status: ReviewStatus;

    // 【关键可信度指标】
    usageDuration: UsageDuration;      // 使用时长
    usageDays: number;                 // 精确使用天数
    babyAgeWhenUsed: BabyAgeRange;     // 使用时宝宝月龄

    // 【态度明确】
    attitude: RecommendAttitude;       // 推荐态度
    summary: string;                   // 一句话总结（≤50字）

    // 【决策维度评分】1-5星
    ratings: {
        antiColic: number;               // 防胀气效果
        babyAcceptance: number;          // 宝宝接受度
        easyToClean: number;             // 清洗难度
        valueForMoney: number;           // 性价比
        durability: number;              // 耐用性
    };

    // 【替换记录 - 证明对比过】
    replacement?: {
        fromProductId?: string;          // 原产品ID
        fromProductName: string;         // 原产品名称
        reason: string;                  // 替换原因
    };

    // 【真实使用状态】
    stillInUse: boolean;               // 是否仍在使用
    abandoned?: {                      // 弃用信息
        reason: string;                  // 弃用原因
        afterDays: number;               // 使用多少天后弃用
    };
    wouldRepurchase: 'yes' | 'no' | 'maybe';  // 是否回购

    // 【详细内容】
    content: string;                   // 详细评价内容
    images: string[];                  // 图片URL列表
    tags: string[];                    // 标签

    // 【场景标签】
    scenarios: string[];               // 使用场景

    // 【互动数据】
    helpfulCount: number;              // 有用数
    commentCount: number;              // 评论数

    // 【追评】
    followUps?: FollowUpReview[];

    // 【购买凭证】
    purchaseVerified: boolean;         // 是否有购买凭证
}

/** 追评 */
export interface FollowUpReview {
    id: string;
    reviewId: string;
    createdAt: string;
    afterDays: number;                 // 追评时已使用天数
    content: string;
    images: string[];
    attitudeChanged?: RecommendAttitude; // 态度是否改变
}

// ============ 避坑榜模型 ============

/** 避坑产品 */
export interface PitfallProduct {
    id: string;
    productId: string;
    productName: string;
    brandName: string;
    imageUrl: string;

    // 【避坑数据】
    notRecommendCount: number;         // 不推荐人数
    abandonedRate: number;             // 弃用率 (0-100)
    totalReviewCount: number;          // 总评价数

    // 【避坑场景】
    scenarios: PitfallScenario[];

    // 【高频问题统计】
    topIssues: {
        issue: string;                   // 问题描述
        count: number;                   // 反馈人数
        percentage: number;              // 占比
    }[];

    // 【典型负面反馈】
    typicalFeedback: {
        userName: string;
        babyAge: string;
        usageDays: number;
        content: string;
    };

    // 【替代推荐】
    alternativeProductId?: string;
    alternativeProductName?: string;
    alternativeRecommendRate?: number;

    // 【月龄分布】
    ageDistribution: {
        ageRange: BabyAgeRange;
        notRecommendCount: number;
    }[];

    // 【排名】
    rank: number;
    severity: 'high' | 'medium' | 'low';
}

/** 避坑榜单 */
export interface PitfallList {
    ageRange?: BabyAgeRange;
    scenario?: PitfallScenario;
    items: PitfallProduct[];
    updatedAt: string;
}

// ============ 产品统计模型 ============

/** 产品评价统计 */
export interface ProductReviewStats {
    productId: string;
    totalReviews: number;

    // 推荐态度分布
    recommendCount: number;
    notRecommendCount: number;
    optionalCount: number;
    recommendRate: number;             // 推荐率 0-100

    // 使用状态统计
    stillInUseCount: number;
    stillInUseRate: number;
    abandonedCount: number;
    abandonedRate: number;
    repurchaseCount: number;

    // 使用时长分布
    usageOver30Days: number;
    usageOver30DaysRate: number;

    // 维度平均分
    avgRatings: {
        antiColic: number;
        babyAcceptance: number;
        easyToClean: number;
        valueForMoney: number;
        durability: number;
        overall: number;
    };

    // 按月龄统计
    byAgeRange: {
        ageRange: BabyAgeRange;
        recommendRate: number;
        reviewCount: number;
    }[];
}

// ============ 智能选品问答 ============

/** 选品问题 */
export type SelectQuizQuestion =
    | 'baby_age'        // 宝宝月龄
    | 'main_problem'    // 核心问题
    | 'budget';         // 预算范围

/** 核心问题选项 */
export type MainProblem =
    | 'bloating'        // 胀气严重
    | 'rejection'       // 拒绝奶瓶
    | 'night_feeding'   // 夜奶频繁
    | 'weaning'         // 转奶困难
    | 'first_time';     // 刚开始用

/** 预算范围 */
export type BudgetRange =
    | 'under_100'       // 100以下
    | '100_200'         // 100-200
    | '200_300'         // 200-300
    | 'over_300';       // 300以上

/** 选品问答状态 */
export interface SelectQuizState {
    step: number;
    babyAge?: BabyAgeRange;
    mainProblem?: MainProblem;
    budget?: BudgetRange;
}

/** 选品推荐结果 */
export interface SelectRecommendation {
    productId: string;
    productName: string;
    brandName: string;
    imageUrl: string;
    priceRange: string;

    // 推荐理由
    matchReason: string;               // 为什么推荐
    sameAgeRecommendCount: number;     // 同月龄推荐人数
    problemSolveRate: number;          // 解决问题有效率
    usageOver30DaysRate: number;       // 使用超30天占比

    // 负面提示（透明化）
    warnings?: string[];

    // 评分
    overallRating: number;
    recommendRate: number;
}
