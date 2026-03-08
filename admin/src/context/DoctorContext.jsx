import { createContext, useState } from "react";
import axios from "axios";
export const DoctorContext = createContext();
import { toast } from 'react-toastify';

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // to store the doctor token
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');

    //a perticular doctor appointments data
    const [appointments, setAppointments] = useState([]);

    //state for storing the dashboard data of a doctor
    const [dashData, setDashData] = useState(false);

    //to store the profile data of a doctor
    const [profileData, setProfileData] = useState(false);



    //function to get all appointments of a perticular doctor
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } });

            if (data.success) {
                setAppointments(data.appointments);

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    //complete appointment from doctorAppointment page
    const completeAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    //cancel appointment from doctorAppointment page
    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    //getting doctor dashboard data fro dashboard page
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } });
            // console.log(response);

            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData);

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    //creating a arrow function fetching the profile data of a doctor from api
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } });
            if (data.success) {
                setProfileData(data.profileData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        dToken, setDToken,
        backendUrl,
        //to getting all the appointments of a doctor 
        appointments, setAppointments, getAppointments,
        //function fo cancel the appointment and completing the appointment from doctor dashboard from doctor appointment page
        completeAppointment, cancelAppointment,

        //dashData,setDashData,getDashData for doctor dashboard page
        dashData, setDashData, getDashData,
        //used in doctorProfile page
        profileData, setProfileData, getProfileData,

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;