import React, { useState } from 'react'
import Image from 'next/image'
import { CurrencyFormatter } from '../utilities/currencyFormatter';
import ButtonComponent from './Button'

export default function SingleItem(props) {
    const { name, image, unitPrice, specialPrice } = props.item;
    const [kataState, setKataState] = useState([]);

    const handleAddToCart = (item) => {
        let ItemExistsInCart = kataState.length && kataState.find(product => product.name === item.name);
       
        if (ItemExistsInCart) {
            ItemExistsInCart.qty += 1;
            setKataState ([
                ...kataState
            ])
        } else {
            setKataState([
                ...kataState,
                {
                    ...item,
                    qty: 1
                }
            ])
        }
    }

    return (
        <div 
            key={name} 
            className="rounded-lg border border-[#ccc] bg-white overflow-hidden py-8 px-4 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg"
        >
            <Image src={image} alt='item-image' className='w-full' />
            <div className='text-[#27abce] mt-2 font-semibold'>{name}</div>
            <div className='font-semibold text-sm my-2'>
                {CurrencyFormatter(unitPrice)} each
            </div>
            {   specialPrice ? 
                <div className='font-semibold text-sm mb-2'>{CurrencyFormatter(Number(specialPrice?.split(" ")[2]))} for {specialPrice?.split(" ")[0]}</div>
                :
                <div className='h-5 mb-2'></div>
            }
            <ButtonComponent 
                title="Add To Cart"
                onClick={() => handleAddToCart({
                        name,
                        unitPrice,
                        specialPrice
                    })
                }
            />
        </div>
    )
}
