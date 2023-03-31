import Image from 'next/image'
import React, { useContext } from 'react'
import { KataContext } from '../../context'
import { CurrencyFormatter } from '../utilities/currencyFormatter'
import ButtonComponent from './Button'


export default function SingleCartItem({ kataItem }) {
    const { handleAddToCart, handleDecreaseItem, handleRemoveItem } = useContext(KataContext);
    
    return (
        <div key={kataItem?.name} className="rounded-lg border p-5" data-testid="singleCartItem">
            <div className="flex items-center gap-4 sm:gap-8">
                <Image src={kataItem?.image} alt='item-image' className='w-[30%]' />

                <div>
                    <div className='text-[#27abce] mt-2 font-semibold'>{kataItem?.name}</div>
                    <div className='font-semibold text-sm my-2'>Quantity: {kataItem?.qty}</div>
                    <div className='font-semibold text-sm my-2'>Unit Price: {CurrencyFormatter(kataItem?.unitPrice)}</div>
                    <div className='font-semibold text-sm my-2'>Total Cost: {CurrencyFormatter(kataItem?.total)}</div>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <ButtonComponent 
                    title="Inc +"
                    onClick={() => handleAddToCart(kataItem)}
                    style="px-4 py-1 w-fit" 
                    dataTestid="increaseCartItem"
                />
                <ButtonComponent 
                    title="Dec -"
                    onClick={() => handleDecreaseItem(kataItem)}
                    style="px-4 py-1 w-fit" 
                    disabled={kataItem?.qty === 1}
                    dataTestid="decreaseCartItem"
                />
                <ButtonComponent 
                    title="Remove x"
                    onClick={() => handleRemoveItem(kataItem)}
                    style="px-4 py-1 w-fit" 
                    dataTestid="removeCartItem"
                />
            </div>
        </div>
    )
}
