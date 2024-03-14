// Fonction de validation des Avis
const validateReview = (review) => {

  if (!review.name || !review.emailAddress || !review.comment) {
    return { isValid: false, errorMessage: "Veuillez remplir tous les champs obligatoires." };
  }

  // Si toutes les validations réussissent, retourner vrai
  return { isValid: true, errorMessage: "" };
};

// Fonction pour sauvegarder les Avis
const saveReview = (review) => {
  // Effectuer une action de sauvegarde ici, par exemple envoyer les données à un serveur
  console.log("Propriété à sauvegarder :", review);
  // Réinitialiser le formulaire après la sauvegarde
  return {
    name: '',
    emailAddress: '',
    comment: ''
  };
};

export { validateReview, saveReview };