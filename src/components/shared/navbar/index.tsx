'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutUser } from '@/lib/authActions';
import { useRouter } from "next/navigation";

type User = {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
};

export default function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Recupera user do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      setUser(null); // reseta estado do usuário
      router.refresh(); // redireciona
    }
  };

  // Pegar as iniciais do nome
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <nav className='w-full fixed top-0 flex justify-center items-start md:px-5 z-50'>
      <div className='max-w-[1280px] w-full flex justify-between items-center p-5 bg-white md:rounded-b-lg z-50 shadow-md'>
        {/* Logo */}
        <Link href="/"><Image width={120} height={100} alt='Omni Store Logo' src='/assets/5.png' /></Link>

        {/* Links - Desktop */}
        <div className='hidden md:flex gap-5 items-center justify-center'>
          <Link className='font-medium hover:text-[#732DFF] duration-300' href='/sobre'>Sobre</Link>
          <Link className='font-medium hover:text-[#732DFF] duration-300' href='/'>Loja</Link>
          <Link className='font-medium hover:text-[#732DFF] duration-300' href='/'>Contactos</Link>
        </div>

        {/* Ações (ícones + avatar) */}
        <div className='flex gap-3 items-center'>
          {/* Ícones escondidos no mobile */}
          <div className='hidden md:flex gap-3'>
            <span className='p-2 rounded-full border'><Search className='w-5 h-5 text-black' /></span>
            <Link href={'/carrinho'} className='p-2 rounded-full border'><ShoppingCart className='w-5 h-5 text-black' /></Link>

            {user ? (

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src="" />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='cursor-pointer'>Meus Dados</DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer'>Meus Pedidos</DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer'>Alterar Senha</DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center px-3 py-1 rounded-md border font-medium text-sm hover:bg-[#732DFF] hover:text-white transition"
              >
                Entrar
              </Link>
            )}

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

              {user ? (
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-1 rounded-md border font-medium text-sm hover:bg-[#732DFF] hover:text-white transition"
                >
                  Entrar
                </Link>
              )}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
