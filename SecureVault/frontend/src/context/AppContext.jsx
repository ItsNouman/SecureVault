import {createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContent=createContext();
export const AppContextProvider=(props)=>{
  axios.defaults.withCredentials = true;
  const backend_url=import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userData,setUserData]=useState(false);

  

  const getAuthState = async () =>{
      try{
          const {data} = await axios.get(backend_url+'/api/auth/is-auth');
          if(data.success){
              setIsLoggedIn(true);
              getUserData();
          }
      }
      catch(error){
          toast.error(error.message);
      }
  }

  const getUserData = async () => {
      try {
        const  { data } = await axios.get(backend_url + '/api/user/data');
        if (data.success) {
          setUserData(data.userData);
        } else {
          toast.error(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        toast.error(error.message || "Error fetching user data");
      }
    };
    
  useEffect(()=>{
      getAuthState();
  },[])

  const value={
      backend_url,
      isLoggedIn,setIsLoggedIn,
      userData,setUserData,
      getUserData
  }
  return(
      <AppContent.Provider value={value}>
          {props.children}
      </AppContent.Provider>
  )
}