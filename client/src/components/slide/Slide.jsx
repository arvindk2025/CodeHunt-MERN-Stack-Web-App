import React from 'react'
import Slider from 'infinite-react-carousel';
import "./Slide.scss"


const Slide = ({children,slidesToShow,arrowsScroll}) => (
    <div className='slide'>
        <div className="container">
            <h1 style={{marginBottom:"20px"}}>Popular Services</h1>
            <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
                {children}
            </Slider>
        </div>
    </div>
)

export default Slide