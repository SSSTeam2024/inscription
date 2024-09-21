import React from "react";
import { useLocation } from "react-router-dom";

import InscriptionLycee from "pages/InscriptionLycee";
import InscriptionCollege from "pages/InscriptionCollege";

const Inscriptions = () => {
  document.title = "Inscription | Sousse Leaders School";
  const location = useLocation();
  const state = location.state;
  return state === "Lycee" ? <InscriptionLycee /> : <InscriptionCollege />;
};

export default Inscriptions;
