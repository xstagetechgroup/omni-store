import React from 'react';
import Container from '../shared/container';

export default function SearchForm() {
    return (
        <Container>
            <div className='w-full bg-white p-5 rounded-t-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                {/* Título */}
                <h1 className='text-2xl font-semibold text-center md:text-left'>Encontre tudo que você precisa</h1>
            </div>
        </Container>
    );
}
