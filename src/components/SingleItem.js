import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import { CurrencyFormatter } from '../utilities/currencyFormatter';
import ButtonComponent from './Button'
import { KataContext } from '../context';



export default function SingleItem(props) {
    const { name, image, unitPrice, specialPrice } = props.item;
	const [selectedItemId, setSelectedItemId] = useState('');
	const [itemIsAdded, setItemIsAdded] = useState(false);

    const { handleAddToCart } = useContext(KataContext);

    const initiateAddToCart = (name, unitPrice, specialPrice) => {
        handleAddToCart({
            name,
            unitPrice,
            specialPrice
        });
        setSelectedItemId(name);
        setItemIsAdded(true);
    };

    useEffect(() => {
        itemIsAdded &&
        setTimeout(() => {
            setItemIsAdded(false);
            setSelectedItemId("");
        }, 1000);
    }, [itemIsAdded])

    return (
        <div 
            key={name} 
            className="rounded-lg border border-[#ccc] bg-white overflow-hidden py-8 px-4 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg relative"
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
                onClick={() => initiateAddToCart(name, unitPrice, specialPrice)}
            />
            
            {itemIsAdded && name === selectedItemId && (
                <div className='absolute top-[75%] left-0 text-[#f52421] sm:top-[90%] w-full text-center'>Item added to cart</div>
            )}
        </div>
    )
}
