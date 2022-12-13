import React from 'react';
import {
  ChakraProvider,
  Flex,
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
import ManageUsers from './pages/ManageUsers';
import ManageBikes from './pages/ManageBikes';

const App = React.memo(() => {
  const style = {
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex style={style}>
          <Header/>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Dashboard />} />
            <Route path = '/addBike' element={<AddBike/>} />
            <Route path = '/Bike/:bikeId' element={<Bike/>} />
            <Route path = '/myReservations' element={<MyReservations/>} />
            <Route path = '/manage/users' element={<ManageUsers/>} />
            <Route path = '/manage/bikes' element={<ManageBikes/>} />
            <Route path = '/login' element={<Login/>} />
            <Route path = '/register' element={<Register/>} />
            <Route path = '/forbiden' element={<ForbiddenAccess/>} />
            <Route path = '*' element={<NotFound/>} />
          </Routes>
          </Flex>
          <Footer/>
      </Router>
      <ToastContainer/>
    </ChakraProvider>
  );
})

export default App;
