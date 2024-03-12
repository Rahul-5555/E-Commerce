// import React from 'react'
// import './Hero.css'
// import hand_icon from '../Assets/hand_icon.png'
// import arrow_icon from '../Assets/arrow.png'
// import hero_image from '../Assets/hero_image.png'

// const Hero = () => {
//     return (
//         <div className='hero'>
//             <div>

//             <div className="hero-left">
//                 <h2>NEW ARRIVALS ONLY</h2>
//             </div>
//             <div>
//                 <div className='hero-hand-icon'>
//                 <p>new</p>
//                     <img src={hand_icon} alt="" />
//                 </div>
                
//                 <p>collections</p>
//                 <p>for everyone</p>
//             </div>
//             <div className="hero-latest-btn">
//                 <div>Latest Collection</div>
//                 <img src={arrow_icon} alt="" />
//             </div>
//             </div>
//             <div className="hero-right">
//                 <img  src={hero_image} alt="" />
//             </div>
//         </div>
//     )
// }

// export default Hero



import React from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-content" style={{margin:0}}>
        <div className="hero-left">
          <h2>NEW ARRIVALS ONLY</h2>
         
          <div className='hero-hand-icon' >
            <p className='hero-para'>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p className='hero-para' >collections</p>
          <p className='hero-para'>for everyone</p>
          <div className="hero-latest-btn">
            <div className=''>Latest Collection</div>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className="hero-right">
          <img src={hero_image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
