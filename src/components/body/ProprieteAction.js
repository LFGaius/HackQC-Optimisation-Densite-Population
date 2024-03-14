// Fonction de validation des données de propriété
const validateProperty = (property) => {

  if (!property.buildingType || !property.unitsAvailable || !property.status || !property.address) {
    return { isValid: false, errorMessage: "Veuillez remplir tous les champs obligatoires." };
  }

  return { isValid: true, errorMessage: "" };
};

// Fonction pour sauvegarder les données de propriété
const saveProperty = (property) => {
  // Effectuer une action de sauvegarde ici, par exemple envoyer les données à un serveur
  console.log("Propriété à sauvegarder :", property);
  // Réinitialiser le formulaire après la sauvegarde
  return {
    buildingType: '',
    unitsAvailable: '',
    status: '',
    deliveryDate: '',
    address: '',
    contact: ''
  };
};

const propertys = () => {
  const property = [
    { id: 1, user: 'Jedeon', contact: '(514) 567 567', adress: '1 Ville-Marie', buildingType: 'Duplex', unitsAvailable: '9', state: 'Fonctionnel', commentaire: "Ceci est une description  ReactJS est très populaire, car c'est un framework idéal pour la création de tout type de plateforme" },
    { id: 2, user: 'Halime', contact: '(514) 566 566', adress: '2 rue Berri-UQAM', buildingType: 'Triplex', unitsAvailable: '4', state: 'En Construction', commentaire: 'Ceci est une description  A.Ceci est une description  A.Ceci est une description  A.Ceci est une description  A.Ceci est une description  A.Ceci est une description  A.' },
    { id: 3, user: 'Galius', contact: '(514) 565 565', adress: '30 Pierre-Tétreaut', buildingType: 'Triplex', unitsAvailable: '12', state: 'Fonctionnel', commentaire: " Il couvre tous les domaines, principalement le développement mobile, Web et natif. Les développeurs ReactJS sont facilement capables de gérer divers contextes de développement d'interface utilisateur." },
    { id: 4, user: 'Samuel', contact: '(514) 564 564', adress: '4040 Rue Ontario Est', buildingType: 'Duplex', unitsAvailable: '5', state: 'En Construction', commentaire: "React est une bibliothèque JavaScript open-source qui est utilisée pour construire des interfaces utilisateur spécifiquement pour des applications d'une seule page. Elle est utilisée pour gérer la couche d'affichage des applications web et mobiles" },
  ];

  return property;
};
export { validateProperty, saveProperty, propertys };
