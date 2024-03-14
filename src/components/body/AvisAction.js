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

const avisL = () => {
  const avisList = [
    { id: 1, user: 'Jedeon', commentaire: 'Ceci est un avis sur la ville A.' },
    { id: 2, user: 'Halime', commentaire: 'Ceci est un avis sur le Quatier B.' },
    { id: 3, user: 'Galius', commentaire: "Ceci est un avis sur l'Arondicement C.Ceci est un avis sur l'Arondicement C." },
    { id: 3, user: 'Samuel', commentaire: 'Ceci est un avis sur la Rue D.' },
  ];

  return avisList;
};

export { validateReview, saveReview, avisL };