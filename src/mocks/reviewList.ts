/**
 * 评价列表页 Mock 数据
 */

/** 决策路径类型 */
export type DecisionPathType = 'switched_from' | 'idle' | 'repurchased' | 'first_buy';

/** 评价项 */
export interface ReviewListItem {
    id: string;
    productId: string;
    productName: string;
    productBrand: string;
    productImage: string;
    userName: string;
    avatar: string;
    babyAge: string;
    usageDays: number;
    attitude: 'recommend' | 'not_recommend' | 'optional';
    summary: string;
    content: string;
    decisionPath: {
        type: DecisionPathType;
        fromProduct?: string;
        reason?: string;
    };
    resonateCount: number;
    helpfulCount: number;
    createdAt: string;
}

/** 月龄筛选Tab */
export const AGE_TABS = [
    { key: 'all', title: '全部' },
    { key: '0-3', title: '0-3月' },
    { key: '3-6', title: '3-6月' },
    { key: '6-12', title: '6-12月' },
];

/** 评价数据 */
export const REVIEW_LIST: ReviewListItem[] = [
    {
        id: 'r1',
        productId: 'comotomo-250',
        productName: '可么多么硅胶奶瓶 250ml',
        productBrand: 'Comotomo',
        productImage: '🍼',
        userName: '小雨妈妈',
        avatar: '👩',
        babyAge: '3个月',
        usageDays: 45,
        attitude: 'recommend',
        summary: '从贝亲换过来，宝宝接受度高，没胀气',
        content: '之前用的贝亲玻璃奶瓶，宝宝总是胀气不舒服。朋友推荐了可么多么，用了45天真的没胀气了，而且硅胶材质柔软...',
        decisionPath: {
            type: 'switched_from',
            fromProduct: '贝亲玻璃奶瓶',
            reason: '原来那款胀气严重',
        },
        resonateCount: 234,
        helpfulCount: 156,
        createdAt: '2024-12-20',
    },
    {
        id: 'r2',
        productId: 'comotomo-250',
        productName: '可么多么硅胶奶瓶 250ml',
        productBrand: 'Comotomo',
        productImage: '🍼',
        userName: '暖暖妈',
        avatar: '👱‍♀️',
        babyAge: '5个月',
        usageDays: 60,
        attitude: 'recommend',
        summary: '回购第二个了，夜奶神器',
        content: '第一个用了两个月没问题，直接回购了第二个。夜奶的时候单手操作很方便...',
        decisionPath: {
            type: 'repurchased',
            reason: '用得好直接回购',
        },
        resonateCount: 156,
        helpfulCount: 89,
        createdAt: '2024-12-18',
    },
    {
        id: 'r3',
        productId: 'xx-bottle',
        productName: 'XX品牌防胀气奶瓶 240ml',
        productBrand: 'XX品牌',
        productImage: '🍼',
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
        helpfulCount: 245,
        createdAt: '2024-12-19',
    },
    {
        id: 'r4',
        productId: 'dr-browns-240',
        productName: '布朗博士防胀气奶瓶 240ml',
        productBrand: "Dr.Brown's",
        productImage: '🍼',
        userName: '芊芊妈妈',
        avatar: '🙋‍♀️',
        babyAge: '2个月',
        usageDays: 30,
        attitude: 'optional',
        summary: '防胀气有效但清洗太麻烦',
        content: '效果确实不错，宝宝用了一个月没胀气。但就是配件太多了，每次洗奶瓶要拆好多件...',
        decisionPath: {
            type: 'first_buy',
        },
        resonateCount: 89,
        helpfulCount: 67,
        createdAt: '2024-12-15',
    },
];
