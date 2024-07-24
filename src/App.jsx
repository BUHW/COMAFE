import React, { useEffect } from 'react';

import MenuBar from './components/layout/menu-bar/MenuBar.jsx'
import Footer from './components/layout/footer/Footer.jsx'

import { Outlet } from 'react-router'

import './App.css'
import ScrollDialog from './components/layout/dialog/DialogContact.jsx';
import { Card } from './components/layout/card/Card.jsx';
import axios from 'axios';
import { BASEURL, TOKEN } from '../variables.jsx'

function App() {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [card, setCard] = React.useState([]);

  const handleContactClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  async function getCard() {
    const resp = await axios.get(`${BASEURL}/products`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });
    setCard(resp.data);
    console.log(resp.data);
  }

  useEffect(() => {
    getCard();
  }, []);

  return (
    <>
      <MenuBar onContactClick={handleContactClick} />
      <ScrollDialog open={openDialog} handleClose={handleCloseDialog} />
      <div className='container-card'>
        <Card data={card} getProducts={getCard} />
      </div>
      <Outlet />
      <Footer />
    </>
  )
}

export default App
