import React from 'react'
import first from "../Images/pexels-max-fischer-5868738.jpg"
import sec from "../Images/pngtree-dress-shop-offering-in-a-red-and-orange-color-fashion-showroom-image_2505499.jpg"
import third from "../Images/pngtree-stock-image-of-a-clothing-rack-image_2540150.jpg"
import { Carousel } from 'antd'

function Slider() {
  return (
    <>
      
<div className='container'>
    <div className='row d-flex justify-content-center'>
  <div className='col-md-11'>
  <Carousel autoplay>
    <div>
      <img src={first} alt='first'className='sliderimages'/>
    </div>
    <div>
      <img src={sec} alt='sec'className='sliderimages'/>
    </div>
    <div>
      <img src={third} alt='third'className='sliderimages'/>
    </div>
  
  </Carousel>
  </div>
    </div>
</div>




    </>
  )
}

export default Slider
