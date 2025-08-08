import React from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/utils/products";
import { ShoppingCart } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function ProductGrid() {
    return (
        <div className="w-full flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.title} className="group">

                        <div className="w-full flex justify-center items-center bg-slate-200 mb-4 rounded-lg aspect-square relative overflow-hidden">
                            <div className="absolute top-4 right-4 text-base bg-white inline-block px-3 py-1 rounded-full mb-2 border border-gray-300">{product.category}</div>
                            <Image width={150} height={150} alt="Product" src={product.image} className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
                        </div>

                        <h3 className="text-lg font-semibold">{product.title}</h3>
                        
                        <div className="w-full flex justify-between items-center">
                            <p className="text-gray-600 text-sm">
                                ⭐ {product.rating} ({product.reviews} Visualizações)
                            </p>
                            <p className="font-bold text-xl mt-1 ">{product.price} AKZ</p>
                        </div>

                        <div className="flex gap-2 mt-3 justify-between items-center">
                            <button className="p-3 border rounded-full cursor-pointer flex items-center justify-center"><ShoppingCart /></button>
                            <Link href={'/carrinho'} className="px-4 py-3 text-white bg-black duration-300 rounded-full text-sm hover:bg-[#732DFF] cursor-pointer">
                                Comprar Agora
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full">
                <Pagination className="w-full">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
