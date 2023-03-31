import React, { useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { itemList } from '../src/itemList'
import CartIcon from '../src/images/shopping-bag.svg'
import Image from 'next/image'
import SingleItem from '../src/components/SingleItem'
import { KataContext } from '../context'
import { CurrencyFormatter } from '../src/utilities/currencyFormatter'



export default function Home() {
    const router = useRouter();
    const { kataState } = useContext(KataContext);

    const totalAmount = kataState?.length && kataState?.reduce(
        (accumulator, currentValue) => accumulator + currentValue?.total,
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
                <h1 className='text-3xl font-bold text-center mb-10' data-testid="welcome">Welcome to JavaScript Kata</h1>
                <div className='flex gap-10 justify-end items-center mb-10 w-full lg:w-[75%] m-auto'>
                    {totalAmount > 0 && <div className='text-[#084b94] font-bold' data-testid="indexTotalAmount">Total: {CurrencyFormatter(totalAmount)}</div>}

                    <div className='relative cursor-pointer' data-testid='navToCheckout' onClick={() => router.push('/checkout')}>
                        <Image src={CartIcon} alt="cart-img" />
                        {
                            kataState?.length > 0 &&
                            <span 
                                data-testid="cartItem"
                                className='absolute font-bold top-[-8px] right-[-8px] w-[22px] h-[22px] bg-[#084b94] text-white rounded-full text-xs flex justify-center items-center'
                            >
                                {kataState?.length}
                            </span>
                        }
                    </div>
                </div>
            
                <div className='w-full m-auto clear-both grid sm:grid-cols-2 lg:grid-cols-3 lg:w-3/4 gap-8' data-testid="itemContainer">
                    {
                        itemList?.map((item) => {
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
