// *********************
// Role of the component: Clean product card matching reference design
// Name of the component: ProductItem.tsx
// Developer: Aleksandar Kuzmanovic (Modernized)
// Version: 3.0
// Component call: <ProductItem product={product} color={color} />
// Input parameters: { product: Product; color: string; }
// Output: Clean product card with badges and pricing
// *********************

'use client';

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { sanitize } from "@/lib/sanitize";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine badges
  const isNew = Math.random() > 0.6; // Random for demo
  const isOnSale = product.inStock < 5;
  const originalPrice = isOnSale ? Math.round(product.price * 1.2) : null;

  return (
    <div className="group bg-white rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden bg-white">
        <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          {!imageLoaded && <div className="absolute inset-0 shimmer"></div>}

          <Image
            src={product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={`object-contain p-4 transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            alt={sanitize(product?.title) || "Product image"}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {isNew && (
              <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                New
              </span>
            )}
            {isOnSale && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                Sale
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-sm text-orange-500 font-medium">
          {product.category?.name || "SmartPhone"}
        </div>

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="block text-lg font-semibold text-slate-900 hover:text-indigo-600 transition-colors duration-200 line-clamp-2 min-h-[3.5rem]"
        >
          {sanitize(product.title)}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-3">
          {originalPrice && (
            <span className="text-slate-400 line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-orange-500 font-bold text-xl">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
