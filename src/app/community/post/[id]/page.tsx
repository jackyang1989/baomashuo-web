'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Toast } from 'antd-mobile';
import { ArrowLeft, MoreVertical, Heart, MessageSquare, Share2, Bookmark, TrendingUp, Award, Sparkles, ThumbsUp, Send, Smile, Image, ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { postDetailService, type PostDetail, type PostComment, type RelatedPost } from '@/services/postDetailService';

export default function PostDetailPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params?.id as string;

    const [post, setPost] = useState<PostDetail | null>(null);
    const [comments, setComments] = useState<PostComment[]>([]);
    const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [replyingTo, setReplyingTo] = useState<PostComment | null>(null);

    useEffect(() => {
        if (postId) {
            postDetailService.getPostDetail(postId).then(setPost);
            postDetailService.getComments(postId).then(setComments);
            postDetailService.getRelatedPosts(postId).then(setRelatedPosts);
        }
    }, [postId]);

    const handleLike = async () => {
        setLiked(!liked);
        if (!liked) Toast.show({ content: '已点赞' });
    };

    const handleBookmark = async () => {
        setBookmarked(!bookmarked);
        Toast.show({ content: bookmarked ? '已取消收藏' : '已收藏' });
    };

    const handleComment = async () => {
        if (!commentText.trim()) return;
        await postDetailService.submitComment(postId, commentText, replyingTo?.user.name);
        Toast.show({ content: '评论成功' });
        setCommentText('');
        setReplyingTo(null);
        postDetailService.getComments(postId).then(setComments);
    };

    if (!post) return <MobileContainer><div style={{ padding: '48px', textAlign: 'center' }}>加载中...</div></MobileContainer>;

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA', paddingBottom: '80px' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
                    <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                        <span style={{ fontWeight: '600' }}>帖子详情</span>
                    </button>
                    <button style={{ background: 'none', border: 'none' }}><MoreVertical size={20} color="#6B7280" /></button>
                </div>

                {/* Post Content */}
                <div style={{ background: 'white', padding: '16px', marginBottom: '8px' }}>
                    {/* Hot/Pinned Badge */}
                    {post.isHot && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', background: '#FEE2E2', color: '#DC2626', padding: '4px 8px', borderRadius: '8px', width: 'fit-content', marginBottom: '12px' }}>
                            <TrendingUp size={12} />热门
                        </div>
                    )}

                    {/* User Info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '32px' }}>{post.user.avatar}</span>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 'bold' }}>{post.user.name}</span>
                                    <span style={{ fontSize: '10px', background: 'linear-gradient(90deg, #FBBF24, #F59E0B)', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>{post.user.level}</span>
                                    {post.user.isTopUser && (
                                        <span style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                            <Award size={10} />活跃榜1
                                        </span>
                                    )}
                                </div>
                                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                                    {post.babyAge}宝宝 • {post.time} {post.location && `• ${post.location}`}
                                </div>
                            </div>
                        </div>
                        <button style={{ color: '#3B82F6', fontSize: '14px', fontWeight: '600', padding: '6px 16px', border: '1px solid #3B82F6', borderRadius: '8px', background: 'none' }}>关注</button>
                    </div>

                    {/* Type Badges */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        {post.type === 'milestone' && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', background: '#FEF3C7', color: '#D97706', padding: '4px 10px', borderRadius: '12px' }}>
                                <Sparkles size={10} />成长里程碑
                            </span>
                        )}
                        {post.topic && <span style={{ fontSize: '11px', background: '#EFF6FF', color: '#3B82F6', padding: '4px 10px', borderRadius: '12px' }}>#{post.topic}</span>}
                    </div>

                    {/* Milestone Progress */}
                    {post.milestone && (
                        <div style={{ background: 'linear-gradient(135deg, #FEF3C7, #FED7AA)', border: '2px solid #FDE68A', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '24px' }}>{post.milestone.icon}</span>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#1F2937' }}>{post.milestone.name}</div>
                                    <div style={{ fontSize: '11px', color: '#6B7280' }}>{post.milestone.completedCount}位宝宝已达成 • {post.milestone.percentage}%</div>
                                </div>
                            </div>
                            <div style={{ background: 'white', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                                <div style={{ background: 'linear-gradient(90deg, #FBBF24, #F59E0B)', height: '100%', width: `${post.milestone.percentage}%` }} />
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, marginBottom: '16px', whiteSpace: 'pre-line' }}>{post.content}</div>

                    {/* Images */}
                    {post.images && post.images.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: post.images.length === 1 ? '1fr' : 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                            {post.images.map((img, idx) => (
                                <div key={idx} style={{ aspectRatio: post.images!.length === 1 ? '16/9' : '1', background: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>{img}</div>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', fontSize: '14px', color: '#6B7280' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <span>{post.stats.likes}赞</span>
                            <span>{post.stats.comments}评论</span>
                            <span>{post.stats.shares}分享</span>
                        </div>
                        <span>{post.stats.bookmarks}收藏</span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 0' }}>
                        <button onClick={handleLike} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: liked ? '#EF4444' : '#6B7280', background: 'none', border: 'none' }}>
                            <Heart size={18} fill={liked ? '#EF4444' : 'none'} /><span style={{ fontSize: '13px' }}>{liked ? '已赞' : '赞'}</span>
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', background: 'none', border: 'none' }}>
                            <MessageSquare size={18} /><span style={{ fontSize: '13px' }}>评论</span>
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', background: 'none', border: 'none' }}>
                            <Share2 size={18} /><span style={{ fontSize: '13px' }}>分享</span>
                        </button>
                        <button onClick={handleBookmark} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: bookmarked ? '#3B82F6' : '#6B7280', background: 'none', border: 'none' }}>
                            <Bookmark size={18} fill={bookmarked ? '#3B82F6' : 'none'} /><span style={{ fontSize: '13px' }}>{bookmarked ? '已收藏' : '收藏'}</span>
                        </button>
                    </div>
                </div>

                {/* Comments */}
                <div style={{ background: 'white', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <span style={{ fontWeight: 'bold', color: '#1F2937' }}>全部评论 <span style={{ color: '#9CA3AF' }}>({post.stats.comments})</span></span>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6B7280', background: 'none', border: 'none' }}>
                            <TrendingUp size={14} />按热度
                        </button>
                    </div>

                    {comments.map((comment) => (
                        <div key={comment.id} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span style={{ fontSize: '24px' }}>{comment.user.avatar}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '600' }}>{comment.user.name}</span>
                                        {comment.user.isAuthor && <span style={{ fontSize: '10px', background: '#3B82F6', color: 'white', padding: '1px 6px', borderRadius: '4px' }}>作者</span>}
                                        <span style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '1px 6px', borderRadius: '4px' }}>{comment.user.level}</span>
                                        {comment.user.babyAge && <span style={{ fontSize: '11px', color: '#9CA3AF' }}>• {comment.user.babyAge}</span>}
                                    </div>

                                    <div style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', background: comment.isQuestion ? '#EFF6FF' : 'transparent', borderLeft: comment.isQuestion ? '2px solid #3B82F6' : 'none', padding: comment.isQuestion ? '4px 8px' : 0 }}>
                                        {comment.content}
                                    </div>

                                    {comment.isHelpful && (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#D97706', background: '#FEF3C7', padding: '4px 8px', borderRadius: '8px', marginBottom: '8px' }}>
                                            <ThumbsUp size={10} />有帮助的回答
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#9CA3AF' }}>
                                        <span>{comment.time}</span>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: comment.isLiked ? '#EF4444' : '#9CA3AF' }}>
                                            <Heart size={12} fill={comment.isLiked ? '#EF4444' : 'none'} />{comment.likes}
                                        </button>
                                        <button onClick={() => setReplyingTo(comment)} style={{ background: 'none', border: 'none', color: '#9CA3AF' }}>回复</button>
                                    </div>

                                    {/* Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div style={{ marginTop: '12px', marginLeft: '12px', borderLeft: '2px solid #E5E7EB', paddingLeft: '12px' }}>
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} style={{ marginBottom: '12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                        <span style={{ fontSize: '16px' }}>{reply.user.avatar}</span>
                                                        <span style={{ fontSize: '13px', fontWeight: '600' }}>{reply.user.name}</span>
                                                        {reply.user.isAuthor && <span style={{ fontSize: '10px', background: '#3B82F6', color: 'white', padding: '1px 6px', borderRadius: '4px' }}>作者</span>}
                                                    </div>
                                                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                                                        回复 <span style={{ color: '#3B82F6' }}>@{reply.replyTo}</span>
                                                    </div>
                                                    <div style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>{reply.content}</div>
                                                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{reply.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <button style={{ width: '100%', padding: '12px', fontSize: '13px', color: '#6B7280', borderTop: '1px solid #E5E7EB', background: 'none', border: 'none', marginTop: '8px' }}>
                        查看更多评论 →
                    </button>
                </div>

                {/* Related Posts */}
                <div style={{ background: 'white', padding: '16px', marginTop: '8px' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>相关推荐</h3>
                    {relatedPosts.map((rp) => (
                        <div key={rp.id} style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px', marginBottom: '8px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{rp.title}</span>
                                        {rp.isExpert && <span style={{ fontSize: '10px', background: '#F5F3FF', color: '#7C3AED', padding: '2px 6px', borderRadius: '4px' }}>专家</span>}
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>{rp.user}</div>
                                    <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#9CA3AF' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Heart size={10} />{rp.likes}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><MessageSquare size={10} />{rp.comments}</span>
                                    </div>
                                </div>
                                <ChevronRight size={18} color="#9CA3AF" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Comment Input */}
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '515px', margin: '0 auto', background: 'white', borderTop: '1px solid #E5E7EB', padding: '12px 16px', zIndex: 50 }}>
                    {replyingTo && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6B7280', background: '#EFF6FF', padding: '8px 12px', borderRadius: '8px', marginBottom: '8px' }}>
                            <span>回复 @{replyingTo.user.name}</span>
                            <button onClick={() => setReplyingTo(null)} style={{ background: 'none', border: 'none', color: '#9CA3AF' }}>✕</button>
                        </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder={replyingTo ? `回复 @${replyingTo.user.name}` : '说点什么...'}
                            style={{ flex: 1, padding: '10px 16px', background: '#F3F4F6', border: 'none', borderRadius: '20px', fontSize: '14px', outline: 'none' }}
                        />
                        <button style={{ color: '#9CA3AF', background: 'none', border: 'none' }}><Smile size={20} /></button>
                        <button style={{ color: '#9CA3AF', background: 'none', border: 'none' }}><Image size={20} /></button>
                        <button
                            onClick={handleComment}
                            disabled={!commentText.trim()}
                            style={{ padding: '8px 16px', borderRadius: '20px', background: commentText.trim() ? '#3B82F6' : '#E5E7EB', color: commentText.trim() ? 'white' : '#9CA3AF', border: 'none', fontWeight: '600' }}
                        >
                            发送
                        </button>
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
