import React, { Suspense } from 'react';
import {Route, Routes} from "react-router-dom";
import {MainView, AuthView} from "../views"

const App = () => {
  return <Suspense fallback={<div>Sayfa Yükleniyor...</div>}>
    <Routes>
      <Route path ="/*" element={<MainView/>}/>
      <Route path ="/auth" element={<AuthView/>}/>

    </Routes>
  </Suspense>
}

export default App