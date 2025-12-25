/**
 * 宝妈说 - 首页 Mock 数据
 */
import type { BabyAgeRange, PitfallScenario } from '@/types/review';

// 五大决策入口
export const MAIN_ENTRIES = [
    {
        id: 'select',
        title: '怎么选',
        subtitle: '选前决策',
        desc: '同月龄真实反馈',
        color: 'from-blue-500 to-cyan-500',
        badge: '最高频',
        href: '/select',
        icon: 'HelpCircle',
    },
    {
        id: 'usage',
        title: '怎么用',
        subtitle: '使用过程',
        desc: '避免错误用法',
        color: 'from-purple-500 to-pink-500',
        badge: null,
        href: '/usage',
        icon: 'BookOpen',
    },
    {
        id: 'review',
        title: '值不值',
        subtitle: '真实评价',
        desc: '用过的才知道',
        color: 'from-green-500 to-emerald-500',
        badge: '最真实',
        href: '/review',
        icon: 'CheckCircle',
    },
    {
        id: 'pitfall',
        title: '避坑榜',
        subtitle: '负反馈',
        desc: '哪些别买',
        color: 'from-red-500 to-orange-500',
        badge: '独家',
        href: '/pitfalls',
        icon: 'AlertTriangle',
    },
];

// 热门决策问题
export const HOT_QUESTIONS = [
    {
        id: 'q1',
        category: '奶瓶怎么选',
        question: 'PPSU和玻璃奶瓶怎么选？',
        answers: 234,
        realUsers: 156,
        age: '0-3个月' as const,
    },
    {
        id: 'q2',
        category: '奶嘴怎么选',
        question: '宝宝拒绝奶嘴怎么办？',
        answers: 189,
        realUsers: 123,
        age: '3-6个月' as const,
    },
    {
        id: 'q3',
        category: '配件怎么选',
        question: '奶瓶刷必须买吗？哪种好用？',
        answers: 145,
        realUsers: 98,
        age: '通用' as const,
    },
];

// 避坑警示（首页简化版）
export const PITFALL_ALERTS = [
    {
        id: 'p1',
        product: 'XX品牌防胀气奶瓶',
        issue: '32%的3-6个月宝宝仍然胀气',
        userCount: 78,
        severity: 'high' as const,
    },
    {
        id: 'p2',
        product: 'YY电动吸奶器',
        issue: '使用1个月后故障率高达45%',
        userCount: 124,
        severity: 'high' as const,
    },
    {
        id: 'p3',
        product: 'ZZ温奶器',
        issue: '实际使用率低，68%闲置',
        userCount: 203,
        severity: 'medium' as const,
    },
];

// 同月龄真实反馈
export const REAL_FEEDBACKS = [
    {
        id: 'f1',
        user: { name: '小雨妈妈', avatar: '👩', age: '3个月宝宝', useDays: 45 },
        product: 'Comotomo可么多么奶瓶',
        rating: 'recommend' as const,
        summary: '从180ml用到现在，宝宝接受度高，没胀气',
        detail: '用了45天，宝宝一直很喜欢，奶嘴柔软度接近母乳，转奶很顺利...',
        tags: ['防胀气有效', '易清洗', '宝宝接受度高'],
        helpful: 234,
        replaceFrom: 'XX品牌玻璃奶瓶',
        replaceReason: '之前那款胀气严重',
    },
    {
        id: 'f2',
        user: { name: '晴天妈妈', avatar: '👱‍♀️', age: '5个月宝宝', useDays: 90 },
        product: 'babycare辅食碗',
        rating: 'not_recommend' as const,
        summary: '吸盘不牢，宝宝一拉就掉，已闲置',
        detail: '买回来用了3次就不用了，吸盘根本吸不住，宝宝一拽就掉...',
        tags: ['吸盘不牢', '容易打翻', '性价比低'],
        helpful: 156,
        abandoned: true,
    },
    {
        id: 'f3',
        user: { name: '暖暖妈咪', avatar: '🙋‍♀️', age: '4个月宝宝', useDays: 30 },
        product: 'NUK奶瓶消毒器',
        rating: 'neutral' as const,
        summary: '功能正常，但占地方，使用频率不高',
        detail: '消毒效果还行，但体积太大，后来直接用开水煮了...',
        tags: ['占空间', '使用频率低', '可替代'],
        helpful: 89,
        actualUsage: '低频',
    },
];

// 快速决策工具
export const QUICK_TOOLS = [
    { id: 't1', title: '3分钟选奶瓶', users: '2.3万人用过', icon: '🍼', href: '/select/quiz' },
    { id: 't2', title: '同月龄必备清单', users: '5.6万人收藏', icon: '📋', href: '/lists' },
    { id: 't3', title: '品牌对比工具', users: '1.8万人用过', icon: '⚖️', href: '/select/compare' },
];

// 底部导航
export const TAB_BAR_ITEMS = [
    { id: 'decision', label: '决策', icon: 'HelpCircle', href: '/' },
    { id: 'pitfall', label: '避坑', icon: 'AlertTriangle', badge: '新', href: '/pitfalls' },
    { id: 'list', label: '清单', icon: 'ClipboardList', href: '/lists' },
    { id: 'circle', label: '圈子', icon: 'Users', href: '/community' },
    { id: 'profile', label: '我的', icon: '👤', isEmoji: true, href: '/me' },
];

// 月龄选项
export const BABY_AGE_OPTIONS: { value: BabyAgeRange; label: string }[] = [
    { value: '0-3', label: '0-3个月' },
    { value: '3-6', label: '3-6个月' },
    { value: '6-12', label: '6-12个月' },
    { value: '12-24', label: '1-2岁' },
];
