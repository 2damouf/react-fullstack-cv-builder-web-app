import React from 'react'
import { Filter, MainLoader, TemplateDesignPin } from '../components'
import useTemplates from '../hooks/useTemplates'
import { AnimatePresence } from 'framer-motion';
const HomeContainer = () => {

  const {
    data: templates = {},
    isError: temp_isError = {},
    isLoading: temp_isLoading = {},
    refetch: temp_refetch = {}
  } = useTemplates();
  
  
  
  if(temp_isLoading) {
    return <MainLoader/>;
  }
  



  return (
    <div className="w-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start">
      {/* tag seçme alanı */}

      <Filter/>

      {/* cv gösterme alanı */}
      {temp_isError ? (
        <>
          <p className="text-lg text-txtDark">
            Hata
          </p>
        </>
      ) : (
        <>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            <ShowTemplate templates={templates} />
          </div>
        </>
      )}
    </div>
  );
}



const ShowTemplate = ({templates}) => {
  return (
    <>
      {templates && templates.length > 0 ? (
        <>
          <AnimatePresence>
            {templates.map((template, index) => (
                <TemplateDesignPin
                  key={template?._id}
                  data={template}
                  index={index}
                />
              ))};
          </AnimatePresence>
        </>
      ) : (
        <p>
          <>Gösterilecek bir şablon yok</>
        </p>
      )}
    </>
  )
};



export default HomeContainer;