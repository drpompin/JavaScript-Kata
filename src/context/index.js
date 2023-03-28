import React, { createContext, useState } from 'react';

export const KataContext = createContext(null);



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

    return (
        <KataContext.Provider value={{ 
            kataState, 
            setKataState, 
            handleAddToCart 
        }}>
            {children}
        </KataContext.Provider>
    )
}
