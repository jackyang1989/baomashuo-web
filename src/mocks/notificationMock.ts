/**
 * 消息通知 Mock 数据
 */

import type { NotificationCategory, Notification } from '@/services/notificationService';

export const MOCK_CATEGORIES: NotificationCategory[] = [
    { id: 'all', name: '全部', count: 12 },
    { id: 'interact', name: '互动', count: 5 },
    { id: 'system', name: '系统', count: 3 },
    { id: 'earnings', name: '收益', count: 2 },
    { id: 'activity', name: '活动', count: 2 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', type: 'like', user: { name: '晴天妈妈', avatar: '👱‍♀️' }, content: '赞了你的帖子', target: '宝宝今天第一次翻身成功了！', time: '5分钟前', read: false, link: '/community/post/1' },
    { id: 'n2', type: 'comment', user: { name: '暖暖妈咪', avatar: '🙋‍♀️' }, content: '评论了你的帖子', comment: '恭喜恭喜！我家宝宝也是3个月翻身的', target: '宝宝今天第一次翻身成功了！', time: '10分钟前', read: false, link: '/community/post/1' },
    { id: 'n3', type: 'reply', user: { name: '萌萌妈', avatar: '👩‍🦰' }, content: '回复了你的评论', comment: '谢谢分享！我也试试这个方法', target: '防胀气奶瓶使用心得', time: '1小时前', read: false, link: '/community/post/2' },
    { id: 'n4', type: 'follow', user: { name: '甜甜妈', avatar: '👱' }, content: '关注了你', time: '2小时前', read: false, link: '/user/1' },
    { id: 'n5', type: 'at', user: { name: '小雨妈妈', avatar: '👩' }, content: '在帖子中@了你', target: '求推荐防胀气奶瓶', time: '3小时前', read: false, link: '/community/post/3' },
    { id: 'n6', type: 'system', icon: '🎉', content: '恭喜你获得「金牌评价员」徽章', description: '继续加油，分享更多真实体验吧！', time: '昨天 18:30', read: true },
    { id: 'n7', type: 'earnings', icon: '💰', content: '佣金到账通知', description: '订单TB202412230001已结算，佣金¥12.80已到账', time: '昨天 14:20', read: true, link: '/earnings' },
    { id: 'n8', type: 'activity', icon: '🎁', content: '【每日好物】今日精选母婴好物上新', description: '3款高性价比产品，最高优惠30元', time: '今天 10:00', read: true, link: '/activity' },
    { id: 'n9', type: 'reward', icon: '✨', content: '积分奖励到账', description: '发布评价获得50积分，当前积分2850', time: '2天前', read: true, link: '/points' },
    { id: 'n10', type: 'order', icon: '📦', content: '你推广的商品有新订单', description: 'Comotomo奶瓶，预估佣金¥12.80', time: '2天前', read: true, link: '/earnings' },
    { id: 'n11', type: 'price_drop', icon: '🔔', content: '你收藏的商品降价了', description: 'Comotomo奶瓶 降至¥108，省20元', time: '3天前', read: true, link: '/product/1' },
    { id: 'n12', type: 'milestone', icon: '🎊', content: '同圈宝宝达成新里程碑', description: '2024年9月圈已有456位宝宝完成第一次翻身', time: '3天前', read: true, link: '/community' },
];
