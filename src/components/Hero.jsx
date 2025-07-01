import React from 'react'
import hero1 from'../assets/images/h1.webp'
import hero2 from'../assets/images/h2.webp'
import hero3 from'../assets/images/h3.webp'
function Hero() {
  return (
    <>
    <div id="carouselExampleInterval" className="carousel slide " data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src={hero1} className="d-block w-100"  alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={hero2} className="d-block w-100"  alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={hero3} className="d-block w-100"  alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </>
  )
}

export default Hero