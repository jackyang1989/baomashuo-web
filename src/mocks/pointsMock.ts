/**
 * 积分商城 Mock 数据
 */

import type { UserPoints, PointsTask, PointsProduct, RedemptionRecord } from '@/services/pointsService';

export const MOCK_USER_POINTS: UserPoints = {
    current: 2850,
    total: 5670,
    thisMonth: 420,
    rank: 156,
    level: 'Lv5',
};

export const MOCK_TASKS: PointsTask[] = [
    { id: 't1', name: '每日签到', points: 10, icon: '📅', progress: 1, total: 1, status: 'completed' },
    { id: 't2', name: '发布评价', points: 50, icon: '✍️', progress: 2, total: 5, status: 'ongoing' },
    { id: 't3', name: '发布帖子', points: 20, icon: '📝', progress: 1, total: 3, status: 'ongoing' },
    { id: 't4', name: '邀请好友', points: 100, icon: '👥', progress: 0, total: 1, status: 'available' },
];

export const MOCK_POINTS_PRODUCTS: PointsProduct[] = [
    { id: 'pp1', name: '奶粉试用装', brand: '爱他美', image: '🍼', points: 500, originalPrice: 39, stock: 23, limit: 1, tag: '热兑', redeemCount: 1234, category: 'samples' },
    { id: 'pp2', name: '纸尿裤试用装', brand: '好奇', image: '🧷', points: 300, originalPrice: 25, stock: 45, limit: 1, tag: '新品', redeemCount: 892, category: 'samples' },
    { id: 'pp3', name: '宝宝袜子3双装', brand: '童泰', image: '🧦', points: 800, originalPrice: 45, stock: 12, limit: 2, redeemCount: 567, category: 'goods' },
    { id: 'pp4', name: '平台10元优惠券', brand: '宝妈说', image: '🎟️', points: 500, originalPrice: 10, stock: 999, limit: 3, tag: '无门槛', redeemCount: 3456, category: 'coupons' },
    { id: 'pp5', name: 'VIP会员7天体验', brand: '宝妈说', image: '👑', points: 1000, originalPrice: 19, stock: 100, limit: 1, tag: '限时', redeemCount: 234, category: 'vip' },
    { id: 'pp6', name: '10元微信红包', brand: '现金', image: '💰', points: 10000, originalPrice: 10, stock: 50, limit: 2, tag: '实名', redeemCount: 89, category: 'goods', needVerify: true },
];

export const MOCK_CATEGORIES = [
    { id: 'all', name: '全部', icon: '🎁' },
    { id: 'samples', name: '试用装', icon: '🧴' },
    { id: 'goods', name: '实物', icon: '📦' },
    { id: 'coupons', name: '优惠券', icon: '🎟️' },
    { id: 'vip', name: 'VIP', icon: '👑' },
];

export const MOCK_REDEMPTIONS: RedemptionRecord[] = [
    { id: 'r1', product: '奶粉试用装', points: 500, status: 'shipped', time: '2天前', trackingNo: 'SF1234567890' },
    { id: 'r2', product: '平台10元优惠券', points: 500, status: 'completed', time: '5天前' },
];
