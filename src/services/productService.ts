/**
 * 产品服务 - 深度数据驱动决策
 * 核心理念：所有数据来源于"真实宝妈反馈"，拒绝官方卖点
 */
import type { BabyAgeRange } from '@/types/review';

// ============ 类型定义 ============

/** 决策信号灯状态 */
export type DecisionSignal = 'recommend' | 'caution' | 'avoid';

/** 链接深度分析结果 */
export interface LinkAnalysisResult {
    productId: string | null;
    matched: boolean;
    // 全网差评分析
    negativeReviewRate: number;         // 全网差评率 %
    negativeReviewCount: number;        // 差评数量
    // 闲置分析
    idleDaysMedian: number;             // 闲置天数中位数
    idleRate: number;                   // 闲置率 %
    // 高频槽点词云
    complaintKeywords: { word: string; count: number; severity: 'high' | 'medium' | 'low' }[];
    // 数据来源统计
    totalMomContributors: number;       // 贡献数据的宝妈总数
    lastUpdated: string;
}

/** 决策路线图 - 用户从哪里来 */
export interface DecisionRoute {
    fromProduct: string;
    fromBrand: string;
    switchCount: number;        // 切换人数
    switchRate: number;         // 占比 %
    mainReason: string;         // 主要切换原因
}

/** 弃用原因深度拆解 */
export interface AbandonReason {
    reason: string;
    count: number;
    percentage: number;
    severity: 'critical' | 'major' | 'minor';
    typicalFeedback: string;    // 典型用户原话
}

/** AI 决策总结 - 基于宝妈反馈 */
export interface AISummary {
    signal: DecisionSignal;
    signalText: string;
    signalReason: string;
    // 宝妈反馈总结（非官方卖点）
    momFeedbackPros: string[];   // "宝妈反馈：..."
    momFeedbackCons: string[];   // "宝妈反馈：..."
    lastUpdated: string;
    basedOnCount: number;
}

/** 使用留存统计 */
export interface UsageRetention {
    day7: number;
    day30: number;
    day90: number;
    stillInUseCount: number;
}

/** 决策维度评分 */
export interface DecisionDimension {
    key: string;
    label: string;
    score: number;
    distribution: number[];
    momComment: string;         // 宝妈反馈一句话总结
}

/** 避坑警示 */
export interface PitfallAlert {
    isPitfall: boolean;
    rank?: number;
    mainIssue?: string;
    notRecommendRate?: number;
    abandonedCount?: number;
}

/** 决策路径评价 */
export interface MomReview {
    id: string;
    userName: string;
    avatar: string;
    babyAge: string;
    usageDays: number;
    attitude: 'recommend' | 'not_recommend' | 'optional';
    summary: string;
    content: string;
    decisionPath: {
        type: 'switched_from' | 'idle' | 'repurchased' | 'first_buy';
        fromProduct?: string;
        fromBrand?: string;
        reason?: string;
    };
    resonateCount: number;
    createdAt: string;
}

/** 高频标签 */
export interface FrequentTag {
    text: string;
    count: number;
    type: 'positive' | 'negative';
    momQuote?: string;          // 宝妈原话
}

/** 单品决策画像 - 完全数据驱动 */
export interface ProductDecisionProfile {
    id: string;
    brand: string;
    name: string;
    imageUrl: string;
    currentPrice: number;
    originalPrice?: number;

    // 数据公信力
    totalMomContributors: number;   // 贡献数据的宝妈总数
    dataLastUpdated: string;

    // AI 决策总结
    aiSummary: AISummary;

    // 避坑警示
    pitfallAlert: PitfallAlert;

    // 决策路线图 - 用户从哪些竞品切换过来
    decisionRoutes: DecisionRoute[];

    // 弃用原因深度拆解
    abandonReasons: AbandonReason[];

    // 决策维度
    dimensions: DecisionDimension[];

    // 使用留存
    retention: UsageRetention;

    // 核心统计
    stats: {
        totalReviews: number;
        recommendRate: number;
        abandonedRate: number;
        stillInUseRate: number;
        repurchaseRate: number;
        negativeReviewRate: number;
        idleDaysMedian: number;
    };

    // 宝妈评价
    reviews: MomReview[];

    // 高频标签
    topTags: FrequentTag[];
}

// ============ Mock 数据 ============

const MOCK_PROFILES: Record<string, ProductDecisionProfile> = {
    'comotomo-250': {
        id: 'comotomo-250',
        brand: 'Comotomo',
        name: '可么多么硅胶奶瓶 250ml',
        imageUrl: '/images/products/comotomo.png',
        currentPrice: 128,
        originalPrice: 189,

        totalMomContributors: 452,
        dataLastUpdated: '2024-12-22 10:30',

        aiSummary: {
            signal: 'recommend',
            signalText: '值得买',
            signalReason: '宝妈反馈：85%推荐，30天留存率81%，胀气问题解决率89%',
            momFeedbackPros: [
                '宝妈反馈：89%表示防胀气效果明显改善',
                '宝妈反馈：92%认为硅胶材质接近母乳触感，宝宝易接受',
                '宝妈反馈：78%觉得宽口设计夜奶清洗方便',
            ],
            momFeedbackCons: [
                '宝妈反馈：价格偏高，性价比一般（67人提及）',
                '宝妈反馈：容量250ml偏小，需频繁冲奶（34人提及）',
                '宝妈反馈：长期使用硅胶会发黄（23人提及）',
            ],
            lastUpdated: '2024-12-22',
            basedOnCount: 452,
        },

        pitfallAlert: {
            isPitfall: false,
        },

        decisionRoutes: [
            { fromProduct: '贝亲玻璃奶瓶', fromBrand: '贝亲', switchCount: 89, switchRate: 28, mainReason: '胀气问题' },
            { fromProduct: '布朗博士防胀气', fromBrand: "Dr.Brown's", switchCount: 67, switchRate: 21, mainReason: '配件清洗太麻烦' },
            { fromProduct: 'NUK宽口奶瓶', fromBrand: 'NUK', switchCount: 45, switchRate: 14, mainReason: '奶嘴太硬宝宝不接受' },
            { fromProduct: '首次购买', fromBrand: '-', switchCount: 118, switchRate: 37, mainReason: '朋友/网红推荐' },
        ],

        abandonReasons: [
            { reason: '硅胶发黄', count: 23, percentage: 42, severity: 'minor', typicalFeedback: '"用了3个月开始发黄，虽然不影响使用但看着不舒服"' },
            { reason: '容量不够', count: 18, percentage: 33, severity: 'minor', typicalFeedback: '"宝宝6个月后一次要喝200ml，250ml太小了"' },
            { reason: '价格太贵回购负担', count: 14, percentage: 25, severity: 'minor', typicalFeedback: '"一个128，买三个就快400了，有点心疼"' },
        ],

        dimensions: [
            {
                key: 'safety',
                label: '安全性',
                score: 4.8,
                distribution: [1, 2, 5, 22, 70],
                momComment: '宝妈反馈：材质安全放心',
            },
            {
                key: 'babyAcceptance',
                label: '宝宝接受度',
                score: 4.7,
                distribution: [2, 3, 8, 25, 62],
                momComment: '宝妈反馈：转奶顺利不排斥',
            },
            {
                key: 'easyClean',
                label: '清洗难度',
                score: 4.5,
                distribution: [3, 5, 10, 30, 52],
                momComment: '宝妈反馈：宽口好清洗',
            },
            {
                key: 'value',
                label: '性价比',
                score: 3.8,
                distribution: [8, 12, 20, 35, 25],
                momComment: '宝妈反馈：贵但值得',
            },
        ],

        retention: {
            day7: 95,
            day30: 81,
            day90: 67,
            stillInUseCount: 303,
        },

        stats: {
            totalReviews: 452,
            recommendRate: 85,
            abandonedRate: 12,
            stillInUseRate: 67,
            repurchaseRate: 45,
            negativeReviewRate: 8,
            idleDaysMedian: 0,
        },

        reviews: [
            {
                id: 'r1',
                userName: '小雨妈妈',
                avatar: '👩',
                babyAge: '3个月',
                usageDays: 45,
                attitude: 'recommend',
                summary: '从贝亲换过来，胀气问题解决了',
                content: '之前用贝亲玻璃瓶宝宝老是胀气，换了这个用了45天真的好了很多...',
                decisionPath: {
                    type: 'switched_from',
                    fromProduct: '贝亲玻璃奶瓶',
                    fromBrand: '贝亲',
                    reason: '胀气严重',
                },
                resonateCount: 234,
                createdAt: '2024-12-20',
            },
            {
                id: 'r2',
                userName: '暖暖妈',
                avatar: '👱‍♀️',
                babyAge: '5个月',
                usageDays: 60,
                attitude: 'recommend',
                summary: '回购第二个了，夜奶神器',
                content: '第一个用了两个月没问题，直接回购。夜奶单手操作很方便...',
                decisionPath: {
                    type: 'repurchased',
                    reason: '用得好直接回购',
                },
                resonateCount: 156,
                createdAt: '2024-12-18',
            },
        ],

        topTags: [
            { text: '防胀气有效', count: 189, type: 'positive', momQuote: '"用了之后明显不胀气了"' },
            { text: '宝宝接受度高', count: 167, type: 'positive', momQuote: '"转奶很顺利"' },
            { text: '易清洗', count: 145, type: 'positive', momQuote: '"宽口洗起来方便"' },
            { text: '价格偏高', count: 67, type: 'negative', momQuote: '"一个快130有点贵"' },
            { text: '容量偏小', count: 34, type: 'negative', momQuote: '"大月龄不够喝"' },
        ],
    },

    'xx-bottle': {
        id: 'xx-bottle',
        brand: 'XX品牌',
        name: 'XX品牌防胀气奶瓶 240ml',
        imageUrl: '/images/products/xx-bottle.png',
        currentPrice: 89,
        originalPrice: 129,

        totalMomContributors: 318,
        dataLastUpdated: '2024-12-22 10:30',

        aiSummary: {
            signal: 'avoid',
            signalText: '谨慎购买',
            signalReason: '宝妈反馈：32%明确不推荐，弃用率高达45%，闲置中位数仅18天',
            momFeedbackPros: [
                '宝妈反馈：价格实惠，性价比高（89人提及）',
                '宝妈反馈：容量大减少冲奶次数（56人提及）',
            ],
            momFeedbackCons: [
                '宝妈反馈：防胀气效果差，32%仍然胀气（102人提及）',
                '宝妈反馈：奶嘴偏硬宝宝不接受（89人提及）',
                '宝妈反馈：配件复杂清洗麻烦（67人提及）',
                '宝妈反馈：密封性差容易漏奶（45人提及）',
            ],
            lastUpdated: '2024-12-22',
            basedOnCount: 318,
        },

        pitfallAlert: {
            isPitfall: true,
            rank: 1,
            mainIssue: '宝妈反馈：32%的3-6个月宝宝仍然胀气严重',
            notRecommendRate: 45,
            abandonedCount: 143,
        },

        decisionRoutes: [
            { fromProduct: '首次购买', fromBrand: '-', switchCount: 189, switchRate: 59, mainReason: '价格便宜尝试' },
            { fromProduct: '贝亲标准口', fromBrand: '贝亲', switchCount: 67, switchRate: 21, mainReason: '想试试防胀气' },
            { fromProduct: '其他品牌', fromBrand: '其他', switchCount: 62, switchRate: 20, mainReason: '网红推荐' },
        ],

        abandonReasons: [
            { reason: '奶嘴太硬宝宝不接受', count: 89, percentage: 62, severity: 'critical', typicalFeedback: '"宝宝含着就哭，怎么都不肯吃"' },
            { reason: '仍然胀气没效果', count: 67, percentage: 47, severity: 'critical', typicalFeedback: '"冲着防胀气买的，结果还是胀，感觉被骗了"' },
            { reason: '刻度看不清', count: 45, percentage: 31, severity: 'major', typicalFeedback: '"半夜冲奶根本看不清刻度"' },
            { reason: '配件太多清洗麻烦', count: 34, percentage: 24, severity: 'major', typicalFeedback: '"每次洗奶瓶要拆7个配件"' },
            { reason: '漏奶密封性差', count: 28, percentage: 20, severity: 'major', typicalFeedback: '"放包里漏了一包，衣服全湿了"' },
        ],

        dimensions: [
            { key: 'safety', label: '安全性', score: 4.2, distribution: [5, 8, 15, 35, 37], momComment: '宝妈反馈：材质尚可' },
            { key: 'babyAcceptance', label: '宝宝接受度', score: 2.8, distribution: [22, 25, 23, 20, 10], momComment: '宝妈反馈：奶嘴太硬' },
            { key: 'easyClean', label: '清洗难度', score: 2.5, distribution: [28, 25, 22, 18, 7], momComment: '宝妈反馈：配件太多' },
            { key: 'value', label: '性价比', score: 3.8, distribution: [8, 12, 20, 30, 30], momComment: '宝妈反馈：便宜但不好用' },
        ],

        retention: {
            day7: 78,
            day30: 45,
            day90: 22,
            stillInUseCount: 70,
        },

        stats: {
            totalReviews: 318,
            recommendRate: 55,
            abandonedRate: 45,
            stillInUseRate: 22,
            repurchaseRate: 8,
            negativeReviewRate: 32,
            idleDaysMedian: 18,
        },

        reviews: [
            {
                id: 'r4',
                userName: '晴天妈妈',
                avatar: '👩‍🦰',
                babyAge: '4个月',
                usageDays: 15,
                attitude: 'not_recommend',
                summary: '买了就后悔，胀气根本没改善',
                content: '冲着防胀气买的，结果用了两周宝宝还是胀气，而且配件太多洗起来很麻烦...',
                decisionPath: {
                    type: 'idle',
                    reason: '已闲置，换了可么多么',
                },
                resonateCount: 312,
                createdAt: '2024-12-19',
            },
            {
                id: 'r5',
                userName: '甜甜妈',
                avatar: '👩‍🦱',
                babyAge: '2个月',
                usageDays: 7,
                attitude: 'not_recommend',
                summary: '奶嘴太硬宝宝拒绝',
                content: '宝宝含着就哭，试了一周都不肯接受，只能闲置了...',
                decisionPath: {
                    type: 'idle',
                    reason: '已闲置，宝宝不接受',
                },
                resonateCount: 245,
                createdAt: '2024-12-17',
            },
        ],

        topTags: [
            { text: '价格实惠', count: 89, type: 'positive', momQuote: '"便宜是便宜"' },
            { text: '仍然胀气', count: 102, type: 'negative', momQuote: '"防胀气名不副实"' },
            { text: '奶嘴太硬', count: 89, type: 'negative', momQuote: '"比母乳硬太多"' },
            { text: '清洗麻烦', count: 67, type: 'negative', momQuote: '"配件太多"' },
            { text: '已闲置', count: 143, type: 'negative', momQuote: '"吃灰中"' },
        ],
    },
};

// ============ 服务类 ============

class ProductService {
    /**
     * 获取单品决策画像
     */
    async getDecisionProfile(id: string): Promise<ProductDecisionProfile | null> {
        return MOCK_PROFILES[id] || null;
    }

    /**
     * 深度分析链接
     * 模拟对淘宝/京东链接的深度分析
     */
    async analyzeLink(link: string): Promise<LinkAnalysisResult> {
        const lowerLink = link.toLowerCase();

        // 模拟链接识别
        let productId: string | null = null;
        let matched = false;

        if (lowerLink.includes('comotomo') || lowerLink.includes('可么多么')) {
            productId = 'comotomo-250';
            matched = true;
        } else if (lowerLink.includes('xx品牌') || lowerLink.includes('xx奶瓶')) {
            productId = 'xx-bottle';
            matched = true;
        }

        // 返回分析结果
        if (productId === 'comotomo-250') {
            return {
                productId,
                matched: true,
                negativeReviewRate: 8,
                negativeReviewCount: 36,
                idleDaysMedian: 0,
                idleRate: 12,
                complaintKeywords: [
                    { word: '价格贵', count: 67, severity: 'low' },
                    { word: '容量小', count: 34, severity: 'low' },
                    { word: '发黄', count: 23, severity: 'low' },
                ],
                totalMomContributors: 452,
                lastUpdated: '2024-12-22 10:30',
            };
        } else if (productId === 'xx-bottle') {
            return {
                productId,
                matched: true,
                negativeReviewRate: 32,
                negativeReviewCount: 102,
                idleDaysMedian: 18,
                idleRate: 45,
                complaintKeywords: [
                    { word: '奶嘴太硬', count: 89, severity: 'high' },
                    { word: '仍然胀气', count: 67, severity: 'high' },
                    { word: '刻度不清', count: 45, severity: 'medium' },
                    { word: '清洗麻烦', count: 34, severity: 'medium' },
                    { word: '漏奶', count: 28, severity: 'medium' },
                ],
                totalMomContributors: 318,
                lastUpdated: '2024-12-22 10:30',
            };
        }

        return {
            productId: null,
            matched: false,
            negativeReviewRate: 0,
            negativeReviewCount: 0,
            idleDaysMedian: 0,
            idleRate: 0,
            complaintKeywords: [],
            totalMomContributors: 0,
            lastUpdated: '',
        };
    }

    /**
     * 通过链接或搜索词解析产品（简化版）
     */
    async parseProductFromInput(input: string): Promise<{ productId: string | null; matched: boolean }> {
        const analysis = await this.analyzeLink(input);
        return { productId: analysis.productId, matched: analysis.matched };
    }

    /**
     * 用户共鸣投票
     */
    async resonate(reviewId: string): Promise<{ success: boolean; newCount: number }> {
        return { success: true, newCount: 100 };
    }
}

export const productService = new ProductService();
export type {
    ProductDecisionProfile,
    AISummary,
    MomReview,
    DecisionDimension,
    DecisionRoute,
    AbandonReason,
    LinkAnalysisResult,
    FrequentTag,
};
