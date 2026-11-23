// French dictionary — sample translation of en.ts. Mirror the same keys.
import type { Dictionary } from './en';

const fr: Dictionary = {
  nav: {
    skipToMain: 'Aller au contenu principal',
    menu: 'Menu',
    close: 'Fermer',
  },
  cta: {
    bookNow: 'Réserver',
    learnMore: 'En savoir plus',
    getInTouch: 'Nous contacter',
  },
  form: {
    name: 'Nom complet',
    email: 'E-mail',
    phone: 'Téléphone',
    message: 'Message',
    subject: 'Objet',
    submit: 'Envoyer',
    thanks: 'Merci — votre message a été envoyé.',
    error: "Une erreur s'est produite. Veuillez réessayer.",
  },
  footer: {
    rightsReserved: 'Tous droits réservés.',
  },
  search: {
    title: 'Rechercher',
    placeholder: 'Rechercher…',
  },
  pageNotFound: {
    title: 'Page introuvable',
    subtitle: "La page que vous cherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
};

export default fr;
