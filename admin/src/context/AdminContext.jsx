import React, { createContext, useState } from "react";
import axios from "axios";
export const AdminContext = createContext();
import { toast } from "react-toastify";

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(
        localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
    );
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    //to store the all doctors
    const [doctors, setDoctors] = useState("");

    //to store the appointments data 
    const [appointments, setAppointments] = useState([]);

    //to store admin dashboard data which is total number of doctor and user
    const [dashData, setDashData] = useState(false);

    //getting all doctors data from backend
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/all-doctors",
                {},
                { headers: { aToken } }
            );
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } });

            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    //get all appointments from database->admin

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } });
            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments);

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to cancel the appointment(this functionality is same as the how user can cancel the appointment )
    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } });

            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });
            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData);

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,

        //appointments state variable to store the appointments data and setter function setAppointments data
        //and getAllAppointmens: function
        appointments, setAppointments,
        getAllAppointments,
        cancelAppointment,
        //to use it in Dashboard.js
        dashData, getDashData
    };
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;