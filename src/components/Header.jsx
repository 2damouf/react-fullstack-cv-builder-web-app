import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { Icon } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { HiLogout } from "react-icons/hi";
import { slideProfileMenuAnimation, loginButtonAnimation } from "../animations";
import { useQueryClient } from "react-query";
import { auth } from "../config/firebase.config";
import { adminUser } from "../utils/helpers";


const Header = () => {
  const { data, isLoading, isError } = useUser();

  const queryClient = useQueryClient();
  const [isMenu, setisMenu] = useState(false);
  const signOut = async() => {
    await auth.signOut().then(() =>{
        queryClient.setQueryData("user", null)
    })
  }
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px8 border-b border-x-gray-300 bg-bgPrimary z-50 gap-12 sticky top-0">
      {/* logo */}
      <img src={Icon} className="w-12 h-auto object-contain" alt="" />

      {/* arama kutusu */}
      <div className="flex-1 border border-gray-300 px-4 py-1 rounded-md flex items-center justify-between bg-gray-200">
      <input
          type="text"
          placeholder="Buradan arama yapabilirsiniz..."
          className="flex-1 h-12 bg-transparent font-semibold outline-none border-none"
        />
      </div>

      {/* profil alanı */}
      <AnimatePresence>
        {isLoading ? (
          <PulseLoader color="#498FCD" size={10} />
        ) : (
          <>
            {/* pp kutusu */}
            {data ? (
              <motion.div
                {...loginButtonAnimation}
                className="relative"
                onClick={() => setisMenu(!isMenu)}
              >
                {data?.photoURL ? (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center cursor-pointer">
                    <img
                      src={data?.photoURL}
                      className="w-full h-full object-cover rounded-md"
                      referrerPolicy="no-referrer"
                      alt=""
                    />
                  </div>
                ) : (
                  // pp bulunamadıysa baş harf ile kutu oluşturalım
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer">
                    <p className="font-semibold text-lg text-white">
                      {data?.email[0]}
                    </p>
                  </div>
                )}

                {/* dropdown menu */}
                <AnimatePresence>
                  {isMenu && (
                    <motion.div
                      {...slideProfileMenuAnimation} // profile menü animasyonu
                      className="absolute px-4 py-3 rounded-md bg-bgPrimary right-0 top-14 flex flex-col items-center justify-start gap-3 w-64 pt-12"
                      onMouseLeave={() => setisMenu(false)}
                    >
                      {data?.photoURL ? (
                        <div className="w-20 h-20 rounded-full relative flex items-center justify-center cursor-pointer">
                          <img
                            src={data?.photoURL}
                            className="w-full h-full object-cover rounded-full"
                            referrerPolicy="no-referrer"
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer">
                          <p className="font-semibold text-lg text-white">
                            {data?.email[0]}
                          </p>
                        </div>
                      )}
                      {data?.displayName && (
                        <p className="font-semibold text-3xl text-txtDark">
                          {data?.displayName}
                        </p>
                      )}

                      {/* menü butonları */}
                      <div className="w-full flex-col items-start flex gap-6 pt-6 ">
                        <Link
                          className="text-txtLight hover:text-txtDark text-base whitespace-nowrap"
                          to={"/profile"}
                        >
                          Hesabım
                        </Link>
                        {/* yönetici hesabına özel menü basma */}
                        {adminUser.includes(data?.uid) && (
                          <Link
                            className="text-txtLight hover:text-txtDark text-base whitespace-nowrap"
                            to={"/template/create"}
                          >
                            Yeni Tasarım Ekle
                          </Link>
                        )}
                        <div
                          className="w-full px-2 py-2 border-t border-gray-300 flex items-center justify-between group cursor-pointer"
                          onClick={signOut}
                        >
                          <p className="group-hover:text-txtDark text-txtLight">
                            Çıkış Yap
                          </p>
                          <HiLogout className="group-hover:text-txtDark text-txtLight" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <Link to={"/auth"}>
                <motion.button
                  className="h-12 px-4 py-2 rounded-md border border-gray-300 bg-gray-200 hover:shadow-md active:scale-95 duration-150"
                  type="button"
                  {...loginButtonAnimation}
                >
                  Giriş Yap
                </motion.button>
              </Link>
            )}
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
