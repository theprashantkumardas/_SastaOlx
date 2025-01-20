import React, {useEffect, useState} from 'react';
const RazorpayCheckout = ({amount, onPaymentSuccess}) => {
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false)

     const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () =>{
           resolve(false);
        }
        document.body.appendChild(script);
      });
    };

    const fetchOrderId = async () =>{
         try {
            const response = await fetch("http://localhost:7000/api/payment/create-order",{
              method:"POST",
              headers: {
                 "Content-Type":"application/json",
                 Authorization: `Bearer ${localStorage.getItem('token')}`
               },
               body: JSON.stringify({ amount: amount * 100})
             });
          const data = await response.json();
          setOrderId(data.orderId)
         } catch(error){
          console.log("Error creating orderId", error);
         }
    }

  const handlePayment = async () => {
    setLoading(true); // Start loading
    await fetchOrderId();
       const res = await loadRazorpay();

        if(!res){
           alert('Razorpay SDK failed to load');
           setLoading(false); // stop loading
           return;
        }
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: amount * 100,  // Multiply amount by 100 here
             currency: "INR",
            name: "Shop.OLX",
            description: "Purchase",
            order_id: orderId,
            handler:  (response) => {
              console.log("Payment successfull", response);
              onPaymentSuccess();
            },
            prefill: {
              name: "Test user",
              email: "testuser@example.com",
             contact: "9999999999",
           },
           theme: {
              color:"#3399cc"
           }
        }
        const paymentObject = new window.Razorpay(options);
       paymentObject.open();
       setLoading(false);
    };

     return (
          <div className="w-full justify-center items-center  ">
              <button disabled={loading} onClick={handlePayment}
                 className="mt-8 w-full justify-center bg-customColor text-white py-2 px-4 rounded-full  focus:outline-none focus:ring-2  disabled:bg-gray-400">
                 {loading ? 'Loading...' : 'Pay Now'}
              </button>
          </div>
     );
  }

  export default RazorpayCheckout;