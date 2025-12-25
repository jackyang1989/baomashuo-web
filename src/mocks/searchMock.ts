/**
 * 搜索 Mock 数据
 */

import type { HotSearch, SearchProduct, SearchPost, SearchReview, SearchUser, SearchTopic } from '@/services/searchService';

export const MOCK_SEARCH_HISTORY = ['防胀气奶瓶', 'Comotomo', '3个月宝宝翻身', '辅食添加时间'];

export const MOCK_HOT_SEARCHES: HotSearch[] = [
    { id: '1', keyword: '奶瓶怎么选', icon: '🍼', trend: 'up', count: '2.3万' },
    { id: '2', keyword: '宝宝睡眠', icon: '😴', trend: 'hot', count: '1.8万' },
    { id: '3', keyword: '防胀气', icon: '😣', trend: 'up', count: '1.5万' },
    { id: '4', keyword: '辅食添加', icon: '🍚', trend: 'new', count: '1.2万' },
    { id: '5', keyword: 'Comotomo奶瓶', icon: '🍼', trend: 'hot', count: '9876' },
    { id: '6', keyword: '宝宝翻身训练', icon: '🤸', trend: 'up', count: '8765' },
];

export const MOCK_SUGGESTIONS = [
    '防胀气奶瓶推荐',
    '防胀气奶瓶哪个牌子好',
    '防胀气奶瓶真的有用吗',
    '防胀气奶瓶怎么选',
];

export const MOCK_SEARCH_PRODUCTS: SearchProduct[] = [
    { id: 'sp1', name: 'Comotomo可么多么硅胶奶瓶', brand: 'Comotomo', image: '🍼', price: 128, rating: 4.8, reviewCount: 234, recommendRate: 82, tag: '防胀气' },
    { id: 'sp2', name: 'Dr.Brown布朗博士防胀气奶瓶', brand: 'Dr.Brown', image: '🍼', price: 98, rating: 4.6, reviewCount: 189, recommendRate: 76, tag: '防胀气' },
];

export const MOCK_SEARCH_POSTS: SearchPost[] = [
    {
        id: 'post1',
        type: 'share',
        user: { name: '小雨妈妈', avatar: '👩', level: 'Lv5' },
        title: '防胀气奶瓶真实使用3个月心得',
        content: '用了Comotomo三个月，宝宝胀气明显改善，分享一下使用体验...',
        likes: 289,
        comments: 67,
        time: '2天前',
        tags: ['防胀气', '奶瓶推荐'],
    },
    {
        id: 'post2',
        type: 'help',
        user: { name: '晴天妈妈', avatar: '👱‍♀️', level: 'Lv3' },
        title: '求助！宝宝胀气严重怎么办？',
        content: '宝宝3个月了，最近胀气特别严重，换了好几个奶瓶都不行...',
        likes: 45,
        comments: 23,
        time: '5小时前',
        hasAnswer: true,
        reward: 50,
    },
];

export const MOCK_SEARCH_REVIEWS: SearchReview[] = [
    {
        id: 'rev1',
        user: { name: '暖暖妈咪', avatar: '🙋‍♀️', level: 'Lv4', babyAge: '3个月' },
        product: 'Comotomo奶瓶',
        rating: 'recommend',
        summary: '防胀气效果确实好，宝宝接受度高',
        useDays: 45,
        helpful: 234,
    },
];

export const MOCK_SEARCH_USERS: SearchUser[] = [
    {
        id: 'u1',
        name: '小雨妈妈',
        avatar: '👩',
        level: 'Lv5',
        badges: ['金牌评价员', '活跃榜TOP1'],
        followers: 234,
        posts: 89,
    },
];

export const MOCK_SEARCH_TOPICS: SearchTopic[] = [
    { id: 't1', name: '防胀气奶瓶', icon: '🍼', posts: 1234, followers: 5678 },
];
