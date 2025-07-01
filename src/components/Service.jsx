import React from 'react'
import s1 from '../assets/images/s1.svg'
import s2 from '../assets/images/s2.svg'
import s3 from '../assets/images/s3.svg'
function Service() {
  return (
    <>
    <div className="container-fluid mt-5">
            <h1 className="text-center mb-5 fw-bold">Services</h1>
            <div className="container d-flex justify-content-center gap-5">
              <div className="s1  d-flex flex-column justify-content-center   p-2">
                <img src={s1  } height={100} alt="" />
                <h3 className='fs-5 fw-bold' >100% ORIGINAL</h3>
              </div>
              <div className="s1  d-flex flex-column justify-content-center  p-2">
                <img src={s2  } height={100} alt="" />
                <h3 className='fs-5 fw-bold' >7 DAY RETURN</h3>
              </div>
              <div className="s1  d-flex flex-column justify-content-center p-2">
                <img src={s3  } height={100} alt="" />
                <h3 className='fs-5 fw-bold' >FREE SHIPPING</h3>
              </div>
              
            </div>

    </div>
    </>
  )
}

export default Service