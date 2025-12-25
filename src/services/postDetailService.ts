/**
 * 帖子详情服务层
 */

import { API_CONFIG, buildUrl } from '@/config/apiConfig';
import { MOCK_POST_DETAIL, MOCK_POST_COMMENTS, MOCK_RELATED_POSTS } from '@/mocks/postDetailMock';

// ============ 类型定义 ============

export interface PostUser {
    id?: string;
    name: string;
    avatar: string;
    level: string;
    levelName?: string;
    badges?: string[];
    isTopUser?: boolean;
    followers?: number;
    babyAge?: string;
    verified?: boolean;
    isAuthor?: boolean;
}

export interface PostMilestone {
    name: string;
    icon: string;
    completedCount: number;
    percentage: number;
}

export interface PostStats {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
}

export interface PostDetail {
    id: string;
    type: string;
    user: PostUser;
    content: string;
    images?: string[];
    hasVideo?: boolean;
    milestone?: PostMilestone;
    topic?: string;
    product?: { name: string; price: number; rating: number };
    babyAge: string;
    time: string;
    stats: PostStats;
    location?: string;
    isHot?: boolean;
    isPinned?: boolean;
    reward?: number;
    hasAcceptedAnswer?: boolean;
}

export interface CommentReply {
    id: string;
    user: PostUser;
    replyTo: string;
    content: string;
    time: string;
    likes: number;
}

export interface PostComment {
    id: string;
    user: PostUser;
    content: string;
    time: string;
    likes: number;
    replies?: CommentReply[];
    isLiked?: boolean;
    isQuestion?: boolean;
    isHelpful?: boolean;
}

export interface RelatedPost {
    id: string;
    title: string;
    user: string;
    likes: number;
    comments: number;
    isExpert?: boolean;
}

// ============ Service ============

class PostDetailService {
    private useMock = true;

    async getPostDetail(postId: string): Promise<PostDetail> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_POST_DETAIL), 200);
            });
        }
        const response = await fetch(buildUrl(`/posts/${postId}`));
        return response.json();
    }

    async getComments(postId: string, sortBy?: string): Promise<PostComment[]> {
        if (this.useMock) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_POST_COMMENTS), 200);
            });
        }
        const response = await fetch(buildUrl(`/posts/${postId}/comments`));
        return response.json();
    }

    async getRelatedPosts(postId: string): Promise<RelatedPost[]> {
        if (this.useMock) {
            return MOCK_RELATED_POSTS;
        }
        const response = await fetch(buildUrl(`/posts/${postId}/related`));
        return response.json();
    }

    async likePost(postId: string): Promise<number> {
        return Math.floor(Math.random() * 50) + 300;
    }

    async bookmarkPost(postId: string): Promise<boolean> {
        return true;
    }

    async submitComment(postId: string, content: string, replyTo?: string): Promise<PostComment> {
        return {
            id: `c${Date.now()}`,
            user: { name: '我', avatar: '👤', level: 'Lv1' },
            content,
            time: '刚刚',
            likes: 0,
        };
    }

    async likeComment(commentId: string): Promise<number> {
        return Math.floor(Math.random() * 20) + 10;
    }
}

export const postDetailService = new PostDetailService();
