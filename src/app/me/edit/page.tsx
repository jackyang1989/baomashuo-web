'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast, DatePicker, Picker, Dialog } from 'antd-mobile';
import { ArrowLeft, Camera, ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';

const GENDER_OPTIONS = [
    [{ label: '男宝', value: 'boy' }, { label: '女宝', value: 'girl' }],
];

export default function EditProfilePage() {
    const router = useRouter();
    const [avatar, setAvatar] = useState('👩');
    const [nickname, setNickname] = useState('小雨妈妈');
    const [gender, setGender] = useState('girl');
    const [babyBirthday, setBabyBirthday] = useState<Date | null>(new Date('2024-09-15'));
    const [bio, setBio] = useState('分享育儿心得，一起成长');

    const [showGenderPicker, setShowGenderPicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSave = () => {
        Toast.show({ content: '保存成功', icon: 'success' });
        router.back();
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '请选择';
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    };

    const calculateAge = (date: Date | null) => {
        if (!date) return '';
        const now = new Date();
        const months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
        return `（${months}个月）`;
    };

    return (
        <MobileContainer>
            <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
                {/* Header */}
                <div style={{ background: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ flex: 1, textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>编辑资料</span>
                    <button onClick={handleSave} style={{ background: 'none', border: 'none', color: '#3B82F6', fontWeight: '600' }}>保存</button>
                </div>

                {/* Avatar */}
                <div style={{ background: 'white', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                            {avatar}
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                            <Camera size={14} color="white" />
                        </div>
                    </div>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>点击更换头像</span>
                </div>

                {/* Form */}
                <div style={{ background: 'white', borderRadius: '0' }}>
                    {/* Nickname */}
                    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #F3F4F6' }}>
                        <span style={{ width: '80px', fontSize: '15px', color: '#374151' }}>昵称</span>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            maxLength={12}
                            style={{ flex: 1, border: 'none', fontSize: '15px', textAlign: 'right', outline: 'none', color: '#1F2937' }}
                        />
                    </div>

                    {/* Gender */}
                    <div
                        onClick={() => setShowGenderPicker(true)}
                        style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }}
                    >
                        <span style={{ width: '80px', fontSize: '15px', color: '#374151' }}>宝宝性别</span>
                        <span style={{ flex: 1, textAlign: 'right', fontSize: '15px', color: '#1F2937' }}>
                            {gender === 'boy' ? '男宝' : '女宝'}
                        </span>
                        <ChevronRight size={18} color="#D1D5DB" />
                    </div>

                    {/* Birthday */}
                    <div
                        onClick={() => setShowDatePicker(true)}
                        style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }}
                    >
                        <span style={{ width: '80px', fontSize: '15px', color: '#374151' }}>宝宝生日</span>
                        <span style={{ flex: 1, textAlign: 'right', fontSize: '15px', color: '#1F2937' }}>
                            {formatDate(babyBirthday)} <span style={{ color: '#9CA3AF' }}>{calculateAge(babyBirthday)}</span>
                        </span>
                        <ChevronRight size={18} color="#D1D5DB" />
                    </div>

                    {/* Bio */}
                    <div style={{ padding: '14px 16px' }}>
                        <div style={{ fontSize: '15px', color: '#374151', marginBottom: '8px' }}>个人简介</div>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={100}
                            placeholder="介绍一下自己吧"
                            style={{
                                width: '100%',
                                height: '80px',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                padding: '12px',
                                fontSize: '14px',
                                resize: 'none',
                                outline: 'none',
                            }}
                        />
                        <div style={{ textAlign: 'right', fontSize: '12px', color: '#9CA3AF' }}>{bio.length}/100</div>
                    </div>
                </div>

                {/* Pickers */}
                <Picker
                    columns={GENDER_OPTIONS}
                    visible={showGenderPicker}
                    onClose={() => setShowGenderPicker(false)}
                    onConfirm={(val) => setGender(val[0] as string)}
                />
                <DatePicker
                    visible={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    onConfirm={(val) => setBabyBirthday(val)}
                    max={new Date()}
                    min={new Date('2020-01-01')}
                />
            </div>
        </MobileContainer>
    );
}
