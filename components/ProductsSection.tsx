// *********************
// Role of the component: Modern products section for home page
// Name of the component: ProductsSection.tsx
// Developer: Aleksandar Kuzmanovic (Modernized)
// Version: 2.0
// Component call: <ProductsSection />
// Input parameters: no input parameters
// Output: Modern product grid with clean design
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";
import prisma from "@/lib/prisma";

const ProductsSection = async () => {
  let products = [];

  try {
    // Direct Prisma query (server component)
    products = await prisma.product.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        price: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Featured Products
          </h2>
          <p className="text-slate-600 text-lg">
            Discover our handpicked selection of premium electronics
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductItem key={product.id} product={product} color="black" />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Products Available</h3>
              <p className="text-slate-600">Check back soon for amazing deals!</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {products.length > 0 && (
          <div className="text-center mt-12">
            <a
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
