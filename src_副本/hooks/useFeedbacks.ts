/**
 * useFeedbacks - 反馈列表 Hook
 * 封装服务调用，提供加载状态和数据
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { feedbackService, type FeedbackItem, type FeedbackFilter } from '@/services/feedbackService';

interface UseFeedbacksResult {
    feedbacks: FeedbackItem[];
    loading: boolean;
    error: Error | null;
    hasMore: boolean;
    total: number;
    refetch: () => Promise<void>;
    markHelpful: (id: string) => Promise<void>;
}

export function useFeedbacks(filter?: FeedbackFilter): UseFeedbacksResult {
    const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [total, setTotal] = useState(0);

    const fetchFeedbacks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await feedbackService.getList(filter);
            setFeedbacks(response.items);
            setHasMore(response.hasMore);
            setTotal(response.total);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch feedbacks'));
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    const markHelpful = useCallback(async (id: string) => {
        try {
            const result = await feedbackService.markHelpful(id);
            if (result.success) {
                setFeedbacks(prev =>
                    prev.map(item =>
                        item.id === id
                            ? { ...item, helpfulCount: result.count }
                            : item
                    )
                );
            }
        } catch (err) {
            console.error('Failed to mark helpful:', err);
        }
    }, []);

    return {
        feedbacks,
        loading,
        error,
        hasMore,
        total,
        refetch: fetchFeedbacks,
        markHelpful,
    };
}
