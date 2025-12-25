/**
 * 使用指南 Mock 数据
 */

/** 使用指南分类 */
export interface UsageCategory {
    id: string;
    name: string;
    icon: string;
    count: number;
}

/** 使用指南文章 */
export interface UsageGuide {
    id: string;
    categoryId: string;
    title: string;
    summary: string;
    coverImage: string;
    readCount: number;
    helpfulCount: number;
    createdAt: string;
    tags: string[];
}

/** 常见问题 */
export interface FAQ {
    id: string;
    categoryId: string;
    question: string;
    answer: string;
    helpfulCount: number;
}

// ============ Mock 数据 ============

export const USAGE_CATEGORIES: UsageCategory[] = [
    { id: 'bottle', name: '奶瓶使用', icon: '🍼', count: 12 },
    { id: 'nipple', name: '奶嘴选择', icon: '🔘', count: 8 },
    { id: 'clean', name: '清洁消毒', icon: '🧹', count: 6 },
    { id: 'feed', name: '喂养技巧', icon: '🤱', count: 10 },
    { id: 'transition', name: '转奶过渡', icon: '🔄', count: 5 },
    { id: 'storage', name: '母乳存储', icon: '❄️', count: 4 },
];

export const USAGE_GUIDES: UsageGuide[] = [
    {
        id: 'g1',
        categoryId: 'bottle',
        title: '新手妈妈必看：奶瓶的正确使用方法',
        summary: '从开箱到第一次使用，手把手教你正确使用奶瓶，避免常见错误。',
        coverImage: '📖',
        readCount: 12500,
        helpfulCount: 3200,
        createdAt: '2024-12-15',
        tags: ['新手必看', '基础教程'],
    },
    {
        id: 'g2',
        categoryId: 'bottle',
        title: '奶瓶的温度控制：如何测试奶温？',
        summary: '过烫会烫伤宝宝，过凉会影响吸收。学会正确测试奶温很重要。',
        coverImage: '🌡️',
        readCount: 8900,
        helpfulCount: 2100,
        createdAt: '2024-12-10',
        tags: ['温度控制', '安全知识'],
    },
    {
        id: 'g3',
        categoryId: 'nipple',
        title: '奶嘴型号怎么选？S/M/L/LL区别详解',
        summary: '不同月龄的宝宝需要不同流速的奶嘴，选错可能导致呛奶或吃不饱。',
        coverImage: '🔘',
        readCount: 15600,
        helpfulCount: 4500,
        createdAt: '2024-12-08',
        tags: ['奶嘴科普', '月龄对照'],
    },
    {
        id: 'g4',
        categoryId: 'clean',
        title: '奶瓶清洗消毒全攻略：5种方法对比',
        summary: '煮沸、蒸汽、紫外线、消毒液、微波炉，哪种方法最适合你？',
        coverImage: '🧼',
        readCount: 11200,
        helpfulCount: 2800,
        createdAt: '2024-12-05',
        tags: ['清洁消毒', '对比测评'],
    },
    {
        id: 'g5',
        categoryId: 'feed',
        title: '宝宝吃奶总是呛到？可能是这些原因',
        summary: '呛奶是很多新手妈妈的困扰，本文分析5个常见原因和解决方法。',
        coverImage: '😮',
        readCount: 9800,
        helpfulCount: 2400,
        createdAt: '2024-12-01',
        tags: ['喂养问题', '呛奶'],
    },
    {
        id: 'g6',
        categoryId: 'transition',
        title: '母乳转奶粉：如何让宝宝顺利过渡',
        summary: '从全母乳到混合喂养或纯奶粉，过渡期需要注意这些事项。',
        coverImage: '🔄',
        readCount: 7500,
        helpfulCount: 1900,
        createdAt: '2024-11-28',
        tags: ['转奶', '混合喂养'],
    },
];

export const USAGE_FAQS: FAQ[] = [
    {
        id: 'f1',
        categoryId: 'bottle',
        question: '新买的奶瓶需要消毒多久？',
        answer: '新奶瓶建议煮沸消毒5-10分钟，之后每次使用后3-5分钟即可。PPSU和硅胶材质耐高温，玻璃奶瓶注意不要冷热骤变。',
        helpfulCount: 456,
    },
    {
        id: 'f2',
        categoryId: 'bottle',
        question: '奶瓶多久需要更换？',
        answer: '玻璃奶瓶无破损可长期使用；PPSU奶瓶建议6个月更换；硅胶奶瓶出现发黄、变形时需更换。奶嘴建议1-2个月更换一次。',
        helpfulCount: 389,
    },
    {
        id: 'f3',
        categoryId: 'nipple',
        question: '宝宝吃奶太快/太慢怎么办？',
        answer: '吃得太快可能奶嘴孔太大，换小一号；吃得太慢且烦躁可能孔太小，换大一号。每次喂奶15-20分钟为宜。',
        helpfulCount: 523,
    },
    {
        id: 'f4',
        categoryId: 'clean',
        question: '奶瓶刷多久换一次？',
        answer: '海绵刷建议1个月更换，硅胶刷可用2-3个月。刷毛变形、发霉或有异味时需立即更换。',
        helpfulCount: 234,
    },
    {
        id: 'f5',
        categoryId: 'feed',
        question: '宝宝总是胀气怎么办？',
        answer: '1. 检查奶嘴流速是否合适；2. 喂奶时奶瓶倾斜让奶嘴充满奶液；3. 喂完后拍嗝；4. 考虑换防胀气奶瓶。',
        helpfulCount: 678,
    },
    {
        id: 'f6',
        categoryId: 'feed',
        question: '宝宝拒绝奶瓶怎么办？',
        answer: '1. 让其他人喂（不是妈妈）；2. 在宝宝困倦时尝试；3. 换接近母乳感的奶嘴；4. 先用奶嘴沾母乳让宝宝熟悉味道。',
        helpfulCount: 892,
    },
];
