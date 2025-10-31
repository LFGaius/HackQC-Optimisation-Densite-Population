// import logo from './logo.svg';
import React, { useState } from 'react';
import NavBar from "./components/nav/NavBar";
import Body from './components/body/Body';

function App() {
SalesforceInteractions.init({
            consents: [{
                provider: 'ExampleProvider',
                purpose: 'Tracking',
                status: SalesforceInteractions.ConsentStatus.OptIn
            }]
        })
        .then(() => {
            console.log('Consent set successfully');
        })
        
        // Set the logging level for debugging purposes
        SalesforceInteractions.setLoggingLevel(4); 
  return (
    <div className="App">
      <NavBar />
      <Body />
    </div>
  );
}

export default App;
