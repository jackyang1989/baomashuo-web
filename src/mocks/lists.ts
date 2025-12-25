/**
 * 清单页 Mock 数据
 */

/** 清单分类 */
export interface ListCategory {
    id: string;
    title: string;
    emoji: string;
    count: number;
    users: string;
}

/** 清单项目 */
export interface ListItem {
    id: string;
    name: string;
    status: 'must_buy' | 'recommended' | 'not_recommended' | 'optional';
    reason: string;
    price: string;
    recommendRate: number;
}

/** 状态配置 */
export const STATUS_CONFIG = {
    must_buy: { label: '必买', color: 'bg-green-500', textColor: 'text-green-600' },
    recommended: { label: '推荐', color: 'bg-blue-500', textColor: 'text-blue-600' },
    not_recommended: { label: '不推荐', color: 'bg-red-500', textColor: 'text-red-600' },
    optional: { label: '可选', color: 'bg-gray-400', textColor: 'text-gray-600' },
};

/** 清单分类 */
export const LIST_CATEGORIES: ListCategory[] = [
    { id: 'newborn', title: '新生儿必备清单', emoji: '👶', count: 12, users: '3.2万人收藏' },
    { id: 'feeding', title: '喂养工具清单', emoji: '🍼', count: 8, users: '2.5万人收藏' },
    { id: 'sleep', title: '睡眠好物清单', emoji: '😴', count: 6, users: '2.1万人收藏' },
    { id: 'going-out', title: '外出必备清单', emoji: '🚗', count: 8, users: '1.8万人收藏' },
    { id: 'weaning', title: '断奶过渡清单', emoji: '🍃', count: 5, users: '1.2万人收藏' },
];

/** 清单项目 */
export const LIST_ITEMS: ListItem[] = [
    {
        id: '1',
        name: 'Comotomo可么多么奶瓶',
        status: 'must_buy',
        reason: '85%同月龄妈妈推荐，防胀气效果好',
        price: '¥128',
        recommendRate: 85,
    },
    {
        id: '2',
        name: '贝亲奶瓶刷套装',
        status: 'recommended',
        reason: '性价比高，清洗方便',
        price: '¥39',
        recommendRate: 78,
    },
    {
        id: '3',
        name: 'XX品牌温奶器',
        status: 'not_recommended',
        reason: '45%用户反馈加热不均匀',
        price: '¥199',
        recommendRate: 55,
    },
    {
        id: '4',
        name: 'NUK安抚奶嘴',
        status: 'optional',
        reason: '因人而异，部分宝宝不接受',
        price: '¥49',
        recommendRate: 62,
    },
];
