import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function Container({ children }: Props) {
    return (
        <div className='w-full flex flex-col justify-start items-center h-full px-5'>
            <div className='w-full max-w-[1280px] h-full'>
                {children}
            </div>
        </div>
    )
}
