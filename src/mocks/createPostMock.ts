/**
 * 发帖 Mock 数据
 */

import type { PostType, HotTopic, MilestoneOption, BabyOption } from '@/services/createPostService';

export const MOCK_POST_TYPES: PostType[] = [
    { id: 'share', name: '分享动态', icon: '💬', desc: '日常分享、经验交流', color: 'from-blue-500 to-cyan-500' },
    { id: 'help', name: '求助提问', icon: '🙋', desc: '遇到问题，向大家求助', color: 'from-orange-500 to-red-500', badge: '可悬赏' },
    { id: 'recommend', name: '好物推荐', icon: '⭐', desc: '分享好用的产品', color: 'from-green-500 to-emerald-500', badge: '需关联产品' },
    { id: 'milestone', name: '成长记录', icon: '🎉', desc: '宝宝成长里程碑', color: 'from-purple-500 to-pink-500', badge: '特别' },
    { id: 'poll', name: '发起投票', icon: '📊', desc: '征集大家的意见', color: 'from-indigo-500 to-blue-500' },
];

export const MOCK_HOT_TOPICS: HotTopic[] = [
    { id: 't1', name: '宝宝睡眠', icon: '😴', posts: 2345 },
    { id: 't2', name: '辅食添加', icon: '🍚', posts: 1890 },
    { id: 't3', name: '疫苗接种', icon: '💉', posts: 1567 },
    { id: 't4', name: '早教游戏', icon: '🎮', posts: 1234 },
];

export const MOCK_MILESTONES: MilestoneOption[] = [
    { id: 'm1', name: '第一次翻身', icon: '🤸' },
    { id: 'm2', name: '第一次坐起', icon: '🧘' },
    { id: 'm3', name: '第一次叫妈妈', icon: '👄' },
    { id: 'm4', name: '第一次走路', icon: '🚶' },
    { id: 'm5', name: '第一次吃辅食', icon: '🍚' },
    { id: 'm6', name: '第一次长牙', icon: '🦷' },
];

export const MOCK_BABIES: BabyOption[] = [
    { id: 'b1', name: '小雨', age: '3个月', gender: 'girl' },
];

export const MOCK_REWARD_OPTIONS = [0, 50, 100, 200, 500];
