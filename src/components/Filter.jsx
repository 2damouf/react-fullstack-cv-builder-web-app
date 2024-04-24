import React, { useState } from 'react'
import { MdLayersClear } from 'react-icons/md';
import {AnimatePresence, motion} from "framer-motion"
import {clearFilterAnimation} from "../animations"
import { filter } from '../utils/helpers';
import  useFilters  from '../hooks/useFilters'
import { useQuery, useQueryClient } from 'react-query';


const Filter = () => {

  const [mouseHover, setmouseHover] = useState(false)

  const [tagSelected, settagSelected] = useState(false)

  const queryClient = useQueryClient();


  const {data: filterData = {}, isLoading, isError} = useFilters();

  const handleFilterValue = (val) => {
    queryClient.setQueryData("filter", {...queryClient.getQueryData("filter"), searchTerm: val});

    console.log(filterData.searchTerm);

  }

  const clearFilter = () => {
    queryClient.setQueryData("filter", {...queryClient.getQueryData("filter"), searchTerm: ""})
  }

  return (
    <div className="w-full flex items-center justify-start py-4">
      <div onClick={clearFilter}>
        <div className="border border-gray-300 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shadow-md bg-gray-200 relative">
          <MdLayersClear
            className="text-xl"
            onMouseEnter={() => setmouseHover(true)}
            onMouseLeave={() => setmouseHover(false)}
          />

          {/* animasyonlu buton bilgilendirme yazısı */}
          <AnimatePresence>
            {mouseHover && (
              <motion.div
                {...clearFilterAnimation}
                className="absolute -top-8 -left-5 bg-white shadow-md rounded-md px-2 py-1"
              >
                <p className="whitespace-nowrap text-xs">Filtre'yi Temizle</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="w-full flex items-center justify-start overflow-x-scroll gap-6 scrollbar-none ">
        {filterData &&
          filter.map((i) => (
            <div
              onClick={() => handleFilterValue(i.value)}
              key={i.id}
              className={`border border-gray-300 rounded-md px-6 py-2 cursor-pointer group hover:shadow-md ${
                filterData.searchTerm === i.value && "bg-gray-300 shadow-md"
              }`}
            >
              <p className="text-sm text-txtPrimary group-hover:text-txtDark whitespace-nowrap">
                {i.label}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Filter;