/**
 * 清单 Mock 数据
 */

import type { OfficialList, ScenarioList, MyList, ListItem } from '@/services/listsService';

export const MOCK_AGE_GROUPS = ['0-3个月', '3-6个月', '6-12个月', '1-2岁'];

export const MOCK_OFFICIAL_LISTS: OfficialList[] = [
    {
        id: 'newborn-essentials',
        title: '新生儿必备清单',
        desc: '0-3个月宝宝必备物品',
        icon: '👶',
        userCount: 23456,
        items: [
            { id: 'i1', name: 'Comotomo奶瓶 150ml', category: '喂养', necessity: 'must', reason: '78%的宝妈首选', price: 128, recommendRate: 85 },
            { id: 'i2', name: '新生儿奶嘴 S号', category: '喂养', necessity: 'must', reason: '需要备2-3个', price: 39, recommendRate: 82 },
            { id: 'i3', name: '奶瓶清洗刷', category: '喂养', necessity: 'recommended', reason: '清洁必备', price: 29, recommendRate: 76 },
            { id: 'i4', name: '温奶器', category: '喂养', necessity: 'optional', reason: '使用率不高，68%闲置', price: 299, recommendRate: 45 },
        ],
    },
    {
        id: 'feeding-essentials',
        title: '辅食期必备清单',
        desc: '6个月开始添加辅食',
        icon: '🍚',
        userCount: 18923,
        items: [
            { id: 'i5', name: '辅食碗套装', category: '辅食', necessity: 'must', reason: '建议选吸盘牢固的', price: 68, recommendRate: 79 },
            { id: 'i6', name: '硅胶软勺', category: '辅食', necessity: 'must', reason: '保护宝宝牙龈', price: 25, recommendRate: 88 },
            { id: 'i7', name: '围兜3件套', category: '辅食', necessity: 'must', reason: '需要多备几个', price: 39, recommendRate: 92 },
        ],
    },
];

export const MOCK_SCENARIO_LISTS: ScenarioList[] = [
    { id: 'night-feeding', title: '夜奶场景清单', desc: '夜间喂奶更方便', icon: '🌙', userCount: 12345, tips: ['选择不用插电的温奶器', '准备小夜灯', 'PPSU材质防摔'] },
    { id: 'travel', title: '外出旅行清单', desc: '带娃出门不慌张', icon: '🚗', userCount: 15678, tips: ['便携装优先', '避免玻璃制品', '准备一次性用品'] },
    { id: 'transition', title: '转奶期清单', desc: '换奶粉/奶瓶必备', icon: '🔄', userCount: 9876, tips: ['先买小容量试用', '准备备用奶嘴', '循序渐进'] },
];

export const MOCK_MY_LISTS: MyList[] = [
    { id: 'ml1', title: '宝宝6个月囤货清单', itemCount: 12, totalPrice: 856, checkedCount: 7, updatedAt: '2天前' },
    { id: 'ml2', title: '送礼清单', itemCount: 8, totalPrice: 620, checkedCount: 8, updatedAt: '1周前' },
];
