import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AppContext = createContext();
import { toast } from "react-toastify";

const AppContextProvider = (props) => {
  //currency symbol
  const currencySymbol = "$";

  //backend url from .env file
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //state variable for storing the doctor data
  const [doctors, setDoctors] = useState([]);

  //state to store the userProfile Data
  const [userData,setUserData] = useState(false);

  //for storing the user token
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  //getDoctorsData async function to fetch the doctor data->(doctors data used in TopDoctors file which shows the top doctors on homepage and RelatedDoctor.js file to show the relatedDoctor in Appointment page)
  const getDoctorsData = async () => {
    try {
      //making api all for doctor data
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      //if api call succuss then save the doctor data in doctors state
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  //get user data 
  const loadUserProfileData = async()=>{
    try{
      const {data} = await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
      if(data.success){
        setUserData(data.userData);
      }else{
        toast.error(data.message);
      }

    }catch(error){
      console.log(error);
      toast.error(error.message);
      
    }
  }


  //values
  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  };

  //useEffect to get Doctors data for Home page
  useEffect(() => {
    getDoctorsData();
  }, []);

  //useEffect to user loadProfileData if token is exist
  useEffect(()=>{
    if(token){
      loadUserProfileData();
    }else{
      setUserData(false);
    }
  },[token])

  
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
