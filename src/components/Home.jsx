import React from 'react'
import Hero from './Hero'
import Allproduct from './Allproduct'
import Service from './Service'
import PhotoGallery from './PhotoGallery'
import WatchCategoryCarousel from './WatchCategoryCrousal'
import Footer from './Footer'
function Home() {
  return (
    <>
       <Hero/>
       <Allproduct/>
       <PhotoGallery/>
       <WatchCategoryCarousel />
       <Service/>
    </>
  )
}

export default Home