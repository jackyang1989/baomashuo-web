/**
 * 帖子详情 Mock 数据
 */

import type { PostDetail, PostComment, RelatedPost } from '@/services/postDetailService';

export const MOCK_POST_DETAIL: PostDetail = {
    id: 'p1',
    type: 'milestone',
    user: {
        id: 'u1',
        name: '小雨妈妈',
        avatar: '👩',
        level: 'Lv5',
        levelName: '资深妈妈',
        badges: ['金牌评价员', '活跃榜TOP1'],
        isTopUser: true,
        followers: 234,
    },
    content: `宝宝今天第一次翻身成功了！激动到哭😭

从侧卧练习了两周，今天早上突然自己翻过去了！当时我正在旁边收拾东西，突然听到宝宝"咿呀"叫，一看已经翻过去了，小家伙还冲我笑呢！

分享一下我的经验：
1. 每天趴卧练习15分钟，锻炼颈部和手臂力量
2. 侧卧时在身后放个小枕头做支撑
3. 在前方放玩具吸引注意力
4. 不要着急，每个宝宝节奏不一样

姐妹们，你们家宝宝多大翻身的？有什么经验分享吗？`,
    images: ['📸', '📸', '📸', '📸'],
    milestone: { name: '第一次翻身', icon: '🤸', completedCount: 456, percentage: 16 },
    topic: '成长里程碑',
    babyAge: '3个月',
    time: '10分钟前',
    stats: { likes: 289, comments: 67, shares: 34, bookmarks: 45 },
    location: '北京',
    isHot: true,
};

export const MOCK_POST_COMMENTS: PostComment[] = [
    {
        id: 'c1',
        user: { name: '晴天妈妈', avatar: '👱‍♀️', level: 'Lv4', babyAge: '4个月' },
        content: '恭喜恭喜！我家宝宝也是3个月翻身的，当时也是超级激动！',
        time: '5分钟前',
        likes: 23,
        replies: [
            { id: 'r1', user: { name: '小雨妈妈', avatar: '👩', level: 'Lv5', isAuthor: true }, replyTo: '晴天妈妈', content: '谢谢！看到宝宝进步真的很开心😊', time: '3分钟前', likes: 5 },
            { id: 'r2', user: { name: '暖暖妈咪', avatar: '🙋‍♀️', level: 'Lv3', babyAge: '3个月' }, replyTo: '晴天妈妈', content: '请教一下，翻身后要注意什么吗？', time: '2分钟前', likes: 2 },
        ],
    },
    {
        id: 'c2',
        user: { name: '萌萌妈', avatar: '👩‍🦰', level: 'Lv3', babyAge: '2个月' },
        content: '请教楼主，趴卧练习是怎么做的？我家宝宝一趴就哭',
        time: '8分钟前',
        likes: 15,
        isQuestion: true,
    },
    {
        id: 'c3',
        user: { name: '甜甜妈', avatar: '👱', level: 'Lv5', babyAge: '6个月', verified: true },
        content: '恭喜！分享个小技巧：翻身后要特别注意安全，床上不要放枕头被子，防止窒息。我家当时就是翻身后脸埋进枕头里了，还好及时发现😰',
        time: '15分钟前',
        likes: 45,
        isHelpful: true,
    },
];

export const MOCK_RELATED_POSTS: RelatedPost[] = [
    { id: 'rp1', title: '3个月宝宝翻身训练全攻略', user: '育儿专家Lisa', likes: 567, comments: 89, isExpert: true },
    { id: 'rp2', title: '分享我家宝宝翻身后的小插曲', user: '乐乐妈', likes: 234, comments: 45 },
];
