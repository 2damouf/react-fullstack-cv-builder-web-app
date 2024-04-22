import React from 'react'
import {Login} from "../assets"
import { AuthButton, Typewriter } from '../components';
import {FaGoogle, FaGithub} from "react-icons/fa6";


const MidContainer = () => {
  return (
<section className="w-full flex flex-1 flex-col items-center justify-center gap-6">
  <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
    <div className="md:w-1/2 px-8 md:px-16">
      <h1 className="font-bold text-2xl text-[#002D74]"><Typewriter/></h1>   
      <p className="text-xs mt-4 text-[#002D74]">Zaten Üye Misin? Giriş yap!</p>

      <form action="" className="flex flex-col gap-4">
        <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email"></input>
        <div className="relative">
          <input className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Şifre"></input>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </div>
        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Giriş Yap</button>
      </form>

      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400"></hr>
        <p className="text-center text-sm">Veya</p>
        <hr className="border-gray-400"></hr>
      </div>

      <div className="w-full rounded-md p-2 flex flex-col items-center justify-center gap-3">
        <AuthButton Icon={FaGoogle} label={"Google ile giriş yap"} provider={"Google"}/>
        <AuthButton Icon={FaGithub} label={"GitHub ile giriş yap"} provider={"Github"}/>
      </div>



      <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
        <a href="/">Şifreni mi unuttun? 'Bana tıkla' </a>
      </div>

      <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
        <p>Üyeliğin mi yok?</p>
        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Kayıt ol</button>
      </div>
    </div>

    <div className="md:block hidden w-1/2">
      <img src={Login} className="rounded-2xl" alt="" />
    </div>
  </div>
</section>
  )
}

export default MidContainer



