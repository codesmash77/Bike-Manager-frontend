import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import ForbiddenAccess from './components/Forbiden';
import NotFound from './components/NotFound';
import AddBike from './pages/AddBike';
import Bike from './pages/Bike';
import MyReservations from './pages/MyReservations';

const App = React.memo(() => {
  return (
    <ChakraProvider theme={theme}>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Dashboard />} />
            <Route path = '/addBike' element={<AddBike/>} />
            <Route path = '/Bike/:bikeId' element={<Bike/>} />
            <Route path = '/myReservations' element={<MyReservations/>} />
            {/* <Route path = '/createQuiz' element={<CreateQuiz/>} />
            <Route path = '/takeQuiz/:permalink' element={<TakeQuiz/>} /> */}
            <Route path = '/login' element={<Login/>} />
            <Route path = '/register' element={<Register/>} />
            <Route path = '/forbiden' element={<ForbiddenAccess/>} />
            <Route path = '*' element={<NotFound/>} />
          </Routes>
          <Footer/>
      </Router>
      <ToastContainer/>
    </ChakraProvider>
  );
})

export default App;
