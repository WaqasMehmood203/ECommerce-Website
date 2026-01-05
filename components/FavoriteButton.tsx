'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import apiClient from '@/lib/api';
import { useWishlistStore } from '@/app/_zustand/wishlistStore';

interface FavoriteButtonProps {
    productId: string;
    className?: string;
    showTooltip?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    productId,
    className = '',
    showTooltip = true
}) => {
    const { data: session } = useSession();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { wishlist, setWishlist } = useWishlistStore();

    // Check if product is in wishlist on mount
    useEffect(() => {
        checkWishlistStatus();
    }, [productId, wishlist]);

    const checkWishlistStatus = () => {
        // Check local wishlist store first
        const inLocalWishlist = wishlist.some(item => item.id === productId);
        setIsInWishlist(inLocalWishlist);
    };

    const getUserId = async (): Promise<string | null> => {
        if (!session?.user?.email) return null;

        try {
            const response = await apiClient.get(`/api/users/email/${session.user.email}`);
            const data = await response.json();
            return data?.id || null;
        } catch (error) {
            console.error('Error fetching user ID:', error);
            return null;
        }
    };

    const addToWishlist = async () => {
        const userId = await getUserId();
        if (!userId) return;

        setIsLoading(true);

        try {
            const response = await apiClient.post('/api/wishlist', {
                userId,
                productId
            });

            if (response.ok) {
                const wishlistItem = await response.json();
                console.log('✅ Product added to wishlist:', wishlistItem);

                // Update local state
                setIsInWishlist(true);

                // Refresh wishlist from server
                await refreshWishlist(userId);

                toast.success('Added to wishlist!');
            } else {
                const error = await response.json();
                if (error.error === 'Product already in wishlist') {
                    setIsInWishlist(true);
                    toast('Already in wishlist!');
                } else {
                    toast.error(error.error || 'Failed to add to wishlist');
                }
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            toast.error('Failed to add to wishlist');
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromWishlist = async () => {
        const userId = await getUserId();
        if (!userId) return;

        setIsLoading(true);

        try {
            const response = await apiClient.delete(`/api/wishlist/${userId}/${productId}`);

            if (response.ok) {
                console.log('✅ Product removed from wishlist');

                // Update local state
                setIsInWishlist(false);

                // Refresh wishlist from server
                await refreshWishlist(userId);

                toast.success('Removed from wishlist!');
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to remove from wishlist');
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            toast.error('Failed to remove from wishlist');
        } finally {
            setIsLoading(false);
        }
    };

    const refreshWishlist = async (userId: string) => {
        try {
            const response = await apiClient.get(`/api/wishlist/${userId}`);
            const wishlistData = await response.json();

            const productArray: {
                id: string;
                title: string;
                price: number;
                image: string;
                slug: string;
                stockAvailabillity: number;
            }[] = [];

            wishlistData.map((item: any) =>
                productArray.push({
                    id: item?.product?.id,
                    title: item?.product?.title,
                    price: item?.product?.price,
                    image: item?.product?.mainImage,
                    slug: item?.product?.slug,
                    stockAvailabillity: item?.product?.inStock
                })
            );

            setWishlist(productArray);
        } catch (error) {
            console.error('Error refreshing wishlist:', error);
        }
    };

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!session?.user) {
            toast('Please login to save favourites', {
                icon: '🔒',
            });
            return;
        }

        if (isLoading) return;

        if (isInWishlist) {
            await removeFromWishlist();
        } else {
            await addToWishlist();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={`group relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 active:scale-95'
                } ${className}`}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            {isInWishlist ? (
                <FaHeart className="w-5 h-5 text-red-500 transition-transform group-hover:scale-110" />
            ) : (
                <FaRegHeart className="w-5 h-5 text-gray-600 transition-all group-hover:text-red-500 group-hover:scale-110" />
            )}

            {/* Tooltip */}
            {showTooltip && !isLoading && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                </span>
            )}
        </button>
    );
};

export default FavoriteButton;
