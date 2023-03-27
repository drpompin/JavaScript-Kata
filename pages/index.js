import React from 'react'
import Head from 'next/head'
import { itemList } from '../src/itemList'
import CartIcon from '../src/images/shopping-bag.svg'
import Image from 'next/image'
import SingleItem from '../src/components/SingleItem'


export default function Home() {
  return (
    <div className='py-20'>
        <Head>
            <title>Kata Home Page</title>
            <meta name="description" content="Page Title" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <div className='w-full px-[10%]'>
            <div className='flex gap-10 justify-center items-center pb-10'>
                <h1 className='text-3xl font-bold'>Welcome to JavaScript Kata</h1>

                <div className='relative'>
                    <Image src={CartIcon} alt="cart-img" />
                    <span 
                        className='absolute font-bold top-[-8px] right-[-8px] w-[22px] h-[22px] bg-[#084b94] text-white rounded-full text-xs flex justify-center items-center'
                    >
                        {0}
                    </span>
                </div>
            </div>
           
            <div className='w-3/4 m-auto clear-both grid grid-cols-3 gap-8'>
                {
                    itemList.map((item) => {
                        return (
                            <SingleItem key={item.name}  item={item} />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
