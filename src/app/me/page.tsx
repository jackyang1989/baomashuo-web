'use client';

import { useEffect, useState } from 'react';
import { Toast } from 'antd-mobile';
import { MobileContainer } from '@/components/layout/MobileContainer';
import ProfileHeader from '@/components/me/ProfileHeader';
import BabyDashboard from '@/components/me/BabyDashboard';
import WalletBrief from '@/components/me/WalletBrief';
import MenuGrid from '@/components/me/MenuGrid';
import { userService } from '@/services/userService';
import type { FullUserData } from '@/types/user';

export default function ProfilePage() {
    const [userData, setUserData] = useState<FullUserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await userService.getProfileData();
                setUserData(data);
            } catch (error) {
                Toast.show({ content: '加载失败', icon: 'fail' });
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleSwitchBaby = async (babyId: string) => {
        await userService.switchBaby(babyId);
        if (userData) {
            const updatedBabies = userData.babies.map(b => ({
                ...b,
                isDefault: b.id === babyId
            }));
            setUserData({ ...userData, babies: updatedBabies });
            Toast.show({ content: '已切换宝宝', icon: 'success' });
        }
    };

    if (loading || !userData) {
        return (
            <MobileContainer>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    background: '#F7F8FA',
                }}>
                    <span style={{ color: '#9ca3af' }}>加载中...</span>
                </div>
            </MobileContainer>
        );
    }

    return (
        <MobileContainer>
            <div style={{
                minHeight: '100vh',
                background: '#F7F8FA', // Visual Spec: #F7F8FA
                paddingBottom: '24px',
            }}>
                {/* Sticky Header Title */}
                <div style={{
                    background: '#F7F8FA', // Seamless blend
                    padding: '12px 16px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <span style={{ fontWeight: 'bold', fontSize: '17px', color: '#1f2937' }}>我的</span>
                    </div>
                </div>

                {/* Content Area */}
                <div style={{ padding: '0 16px 24px 16px' }}>

                    {/* 1. Profile Header (Influence & Identity) */}
                    <ProfileHeader
                        profile={userData.profile}
                        level={userData.level}
                        influence={userData.influence}
                        achievements={userData.achievements} // Updated prop name
                    />

                    {/* 2. Baby Dashboard (Core Logic) */}
                    <BabyDashboard
                        babies={userData.babies}
                        onSwitch={handleSwitchBaby}
                    />

                    {/* 3. Wallet Entry */}
                    <WalletBrief wallet={userData.wallet} />

                    {/* 4. Menu & Tools Grid */}
                    <MenuGrid
                        reviewCount={userData.influence.totalReviews}
                        favoriteCount={8} // Mock data for now
                    />

                </div>

                {/* Footer */}
                <div style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#9CA3AF',
                    paddingBottom: '24px'
                }}>
                    宝妈说 v2.0.0
                </div>
            </div>
        </MobileContainer>
    );
}
