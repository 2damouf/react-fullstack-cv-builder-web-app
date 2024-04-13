import React from 'react'
import {Icon} from "../assets"
import {Link} from "react-router-dom"

const Footer = () => {
  return (

    <div className="w-full flex items-center justify-between border-t border-gray-950">
        <div className="footer-container">
        <img src={Icon} className="footer-icon" alt="" />
        <p></p>
        </div>

        <div className="flex items-center justify-center gap-6">
            <Link to={"/"} className=" text-blue-700 text-sm">Ana Sayfa</Link>
            <Link to={"/"} className=" text-blue-700 text-sm">İletişim</Link>
            <Link to={"/"} className=" text-blue-700 text-sm">Gizlilik Sözleşmesi</Link>
        </div>
        
    </div>
  )
}

export default Footer