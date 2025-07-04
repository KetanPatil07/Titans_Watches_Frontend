import React from 'react'
import Hero from './Hero'
import Allproduct from './Allproduct'
import Service from './Service'
import PhotoGallery from './PhotoGallery'
import WatchCategoryCarousel from './WatchCategoryCrousal'
import Footer from './Footer'
import TestimonialsCarousel from './TestimonialsCarousel'
function Home() {
  return (
    <>
       <Hero/>
       <Allproduct/>
       <PhotoGallery/>
       <WatchCategoryCarousel />
        <TestimonialsCarousel/>
       <Service/>
      
    </>
  )
}

export default Home