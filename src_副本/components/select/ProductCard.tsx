import React from 'react';
import { Card, Image, Tag, Space } from 'antd-mobile';
import { ThumbsUp } from 'lucide-react';
import type { ProductListItem } from '@/types/product';

interface ProductCardProps {
    product: ProductListItem;
    rank?: number;
    onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, rank, onClick }) => {
    return (
        <Card
            onClick={onClick}
            style={{
                borderRadius: 16,
                marginBottom: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.03)'
            }}
            bodyStyle={{ padding: 12 }}
        >
            <div className="flex gap-4">
                {/* 产品图 + 排名 */}
                <div className="relative shrink-0">
                    <div
                        className="w-[88px] h-[88px] rounded-xl bg-white flex items-center justify-center border border-gray-50 overflow-hidden"
                    >
                        {/* 真实项目中应使用 product.imageUrl */}
                        <span className="text-5xl">🍼</span>
                    </div>

                    {rank && rank <= 3 && (
                        <div
                            className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm z-10"
                            style={{
                                background: rank === 1 ? '#FFD54F' : rank === 2 ? '#B0BEC5' : '#D7CCC8',
                                border: '2px solid #fff'
                            }}
                        >
                            {rank}
                        </div>
                    )}
                </div>

                {/* 信息区 - 使用 Space 布局 */}
                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                    <Space direction="vertical" gap={4} block>
                        <div className="text-xs text-gray-400 font-medium">
                            {product.brand}
                        </div>
                        <div className="text-[15px] font-bold text-[#333] leading-tight line-clamp-2">
                            {product.name}
                        </div>
                    </Space>

                    <div className="flex items-end justify-between mt-2">
                        <Space gap={6} align="center">
                            <Tag
                                style={{
                                    '--background-color': '#E8F5E9',
                                    '--text-color': '#4CAF50',
                                    padding: '2px 6px',
                                    borderRadius: 6,
                                    border: 'none'
                                }}
                            >
                                <div className="flex items-center gap-1 font-semibold text-[11px]">
                                    <ThumbsUp size={10} fill="#4CAF50" />
                                    {product.recommendRate}%
                                </div>
                            </Tag>
                            <span className="text-xs text-gray-400">
                                {product.reviewCount}条热评
                            </span>
                        </Space>

                        <div className="text-base font-bold text-[#FF8FA3]">
                            <span className="text-xs font-normal text-gray-400 mr-0.5">¥</span>
                            {product.priceRange}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
