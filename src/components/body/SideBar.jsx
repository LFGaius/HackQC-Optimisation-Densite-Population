import React from 'react';

export const SideBar = () => {
  const avis = [
    { id: 1, user: 'Utilisateur 1', commentaire: 'Ceci est un avis sur le produit A.' },
    { id: 2, user: 'Utilisateur 2', commentaire: 'Ceci est un avis sur le produit B.' },
    { id: 3, user: 'Utilisateur 3', commentaire: 'Ceci est un avis sur le produit C.' },
  ];

  return (
    <div>
      <h2>Avis des utilisateurs</h2>
      <div>
        {avis.map((avisItem) => (
          <div key={avisItem.id}>
            <h4>{avisItem.user}</h4>
            <p>{avisItem.commentaire}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
