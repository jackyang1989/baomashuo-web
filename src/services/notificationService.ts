/**
 * 消息通知服务层
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import { MOCK_CATEGORIES, MOCK_NOTIFICATIONS } from '@/mocks/notificationMock';

// ============ 类型定义 ============

export interface NotificationCategory {
    id: string;
    name: string;
    count: number;
}

export interface NotificationUser {
    name: string;
    avatar: string;
}

export interface Notification {
    id: string;
    type: string;
    user?: NotificationUser;
    icon?: string;
    content: string;
    comment?: string;
    description?: string;
    target?: string;
    time: string;
    read: boolean;
    link?: string;
}

// ============ Service ============

class NotificationService {
    private useMock = true;

    async getCategories(): Promise<NotificationCategory[]> {
        return MOCK_CATEGORIES;
    }

    async getNotifications(category?: string): Promise<Notification[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let list = [...MOCK_NOTIFICATIONS];
                    if (category && category !== 'all') {
                        const categoryMap: Record<string, string[]> = {
                            interact: ['like', 'comment', 'reply', 'follow', 'at'],
                            system: ['system', 'milestone'],
                            earnings: ['earnings', 'reward', 'order'],
                            activity: ['activity', 'price_drop'],
                        };
                        list = list.filter(n => categoryMap[category]?.includes(n.type));
                    }
                    resolve(list);
                }, 200);
            });
        }
        const response = await fetch(buildUrl(`/notifications?category=${category || 'all'}`));
        return response.json();
    }

    async getUnreadCount(): Promise<number> {
        const notifications = await this.getNotifications();
        return notifications.filter(n => !n.read).length;
    }

    async markAsRead(notificationId: string): Promise<boolean> {
        return true;
    }

    async markAllAsRead(): Promise<boolean> {
        return true;
    }

    async deleteNotification(notificationId: string): Promise<boolean> {
        return true;
    }
}

export const notificationService = new NotificationService();
