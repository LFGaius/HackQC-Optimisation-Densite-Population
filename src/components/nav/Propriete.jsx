// Fonction de validation des données de propriété
const validateProperty = (property) => {

  
  // Vérifier si tous les champs obligatoires sont remplis
  if (!property.buildingType || !property.unitsAvailable || !property.state || !property.address) {
    return { isValid: false, errorMessage: "Veuillez remplir tous les champs obligatoires." };
  }
  // Valider d'autres critères si nécessaire

  // Si toutes les validations réussissent, retourner vrai
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
    state: '',
    deliveryDate: '',
    address: '',
    contact: ''
  };
};

export { validateProperty, saveProperty };
