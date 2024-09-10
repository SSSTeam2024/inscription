import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for your inscription data
type InscriptionData = {
  classe: string;
  nom_eleve: string;
  prenom_eleve: string;
  date_naissance: string;
  lieu_naissance: string;
  sexe: string;
  adresse_eleve: string;
  situation_familiale: string;
  avec: string;
  responsable_legal: string;
  nom_parent: string;
  prenom_parent: string;
  adresse_parent: string;
  profession: string;
  nom_societe: string;
  phone: string;
  status: string;
};

// Define the default values for your context
const defaultInscriptionData: InscriptionData = {
  classe: "",
  nom_eleve: "",
  prenom_eleve: "",
  date_naissance: "",
  lieu_naissance: "",
  sexe: "",
  adresse_eleve: "",
  situation_familiale: "",
  avec: "",
  responsable_legal: "",
  nom_parent: "",
  prenom_parent: "",
  adresse_parent: "",
  profession: "",
  nom_societe: "",
  phone: "",
  status: "",
};

// Create the context with default values
const InscriptionContext = createContext<{
  inscriptionData: InscriptionData;
  setInscriptionData: React.Dispatch<React.SetStateAction<InscriptionData>>;
}>({
  inscriptionData: defaultInscriptionData,
  setInscriptionData: () => {},
});

// Create a provider component
export const InscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [inscriptionData, setInscriptionData] = useState<InscriptionData>(
    defaultInscriptionData
  );

  return (
    <InscriptionContext.Provider
      value={{ inscriptionData, setInscriptionData }}
    >
      {children}
    </InscriptionContext.Provider>
  );
};

// Create a hook to use the Inscription context
export const useInscription = () => useContext(InscriptionContext);
