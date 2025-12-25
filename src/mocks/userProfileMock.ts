/**
 * 用户主页 Mock 数据
 */

import type { UserProfile, UserPost, UserReview, UserAnswer, Follower } from '@/services/userProfileService';

export const MOCK_USER_PROFILE: UserProfile = {
    id: 'u1',
    name: '小雨妈妈',
    avatar: '👩',
    level: 'Lv5',
    levelName: '资深妈妈',
    signature: '记录宝宝成长的每一天 | 真实分享不踩坑 ❤️',
    location: '北京',
    joinDate: '2024年1月',
    badges: [
        { id: 'b1', name: '金牌评价员', icon: '🏅', color: 'from-yellow-400 to-orange-400' },
        { id: 'b2', name: '热心宝妈', icon: '❤️', color: 'from-red-400 to-pink-400' },
        { id: 'b3', name: '活跃榜TOP1', icon: '👑', color: 'from-purple-400 to-pink-400' },
    ],
    babies: [{ id: 'baby1', name: '小雨', age: '3个月', gender: 'girl', emoji: '👶' }],
    stats: { posts: 89, reviews: 156, answers: 45, followers: 2345, following: 234, totalLikes: 5670, helpful: 3456 },
    isVerified: true,
    isExpert: false,
};

export const MOCK_USER_POSTS: UserPost[] = [
    { id: 'p1', type: 'milestone', title: '宝宝今天第一次翻身成功了！', content: '从侧卧练习了两周，今天早上突然自己翻过去了...', images: ['📸', '📸', '📸'], likes: 289, comments: 67, time: '2天前', milestone: { name: '第一次翻身', icon: '🤸' } },
    { id: 'p2', type: 'share', title: '防胀气奶瓶真实使用3个月心得', content: '用了Comotomo三个月，宝宝胀气明显改善...', images: ['📸', '📸'], likes: 456, comments: 89, time: '5天前' },
];

export const MOCK_USER_REVIEWS: UserReview[] = [
    { id: 'r1', product: { name: 'Comotomo奶瓶', image: '🍼', brand: 'Comotomo' }, rating: 'recommend', summary: '防胀气效果确实好，宝宝接受度高', useDays: 45, helpful: 234, time: '1周前' },
    { id: 'r2', product: { name: 'babycare辅食碗', image: '🥣', brand: 'babycare' }, rating: 'not-recommend', summary: '吸盘不牢，已闲置', useDays: 7, helpful: 156, time: '2周前' },
];

export const MOCK_USER_ANSWERS: UserAnswer[] = [
    { id: 'a1', question: '宝宝胀气严重怎么办？', answer: '我的建议是先换防胀气奶瓶试试，然后注意喂奶姿势...', likes: 89, adopted: true, time: '3天前' },
];

export const MOCK_FOLLOWERS: Follower[] = [
    { id: 'f1', name: '晴天妈妈', avatar: '👱‍♀️', mutualFollow: true },
    { id: 'f2', name: '暖暖妈咪', avatar: '🙋‍♀️', mutualFollow: false },
    { id: 'f3', name: '萌萌妈', avatar: '👩‍🦰', mutualFollow: true },
];
