/**
 * 话题详情服务层
 */

import { buildUrl } from '@/config/apiConfig';
import { MOCK_TOPIC_INFO, MOCK_ACTIVE_USERS, MOCK_TOPIC_POSTS, MOCK_RELATED_TOPICS } from '@/mocks/topicMock';

// ============ 类型定义 ============

export interface TopicModerator {
    id: string;
    name: string;
    avatar: string;
    role: 'admin' | 'expert';
}

export interface TopicInfo {
    id: string;
    name: string;
    icon: string;
    description: string;
    stats: { posts: number; followers: number; todayPosts: number; totalViews: number };
    tags: string[];
    moderators: TopicModerator[];
}

export interface TopicActiveUser {
    id: string;
    name: string;
    avatar: string;
    posts: number;
    badge: string;
}

export interface TopicPostUser {
    name: string;
    avatar: string;
    level: string;
    isExpert?: boolean;
}

export interface TopicPost {
    id: string;
    type: 'share' | 'help';
    user: TopicPostUser;
    title: string;
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    views: number;
    time: string;
    isPinned?: boolean;
    isHot?: boolean;
    isRecommend?: boolean;
    hasAnswer?: boolean;
    reward?: number;
    tags?: string[];
}

export interface RelatedTopic {
    id: string;
    name: string;
    icon: string;
    posts: number;
}

// ============ Service ============

class TopicService {
    private useMock = true;

    async getTopicInfo(topicId: string): Promise<TopicInfo> {
        return MOCK_TOPIC_INFO;
    }

    async getActiveUsers(topicId: string): Promise<TopicActiveUser[]> {
        return MOCK_ACTIVE_USERS;
    }

    async getPosts(topicId: string, tab?: string): Promise<TopicPost[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_TOPIC_POSTS), 200);
        });
    }

    async getRelatedTopics(topicId: string): Promise<RelatedTopic[]> {
        return MOCK_RELATED_TOPICS;
    }

    async followTopic(topicId: string): Promise<boolean> {
        return true;
    }

    async unfollowTopic(topicId: string): Promise<boolean> {
        return true;
    }
}

export const topicService = new TopicService();
