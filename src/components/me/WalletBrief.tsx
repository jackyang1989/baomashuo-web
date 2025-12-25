'use client';

import { Card } from 'antd-mobile';
import { Wallet, ChevronRight } from 'lucide-react';
import type { WalletInfo } from '@/types/user';

interface WalletBriefProps {
    wallet: WalletInfo;
}

export default function WalletBrief({ wallet }: WalletBriefProps) {
    // Requirement: Left-right layout
    return (
        <Card style={{ borderRadius: '16px', marginBottom: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Left: Icon + Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.2)'
                    }}>
                        <Wallet size={20} />
                    </div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937' }}>
                            收益钱包
                        </div>
                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                            今日预估 <span style={{ color: '#D97706' }}>+¥{wallet.todayEarnings.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Amount + Arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '18px', fontWeight: '900', color: '#B45309', fontFamily: 'monospace' }}>
                            ¥{wallet.totalEarnings.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '10px', color: '#9CA3AF' }}>
                            累计收益
                        </div>
                    </div>
                    <ChevronRight size={16} color="#D1D5DB" />
                </div>
            </div>
        </Card>
    );
}
