/**
 * 首页服务层
 * 处理决策入口、避坑警示、热门问题、真实反馈等
 */

// ============ 类型定义 ============

export interface DecisionEntry {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    desc: string;
    color: string;
    badge?: string;
    href: string;
}

export interface PitfallAlert {
    product: string;
    issue: string;
    userCount: number;
    severity: 'high' | 'medium' | 'low';
}

export interface HotQuestion {
    category: string;
    question: string;
    answers: number;
    realUsers: number;
    ageGroup: string;
}

export interface FeedbackUser {
    name: string;
    avatar: string;
    level: string;
    babyAge: string;
    useDays: number;
}

export interface FeedbackProduct {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
}

export interface RealFeedback {
    id: string;
    user: FeedbackUser;
    product: FeedbackProduct;
    rating: 'recommend' | 'not_recommend' | 'optional';
    summary: string;
    content: string;
    tags: string[];
    replaceFrom?: string;
    replaceReason?: string;
    abandoned?: boolean;
    helpful: number;
    comments: number;
}

export interface QuickTool {
    emoji: string;
    title: string;
    users: string;
    href: string;
}

// ============ Mock 数据 ============

const DECISION_ENTRIES: DecisionEntry[] = [
    { id: 'select', icon: '❓', title: '怎么选', subtitle: '选前决策', desc: '同月龄真实反馈', color: '#3B82F6', badge: '最高频', href: '/select' },
    { id: 'usage', icon: '📖', title: '怎么用', subtitle: '使用过程', desc: '避免错误用法', color: '#8B5CF6', href: '/usage' },
    { id: 'review', icon: '✅', title: '值不值', subtitle: '真实评价', desc: '用过的才知道', color: '#10B981', badge: '最真实', href: '/review' },
    { id: 'pitfalls', icon: '⚠️', title: '避坑榜', subtitle: '负反馈', desc: '哪些别买', color: '#EF4444', badge: '独家', href: '/pitfalls' },
];

const PITFALL_ALERTS: PitfallAlert[] = [
    { product: 'XX品牌防胀气奶瓶', issue: '32%的3-6个月宝宝仍然胀气严重', userCount: 78, severity: 'high' },
    { product: 'YY电动吸奶器', issue: '使用1个月后故障率高达45%', userCount: 124, severity: 'high' },
];

const HOT_QUESTIONS: HotQuestion[] = [
    { category: '奶瓶怎么选', question: 'PPSU和玻璃奶瓶怎么选？', answers: 234, realUsers: 156, ageGroup: '0-3个月' },
    { category: '奶嘴怎么选', question: '宝宝拒绝奶嘴怎么办？', answers: 189, realUsers: 123, ageGroup: '3-6个月' },
];

const REAL_FEEDBACKS: RealFeedback[] = [
    {
        id: 'fb1',
        user: { name: '小雨妈妈', avatar: '👩', level: 'Lv5', babyAge: '3个月宝宝', useDays: 45 },
        product: { id: 'p1', name: 'Comotomo可么多么奶瓶', brand: 'Comotomo', image: '🍼', price: 128, originalPrice: 189, rating: 4.8, reviewCount: 234 },
        rating: 'recommend',
        summary: '从180ml用到现在，宝宝接受度高，没胀气',
        content: '用了45天，宝宝一直很喜欢，奶嘴柔软度接近母乳，转奶很顺利。清洗也方便，瓶身宽口设计...',
        tags: ['防胀气有效', '易清洗', '宝宝接受度高'],
        replaceFrom: 'XX品牌玻璃奶瓶',
        replaceReason: '之前那款胀气严重',
        helpful: 234,
        comments: 56,
    },
    {
        id: 'fb2',
        user: { name: '晴天妈妈', avatar: '👱‍♀️', level: 'Lv3', babyAge: '5个月宝宝', useDays: 15 },
        product: { id: 'p2', name: 'babycare辅食碗', brand: 'babycare', image: '🥣', price: 68, originalPrice: 118, rating: 3.2, reviewCount: 189 },
        rating: 'not_recommend',
        summary: '吸盘不牢，宝宝一拉就掉，已闲置',
        content: '买回来用了3次就不用了，吸盘根本吸不住，宝宝一拽就掉。本来想着吸盘设计能防止打翻...',
        tags: ['吸盘不牢', '容易打翻', '性价比低'],
        abandoned: true,
        helpful: 156,
        comments: 34,
    },
];

const QUICK_TOOLS: QuickTool[] = [
    { emoji: '🍼', title: '3分钟选奶瓶', users: '2.3万人用过', href: '/select' },
    { emoji: '📋', title: '同月龄必备清单', users: '5.6万人收藏', href: '/lists' },
    { emoji: '⚖️', title: '品牌对比工具', users: '1.8万人用过', href: '/select/compare' },
];

// ============ Service ============

class HomeService {
    async getDecisionEntries(): Promise<DecisionEntry[]> {
        return DECISION_ENTRIES;
    }

    async getPitfallAlerts(ageGroup?: string): Promise<PitfallAlert[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(PITFALL_ALERTS), 100);
        });
    }

    async getHotQuestions(ageGroup?: string): Promise<HotQuestion[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(HOT_QUESTIONS), 100);
        });
    }

    async getRealFeedbacks(ageGroup?: string, limit?: number): Promise<RealFeedback[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(REAL_FEEDBACKS.slice(0, limit || 10)), 200);
        });
    }

    async getQuickTools(): Promise<QuickTool[]> {
        return QUICK_TOOLS;
    }
}

export const homeService = new HomeService();
