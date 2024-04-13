import React from 'react';
import {Icon} from "../assets";
import Footer from "./Footer";
import { AuthButton, Typewriter } from '../components';

import {FaGoogle, FaGithub} from "react-icons/fa6";

const AuthView = () => {
  return (
    <div className="login-container">
        {/* TOP */}
        <img src={Icon} className="w-12 h-auto object-contain" alt="" />
        {/* MID CONTAINER */}
        <div className="login-mid-container">
            <h1 className="text-3xl lg:text-4xl text-blue-700"><Typewriter/></h1>   
            <p className="text-base text-gray-700">CV oluşturmanın basit ve hızlı yolu!</p>
            <div className="w-full lg:w-80 rounded-md p-2 flex flex-col items-center justify-center gap-6">
                <AuthButton Icon={FaGoogle} label={"Google ile giriş yap"} provider={"Google"}/>
                <AuthButton Icon={FaGithub} label={"Github ile giriş yap"} provider={"Github"}/>

            </div>
            <div></div>
            <div>

            </div>
        </div>

        {/* FOOTER CONTAINER */}
        <Footer/>
    </div>
  )
}

export default AuthView