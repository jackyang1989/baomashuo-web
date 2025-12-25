/**
 * 话题详情 Mock 数据
 */

import type { TopicInfo, TopicActiveUser, TopicPost, RelatedTopic } from '@/services/topicService';

export const MOCK_TOPIC_INFO: TopicInfo = {
    id: 't1',
    name: '宝宝睡眠',
    icon: '😴',
    description: '分享宝宝睡眠问题、睡眠训练方法、作息调整经验。从新生儿到幼儿，帮助宝宝和妈妈都睡个好觉。',
    stats: { posts: 2345, followers: 18923, todayPosts: 156, totalViews: 123456 },
    tags: ['睡眠训练', '哄睡技巧', '夜醒', '作息规律'],
    moderators: [
        { id: 'm1', name: '育儿专家Lisa', avatar: '👩‍⚕️', role: 'expert' },
        { id: 'm2', name: '小雨妈妈', avatar: '👩', role: 'admin' },
    ],
};

export const MOCK_ACTIVE_USERS: TopicActiveUser[] = [
    { id: 'u1', name: '小雨妈妈', avatar: '👩', posts: 89, badge: '👑' },
    { id: 'u2', name: '晴天妈妈', avatar: '👱‍♀️', posts: 67, badge: '🥈' },
    { id: 'u3', name: '暖暖妈咪', avatar: '🙋‍♀️', posts: 54, badge: '🥉' },
];

export const MOCK_TOPIC_POSTS: TopicPost[] = [
    { id: 'p1', type: 'share', user: { name: '小雨妈妈', avatar: '👩', level: 'Lv5' }, title: '从每小时醒到一觉到天亮，我用3周调整宝宝睡眠', content: '分享我家宝宝从睡渣到天使宝宝的全过程...', images: ['📸', '📸', '📸'], likes: 1234, comments: 234, views: 5678, time: '2天前', isPinned: true, isHot: true, tags: ['睡眠训练', '作息规律'] },
    { id: 'p2', type: 'help', user: { name: '晴天妈妈', avatar: '👱‍♀️', level: 'Lv3' }, title: '宝宝4个月睡眠倒退，夜醒频繁怎么办？', content: '最近一周宝宝突然开始频繁夜醒...', likes: 456, comments: 89, views: 2345, time: '5小时前', hasAnswer: true, reward: 100, tags: ['夜醒', '4个月'] },
    { id: 'p3', type: 'share', user: { name: '育儿专家Lisa', avatar: '👩‍⚕️', level: 'Lv6', isExpert: true }, title: '科学睡眠训练指南：不同月龄的作息安排', content: '作为儿科医生，总结了0-12个月宝宝的科学作息...', likes: 2345, comments: 456, views: 12345, time: '1周前', isRecommend: true, tags: ['专业指导', '睡眠训练'] },
];

export const MOCK_RELATED_TOPICS: RelatedTopic[] = [
    { id: 'rt1', name: '宝宝哭闹', icon: '😢', posts: 1234 },
    { id: 'rt2', name: '辅食添加', icon: '🍚', posts: 1890 },
    { id: 'rt3', name: '早教游戏', icon: '🎮', posts: 1567 },
];
