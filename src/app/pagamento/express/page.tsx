'use client';
import ExpressPayment from '@/components/expressPayment';
import Container from '@/components/shared/container';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ExpressPage() {

    const searchParams = useSearchParams();
    const productTitle = searchParams.get("productTitle");
    const plan = searchParams.get("plan");
    const price = searchParams.get("price");
    const qty = searchParams.get("qty");


    return (
        <div>
            <div className="w-full h-[300px] bg-gray-700 text-white flex flex-col justify-end pb-10 items-center">
                <h1 className="text-4xl font-medium">Método de Pagamento - Multicaixa Express</h1>
                <div className="flex items-center justify-center gap-2 text-lg">
                    <Link href={'/'} className="hover:text-[#732DFF]">Home</Link>
                    <p>/</p>
                    <p>Pagamento</p>
                </div>
            </div>
            <Container>
                <ExpressPayment
                    productData={{
                        title: productTitle,
                        plan,
                        price: price !== null ? Number(price) : null,
                        qty: qty !== null ? Number(qty) : null
                    }}
                />
            </Container>
        </div>
    );
}
