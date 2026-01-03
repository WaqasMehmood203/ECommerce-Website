// *********************
// Role of the component: Showing products on the shop page with applied filter and sort
// Name of the component: Products.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Products params={params} searchParams={searchParams} />
// Input parameters: { params, searchParams }: { params: { slug?: string[] }, searchParams: { [key: string]: string | string[] | undefined } }
// Output: products grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import prisma from "@/lib/prisma";

const Products = async ({ params, searchParams }: { params: { slug?: string[] }, searchParams: { [key: string]: string | string[] | undefined } }) => {
  // getting all data from URL slug and preparing everything for sending GET request
  const inStockNum = searchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = searchParams?.outOfStock === "true" ? 1 : 0;
  const page = searchParams?.page ? Number(searchParams?.page) : 1;

  let stockMode: string = "lte";

  // preparing inStock and out of stock filter for GET request
  // If in stock checkbox is checked, stockMode is "equals"
  if (inStockNum === 1) {
    stockMode = "equals";
  }
  // If out of stock checkbox is checked, stockMode is "lt"
  if (outOfStockNum === 1) {
    stockMode = "lt";
  }
  // If in stock and out of stock checkboxes are checked, stockMode is "lte"
  if (inStockNum === 1 && outOfStockNum === 1) {
    stockMode = "lte";
  }
  // If in stock and out of stock checkboxes aren't checked, stockMode is "gt"
  if (inStockNum === 0 && outOfStockNum === 0) {
    stockMode = "gt";
  }

  let products: any[] = [];

  try {
    const where: any = {
      price: {
        lte: Number(searchParams?.price) || 3000,
      },
      rating: {
        gte: Number(searchParams?.rating) || 0,
      },
    };

    // Stock logic
    if (inStockNum === 1 && outOfStockNum === 1) {
      where.inStock = { lte: 1 };
    } else if (inStockNum === 1) {
      where.inStock = { equals: 1 };
    } else if (outOfStockNum === 1) {
      where.inStock = { lt: 1 };
    } else if (inStockNum === 0 && outOfStockNum === 0) {
      where.inStock = { gt: 1 };
    }

    // Category logic
    if (params?.slug && params.slug.length > 0) {
      // Replicating improveCategoryText logic if needed, but Prisma unique names usually match
      // The slug might be "smart-phones" which should match "smart phones" in DB
      const categoryName = params.slug[0].replace(/-/g, " ");
      where.category = {
        name: {
          equals: categoryName,
          mode: 'insensitive'
        }
      };
    }

    // Sort logic
    let orderBy: any = { price: 'desc' }; // default
    if (searchParams?.sort === 'titleAsc') orderBy = { title: 'asc' };
    if (searchParams?.sort === 'titleDesc') orderBy = { title: 'desc' };
    if (searchParams?.sort === 'lowPrice') orderBy = { price: 'asc' };
    if (searchParams?.sort === 'highPrice') orderBy = { price: 'desc' };

    // Direct Prisma query
    products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
      },
      // Pagination logic - assuming 9 items per page as common for 3-column grid
      skip: (page - 1) * 9,
      take: 9,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {products.length > 0 ? (
        products.map((product: any) => (
          <ProductItem key={product.id} product={product} color="black" />
        ))
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
          No products found for specified query
        </h3>
      )}
    </div>
  );
};

export default Products;
