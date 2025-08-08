import React from 'react';
import Container from '../container';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <Container>

      <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-10 py-10 border-b border-gray-200'>
        <div className='flex flex-col sm:flex-row items-start justify-start gap-10'>
          <ul className='flex flex-col gap-2'>
            <li className='font-bold text-lg'>Sobre</li>
            <li className='text-gray-500 text-base pt-2'>
              <Link href={'#'} className='hover:text-[#732DFF] duration-300'>Blog</Link>
            </li>
            <li className='text-gray-500 text-base'>
              <Link href={'#'} className='hover:text-[#732DFF] duration-300'>Conheça a Equipa</Link>
            </li>
            <li className='text-gray-500 text-base'>
              <Link href={'#'} className='hover:text-[#732DFF] duration-300'>Contactos</Link>
            </li>
          </ul>

          <ul className='flex flex-col gap-2'>
            <li className='font-bold text-lg'>Suporte</li>
            <li className='text-gray-500 text-base pt-2'>
              <Link href={'#'} className='hover:text-[#732DFF] duration-300'>Contacte-nos</Link>
            </li>
            <li className='text-gray-500 text-base'>
              <Link href={'#'} className='hover:text-[#732DFF] duration-300'>Entrega</Link>
            </li>
            <li className='text-gray-500 text-base'>
              <Link href={'#'} className='hover:text-[#732DFF] duration-300'>Devolução</Link>
            </li>
            <li className='text-gray-500 text-base'>
              <Link href={'#'} className='hover:text-[#732DFF] duration-300'>FAQ</Link>
            </li>
          </ul>
        </div>

        <div className='flex flex-col items-start md:items-end gap-5'>
          <p className='font-medium text-lg'>Redes Sociais</p>
          <div className='flex items-start justify-start gap-4 text-white group'>
            <Link href={'#'} className='p-4 rounded-full bg-black hover:bg-[#732DFF] duration-300'><FaXTwitter className='text-lg' /></Link>
            <Link href={'#'} className='p-4 rounded-full bg-black hover:bg-[#732DFF] duration-300'><FaFacebookF className='text-lg' /></Link>
            <Link href={'#'} className='p-4 rounded-full bg-black hover:bg-[#732DFF] duration-300'><FaLinkedinIn className='text-lg' /></Link>
            <Link href={'#'} className='p-4 rounded-full bg-black hover:bg-[#732DFF] duration-300'><FaInstagram className='text-lg' /></Link>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col-reverse md:flex-row justify-between items-center gap-4 py-5 text-xs'>
        <p className='text-gray-500 text-center md:text-left'>Copyright © 2025 BPA-Inovações. Todos os direitos reservados.</p>
        <div className='flex items-center justify-center gap-5'>
          <Link href={'#'} className='hover:text-[#732DFF] duration-300'>Termos de Uso</Link>
          <Link href={'#'} className='hover:text-[#732DFF] duration-300'>Politicas de Privacidade</Link>
        </div>
      </div>

    </Container>
  );
}
