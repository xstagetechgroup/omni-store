'use client';

import React, { useState } from 'react';
import Container from '../container';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Container>
      <nav className='w-full flex justify-between items-center p-5 bg-white rounded-b-lg z-10 relative'>
        {/* Logo */}
        <Image width={120} height={100} alt='Omni Store Logo' src='/assets/5.png' />

        {/* Links - Desktop */}
        <div className='hidden md:flex gap-5 items-center justify-center'>
          <Link className='font-medium hover:text-[#732DFF] duration-300' href='/'>Sobre</Link>
          <Link className='font-medium hover:text-[#732DFF] duration-300' href='/'>Loja</Link>
          <Link className='font-medium hover:text-[#732DFF] duration-300' href='/'>Contactos</Link>
        </div>

        {/* Ações (ícones + avatar) */}
        <div className='flex gap-3 items-center'>
          {/* Ícones escondidos no mobile */}
          <div className='hidden md:flex gap-3'>
            <span className='p-2 rounded-full border'><Search className='w-5 h-5 text-black' /></span>
            <Link href={'/carrinho'} className='p-2 rounded-full border'><ShoppingCart className='w-5 h-5 text-black' /></Link>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          {/* Menu hambúrguer - mobile */}
          <button
            className='md:hidden p-2 rounded border'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className='absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-5 py-4 gap-4 md:hidden z-50'>
            <Link onClick={() => setMobileMenuOpen(false)} href='/' className='w-full font-medium hover:text-[#732DFF] duration-300'>Sobre</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href='/' className='w-full font-medium hover:text-[#732DFF] duration-300'>Loja</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href='/' className='w-full font-medium hover:text-[#732DFF] duration-300'>Contactos</Link>
            <div className='flex gap-3 pt-3 border-t w-full'>
              <span className='p-2 rounded-full border'><Search className='w-5 h-5 text-black' /></span>
              <Link href={'/carrinho'} className='p-2 rounded-full border'><ShoppingCart className='w-5 h-5 text-black' /></Link>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        )}
      </nav>
    </Container>
  );
}
