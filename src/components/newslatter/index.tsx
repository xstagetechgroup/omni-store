import React from 'react';
import Container from '../shared/container';
import { Button } from '../ui/button';


const NewslatterSection: React.FC = () => {
    return (
        <Container>
            <div className='w-full flex flex-wrap md:flex-nowrap justify-between items-center px-10 rounded-xl bg-primary py-16 my-10'>
                <div className='flex flex-col justify-between items-start gap-10'>
                    <h1 className='text-white text-4xl font-semibold'>Pronto para receber <br /> nossos lançamentos?</h1>
                    
                    <form className='w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 md:gap-2 bg-white border border-gray-400 p-2 rounded-md md:rounded-full'>
                        <div className='flex items-start md:items-center gap-2 w-full md:w-auto'>
                            <input
                                placeholder='Seu Email'
                                className='w-full outline-none border md:border-0 text-sm bg-gray-200 md:bg-transparent p-2 rounded-lg md:pl-5'
                            />
                        </div>
                        <Button className='rounded-full px-5 w-full sm:w-auto hover:bg-[#732DFF] duration-300 cursor-pointer'>Enviar</Button>
                    </form>

                </div>

                <div className='py-10 md:pt-0'>
                    <p className='text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit!</p>
                </div>
            </div>
        </Container>
    );
}

export default NewslatterSection;