const METADATA=`metadonnees.titre,metadonnees.description,metadonnees.mots_cles`;
const base = `id,libelle,sous_libelle,ordre,${METADATA}`;
const prix = "prix.prix_id.valeur,prix.prix_id.date";
const image = `
    images.directus_files_id.id,
    images.directus_files_id.title,
    images.directus_files_id.description
    `;
const type = `
    types.type_id.id,
    types.type_id.libelle,
    types.type_id.description,
    types.type_id.prix.item.valeur,
    types.type_id.prix.item.date
    `;
const loisirs = `
  loisirs.id,
  loisirs.description,
  loisirs.distance,
  loisirs.libelle,
  loisirs.images.id,
  loisirs.images.title,
  loisirs.images.description
`;
const adresse = `
  adresse.item.code_postal,
  adresse.item.latitude,
  adresse.item.longitude,
  adresse.item.rue,
  adresse.item.ville
`;
const contact = `
contact.item.email,
contact.item.telephone
`;
const revue = `
revue.item.commentaire,
revue.item.date,
revue.item.M,
revue.item.nom,
revue.item.prenom
`;
const MENU =  `${base},${image},slug,display`;
const MENUFULL =  `
      id,
      label,
      sublabel
    `;
const ENTREPRISE =  `
  id,
  name,
  abstract,
  menus.id,
  menus.label,
  categories.pages.page_id.id,
  categories.id,
  categories.label,
  categories.pages.page_id.label,
  categories.pages.page_id.sublabel,
  categories.pages.page_id.images.directus_files_id.*
`;
const PARTIAL_SPACES = `${base},${image},${prix},${type},slug`;

export {MENU, MENUFULL, PARTIAL_SPACES, ENTREPRISE};