import Container from '@/components/shared/container';
import Navbar from '@/components/shared/navbar';
import Image from 'next/image';
import React from 'react';

const SobrePage: React.FC = () => {
    return (
        <div className='w-full flex flex-col gap-10 justify-start items-center'>
            <div>
                <div className="w-full relative h-[300px] flex flex-col justify-between items-center">
                    <div className="absolute top-0 w-full">
                        <Navbar />
                    </div>
                    <Image src={'/assets/AboutBanner.png'} alt={'Home Banner'} width={1000} height={1000} className="w-full h-full object-cover" />
                </div>
            </div>

            <div className='w-full'>
                <Container>
                    <p>Content</p>
                </Container>
            </div>
        </div>
    );
}

export default SobrePage;