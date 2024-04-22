import React, { Suspense } from 'react'
import Header from '../components/Header'
import { MainLoader } from '../components'
import { HomeContainer } from '../containers'
import { Route, Routes } from 'react-router-dom'
import {CvCreation, TemplateCreation, TemplateDesign, UserProfile} from '../views'

const MainView = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Header */}
      <Header />

      <main className="w-full">
        {/* içerikler yüklenene kadar fallback ile animasyonu yüklüyoruz */}
        <Suspense fallback={<MainLoader />}>
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/template/create" element={<TemplateCreation />} />
            <Route path="/profile/:uid" element={<UserProfile/>}/>
            <Route path="/cv/*" element={<CvCreation/>}/>
            <Route path="/cvdetail/*" element={<TemplateDesign/>}/>
          </Routes>
        </Suspense>
        {/* custom */}
      </main>
    </div>
  );
}

export default MainView