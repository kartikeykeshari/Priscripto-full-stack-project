// //myappointment page is to show user appointments with doctors

// import React, { useContext, useState, useEffect } from "react";
// import {useNavigate} from 'react-router-dom'
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const MyAppointments = () => {

//   const navigate = useNavigate();
//   const { backendUrl, token, getDoctorsData } = useContext(AppContext);

//   //creating state variables to store appointment data
//   const [appointments, setAppointments] = useState([]);

//   const months = [
//     " ",
//     "jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split("_");
//     return (
//       dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
//     );
//   };

//   const getUserAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/appointments", {
//         headers: { token },
//       });
//       if (data.success) {
//         //new appointment added into the top
//         setAppointments(data.appointments.reverse());
//         console.log(data.appointments);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/user/cancel-appointment",
//         { appointmentId },
//         { headers: { token } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         getUserAppointments();
//         getDoctorsData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Appointment Payment",
//       description: "Appointment Payment",
//       order_id: order.id,
//       receipt: order.receipt,
//       //when payment will be executed successfully then we wiil get the response in this handler function
//       handler: async (response) => {
//         // console.log(response);

//         {
//           //we get these thing in response
//           /*razorpay_order_id: "order_P8UBt1HAdw49Re"
//             razorpay_payment_id: "pay_P8UDgqCBO2spGA"
//             razorpay_signature: "c933d3b633499bb87cf772bf29ab15356888aac0521870fa5096aa731c0e3667"
//           */
//         }

//         try{
//           const {data} = await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}});
//           if(data.success){
//             toast.success(data.message);
//             getUserAppointments();
//             navigate('/my-appointments');
//           }
//         }catch(error){
//           console.log(error);
//           toast.error(error.message);
//         }
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const appointmentRazorpay = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/user/payment-razorpay",
//         { appointmentId },
//         { headers: { token } }
//       );

//       if (data.success) {
//         //by using this options we have to create the payment
//         // console.log(data.order);
//         //by using the order we create the options
//         initPay(data.order);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     }
//   }, [token]);
//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My Appointment
//       </p>
//       <div>
//         {appointments &&
//           appointments.map((item, index) => (
//             <div
//               className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//               key={index}
//             >
//               <div>
//                 <img
//                   className="w-32 bg-indigo-50"
//                   src={item.docData.image}
//                   alt="image"
//                 />
//               </div>
//               <div className="flex-1 text-sm text-zinc-600">
//                 <p className="text-neutral-800 font-semibold">
//                   {item.docData.name}
//                 </p>
//                 <p>{item.speciality}</p>
//                 <p className="text-zinc-700 font-medium mt-1">Address:</p>
//                 <p className="text-xs">{item.docData.address.line1}</p>
//                 <p className="text-xs">{item.docData.address.line2}</p>
//                 <p className="text-sm mt-1">
//                   <span className="text-sm text-neutral-700">Date & Time:</span>
//                   {slotDateFormat(item.slotDate)} | {item.slotTime}
//                 </p>
//               </div>

//               <div></div>
//               <div className="flex flex-col gap-2 justify-end">
//                 {!item.cancelled && item.payment &&  !item.isCompleted && <button className="sm:min-w-48 py-2 rounded text-stone-500 bg-indigo-300">Paid</button>}
//                 {item.cancelled === false && item.payment === false && !item.isCompleted &&(
//                   <button
//                     onClick={() => appointmentRazorpay(item._id)}
//                     className="hover:bg-primary hover:text-white transition-all duration-300 tex text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-md"
//                   >
//                     Pay Online
//                   </button>
//                 )}
//                 {item.cancelled === false && !item.isCompleted && (
//                   <button
//                     onClick={() => cancelAppointment(item._id)}
//                     className="hover:bg-red-600 hover:text-white transition-all duration-300text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-md"
//                   >
//                     Cancel appointment
//                   </button>
//                 )}

//                 {item.cancelled === true && !item.isCompleted && (
//                   <button className="py-2 sm:min-w-48 border border-red-500 text-red-500 rounded">
//                     Appointment Cancelled
//                   </button>
//                 )}

//                 {/* if appointment is completed */}
//                 {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointments;






// MyAppointments page is to show user appointments with doctors

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  // Fetch user appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        {
          headers: { token },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Initialize Razorpay payment
  const initPay = (order) => {

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            toast.success(data.message);
            getUserAppointments();
            navigate("/my-appointments");
          }

        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Create Razorpay order
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>

      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>

      <div>

        {appointments.map((item) => (

          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={item._id}
          >

            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData?.image}
                alt="doctor"
              />
            </div>

            <div className="flex-1 text-sm text-zinc-600">

              <p className="text-neutral-800 font-semibold">
                {item.docData?.name}
              </p>

              <p>{item.docData?.speciality}</p>

              <p className="text-zinc-700 font-medium mt-1">
                Address:
              </p>

              <p className="text-xs">
                {item.docData?.address?.line1}
              </p>

              <p className="text-xs">
                {item.docData?.address?.line2}
              </p>

              <p className="text-sm mt-1">
                <span className="text-neutral-700">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>

            </div>

            <div className="flex flex-col gap-2 justify-end">

              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 rounded text-stone-500 bg-indigo-300">
                  Paid
                </button>
              )}

              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="hover:bg-primary hover:text-white transition-all duration-300 text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-md"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="hover:bg-red-600 hover:text-white transition-all duration-300 text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-md"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="py-2 sm:min-w-48 border border-red-500 text-red-500 rounded">
                  Appointment Cancelled
                </button>
              )}

              {item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default MyAppointments;