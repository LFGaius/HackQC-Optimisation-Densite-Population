
import React, { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { database } from '../../firebase-config';
import { ref, onValue } from 'firebase/database';
import busStopIcon from '../../assets/images/bus-stop.png';
import publicPlaceIcon from '../../assets/images/public-place.png';
import buildingIcon from '../../assets/images/build.png';
import permitIcon from '../../assets/images/permit.png';
import planDeZonageShawingan from '../../assets/data/plan_de_zonage_shawingan.json';
import zonageSherbrooke from '../../assets/data/zonage-sherbrooke.json';
import indiceEquiteMilieuxVie from '../../assets/data/indice-equite-milieux-vie.json';
import reseauCyclableMtl from '../../assets/data/reseau_cyclable_mtl.json';
import reseauCyclableShawinigan from '../../assets/data/reseau_cyclable_shawinigan.json';
import parcsEspacesVertsShawinigan from '../../assets/data/parcs_espaces_verts_shawinigan.json';
import parcsEspacesVertsMtl from '../../assets/data/parcs_espaces_verts_mtl.json';

const PUBLIC_PLACES_MTL_ENDPOINT = 'https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=4731b64f-29cc-4e08-bc44-8752ae2fcafb&limit=200';
const BUILD_PERMITS_MTL_ENDPOINT = 'https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=5232a72d-235a-48eb-ae20-bb9d501300ad&limit=200';
const BUS_STOPS_SHAWI_ENDPOINT = 'https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?resource_id=0ff3c32b-5955-40e9-99d5-baa993c1d910&limit=105';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const mapTypeId = { 
  HYBRID: 'hybrid',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain'
};

const MapComponent = ({filtersMap}) => { 
  // Use `useLoadScript` to ensure Google Maps API script is loaded
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries:['places']
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);
  const [allMarkers, setAllMarkers] = useState([]);
  const [dataPublicPlaces, setDataPublicPlaces] = useState({ montreal : [], sherbrooke : [], shawinigan : []});
  const [dataBuildPermits, setDataBuildPermits] = useState({ montreal : [], sherbrooke : [], shawinigan : []});
  const [dataBusStops, setDataBusStops] = useState({ montreal : [], sherbrooke : [], shawinigan : []});
  const [dataProperties, setDataProperties] = useState({ montreal : [], sherbrooke : [], shawinigan : []});
  

  const onClickMarker = (marker) => {
    const currentMarker = allMarkers.find(m=>marker.title === m.title);
    let infowindow = new window.google.maps.InfoWindow({
      content: `
      ${currentMarker.adresse_principale ? '<b style = "font-weight:bold;">Adresse Principale : </b>' + currentMarker.adresse_principale + '</br>' : ''}  
      ${currentMarker.telephone ? '<b style = "font-weight:bold;">Téléphone : </b>' + currentMarker.telephone + '</br>' : ''}  
      ${currentMarker.courriel ? '<b style = "font-weight:bold;">Courriel : </b>' + currentMarker.courriel + '</br>' : ''}  
      ${currentMarker.description ? '<b style = "font-weight:bold;">Description : </b>' + currentMarker.description + '</br>' : ''}  
      ${currentMarker.types ? '<b style = "font-weight:bold;">Types : </b>' + currentMarker.types + '</br>' : ''}  
      ${currentMarker.installations ? '<b style = "font-weight:bold;">Installations : </b>' + currentMarker.installations + '</br>' : ''}  
      ${currentMarker.activites ? '<b style = "font-weight:bold;">Activites : </b>' + currentMarker.activites + '</br>' : ''}  
      ${currentMarker.statut_ouverture ? '<b style = "font-weight:bold;">Statut Ouverture : </b>' + currentMarker.statut_ouverture + '</br>' : ''}  
      ${currentMarker.horaire_par_jour ? '<b style = "font-weight:bold;">Horaire Par Jour : </b>' + currentMarker.horaire_par_jour + '</br>' : ''}  
      ${currentMarker.paiement ? '<b style = "font-weight:bold;">Paiement : </b>' + currentMarker.paiement + '</br>' : ''}  

      ${currentMarker.id_permis? '<b style = "font-weight:bold;">Numéro du permis: </b>' + currentMarker.id_permis : ''} 
      ${currentMarker.date_emission? '</br><b style = "font-weight:bold;">Date d\'émission: </b>' + currentMarker.date_emission : ''} 
      ${currentMarker.emplacement? '</br><b style = "font-weight:bold;">Adresse concernée: </b>' + currentMarker.emplacement : ''} 
      ${currentMarker.arrondissement? '</br><b style = "font-weight:bold;">arrondissement: </b>' + currentMarker.arrondissement : ''} 
      ${currentMarker.description_type_demande? '</br><b style = "font-weight:bold;">Description de la demande : </b>' + currentMarker.description_type_demande : ''} 
      ${currentMarker.description_type_batiment? '</br><b style = "font-weight:bold;">Description du type de bâtiment : </b>' + currentMarker.description_type_batiment : ''} 
      ${currentMarker.nature_travaux? '</br><b style = "font-weight:bold;">Nature des travaux: </b>' + currentMarker.nature_travaux : ''} 
      ${currentMarker.nb_logements? '</br><b style = "font-weight:bold;">Nombre de logements: </b>' + currentMarker.nb_logements : ''} 

      ${currentMarker.direction ? '<b style = "font-weight:bold;">Direction: </b>' + currentMarker.direction : ''}
      ${currentMarker.mob_reduit? '<b style = "font-weight:bold;">Accès à mobilité réduite: </b>' + currentMarker.mob_reduit : ''} 
      ${currentMarker.hvoiture_n? '<b style = "font-weight:bold;">Navette 1: </b>' + currentMarker.hvoiture_n : ''} 
      ${currentMarker.hvoiture_nw ? '<b style = "font-weight:bold;">Navette 2: </b>' + currentMarker.hvoiture_nw : ''}

      ${currentMarker.notes ? '<b style = "font-weight:bold;">notes: </b>' + currentMarker.notes : ''}
      ${currentMarker.buildingType ? '<b style = "font-weight:bold;">Type de batiment: </b>' + currentMarker.buildingType : ''}
      ${currentMarker.unitsAvailable ? '</br><b style = "font-weight:bold;">Unites disponibles: </b>' + currentMarker.unitsAvailable : ''}
      ${currentMarker.status ? '</br><b style = "font-weight:bold;">Status: </b>' + currentMarker.status : ''}
      ${currentMarker.deliveryDate ? '</br><b style = "font-weight:bold;">Date de livraison: </b>' + currentMarker.deliveryDate : ''}
      ${currentMarker.address ? '</br><b style = "font-weight:bold;">Addresse: </b>' + currentMarker.address : ''}
      ${currentMarker.contact ? '</br><b style = "font-weight:bold;">Contact: </b>' + currentMarker.contact : ''}
      `,
      position: currentMarker.position,
      maxWidth: 300
    });

    infowindow.open(
      map
    );
  }

  const onLoad = map=>{
    setMap(map);
    switch (filtersMap.city) {
      case 'sherbrooke':
        setCenter({
          lat: 45.404476,
          lng: -71.888351
        });
        if(filtersMap.displayZonage) map.data.addGeoJson(zonageSherbrooke);
        break;
      case 'montreal':
        setCenter({
          lat: 45.508888,
          lng: -73.561668
        });
        if(filtersMap.displayIndiceEquiteMilieuxVie) map.data.addGeoJson(indiceEquiteMilieuxVie);
        if(filtersMap.displayReseauCyclable) map.data.addGeoJson(reseauCyclableMtl);
        if(filtersMap.displayParcsEspacesVerts) map.data.addGeoJson(parcsEspacesVertsMtl);
        break;
      case 'shawinigan':
        setCenter({
          lat: 46.566666,
          lng: -72.750000
        });
        if(filtersMap.displayZonage) map.data.addGeoJson(planDeZonageShawingan);
        if(filtersMap.displayReseauCyclable) map.data.addGeoJson(reseauCyclableShawinigan);
        if(filtersMap.displayParcsEspacesVerts) map.data.addGeoJson(parcsEspacesVertsShawinigan);
        break;
      default:
        break;
    }

    map.data.setStyle(function(feature) {
      let strokeColor = 'grey';
      let fillColor = 'grey';
      let strokeWeight = 1;
      let strokeOpacity = 1;
      let fillOpacity = 0.1;
      let label = 'label ';
      let title = 'title ';
      let zIndex;
      if (feature.getProperty('ID_CYCL') || feature.getProperty('IDRTE')) {//only for pistes cyclable mtl - shawi
          strokeColor = 'blue';
          strokeWeight = 3;
          strokeOpacity = 0.6;
          zIndex = 10;
      } else if(feature.getProperty('TYPE') === 'Parc' || feature.getProperty('TYPE') === 'Espace vert' || feature.getProperty('NUM_INDEX')) {//NUM_INDEX only available from motl parks and green spaces data
        strokeColor = 'green';
        fillColor = 'green';
        fillOpacity = 0.5;
      } else if(feature.getProperty('zone_') || feature.getProperty('usage_')) {//Zonages
        strokeColor = '#F0741F';
        fillColor = '#F0741F';
        fillOpacity = 0.1;
      } else if(feature.getProperty('ADIDU')) {//Indice equite vie
        strokeColor = 'red';
        fillColor = 'red';
        if(feature.getProperty('Indice_emv') >= 4) {//milieu vulnérable et prioritaire
          fillOpacity = 0.7;
        } else if(feature.getProperty('Indice_emv') === 3) {//milieu vulnérable et non prioritaire
          fillOpacity = 0.5;
        } else {// milieu non vulnérable
          fillOpacity = 0.3;
        }
      }
      return {
          fillColor: fillColor,
          strokeColor: strokeColor,
          strokeWeight: strokeWeight,
          strokeOpacity:strokeOpacity,
          visible:true,
          label: label,
          title: title,
          fillOpacity:fillOpacity,
          draggable:false,
          zIndex:zIndex

      };
    });


    map.data.addListener('click', function(event) {
      if (event.feature.getGeometry().getType() === 'Polygon' || event.feature.getGeometry().getType() === 'MultiPolygon') {
        let infowindow = new window.google.maps.InfoWindow({
          content: `
                    ${event.feature.Gg.usage_ ? '<b style = "font-weight:bold;">usage_: </b>' + event.feature.Gg.usage_ : ''} ${event.feature.Gg.zone_ ? '</br><b style = "font-weight:bold;">zone_: </b>' + event.feature.Gg.zone_ : ''}
                    ${event.feature.Gg.ID ? '<b style = "font-weight:bold;">ID: </b>' + event.feature.Gg.ID : ''} ${event.feature.Gg.MUNICIPALITE ? '</br><b style = "font-weight:bold;">MUNICIPALITE: </b>' + event.feature.Gg.MUNICIPALITE : ''}
                    ${event.feature.Gg.NO_ZONE ? '<b style = "font-weight:bold;">NO_ZONE: </b>' + event.feature.Gg.NO_ZONE : ''} ${event.feature.Gg.GRILLEUSAGE ? '</br><b style = "font-weight:bold;">GRILLEUSAGE: </b>' + event.feature.Gg.GRILLEUSAGE : ''}
                    
                    ${event.feature.Gg.Nom ? '<b style = "font-weight:bold;">Nom: </b>' + event.feature.Gg.Nom : ''}
                    ${event.feature.Gg.NOM ? '<b style = "font-weight:bold;">Nom: </b>' + event.feature.Gg.NOM : ''}
                    ${event.feature.Gg.adresse ? '</br><b style = "font-weight:bold;">Adresse: </b>' + event.feature.Gg.adresse : ''}
                    ${event.feature.Gg.secteur ? '</br><b style = "font-weight:bold;">Secteur: </b>' + event.feature.Gg.secteur : ''}
                    ${event.feature.Gg.Type ? '</br><b style = "font-weight:bold;">Type de parc: </b>' + event.feature.Gg.Type : ''}
                    ${event.feature.Gg.TYPE ? '</br><b style = "font-weight:bold;">Type de parc: </b>' + event.feature.Gg.TYPE : ''}

                    ${event.feature.Gg.ADIDU ? '<b style = "font-weight:bold;">Indice des ressources de culture, sport et loisir: </b>' + event.feature.Gg.ACP_Cult_1 : ''}
                    ${event.feature.Gg.ADIDU ? '</br><b style = "font-weight:bold;">Indice économique: </b>' + event.feature.Gg.ACP_econo_ : ''}
                    ${event.feature.Gg.ADIDU ? '</br><b style = "font-weight:bold;">Indice environnementale: </b>' + event.feature.Gg.ACP_envi_1 : ''}
                    ${event.feature.Gg.ADIDU ? '</br><b style = "font-weight:bold;">Indice des ressources de proximité : </b>' + event.feature.Gg.ACP_prox_1 : ''}
                    ${event.feature.Gg.ADIDU ? '</br><b style = "font-weight:bold;">Indice de sécurité: </b>' + event.feature.Gg.ACP_secu_1 : ''}
                    ${event.feature.Gg.ADIDU ? '</br><b style = "font-weight:bold;">indice sociale: </b>' + event.feature.Gg.ACP_soci_1 + '</br>' : ''}
                    ${event.feature.Gg.ADIDU ? '</br><b style = "font-weight:bold;">Indice totale: </b>' + event.feature.Gg.Indice_emv + ' </br>' + (event.feature.Gg.Indice_emv === 3 ? '<p style = "font-weight:bold;color:red;">(milieu vulnérable et non prioritaire)</p>' : (event.feature.Gg.Indice_emv >= 4 ? '<p style = "font-weight:bold;color:red;">(milieu vulnérable et prioritaire)</p>' : '<p style = "font-weight:bold;color:green;">(milieu non vulnérable)</p>')) : ''}
                    
          `,

          position: event.latLng.toJSON(),
          maxWidth:200
        });

        infowindow.open(
          map
        );
      };
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        onValue(ref(database, 'properties'), (snapshot) => {
          const data = snapshot.val();
          setDataProperties(data.reduce((acc, p)=>{
            acc[`${p.city}`] = acc[`${p.city}`].concat([p])
            return acc;
          }, { montreal : [], sherbrooke : [], shawinigan : []}));
        });
        const responsePublicPlacesMtl = await fetch(PUBLIC_PLACES_MTL_ENDPOINT);
        const responseBuildPermitsMtl = await fetch(BUILD_PERMITS_MTL_ENDPOINT);
        const responseBusStopsShawi = await fetch(BUS_STOPS_SHAWI_ENDPOINT);
        if (!responsePublicPlacesMtl.ok || !responseBuildPermitsMtl.ok || !responseBusStopsShawi.ok) {
          throw new Error('Error fetching data');
        }
        const publicPlacesMtl = await responsePublicPlacesMtl.json();
        const buildPermitsMtl = await responseBuildPermitsMtl.json();
        const busStopsShawi = await responseBusStopsShawi.json();

        setDataPublicPlaces({ montreal : publicPlacesMtl.result.records, sherbrooke : [], shawinigan : [] });
        setDataBuildPermits({ montreal : buildPermitsMtl.result.records, sherbrooke : [], shawinigan : [] });
        setDataBusStops({ montreal : [], sherbrooke : [], shawinigan : busStopsShawi.result.records });

      } catch (error) {
        throw new Error('Error processing data');
      } finally {
      }
    };

    fetchData();
  }, []); // The empty array ensures this effect runs only once after the initial render

  useEffect(() => {
    setAllMarkers(
      (filtersMap.displayPlacesPubliques ? dataPublicPlaces[`${filtersMap.city}`].map((r,i)=>({
        position: { lng: Number(r.lat), lat: Number(r.long) },//due to an error in the data set
        icon: publicPlaceIcon,
        title:'public-place'+i,
        ...r
      })) : [])
      .concat(
        filtersMap.displayPermis ? dataBuildPermits[`${filtersMap.city}`].map((r,i)=>({
        position: { lat: Number(r.latitude), lng: Number(r.longitude) },//due to an error in the data set
        icon: permitIcon,
        title:'build-permit'+i,
        ...r
      })) : [])
      .concat(
        filtersMap.displayPointArretBus ? dataBusStops[`${filtersMap.city}`].map((r,i)=>({
        position: { lng: Number(r.latitude), lat: Number(r.longitude) },//due to an error in the data set
        icon: busStopIcon,
        title:'bus-stop'+i,
        ...r
      })) : [])
      .concat(
        dataProperties[`${filtersMap.city}`].map((r,i)=>({
        position: { lng: Number(r.lng), lat: Number(r.lat) },//due to an error in the data set
        icon: buildingIcon,
        title:'property'+i,
        ...r
      })))
    );
  }, [dataProperties, filtersMap, dataPublicPlaces, dataBuildPermits, dataBusStops]); // To ensure the effect runs every time one of those values changes

  if (!isLoaded) return <div>Loading...</div>;

  return (  
    <GoogleMap
      mapTypeId = {mapTypeId.TERRAIN}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
    >
      {allMarkers.map((marker, index) => (
          <MarkerF
            key={index}
            position={marker.position}
            onClick={()=>onClickMarker(marker)}
            title={marker.title}
            zIndex={12}
            icon={{
              url:marker.icon,
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
      ))}
      
    </GoogleMap>
  );
}

export default MapComponent;