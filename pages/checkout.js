import Head from "next/head";
import React, { useContext } from "react";
import ButtonComponent from "../src/components/Button";
import SingleCartItem from "../src/components/SingleCartItem";
import { KataContext } from "../context";
import { CurrencyFormatter } from "../src/utilities/currencyFormatter";


const CheckoutComponent = () => {
    const { kataState, clearCart } = useContext(KataContext);
    const totalAmount = kataState.reduce(
        (accumulator, currentValue) => accumulator + currentValue.total,
        0
    );
    
    const totalQuantity = kataState.reduce(
        (accumulator, currentValue) => accumulator + currentValue.qty,
        0
    );

    return (
        <>
            <Head>
                <title>Kata Checkout</title>
                <meta name="description" content="Checkout Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <div className='w-full px-[5%] md:px-[10%] py-20 md:w-[75%] m-auto'>
                <h1 className='text-3xl font-bold text-center mb-10'>JavaScript Kata Checkout</h1>

                <div className='flex gap-2 md:gap-5 justify-end items-center mb-10 w-full'>
                    <ButtonComponent 
                        title="Back"
                        onClick={() => window.history.back()}
                        style="!w-fit py-1 px-4"
                        dataTestid="goBack"
                    />
                    <ButtonComponent 
                        title="Clear Cart"
                        onClick={() => clearCart()}
                        style="!w-fit py-1 px-4"
                        disabled={!kataState.length}
                        dataTestid="clearCart"
                    />
                </div>


                <div className='flex flex-col gap-10 items-start mb-10 w-full'>
                    {
                        !kataState.length && 
                        <h1 className='text-3xl font-bold w-full text-center mb-10' data-testd="emptyCart">No item(s) in cart.</h1>
                    }

                    {
                        kataState?.map(kataItem => {
                            return (
                                <SingleCartItem 
                                    key={kataItem?.name} 
                                    kataItem={kataItem} 
                                />
                            )
                        }) 
                    }
                </div>

                {   
                    totalAmount > 0 && 
                    <>
                        <div data-testid="totalCheckoutAmount" className='text-[#084b94] font-bold text-right mb-2'>
                            Total Amount: {CurrencyFormatter(totalAmount)}
                        </div>

                        <div data-testid="totalCheckoutQuantity" className='text-[#084b94] font-bold text-right mb-2'>
                            Total Quantity: {totalQuantity} item(s) in total.
                        </div>
                    </>
                }
            </div>

        </>
    )
}

export default CheckoutComponent;