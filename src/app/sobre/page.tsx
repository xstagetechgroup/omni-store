import Container from '@/components/shared/container';
import { Eye, Goal, Star, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SobrePage: React.FC = () => {
    return (
        <div className='w-full flex flex-col justify-start items-center'>
            <div className="w-full h-[300px] bg-gray-700 text-white flex flex-col justify-end pb-10 items-center">
                <h1 className="text-4xl font-medium">Sobre a Omnibox Store</h1>
                <div className="flex items-center justify-center gap-2 text-lg">
                    <Link href={'#'} className="hover:text-[#732DFF]">Home</Link>
                    <p>/</p>
                    <p>Sobre</p>
                </div>
            </div>
            <div className='w-full py-10 bg-[#F2F4F9]'>
                <Container>
                    <div className='w-full flex flex-col bg-white border rounded-lg p-10 py-10 gap-10'>
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-10'>
                            <div className='flex flex-col gap-0 justify-center items-start'>
                                <p className='text-lg text-gray-400 uppercase font-bold'>Nós somos a OMNIBOX STORE</p>
                                <p className='text-5xl font-bold '>Marcos e Conquistas <br /> da Nossa Equipe</p>
                                <p className='text-sm text-justify text-gray-700 pt-8'>A OmniBox Store é uma loja especializada em produtos eletrônicos e soluções tecnológicas que unem inovação, qualidade e acessibilidade. Trabalhamos para oferecer aos nossos clientes uma experiência de compra prática, segura e completa, reunindo em um só lugar equipamentos e acessórios que facilitam o dia a dia, desde dispositivos de uso pessoal até soluções para empresas.</p>
                                <p className='text-sm text-justify text-gray-700 pt-2'>Mais do que vender produtos, a nossa missão é aproximar as pessoas da tecnologia de forma simples e confiável. Na OmniBox Store, cada cliente encontra não apenas variedade e bons preços, mas também atendimento dedicado e suporte para garantir que cada escolha seja a melhor decisão para o seu estilo de vida ou negócio.</p>
                            </div>

                            <div className='flex justify-end items-center'>
                                <Image
                                    src="/assets/about.png"
                                    alt="Sobre a Omnibox Store"
                                    width={1000}
                                    height={1000}
                                    className="object-cover w-[400px] h-[400px] rounded-lg"
                                />
                            </div>
                        </div>

                        <div className='w-full grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-3'>
                            <div className='flex bg-[#F2F4F9] gap-5 flex-col justify-center items-start p-5 border rounded-lg'>
                                <Goal className='size-15 text-[#732DFF]' />
                                <p className='text-xl font-bold text-gray-700'>Missão</p>
                                <p className='text-base text-justify text-gray-700'>Oferecer produtos eletrônicos e soluções tecnológicas que simplifiquem a vida das pessoas e empresas, garantindo qualidade, inovação, confiança e uma experiência de compra prática e segura.</p>
                            </div>
                            <div className='flex bg-[#F2F4F9] gap-5 flex-col justify-center items-start p-5 border rounded-lg'>
                                <Eye className='size-15 text-[#732DFF]' />
                                <p className='text-xl font-bold text-gray-700'>Visão</p>
                                <p className='text-base text-justify text-gray-700'>Ser reconhecida como uma das principais lojas de eletrônicos do mercado, referência em tecnologia acessível, atendimento de excelência e soluções que acompanham as tendências do futuro digital.</p>
                            </div>
                            <div className='flex bg-[#F2F4F9] gap-5 flex-col justify-center items-start p-5 border rounded-lg'>
                                <Star className='size-15 text-[#732DFF]' />
                                <p className='text-xl font-bold text-gray-700'>Valores</p>
                                <ul className='list-disc list-inside'>
                                    <li>Inovação</li>
                                    <li>Confiança</li>
                                    <li>Acessibilidade</li>
                                    <li>Compromisso</li>
                                    <li>Excelência</li>
                                </ul>
                            </div>
                        </div>

                        <div className='flex flex-col gap-0 justify-center items-center w-full pt-10'>
                            <p className='text-2xl font-bold text-gray-900'>Nossas Parcerias</p>
                            <div className='w-full flex gap-10 justify-center items-center py-10'>

                                <Link href={'https://www.cyberworld.bpa.co.ao/'}>
                                    <Image
                                        src="/assets/Logo-CW.png"
                                        alt="Sobre a Cyber World"
                                        width={1000}
                                        height={1000}
                                        className="object-cover object-center h-[60px] w-[170px] rounded-lg"
                                    />
                                </Link>

                                <Link href={'https://www.xstage.bpa.co.ao/'}>
                                    <Image
                                        src="/assets/Logo-Xstage.png"
                                        alt="Sobre a Xstage"
                                        width={1000}
                                        height={1000}
                                        className="object-cover object-center h-[60px] w-[170px] rounded-lg"
                                    />
                                </Link>

                                <Link href={'https://www.bpa.co.ao/'}>
                                    <Image
                                        src="/assets/Logo-BPA.png"
                                        alt="Sobre a BPA"
                                        width={1000}
                                        height={1000}
                                        className="object-cover object-center h-[60px] w-[170px] rounded-lg"
                                    />
                                </Link>

                                <Link href={'https://www.roveplus.bpa.co.ao/'}>
                                    <Image
                                        src="/assets/Logo-Rove.png"
                                        alt="Sobre a Rove Plus"
                                        width={1000}
                                        height={1000}
                                        className="object-cover object-center h-[60px] w-[170px] rounded-lg"
                                    />
                                </Link>
                            </div>
                        </div>

                    </div>
                </Container>
            </div>
        </div>
    );
}

export default SobrePage;