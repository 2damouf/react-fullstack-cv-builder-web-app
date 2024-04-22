import React, { Suspense } from 'react';
import {Route, Routes} from "react-router-dom";
import {MainView, AuthView} from "../views"
import {QueryClient, QueryClientProvider} from "react-query"
import {ReactQueryDevtools} from "react-query/devtools"
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify';



const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Sayfa Yükleniyor...</div>}>
        <Routes>
          <Route path ="/*" element={<MainView/>}/>
          <Route path ="/auth" element={<AuthView/>}/>
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" theme="dark"/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App