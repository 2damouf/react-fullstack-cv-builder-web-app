import React from 'react'
import { FaChevronRight } from 'react-icons/fa6'
import {GoogleAuthProvider, GithubAuthProvider, signInWithRedirect} from "firebase/auth"
import {auth} from "../config/firebase.config"

const AuthButton = ({Icon, label, provider}) => {
    const authGoogle = new GoogleAuthProvider();
    const authGithub = new GithubAuthProvider();

    const click = async() => {
        switch(provider){
            case "Google" :
                await signInWithRedirect(auth, authGoogle).then((result) => {
                    console.log(result);
                }).catch(err => {
                    console.log(`Error: ${err.Message}`)
                });
                break;
            case "Github":
                await signInWithRedirect(auth, authGithub).then((result) => {
                    console.log(result);
                }).catch(err => {
                    console.log(`Error: ${err.Message}`)
                });
                break;

            default:
                await signInWithRedirect(auth, authGoogle).then((result) => {
                    console.log(result);
                }).catch(err => {
                    console.log(`Error: ${err.Message}`)
                });
            break;
        }
    }
  return (
    <div onClick={click} className="w-full px-4 py-3 rounded-md border-2 border-blue-700 flex items-center justify-between cursor-pointer group hover:bg-blue-700 active:scale-95 duration-150 hover:shadow-md">
        <Icon className="text-txtPrimary txt-xl group-hover:text-white"/>
        <p className="text-txtPrimary txt-xl group-hover:text-white">{label}</p>
        <FaChevronRight className="text-txtPrimary text-base group-hover:text-white "/>
        <provider/>
    </div>
  )
}

export default AuthButton