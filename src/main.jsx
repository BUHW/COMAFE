import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="login" element={<Login />} />
//           <Route path="/" element={<PrivateRoute><App /></PrivateRoute>}>
//             <Route path='listar' index element={<Home />} />
//             <Route path='assinatura' index element={<Ass />} />
//           </Route>
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>

//   )
// }

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
