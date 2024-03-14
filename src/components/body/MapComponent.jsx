
import React, { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { database } from '.../firebase-config';
import { ref, set, onValue } from 'firebase/database';
import busStopIcon from '.../assets/images/bus-stop.png';
import publicPlaceIcon from '.../assets/images/public-place.png';
import buildingIcon from '.../assets/images/build.png';
import permitIcon from '.../assets/images/permit.png';
import planDeZonageShawingan from '.../assets/data/plan_de_zonage_shawingan.json';
import zonageSherbrooke from '.../assets/data/zonage-sherbrooke.json';
import indiceEquiteMilieuxVie from '.../assets/data/indice-equite-milieux-vie.json';
import reseauCyclableMtl from '.../assets/data/reseau_cyclable_mtl.json';
import reseauCyclableShawinigan from '.../assets/data/reseau_cyclable_shawinigan.json';
import parcsEspacesVertsShawinigan from '.../assets/data/parcs_espaces_verts_shawinigan.json';
import parcsEspacesVertsMtl from '.../assets/data/parcs_espaces_verts_mtl.json';

const PUBLIC_PLACES_MTL_ENDPOINT = 'https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=4731b64f-29cc-4e08-bc44-8752ae2fcafb&limit=200';
const BUILD_PERMITS_MTL_ENDPOINT = 'https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=5232a72d-235a-48eb-ae20-bb9d501300ad&limit=200';
const BUS_STOPS_SHAWI_ENDPOINT = 'https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?resource_id=0ff3c32b-5955-40e9-99d5-baa993c1d910&limit=105';

const containerStyle = {
  width: '50%',
  height: '50vh'
};

const mapTypeId = {
  HYBRID: 'hybrid',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain'
};

const MapComponent = (params) => { 
  // Use `useLoadScript` to ensure Google Maps API script is loaded
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);
  const [allMarkers, setAllMarkers] = useState([]);
  const [dataPublicPlaces, setDataPublicPlaces] = useState({ montreal : [], sherbrooke : [], shawinigan : []});
  const [dataBuildPermits, setDataBuildPermits] = useState({ montreal : [], sherbrooke : [], shawinigan : []});
  const [dataBusStops, setDataBusStops] = useState({ montreal : [], sherbrooke : [], shawinigan : []});
  const [dataProperties, setDataProperties] = useState({ montreal : [], sherbrooke : [], shawinigan : []});
  

  const onClickMarker = (marker) => {debugger
    const currentMarker = allMarkers.find(m=>marker.title === m.title);
    let infowindow = new window.google.maps.InfoWindow({
      content: `${currentMarker.titre_lieu ? '<b>titre_lieu : </b>' + currentMarker.titre_lieu  : ''}  ${currentMarker.id_permis? '<b>id_permis: </b>' + currentMarker.id_permis : ''} 
      ${currentMarker.date_debut? '</br><b>date_debut: </b>' + currentMarker.date_debut : ''} 
      ${currentMarker.date_emission? '</br><b>date_emission: </b>' + currentMarker.date_emission : ''} 
      ${currentMarker.emplacement? '</br><b>emplacement: </b>' + currentMarker.emplacement : ''} 
      ${currentMarker.arrondissement? '</br><b>arrondissement: </b>' + currentMarker.arrondissement : ''} 
      ${currentMarker.code_type_base_demande? '</br><b>code_type_base_demande: </b>' + currentMarker.code_type_base_demande : ''} 
      ${currentMarker.description_type_demande? '</br><b>description_type_demande: </b>' + currentMarker.description_type_demande : ''} 
      ${currentMarker.description_type_batiment? '</br><b>description_type_batiment: </b>' + currentMarker.description_type_batiment : ''} 
      ${currentMarker.nature_travaux? '</br><b>nature_travaux: </b>' + currentMarker.nature_travaux : ''} 
      ${currentMarker.nb_logements? '</br><b>nb_logements: </b>' + currentMarker.nb_logements : ''} 
      ${currentMarker.longitude? '<b>longitude: </b>' + currentMarker.longitude : ''} 
      ${currentMarker.latitude? '<b>latitude: </b>' + currentMarker.latitude : ''} 
      ${currentMarker.direction ? '<b>direction: </b>' + currentMarker.direction : ''}
      ${currentMarker.notes ? '<b>notes: </b>' + currentMarker.notes : ''}
      ${currentMarker.buildingType ? '<b>Type de batiment: </b>' + currentMarker.buildingType : ''}
      ${currentMarker.unitsAvailable ? '</br><b>Unites disponibles: </b>' + currentMarker.unitsAvailable : ''}
      ${currentMarker.status ? '</br><b>Status: </b>' + currentMarker.status : ''}
      ${currentMarker.deliveryDate ? '</br><b>Date de livraison: </b>' + currentMarker.deliveryDate : ''}
      ${currentMarker.address ? '</br><b>Addresse: </b>' + currentMarker.address : ''}
      ${currentMarker.contact ? '</br><b>Contact: </b>' + currentMarker.contact : ''}
      `,
      position: currentMarker.position,
      maxWidth: 200
    });

    infowindow.open(
      map
    );
  }

  const onLoad = map=>{
    setMap(map);
    switch (params.filtersMap.city) {
      case 'sherbrooke':
        setCenter({
          lat: 45.404476,
          lng: -71.888351
        });
        if(params.filtersMap.displayZonage) map.data.addGeoJson(zonageSherbrooke);
        break;
      case 'montreal':
        setCenter({
          lat: 45.508888,
          lng: -73.561668
        });
        if(params.filtersMap.displayIndiceEquiteMilieuxVie) map.data.addGeoJson(indiceEquiteMilieuxVie);
        if(params.filtersMap.displayReseauCyclable) map.data.addGeoJson(reseauCyclableMtl);
        if(params.filtersMap.displayParcsEspacesVerts) map.data.addGeoJson(parcsEspacesVertsMtl);
        break;
      case 'shawinigan':
        setCenter({
          lat: 46.566666,
          lng: -72.750000
        });
        if(params.filtersMap.displayZonage) map.data.addGeoJson(planDeZonageShawingan);
        if(params.filtersMap.displayReseauCyclable) map.data.addGeoJson(reseauCyclableShawinigan);
        if(params.filtersMap.displayParcsEspacesVerts) map.data.addGeoJson(parcsEspacesVertsShawinigan);
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
        strokeColor = '#F01FB7';
        fillColor = '#F01FB7';
        fillOpacity = 0.1;
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


    map.data.addListener('click', function(event) {debugger
      if (event.feature.getGeometry().getType() === 'Polygon' || event.feature.getGeometry().getType() === 'MultiPolygon') {
        let infowindow = new window.google.maps.InfoWindow({
          content: `${event.feature.Gg.usage_ ? '<b>usage_: </b>' + event.feature.Gg.usage_ : ''} ${event.feature.Gg.zone_ ? '</br><b>zone_: </b>' + event.feature.Gg.zone_ : ''}
                    ${event.feature.Gg.ID ? '<b>ID: </b>' + event.feature.Gg.ID : ''} ${event.feature.Gg.MUNICIPALITE ? '</br><b>MUNICIPALITE: </b>' + event.feature.Gg.MUNICIPALITE : ''}
                    ${event.feature.Gg.NO_ZONE ? '<b>NO_ZONE: </b>' + event.feature.Gg.NO_ZONE : ''} ${event.feature.Gg.GRILLEUSAGE ? '</br><b>GRILLEUSAGE: </b>' + event.feature.Gg.GRILLEUSAGE : ''}
                    ${event.feature.Gg.autoch_min ? '<b>autoch_min: </b>' + event.feature.Gg.autoch_min : ''}
                    ${event.feature.Gg.crimes_pon ? '</br><b>crimes_pon: </b>' + event.feature.Gg.crimes_pon : ''}
                    ${event.feature.Gg.log_priv20 ? '</br><b>log_priv20: </b>' + event.feature.Gg.log_priv20 : ''}
                    ${event.feature.Gg.nb_biblio_ ? '</br><b>nb_biblio_: </b>' + event.feature.Gg.nb_biblio_ : ''}
                    ${event.feature.Gg.nb_commerc ? '</br><b>nb_commerc: </b>' + event.feature.Gg.nb_commerc : ''}
                    ${event.feature.Gg.nb_ecoles_ ? '</br><b>nb_ecoles_: </b>' + event.feature.Gg.nb_ecoles_ : ''}
                    ${event.feature.Gg.nb_emplois ? '</br><b>nb_emplois: </b>' + event.feature.Gg.nb_emplois : ''}
                    ${event.feature.Gg.nb_equipem ? '</br><b>nb_equipem: </b>' + event.feature.Gg.nb_equipem : ''}
                    ${event.feature.Gg.nb_organis ? '</br><b>nb_organis: </b>' + event.feature.Gg.nb_organis : ''}
                    ${event.feature.Gg.nb_pass_tc ? '</br><b>nb_pass_tc: </b>' + event.feature.Gg.nb_pass_tc : ''}
                    ${event.feature.Gg.nb_pharmac ? '</br><b>nb_pharmac: </b>' + event.feature.Gg.nb_pharmac : ''}
                    ${event.feature.Gg.sans_diplo ? '</br><b>sans_diplo: </b>' + event.feature.Gg.sans_diplo : ''}
                    ${event.feature.Gg.superficie ? '</br><b>superficie: </b>' + event.feature.Gg.superficie : ''}
                    ${event.feature.Gg.type ? '</br><b>type: </b>' + event.feature.Gg.type : ''}
                    ${event.feature.Gg.ACP_sociale ? '</br><b>ACP_sociale: </b>' + event.feature.Gg.ACP_sociale : ''}
                    ${event.feature.Gg.ACP_securité ? '</br><b>ACP_securité: </b>' + event.feature.Gg.ACP_securité : ''}
                    ${event.feature.Gg.ACP_proximité ? '</br><b>ACP_proximité: </b>' + event.feature.Gg.ACP_proximité : ''}
                    ${event.feature.Gg.ACP_CultSportLoisir ? '</br><b>ACP_CultSportLoisir: </b>' + event.feature.Gg.ACP_CultSportLoisir : ''}
                    
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
        onValue(ref(database, 'properties'), (snapshot) => {debugger
          const data = snapshot.val();
          setDataProperties(data.reduce((acc, p)=>{
            acc[`${p.city}`] = (acc[`${p.city}`] || []).concat([p])
            return acc;
          }, {}));
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
      (params.filtersMap.displayPlacesPubliques ? dataPublicPlaces[`${params.filtersMap.city}`].map((r,i)=>({
        position: { lng: Number(r.lat), lat: Number(r.long) },//due to an error in the data set
        icon: publicPlaceIcon,
        title:'public-place'+i,
        ...r
      })) : [])
      .concat(
        params.filtersMap.displayPermis ? dataBuildPermits[`${params.filtersMap.city}`].map((r,i)=>({
        position: { lat: Number(r.latitude), lng: Number(r.longitude) },//due to an error in the data set
        icon: permitIcon,
        title:'build-permit'+i,
        ...r
      })) : [])
      .concat(
        params.filtersMap.displayPointArretBus ? dataBusStops[`${params.filtersMap.city}`].map((r,i)=>({
        position: { lng: Number(r.latitude), lat: Number(r.longitude) },//due to an error in the data set
        icon: busStopIcon,
        title:'bus-stop'+i,
        ...r
      })) : [])
      .concat(
        dataProperties[`${params.filtersMap.city}`].map((r,i)=>({
        position: { lng: Number(r.lng), lat: Number(r.lat) },//due to an error in the data set
        icon: buildingIcon,
        title:'property'+i,
        ...r
      })))
    );
  }, [dataProperties, params.filtersMap.city, params.filtersMap.displayPermis, params.filtersMap.displayPlacesPubliques, params.filtersMap.displayPointArretBus, dataPublicPlaces, dataBuildPermits, dataBusStops]); // To ensure the effect runs every time one of those values changes

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