import React from 'react';
import Container from '../shared/container';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';

export default function SearchForm() {
    return (
        <Container>
            <div className='w-full bg-white p-5 rounded-t-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                {/* Título */}
                <h1 className='text-2xl font-semibold text-center md:text-left'>Give All You Need</h1>

                {/* Formulário de busca */}
                <form className='w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 md:gap-2 border border-gray-400 p-2 rounded-md md:rounded-full'>
                    <div className='flex items-center gap-2 w-full sm:w-auto'>
                        <Search className='w-5 h-5 text-gray-400' />
                        <input
                            placeholder='Search for products, brands and more'
                            className='outline-none border-0 w-full sm:w-[300px] text-sm'
                        />
                    </div>
                    <Button className='rounded-full px-5 w-full sm:w-auto'>Search</Button>
                </form>
            </div>
        </Container>
    );
}
