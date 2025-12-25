/**
 * 圈子/社区服务层
 * 所有数据获取逻辑封装为函数，Page 只负责调用
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import {
    MOCK_CIRCLE_INFO,
    MOCK_ACTIVE_USERS,
    MOCK_MILESTONES,
    MOCK_ANNOUNCEMENTS,
    MOCK_HOT_TOPICS,
    MOCK_POSTS,
} from '@/mocks/communityMock';

// ============ 类型定义 ============

export interface CircleInfo {
    id: string;
    name: string;
    birthMonth: string;
    currentAge: string;
    memberCount: number;
    todayPosts: number;
    todayActive: number;
    rank: number;
    joinedDays: number;
}

export interface ActiveUser {
    id: string;
    name: string;
    avatar: string;
    level: string;
    posts: number;
    rank: number;
    badge: string;
}

export interface Milestone {
    id: string;
    title: string;
    icon: string;
    completedCount: number;
    totalCount: number;
    percentage: number;
    recentUsers: string[];
    tips: string;
}

export interface Announcement {
    id: string;
    title: string;
    type: 'topic' | 'activity';
    time: string;
    hot?: boolean;
    deadline?: string;
}

export interface HotTopic {
    id: string;
    name: string;
    icon: string;
    posts: number;
    hot?: boolean;
}

export interface PostProduct {
    name: string;
    price: number;
    rating: number;
}

export interface CommunityPost {
    id: string;
    type: 'milestone' | 'question' | 'share' | 'daily' | 'help';
    user: { name: string; avatar: string; level: string; isTopUser?: boolean };
    content: string;
    images?: string[];
    hasVideo?: boolean;
    milestone?: string;
    topic?: string;
    product?: PostProduct;
    time: string;
    likes: number;
    comments: number;
    shares?: number;
    isHot?: boolean;
    isPinned?: boolean;
    isRecommend?: boolean;
    hasAcceptedAnswer?: boolean;
    reward?: number;
}

// ============ Service ============

class CommunityService {
    private useMock = true;

    async getCircleInfo(): Promise<CircleInfo> {
        if (this.useMock) {
            return MOCK_CIRCLE_INFO;
        }
        const response = await fetch(buildUrl('/community/circle'));
        return response.json();
    }

    async getActiveUsers(): Promise<ActiveUser[]> {
        if (this.useMock) {
            return MOCK_ACTIVE_USERS;
        }
        const response = await fetch(buildUrl('/community/active-users'));
        return response.json();
    }

    async getMilestones(): Promise<Milestone[]> {
        if (this.useMock) {
            return MOCK_MILESTONES;
        }
        const response = await fetch(buildUrl('/community/milestones'));
        return response.json();
    }

    async getAnnouncements(): Promise<Announcement[]> {
        if (this.useMock) {
            return MOCK_ANNOUNCEMENTS;
        }
        const response = await fetch(buildUrl('/community/announcements'));
        return response.json();
    }

    async getHotTopics(): Promise<HotTopic[]> {
        if (this.useMock) {
            return MOCK_HOT_TOPICS;
        }
        const response = await fetch(buildUrl('/community/hot-topics'));
        return response.json();
    }

    async getPosts(type?: string): Promise<CommunityPost[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let posts = [...MOCK_POSTS];
                    if (type && type !== 'all') {
                        posts = posts.filter(p => p.type === type);
                    }
                    resolve(posts);
                }, 200);
            });
        }
        const response = await fetch(buildUrl(`/community/posts?type=${type || 'all'}`));
        return response.json();
    }

    async likePost(postId: string): Promise<number> {
        return Math.floor(Math.random() * 50) + 50;
    }

    async markMilestoneAchieved(milestoneId: string): Promise<boolean> {
        return true;
    }

    async followUser(userId: string): Promise<boolean> {
        return true;
    }
}

export const communityService = new CommunityService();
