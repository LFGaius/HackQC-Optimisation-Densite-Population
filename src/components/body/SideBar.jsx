import React from 'react'
import {Routes, Route } from 'react-router-dom';
import {Nav} from "react-bootstrap";
import { Avis } from './Avis';
import { Proprietes } from './Proprietes';

export const SideBar = () => {
  return (
    <> 
      <Nav variant="pills" className='pt-2'>
        <Nav.Item>
          <Nav.Link className='btn btn-info ' href="/" style={{ fontWeight: 'bold' }}>Avis</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='btn btn-info ' href="/propriete" style={{ fontWeight: 'bold' }}>Proprietes</Nav.Link>
        </Nav.Item>
      </Nav>
      <hr/>
      <Routes>
        <Route path="/" element={<Avis />}  />
        <Route path="/propriete" element={<Proprietes />}  />
      </Routes>
    </>
  )
}
