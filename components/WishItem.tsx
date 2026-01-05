'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import apiClient from '@/lib/api';
import { useWishlistStore } from '@/app/_zustand/wishlistStore';
import { useProductStore } from '@/app/_zustand/store';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

interface WishItemProps {
    id: string;
    title: string;
    price: number;
    image: string;
    slug: string;
    stockAvailabillity: number;
}

const WishItem: React.FC<WishItemProps> = ({
    id,
    title,
    price,
    image,
    slug,
    stockAvailabillity
}) => {
    const { data: session } = useSession();
    const { wishlist, setWishlist } = useWishlistStore();
    const { addToCart, calculateTotals } = useProductStore();

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

    const removeFromWishlist = async () => {
        const userId = await getUserId();
        if (!userId) return;

        try {
            const response = await apiClient.delete(`/api/wishlist/${userId}/${id}`);

            if (response.ok) {
                // Remove from local state
                const updatedWishlist = wishlist.filter(item => item.id !== id);
                setWishlist(updatedWishlist);
                toast.success('Removed from wishlist!');
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to remove from wishlist');
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            toast.error('Failed to remove from wishlist');
        }
    };

    const handleAddToCart = () => {
        // Add to cart using the product store
        addToCart({
            id: id.toString(),
            title: title,
            price: price,
            image: image,
            amount: 1
        });
        calculateTotals();
        toast.success('Added to cart!');
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td></td>

            {/* Product Image */}
            <td>
                <Link href={`/product/${slug}`}>
                    <div className="relative w-20 h-20 mx-auto">
                        <Image
                            src={image ? `/${image}` : '/product_placeholder.jpg'}
                            fill
                            className="object-contain"
                            alt={title}
                        />
                    </div>
                </Link>
            </td>

            {/* Product Name & Price */}
            <td>
                <Link
                    href={`/product/${slug}`}
                    className="hover:text-blue-600 transition-colors"
                >
                    <div className="font-semibold text-gray-900">{title}</div>
                    <div className="text-orange-500 font-bold mt-1">${price.toFixed(2)}</div>
                </Link>
            </td>

            {/* Stock Status */}
            <td>
                {stockAvailabillity > 0 ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        In Stock ({stockAvailabillity})
                    </span>
                ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        Out of Stock
                    </span>
                )}
            </td>

            {/* Actions */}
            <td>
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={handleAddToCart}
                        disabled={stockAvailabillity === 0}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${stockAvailabillity > 0
                                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        title={stockAvailabillity > 0 ? 'Add to cart' : 'Out of stock'}
                    >
                        <FaShoppingCart className="inline mr-2" />
                        Add to Cart
                    </button>

                    <button
                        onClick={removeFromWishlist}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 active:scale-95 transition-all"
                        title="Remove from wishlist"
                    >
                        <FaTrash className="inline" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default WishItem;
