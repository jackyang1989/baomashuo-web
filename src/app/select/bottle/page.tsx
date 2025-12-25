'use client';

import { useRouter } from 'next/navigation';
import { NavBar, CapsuleTabs, List, Button } from 'antd-mobile';
import { ChevronRight } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ProductCard } from '@/components/select/ProductCard';
import { useProductFilter } from '@/hooks/useProductFilter';
import type { BabyAgeRange } from '@/types/product';

export default function BottlePage() {
    const router = useRouter();
    const { selectedAge, setSelectedAge, products } = useProductFilter('bottle');

    return (
        <MobileContainer showTabBarSpacer>
            {/* 沉浸式导航栏 */}
            <div className="sticky top-0 z-50 bg-[#F7F8FA]/90 backdrop-blur-md">
                <NavBar
                    onBack={() => router.back()}
                    style={{ '--height': '44px', '--border-bottom': 'none' }}
                >
                    <span className="font-bold text-[#333]">奶瓶怎么选</span>
                </NavBar>

                {/* 胶囊筛选器 */}
                <div className="px-4 pb-3">
                    <CapsuleTabs
                        activeKey={selectedAge}
                        onChange={(key) => setSelectedAge(key as BabyAgeRange)}
                        style={{
                            '--active-bg': '#FF8FA3',
                            '--active-text-color': '#fff',
                        }}
                    >
                        <CapsuleTabs.Tab title="0-3个月" key="0-3" />
                        <CapsuleTabs.Tab title="3-6个月" key="3-6" />
                        <CapsuleTabs.Tab title="6-12个月" key="6-12" />
                    </CapsuleTabs>
                </div>
            </div>

            {/* 滚动内容区 */}
            <div className="px-4 py-2">
                {/* 统计横幅 */}
                <div
                    className="bg-white rounded-2xl p-4 mb-4 shadow-sm flex items-center justify-between border border-[#FF8FA3]/10"
                >
                    <div className="text-sm font-medium text-[#666]">
                        <span className="text-[#FF8FA3] font-bold mr-1">
                            {selectedAge === '0-3' ? '0-3个月' : selectedAge === '3-6' ? '3-6个月' : '6-12个月'}
                        </span>
                        的宝妈们最常用的奶瓶
                    </div>
                    <span className="text-xs text-gray-300">数据实时更新</span>
                </div>

                {/* 列表头 */}
                <div className="flex items-center justify-between mb-3 px-1">
                    <h2 className="text-base font-bold text-[#222]">推荐榜单</h2>
                    <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-100">
                        共 {products.length} 款
                    </span>
                </div>

                {/* 产品列表 */}
                <div className="space-y-3">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            rank={index + 1}
                            onClick={() => router.push(`/product/${product.id}`)}
                        />
                    ))}
                </div>

                {/* 底部功能区 */}
                <div className="mt-8 mb-6 space-y-4">
                    <Button
                        block
                        shape="rounded"
                        size="large"
                        style={{
                            '--background-color': '#FF8FA3',
                            '--border-color': '#FF8FA3',
                            '--text-color': '#fff',
                            fontWeight: 600,
                            boxShadow: '0 8px 20px -6px rgba(255, 143, 163, 0.5)'
                        }}
                        onClick={() => router.push('/review/submit')}
                    >
                        分享我的使用经验
                    </Button>

                    <div
                        className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-98 transition-transform"
                        onClick={() => router.push('/review')}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FFF0F5] flex items-center justify-center text-lg">
                                💬
                            </div>
                            <div>
                                <div className="text-sm font-bold text-[#333]">最新使用反馈</div>
                                <div className="text-xs text-gray-400 mt-0.5">看看大家都在吐槽什么</div>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
