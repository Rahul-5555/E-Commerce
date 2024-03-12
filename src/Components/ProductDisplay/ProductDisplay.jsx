import React from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { useContext } from 'react';

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    // Check if product is defined before rendering
    if (!product) {
        return null; // Or render a loading spinner or message
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {/* Use optional chaining to safely access image */}
                    <img src={product?.image} alt="as" />
                    <img src={product?.image} alt="qw" />
                    <img src={product?.image} alt="rtr" />
                    <img src={product?.image} alt="tr" />
                </div>
                <div className="productdisplay-img">
                    {/* Use optional chaining to safely access image */}
                    <img className='productdisplay-main-img' src={product?.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    { /* Description content */ }
                    A lightweight, usually knitted, pullover shirt, close-fitting and a round neckline and short sleeves, worn as undershirt or outer garment.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span>{product.category}</p>
                <p className='productdisplay-right-category'><span>Tags :</span>{product.tags}</p>
            </div>
        </div>
    );
}

export default ProductDisplay;
