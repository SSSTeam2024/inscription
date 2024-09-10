import React, { useState } from "react";
import { Button, Card, Col, Form, Image, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import logolight from "assets/images/sls-logo2.png";
import Flatpickr from "react-flatpickr";
import {
  Inscription,
  useAddNewInscriptionMutation,
} from "features/inscriptions/inscriptionSlice";
import { useFetchClassesQuery } from "features/classes/classeSlice";

const Recap = () => {
  const [createInscription] = useAddNewInscriptionMutation();

  const { data: AllClasses = [] } = useFetchClassesQuery();

  const [selectedClasse, setSelectedClasse] = useState<string>("");

  const handleSelectClasse = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedClasse(value);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (selectedDates: Date[]) => {
    setSelectedDate(selectedDates[0]);
  };

  const [selectedSituation, setSelectedSituation] = useState<string>("");

  const handleSelectSituation = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedSituation(value);
  };

  const [gender, setGender] = useState("");

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const [vit_avec, setVitAvec] = useState("");

  const handleVitAvecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVitAvec(event.target.value);
  };

  const [responsable, setResponsable] = useState("");

  const handleResponsableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResponsable(event.target.value);
  };

  const inscriptionValue = {
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
  //   const [inscriptionData, setinscriptionData] = useState(inscriptionValue);

  //   const onChangeInscription = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     setinscriptionData((prevState) => ({
  //       ...prevState,
  //       [e.target.id]: e.target.value,
  //     }));
  //   };

  const location = useLocation();
  const navigate = useNavigate();
  const { inscriptionData } = location.state;

  console.log("inscriptionData", inscriptionData);
  const onSubmitInscription = () => {
    // Call the createInscription function to save the data to the database
    createInscription(inscriptionData)
      .then(() => {
        // Navigate to another page after saving (e.g., a success page)
        notify();
      })
      .then(() => {
        // Navigate to another page after saving (e.g., a success page)
        navigate("/");
      })
      .catch((err) => {
        console.error("Error saving data: ", err);
      });
  };

  const notify = () => {
    Swal.fire({
      icon: "success",
      title: "Envoyé",
      text: "L'inscription a été envoyer avec succès",
    });
  };

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <React.Fragment>
      <Row>
        <Card className="mx-auto w-75">
          <Card.Header>
            <Row>
              <Col lg={4}>
                <Image
                  src={logolight}
                  alt="logo light"
                  style={{
                    imageResolution: "inherit",
                    shapeImageThreshold: "inherit",
                  }}
                  height={120}
                />
              </Col>
              <Col lg={6} className="d-flex justify-content-center">
                <div className="text-center">
                  <h4>Formulaire d’inscription Année scolaire</h4>
                  <h5>2024-2025</h5>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <h6>
              Voici un récapitulatif des données que vous avez déjà saisies,
              Merci de cliquer sur le bouton « Confirmer » après bien vérifié
              les informations.
            </h6>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>
                    <strong>Niveau Demandé</strong>
                  </td>
                  <td>{inscriptionData.classe}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Nom et Prénom Elève</strong>
                  </td>
                  <td>
                    {inscriptionData.nom_eleve} {inscriptionData.prenom_eleve}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Date et Lieu de Naissance</strong>
                  </td>
                  <td>
                    {inscriptionData.date_naissance} à{" "}
                    {inscriptionData.lieu_naissance}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Sexe</strong>
                  </td>
                  <td>{inscriptionData.sexe}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Adresse</strong>
                  </td>
                  <td>{inscriptionData.adresse_eleve}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Nationalite</strong>
                  </td>
                  <td>{inscriptionData.nationalite}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Situation Familiale</strong>
                  </td>
                  <td>{inscriptionData.situation_familiale}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Vit avec</strong>
                  </td>
                  <td>{inscriptionData.avec}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Année Scolaire</strong>
                  </td>
                  <td>{inscriptionData.annee_scolaire}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Etablissement Fréquenté</strong>
                  </td>
                  <td>{inscriptionData.etablissement_frequente}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Moyenne 1èr Trimestre</strong>
                  </td>
                  <td>{inscriptionData.moyenne_trimestre_1}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Moyenne 2ème Trimestre</strong>
                  </td>
                  <td>{inscriptionData.moyenne_trimestre_2}</td>
                </tr>
                {inscriptionData.moyenne_trimestre_3 !== "" && (
                  <tr>
                    <td>
                      <strong>Moyenne 3ème Trimestre</strong>
                    </td>
                    <td>{inscriptionData.moyenne_trimestre_3}</td>
                  </tr>
                )}
                <tr>
                  <td>
                    <strong>Moyenne Annuelle</strong>
                  </td>
                  <td>{inscriptionData.moyenne_annuelle}</td>
                </tr>
                {inscriptionData.moyenne_concours_6 !== "" && (
                  <tr>
                    <td>
                      <strong>Moyenne Concours</strong>
                    </td>
                    <td>{inscriptionData.moyenne_concours_6}</td>
                  </tr>
                )}
                <tr>
                  <td>
                    <strong>N° Convocation Concours</strong>
                  </td>
                  <td>{inscriptionData.numero_convocation_concours}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Responsable Légal</strong>
                  </td>
                  <td>{inscriptionData.responsable_legal}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Nom et Prénom Parent</strong>
                  </td>
                  <td>
                    {inscriptionData.nom_parent} {inscriptionData.prenom_parent}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Adresse Parent</strong>
                  </td>
                  <td>{inscriptionData.adresse_parent}</td>
                </tr>
                <tr>
                  <td>
                    <strong>P°rofession</strong>
                  </td>
                  <td>{inscriptionData.profession}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Nom Sociéte</strong>
                  </td>
                  <td>{inscriptionData.nom_societe}</td>
                </tr>
                <tr>
                  <td>
                    <strong>N° Téléphone</strong>
                  </td>
                  <td>{inscriptionData.phone}</td>
                </tr>
              </tbody>
            </Table>
            <Row className="mt-2">
              <Col lg={6}>
                <div className="text-end">
                  <Button
                    style={{
                      backgroundColor: "#5784BA",
                      borderColor: "#5784BA",
                    }}
                    onClick={onSubmitInscription}
                  >
                    Confirmer
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </React.Fragment>
  );
};

export default Recap;
