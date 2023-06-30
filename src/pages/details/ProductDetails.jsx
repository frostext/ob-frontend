import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProduct } from '../../apis/Api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const ProductDetails = () => {

    const { id } = useParams();

    //  json object
    const [product, setProduct] = useState({});


    useEffect(() => {
        getProduct(id).then((res) => {
            console.log(res.data);
            setProduct(res.data);
        })
    }, [id]);

    //  cart value
    const [cartValue, setCartValue] = useState(1);

    //  increase cart value
    const increaseCartValue = () => {
        setCartValue(cartValue + 1);
    }

    //  decrease cart value
    const decreaseCartValue = () => {
        if (cartValue > 1) {
            setCartValue(cartValue - 1);
        }
    }

    const dispatch = useDispatch();
    const handleAddToCart = () => {
        const cartItem = {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: cartValue,
        };

        dispatch(addToCart(cartItem));
    };

    return (
        <div className='container mt-5'>
            <div className="d-flex">
                <img className='object-cover rounded-3' height={'500px'} width={'600px'} src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                <div className='ms-3 mt-4'>
                    <span className='fs-3 fw-bold'>
                        {product.name}
                    </span>

                    <p className='fs-4'>
                        Price: $100
                    </p>
                    <p className='fs-4'>
                        Category : T-Shirt
                    </p>
                    <p className='fs-4'>
                        Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                    </p>

                    {/* make cart + and - icon with input box */}
                    <div className="btn-group mb-2 d-flex w-25">
                        <button className='btn btn-outline-black' onClick={decreaseCartValue}>-</button>
                        <input type="text" className='form-control' value={cartValue} />
                        <button className='btn btn-outline-black' onClick={increaseCartValue}>+</button>
                    </div>

                    <button className='btn btn-primary' onClick={handleAddToCart}>Add to cart</button>

                </div>
            </div>
        </div>
    )
}

export default ProductDetails