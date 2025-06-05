import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import MainLayout from './layouts/mainLayout';
import './App.css'
import Address from './pages/address/address';
import TransactionDetail from './pages/transactionDetail/transactionDetail';
import Block from './pages/block/block';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element = {<Home/>}/>
          <Route path='/address/:address' element = {<Address/>}/>
          <Route path='/tx/:txhash' element = {<TransactionDetail/>}/>
          <Route path='/block/:block' element = {<Block/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
