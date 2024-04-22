import React from 'react'
import {GoogleAuthProvider, GithubAuthProvider, signInWithRedirect} from "firebase/auth"
import {auth} from "../config/firebase.config"

const AuthButton = ({Icon, label, provider}) => {
    const providerGoogle = new GoogleAuthProvider();
    const providerGithub = new GithubAuthProvider();

    const click = async() => {
        switch(provider){
            case "Google" :
                console.log(auth);
                await signInWithRedirect(auth, providerGoogle).then((result) => {
                    console.log(result);
                }).catch(err => {
                    console.log(`Error: ${err}`)
                });
                break;
            case "Github":
                await signInWithRedirect(auth, providerGithub).then((result) => {
                    console.log(result);
                }).catch(err => {
                    console.log(`Error: ${err}`)
                });
                break;

            default:
                await signInWithRedirect(auth, providerGoogle).then((result) => {
                    console.log(result);
                }).catch(err => {
                    console.log(`Error: ${err}`)
                });
            break;
        }
    }
  return (
    <div onClick={click} className="w-full px-4 py-3 rounded-md border-2 border-blue-700 flex items-center justify-between cursor-pointer group hover:bg-blue-700 active:scale-95 duration-150 hover:shadow-md">
        <Icon className="text-txtPrimary txt-xl group-hover:text-white"/>
        <p className="text-txtPrimary txt-xl group-hover:text-white">{label}</p>
    </div>
  )
}

export default AuthButton