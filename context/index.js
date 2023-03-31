import React, { createContext, useState } from 'react';

export const KataContext = createContext("");


export default function Context({ children }) {
    const [kataState, setKataState] = useState([]);

    const handleAddToCart = (item) => {
        let ItemExistsInCart = kataState.length && kataState.find(product => product.name === item.name);
       
        if (ItemExistsInCart) {
            ItemExistsInCart.qty += 1;
            if (!item.specialPrice) {
                ItemExistsInCart.total = ItemExistsInCart.qty * ItemExistsInCart.unitPrice;
            } else {
                if (ItemExistsInCart.qty < +(ItemExistsInCart.specialPrice.split(" ")[0])) {
                    ItemExistsInCart.total = ItemExistsInCart.qty * ItemExistsInCart.unitPrice;
                }

                if (ItemExistsInCart.qty >= +(ItemExistsInCart.specialPrice.split(" ")[0])) {
                    let DiscountableQty = Math.trunc(ItemExistsInCart.qty / +(ItemExistsInCart.specialPrice.split(" ")[0]));
                    let discountedAmount = DiscountableQty * +(ItemExistsInCart.specialPrice.split(" ")[2]);

                    let remainderQty = ItemExistsInCart.qty % +(ItemExistsInCart.specialPrice.split(" ")[0]);
                    let remainderAmount = remainderQty * ItemExistsInCart.unitPrice;
                    
                    ItemExistsInCart.total = (discountedAmount + remainderAmount);

                }
            }
            setKataState ([
                ...kataState
            ]);

        } else {
            setKataState([
                ...kataState,
                {
                    ...item,
                    qty: 1,
                    total: item.unitPrice
                }
            ])
        }
    }

    const handleDecreaseItem = (item) => {
        let itemToBeDecreased = kataState.find(product => product.name === item.name);
        if (itemToBeDecreased.qty > 0) {
            itemToBeDecreased.qty -= 1;
        }

        if (!itemToBeDecreased.specialPrice) {
            itemToBeDecreased.total = itemToBeDecreased.qty * itemToBeDecreased.unitPrice;
        } else {
            if (itemToBeDecreased.qty < +(itemToBeDecreased.specialPrice.split(" ")[0])) {
                itemToBeDecreased.total = itemToBeDecreased.qty * itemToBeDecreased.unitPrice;
            }

            if (itemToBeDecreased.qty >= +(itemToBeDecreased.specialPrice.split(" ")[0])) {
                let DiscountableQty = Math.trunc(itemToBeDecreased.qty / +(itemToBeDecreased.specialPrice.split(" ")[0]));
                let discountedAmount = DiscountableQty * +(itemToBeDecreased.specialPrice.split(" ")[2]);

                let remainderQty = itemToBeDecreased.qty % +(itemToBeDecreased.specialPrice.split(" ")[0]);
                let remainderAmount = remainderQty * itemToBeDecreased.unitPrice;
                
                itemToBeDecreased.total = (discountedAmount + remainderAmount);
            }
        }

        setKataState ([
            ...kataState
        ]);
    }

    const handleRemoveItem = (item) => {
        let remainingItems = kataState.filter(product => product.name !== item.name);        
        setKataState (remainingItems);
    }

    const clearCart = () => {
        setKataState ([]);
    }

    return (
        <KataContext.Provider value={{ 
            kataState, 
            setKataState, 
            handleAddToCart,
            handleDecreaseItem,
            handleRemoveItem,
            clearCart
        }}>
            {children}
        </KataContext.Provider>
    )
}
