const METADATA = `metadonnees.titre,metadonnees.description,metadonnees.mots_cles`;
const base = `id,libelle,sous_libelle,ordre,${METADATA}`;
const prix = 'prix.prix_id.valeur,prix.prix_id.date';
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
const MENU = `${base},${image},slug,display`;

const PAGE_FIELDS = `
      id,
      label,
      abstract,
      sublabel, 
      articles.article_id.id,
      articles.article_id.label,
      articles.article_id.sublabel,
      articles.article_id.abstract,
      articles.article_id.description,
      articles.article_id.images.directus_files_id.id,
      articles.article_id.images.directus_files_id.title,
      articles.article_id.images.directus_files_id.description,
      articles.article_id.articles.related_article_id.id,
      articles.article_id.articles.related_article_id.label,
      articles.article_id.articles.related_article_id.sublabel,
      articles.article_id.articles.related_article_id.abstract,
      articles.article_id.articles.related_article_id.description,
      articles.article_id.articles.related_article_id.images.directus_files_id.id,
      articles.article_id.articles.related_article_id.images.directus_files_id.title,
      articles.article_id.articles.related_article_id.images.directus_files_id.description,

      pages.related_page_id.id,
      pages.related_page_id.label,
      pages.related_page_id.sublabel,
      pages.related_page_id.prices.pricing_id.id,
      pages.related_page_id.prices.pricing_id.unit,
      pages.related_page_id.prices.pricing_id.frequence,
      pages.related_page_id.prices.pricing_id.description,
      pages.related_page_id.prices.pricing_id.popular,
      pages.related_page_id.prices.pricing_id.label,
      pages.related_page_id.prices.pricing_id.sublabel,
      pages.related_page_id.prices.pricing_id.type,
      pages.related_page_id.prices.pricing_id.value,
      pages.related_page_id.prices.pricing_id.channel,
      pages.related_page_id.prices.pricing_id.credits,
      pages.related_page_id.prices.pricing_id.items.item_id.id,
      pages.related_page_id.prices.pricing_id.items.item_id.label
    `;
const TARIF_FIELDS = `
      id,
      label,
      status,
      sublabel, 
      prices.pricing_id.id,
      prices.pricing_id.unit,
      prices.pricing_id.frequence,
      prices.pricing_id.description,
      prices.pricing_id.popular,
      prices.pricing_id.label,
      prices.pricing_id.sublabel,
      prices.pricing_id.type,
      prices.pricing_id.value,
      prices.pricing_id.channel,
      prices.pricing_id.credits,
      prices.pricing_id.items.item_id.id,
      prices.pricing_id.items.item_id.label,
      pages.related_page_id.id,
      pages.related_page_id.label,
      pages.related_page_id.sublabel,
      pages.related_page_id.prices.pricing_id.id,
      pages.related_page_id.prices.pricing_id.unit,
      pages.related_page_id.prices.pricing_id.frequence,
      pages.related_page_id.prices.pricing_id.description,
      pages.related_page_id.prices.pricing_id.popular,
      pages.related_page_id.prices.pricing_id.label,
      pages.related_page_id.prices.pricing_id.sublabel,
      pages.related_page_id.prices.pricing_id.type,
      pages.related_page_id.prices.pricing_id.value,
      pages.related_page_id.prices.pricing_id.channel,
      pages.related_page_id.prices.pricing_id.credits,
      pages.related_page_id.prices.pricing_id.items.item_id.id,
      pages.related_page_id.prices.pricing_id.items.item_id.label
    `;
const EVENT_FIELDS = `
      id,
      confirmation,
      name,
      address,
      form,
      fontcolor,
      buttonbackground,
      buttoncolor,
      bottonfontcolor,
      backgroundcolor,
      message,
      image.*,
      cover.*,
      icon.*
    `;
const MENUFULL = `
      id,
      label,
      status,
      sublabel,
      categories.*,
      pages.page_id.*,
      pages.page_id.images.directus_files_id.*,
      prices.pricing_id.id,
      prices.pricing_id.status,
      prices.pricing_id.sort,
      prices.pricing_id.label,
      prices.pricing_id.type,
      prices.pricing_id.plans.price_plan_id.id,
      prices.pricing_id.plans.price_plan_id.unit,
      prices.pricing_id.plans.price_plan_id.frequence,
      prices.pricing_id.plans.price_plan_id.description,
      prices.pricing_id.plans.price_plan_id.popular,
      prices.pricing_id.plans.price_plan_id.label,
      prices.pricing_id.plans.price_plan_id.sublabel,
      prices.pricing_id.plans.price_plan_id.type,
      prices.pricing_id.plans.price_plan_id.value,
      prices.pricing_id.plans.price_plan_id.credits,
      prices.pricing_id.plans.price_plan_id.items.price_plan_item_id.*
    `;
const ENTREPRISE = `
  id,
  name,
  abstract,
  menus.id,
  menus.status,
  menus.label,
  categories.pages.page_id.id,
  categories.id,
  categories.label,
  categories.status,
  categories.pages.page_id.label,
  categories.pages.page_id.sublabel,
  categories.pages.page_id.images.directus_files_id.*
`;

const SONDAGE = `
  id,
  status,
  sort,
  user_created,
  date_created,
  user_updated,
  date_updated,
  label,
  type,
  abstract,
  company.*,
  startDate,
  endDate,
  slug,
  answer_sheets,
  questions.id,
  questions.status,
  questions.sort,
  questions.user_created,
  questions.date_created,
  questions.user_updated,
  questions.date_updated,
  questions.label,
  questions.description,
  questions.isRequired,
  questions.sector,
  questions.type,
  questions.survey,
  questions.choices.choice_id.*
`

const PARTIAL_SPACES = `${base},${image},${prix},${type},slug`;

export {
  ENTREPRISE,
  EVENT_FIELDS,
  MENU,
  MENUFULL,
  PAGE_FIELDS,
  PARTIAL_SPACES,
  SONDAGE,
  TARIF_FIELDS,
};
