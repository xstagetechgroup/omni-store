'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/utils/products';
import Link from 'next/link';
import Container from '../shared/container';


const RecomendedProducts: React.FC = () => {
    return (
        <Container>
            <section className="w-full py-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl md:text-3xl font-semibold">Explore nossas recomendações</h2>
                    <div className="flex gap-3">
                        <button className="prev flex items-center cursor-pointer"><ArrowLeft className='size-7' /></button>
                        <button className="next flex items-center cursor-pointer"><ArrowRight className='size-7' /></button>
                    </div>
                </div>

                <div className="mt-6">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.next',
                            prevEl: '.prev',
                        }}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index}>
                                <div key={product.title} className='group'>

                                    <div className="w-full flex justify-center items-center bg-slate-200 mb-4 rounded-lg aspect-square relative overflow-hidden">
                                        <div className="absolute top-4 right-4 text-base bg-white inline-block px-3 py-1 rounded-full mb-2 border border-gray-300">{product.category}</div>
                                        <Image width={150} height={150} alt="Product" src={product.image} className=" object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
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
                                        <Link href={'/carrinho'} className="px-4 py-3 bg-black text-white rounded-full text-sm duration-300 hover:bg-[#732DFF] cursor-pointer">
                                            Comprar Agora
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </Container>
    );
}

export default RecomendedProducts;