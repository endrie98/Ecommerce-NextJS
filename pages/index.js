import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'

const Home = ( { productsData, bannersData } ) => {
  return (
    <>
      <HeroBanner heroBanner={bannersData.length && bannersData[0]} />

      <div className='products-heading'>
        <h2>Bestest Selling Prodcuts</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {productsData?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner  footerBanner={bannersData && bannersData[0]}/>
    </>
  )
}

// export const getSeverSideProps = async () => {
//   const productQuery = '*[_type == "product"]'
//   const productsData = await client.fetch(productQuery)

//   const bannerQuery = '*[_type == "banner"]'                // this was on youtube and didn't work below is the suliton from chatgpt
//   const bannersData = await client.fetch(bannerQuery)

//   return {
//     props: { productsData, bannersData }
//   }
// }

export const getServerSideProps = async () => {
  try {
    const productQuery = '*[_type == "product"]';
    const productsData = await client.fetch(productQuery);

    const bannerQuery = '*[_type == "banner"]';
    const bannersData = await client.fetch(bannerQuery);

    // console.log('Products Data:', productsData);
    // console.log('Banners Data:', bannersData);

    return {
      props: { productsData, bannersData },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { productsData: [], bannersData: [] },
    };
  }
};


export default Home