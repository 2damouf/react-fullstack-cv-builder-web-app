import React, { useEffect } from 'react';
import {Icon} from "../assets";
import Footer from "../containers/Footer";
import MidContainer from "../containers/MidContainer";
import {MainLoader} from "../components"
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const AuthView = () => {
  const {data, isLoading, isError} = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLoading && data){
      navigate("/", {replace: true});
    }
  }, [isLoading, data])

  if (isLoading){
    return <MainLoader/>
  }
  return (
    <div className="login-container">
        {/* TOP */}
        <img src={Icon} className="w-12 h-auto object-contain" alt="" />
        {/* MID CONTAINER */}
        <MidContainer/>
        {/* FOOTER CONTAINER */}
        <Footer/>

    </div>
  )
}



export default AuthView