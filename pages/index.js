import React, { useContext } from 'react'
import Head from 'next/head'
import { itemList } from '../src/itemList'
import CartIcon from '../src/images/shopping-bag.svg'
import Image from 'next/image'
import SingleItem from '../src/components/SingleItem'
import { KataContext } from '../src/context'
import { CurrencyFormatter } from '../src/utilities/currencyFormatter'
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter()
    const { kataState } = useContext(KataContext);

    const totalAmount = kataState.reduce(
        (accumulator, currentValue) => accumulator + currentValue.total,
        0
    );


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

                    <div className='relative cursor-pointer' onClick={() => router.push('/cart')}>
                        <Image src={CartIcon} alt="cart-img" />
                        {
                            kataState.length > 0 &&
                            <span 
                            className='absolute font-bold top-[-8px] right-[-8px] w-[22px] h-[22px] bg-[#084b94] text-white rounded-full text-xs flex justify-center items-center'
                        >
                            {kataState.length}
                        </span>}
                    </div>

                    {totalAmount > 0 && <div className='text-[#084b94] font-bold'>Total: {CurrencyFormatter(totalAmount)}</div>}
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
