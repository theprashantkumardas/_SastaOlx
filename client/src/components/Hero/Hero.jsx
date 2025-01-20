import React from 'react'

const Hero = () => {
//     Welcome Section
// Headline:
// ""

// Subheadline:
// ""

// CTA Buttons:

// Start Buying Now
// Sell Your Products

    return (
        <>
        <section className='container max-w-7xl mx-auto '>



            <div className="container mx-auto   px-6 py-20 flex flex-col-reverse md:flex-row justify-between">
                <div className=" mx-auto my-auto   md:w-1/2">
                    <h1 className="text-4xl font-bold mb-6 mt-6 ">
                         Your Trusted Marketplace <br></br> for Everything Second-Hand and More!
                    </h1>
                    <hr />
                    <p className=" mt-5 text-lg ">Buy, Sell, Chat, and Pay</p>
                    
                    <p className="text-lg mb-10">
                    Discover the easiest way to buy and sell products online. With SastaOLX, experience secure transactions, real-time chat, and quality second-hand branded collections.
                    </p>
                    <button className="bg-customColor hover:bg-customColor text-white font-bold py-3 px-6 rounded-full">
                        Shop Now
                    </button>

                    <div className="mt-16 flex justify-start space-x-4">
                        <div className="flex flex-col items-center ">
                            <span className="text-3xl font-bold ">200+</span>
                            <span className="text-sm">High-Quality</span>
                            <span className="text-sm">Product</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold">2,000+</span>
                            <span className="text-sm">International Brands</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold">30,000+</span>
                            <span className="text-sm">Happy Customers</span>
                        </div>
                    </div>


                </div>


                <div className="md:w-1/2 ">
                    <img src="https://images.unsplash.com/photo-1642543348745-03b1219733d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero Image" className="w-full rounded-3xl object-cover h-auto md:h-full" />
                </div>


            </div>


           

        </section>
         <div className=" grid grid-cols-5 place-items-center justify-center bg-black h-20 hidden md:grid">
         {/* <div className='w-36 h-20 bg-black ' >  */}



         
         {/* <img src="/images/versace.png" alt="Versace" className="w-20 h-20 object-contain" /> */}
         {/* <img src="/images/zara.png" alt="Zara" className="w-20 h-20 object-contain" /> */}
         {/* <img src="/images/gucci.png" alt="Gucci" className="w-20 h-20 object-contain" /> */}
         <p className='text-customColor text-4xl font-bold  items-center justify-center  '>PRADA</p>
         <p className='text-customColor text-4xl font-bold  items-center justify-center  '>APPLE</p>
         <p className='text-customColor text-4xl font-bold  items-center justify-center  '>ROLEX</p>
         <p className='text-customColor text-4xl font-bold  items-center justify-center  '>GUCCI</p>
         <p className='text-customColor text-4xl font-bold  items-center justify-center  '>SAMSUNG</p>
         {/* <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F23870512-prada-milano-logo-brand-white-symbol-clothes-design-icon-abstract-vector-illustration-with-black-background&psig=AOvVaw102ecUoczjLEwWAkzgzlCC&ust=1736450239227000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCv4LPr5ooDFQAAAAAdAAAAABAE" alt="Prada" className="w-20 h-20 object-contain" /> */}
         {/* <img src="/images/calvin-klein.png" alt="Calvin Klein" className="w-20 h-20 object-contain" /> */}
     </div>
     </>
        



    )
}

export default Hero