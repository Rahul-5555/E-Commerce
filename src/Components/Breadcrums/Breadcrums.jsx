import React from 'react';
import './Breadcrums.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrums = ({ product }) => {
  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt=""/> {product?.category} <img src={arrow_icon} alt="" /> {product?.name}
    </div>
  );
}

export default Breadcrums;
