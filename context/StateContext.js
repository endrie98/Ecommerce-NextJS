import React, { useContext, createContext, useState, useEffect } from 'react';
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct
    let index

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        console.log('if the product clicked is in cart items',checkProductInCart)
        console.log('this is the array of cartItems', cartItems)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        if (checkProductInCart) {
            const updateCartItems = cartItems.map((cartProduct) => {
                console.log('if both ids are same', cartProduct._id === product._id)
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updateCartItems)
        } else {
            product.quantity = quantity

            setCartItems([...cartItems, { ...product }])
        }

        toast.success(`${qty} ${product.name} added to the cart.`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        let newCartItems = cartItems.filter((item) => item._id !== product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        let newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
};


export const useStateContext = () => useContext(Context)