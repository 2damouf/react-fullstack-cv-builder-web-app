import React, { useState } from 'react';
import {AnimatePresence, easeInOut, motion} from 'framer-motion';
import { showTemplateAnimation, slideProfileMenuAnimation, templateCardButtonsInfoAnimation } from '../animations';
import { BiFolderPlus, BiHeart, BiSolidFolder, BiSolidFolderPlus } from 'react-icons/bi';
import useUser from '../hooks/useUser';
import useTemplates from '../hooks/useTemplates';
import { saveToCollections, saveToFav } from '../api';

const TemplateDesignPin = ({ data, index }) => {

const {data: user, refetch: userRefetch} = useUser();
const {refetch: temp_refetch} = useTemplates();

const addToCollection = async (e) => {
  e.stopPropagation();
  await saveToCollections(user, data);
  userRefetch();
};

const addToFav = async(e) =>{
  e.stopPropagation();
  await saveToFav(user, data)
  temp_refetch();
};

  return (
    <motion.div key={data?._id} {...showTemplateAnimation(index)}>
      <div className="w-full h-[500px] 2xl:h-[620px] rounded-md bg-gray-200 overflow-hidden relative">
        <img
          src={data?.imageUrl}
          className="w-full h-full object-cover"
          alt=""
        />

        <AnimatePresence>
          <motion.div
            {...slideProfileMenuAnimation}
            className={
              "absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer"
            }
          >
            <div className="flex flex-col items-end justify-start w-full gap-8">
              <TemplateCard
                label={
                  user?.collections?.includes(data?._id)
                    ? "Koleksiyondan Çıkar"
                    : "Koleksiyona Ekle"
                }
                Icon={
                  user?.collections?.includes(data?._id)
                    ? BiSolidFolderPlus
                    : BiFolderPlus
                }
                onHandle={addToCollection}
                IconColor={
                  user?.collections?.includes(data?._id)
                    ? "bg-green-200"
                    : "bg-gray-200"
                }
              />

              <TemplateCard
                label={"Favorilere Ekle"}
                Icon={BiHeart}
                onHandle={addToFav}
                IconColor={
                  user?.collections?.includes(data?._id)
                    ? "bg-green-200"
                    : "bg-gray-200"
                }
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};



const TemplateCard = ({label, Icon, IconColor ,onHandle}) => {
  const [isMouseHover, setisMouseHover] = useState(false)
return (
<div
  onClick={onHandle}
    className={`w-10 h-10 rounded-md ${IconColor} flex items-center justify-center hover:shadow-md relative`}
  onMouseEnter={() => setisMouseHover(true)}
  onMouseLeave={() => setisMouseHover(false)}
>
  <Icon className="text-txtPrimary text-base"></Icon>

  <AnimatePresence>
    {isMouseHover && (
      <motion.div
        {...templateCardButtonsInfoAnimation}
        className="px-3 py-2 rounded-md bg-gray-200 absolute -left-36 after:w-2 after:h-2 after:bg-gray-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45"
      >
        <p className="text-sm to-txtPrimary whitespace-nowrap">{label}</p>
      </motion.div>
    )}
  </AnimatePresence>
</div>
);
}


export default TemplateDesignPin;