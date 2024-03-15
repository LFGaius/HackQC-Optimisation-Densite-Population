// Fonction de validation des données de propriété
const validateProperty = (property) => {

  if (!property.buildingType || !property.unitsAvailable || !property.status || !property.address) {
    return { isValid: false, errorMessage: "Veuillez remplir tous les champs obligatoires." };
  }

  return { isValid: true, errorMessage: "" };
};

// Fonction pour sauvegarder les données de propriété
const saveProperty = (property) => {
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

export { validateProperty, saveProperty };
