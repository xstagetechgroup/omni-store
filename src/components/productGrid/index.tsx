"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/utils/products";
import { ShoppingCart, Loader2 } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { TProduct } from "@/types/product";

export default function ProductGrid() {
    const itemsPerPage = 16;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState<TProduct[]>([]);
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Ref para o topo da lista
    const listTopRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setCurrentProducts(products.slice(startIndex, endIndex));
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [currentPage]);

    const goToPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full flex flex-col gap-5">
            {/* Ref para o topo */}
            <div ref={listTopRef}></div>

            {loading ? (
                <div className="w-full flex justify-center py-10">
                    <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="group">
                            <Link href={`/produto/${product.id}`}>
                                <div className="w-full shadow flex justify-center items-center bg-slate-200 mb-4 rounded-lg aspect-square relative overflow-hidden cursor-pointer">
                                    <div className="absolute top-4 right-4 text-xs bg-white inline-block px-3 py-1 rounded-full mb-2 border border-gray-300">
                                        {product.category}
                                    </div>
                                    <Image
                                        width={500}
                                        height={500}
                                        alt={product.title}
                                        src={product.imageSecondary}
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                    />
                                </div>
                            </Link>

                            <h3 className="text-lg font-semibold">{product.title}</h3>

                            <div className="w-full flex justify-between items-center">
                                <p className="text-gray-600 text-sm">
                                    ⭐ {product.rating} ({product.reviews} Views)
                                </p>
                                <p className="font-bold text-base mt-1">{Number(product.price).toLocaleString("pt-BR")} AKZ</p>
                            </div>

                            <div className="flex gap-2 mt-3 justify-between items-center">
                                <button className="p-3 border rounded-full cursor-pointer flex items-center justify-center">
                                    <ShoppingCart className="size-4 text-black" />
                                </button>
                                <Link
                                    href={"/carrinho"}
                                    className="px-3 py-2 text-white bg-black duration-300 rounded-full text-sm hover:bg-[#732DFF] cursor-pointer"
                                >
                                    Comprar Agora
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Paginação */}
            <div className="w-full">
                <Pagination className="w-full justify-center">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    goToPage(currentPage - 1);
                                }}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === i + 1}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        goToPage(i + 1);
                                    }}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    goToPage(currentPage + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
