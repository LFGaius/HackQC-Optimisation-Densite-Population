// import logo from './logo.svg';
import './App.css';
// import { database } from './firebase-config';
// import { ref, set, onValue } from 'firebase/database';
import MapComponent from './components/MapComponent';

function App() {
  // Writing to Realtime Database
  // set(ref(database, 'properties'), [ {
  //   buildingType: 'Triplex',
  //   unitsAvailable: 2,
  //   status: 'en construction',
  //   deliveryDate: '21/08/2025',
  //   address: '789 ',
  //   contact: '+125-4564-12324'
  // }] );
  // set(ref(database, 'comments'), [ 
  //   {
  //     message: 'message 1',
  //   },
  //   {
  //     message: 'message 2',
  //   }
  // ] );

  // Reading from Realtime Database
  // onValue(ref(database, 'properties'), (snapshot) => {debugger
  //   const data = snapshot.val();
  //   console.log(data);
  // });

  return (
    <div className="App">
      <MapComponent filtersMap = {{city:"montreal", displayIndiceEquiteMilieuxVie : true, displayZonage : true, displayReseauCyclable : true, displayParcsEspacesVerts : true, displayPointArretBus : true, displayPlacesPubliques : false, displayPermis : true}}/>
    </div>
  );
}

export default App;
