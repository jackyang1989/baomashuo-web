/**
 * 圈子/社区 Mock 数据
 */

import type { CircleInfo, ActiveUser, Milestone, Announcement, HotTopic, CommunityPost } from '@/services/communityService';

export const MOCK_CIRCLE_INFO: CircleInfo = {
    id: 'c1',
    name: '2024年9月宝宝圈',
    birthMonth: '2024年9月',
    currentAge: '3个月',
    memberCount: 2845,
    todayPosts: 156,
    todayActive: 892,
    rank: 3,
    joinedDays: 89,
};

export const MOCK_ACTIVE_USERS: ActiveUser[] = [
    { id: 'u1', name: '小雨妈妈', avatar: '👩', level: 'Lv5', posts: 89, rank: 1, badge: '👑' },
    { id: 'u2', name: '晴天妈妈', avatar: '👱‍♀️', level: 'Lv4', posts: 67, rank: 2, badge: '🥈' },
    { id: 'u3', name: '暖暖妈咪', avatar: '🙋‍♀️', level: 'Lv4', posts: 54, rank: 3, badge: '🥉' },
];

export const MOCK_MILESTONES: Milestone[] = [
    { id: 'm1', title: '第一次翻身', icon: '🤸', completedCount: 456, totalCount: 2845, percentage: 16, recentUsers: ['小雨妈妈', '晴天妈妈'], tips: '3个月左右开始，侧卧练习很重要' },
    { id: 'm2', title: '认识妈妈', icon: '😊', completedCount: 1234, totalCount: 2845, percentage: 43, recentUsers: ['萌萌妈', '乐乐妈'], tips: '看到妈妈会笑，听到声音会转头' },
    { id: 'm3', title: '抓握玩具', icon: '🤲', completedCount: 892, totalCount: 2845, percentage: 31, recentUsers: ['甜甜妈', '壮壮妈'], tips: '可以准备摇铃等易抓握玩具' },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    { id: 'a1', title: '【本周话题】3个月宝宝睡眠倒退怎么办？', type: 'topic', time: '2小时前', hot: true },
    { id: 'a2', title: '【圈子活动】晒出宝宝第一次翻身视频赢好礼', type: 'activity', time: '1天前', deadline: '还剩3天' },
];

export const MOCK_HOT_TOPICS: HotTopic[] = [
    { id: 't1', name: '宝宝睡眠', icon: '😴', posts: 234, hot: true },
    { id: 't2', name: '辅食添加', icon: '🍚', posts: 189 },
    { id: 't3', name: '翻身训练', icon: '🤸', posts: 167 },
    { id: 't4', name: '玩具推荐', icon: '🧸', posts: 145 },
];

export const MOCK_POSTS: CommunityPost[] = [
    {
        id: 'p1',
        type: 'milestone',
        user: { name: '小雨妈妈', avatar: '👩', level: 'Lv5', isTopUser: true },
        content: '宝宝今天第一次翻身成功了！激动到哭😭 从侧卧练习了两周，今天终于自己翻过去了！',
        images: ['📸', '📸', '📸'],
        milestone: '第一次翻身',
        time: '10分钟前',
        likes: 89,
        comments: 34,
        shares: 12,
        isHot: true,
    },
    {
        id: 'p2',
        type: 'question',
        user: { name: '晴天妈妈', avatar: '👱‍♀️', level: 'Lv3' },
        content: '宝宝最近睡眠倒退严重，晚上醒好几次，白天也不好好睡，姐妹们有什么办法吗？',
        topic: '宝宝睡眠',
        time: '1小时前',
        likes: 45,
        comments: 23,
        hasAcceptedAnswer: false,
        reward: 50,
    },
    {
        id: 'p3',
        type: 'share',
        user: { name: '暖暖妈咪', avatar: '🙋‍♀️', level: 'Lv4' },
        content: '分享一下我家宝宝最喜欢的玩具，这个摇铃真的很好用，宝宝能抓握半小时不松手',
        images: ['📸', '📸'],
        product: { name: 'Fisher-Price摇铃', price: 59, rating: 4.8 },
        time: '2小时前',
        likes: 67,
        comments: 19,
        shares: 8,
        isRecommend: true,
    },
    {
        id: 'p4',
        type: 'daily',
        user: { name: '萌萌妈', avatar: '👩‍🦰', level: 'Lv2' },
        content: '今天宝宝情绪特别好，对着我一直笑，感觉被治愈了💕',
        hasVideo: true,
        time: '3小时前',
        likes: 156,
        comments: 45,
        shares: 23,
    },
    {
        id: 'p5',
        type: 'help',
        user: { name: '甜甜妈', avatar: '👱', level: 'Lv3' },
        content: '求助！宝宝最近不爱吃奶了，每次喂奶都要哄很久，担心营养不够怎么办？',
        topic: '喂养问题',
        time: '5小时前',
        likes: 34,
        comments: 18,
        hasAcceptedAnswer: true,
    },
];
