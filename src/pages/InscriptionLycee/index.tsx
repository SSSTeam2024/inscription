import React, { useState } from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import Swal from "sweetalert2";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import logolight from "assets/images/sls-logo2.png";
// import Flatpickr from "react-flatpickr";
import {
  Inscription,
  useAddNewInscriptionMutation,
} from "features/inscriptions/inscriptionSlice";

function convertToBase64(
  file: File
): Promise<{ base64Data: string; extension: string }> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      const [, base64Data] = base64String.split(","); // Extract only the Base64 data
      const extension = file.name.split(".").pop() ?? ""; // Get the file extension
      resolve({ base64Data, extension });
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsDataURL(file);
  });
}

const InscriptionLycee = () => {
  document.title = "Inscription Lycée | Sousse Leaders School";
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    if (dateValue) {
      setSelectedDate(new Date(dateValue));
    } else {
      setSelectedDate(null);
    }
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
    nationalite: "",
    annee_scolaire: "",
    etablissement_frequente: "",
    moyenne_trimestre_1: "",
    moyenne_trimestre_2: "",
    moyenne_trimestre_3: "",
    moyenne_annuelle: "",
    moyenne_concours_6: "",
    numero_convocation_concours: "",
    bulletin_base64: "",
    bulletin_extension: "",
    photo_base64: "",
    photo_extension: "",
    copie_bulletin: "",
    photoProfil: "",
  };
  const [inscriptionData, setinscriptionData] = useState(inscriptionValue);

  const onChangeInscription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setinscriptionData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("photo_base64") as HTMLFormElement)
      .files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setinscriptionData({
        ...inscriptionData,
        photoProfil: profileImage,
        photo_base64: base64Data,
        photo_extension: extension,
      });
    }
  };

  const handleFileBulletin = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("bulletin_base64") as HTMLFormElement)
      .files[0];
    if (file) {
      const { base64Data, extension } = await convertToBase64(file);
      const profileImage = base64Data + "." + extension;
      setinscriptionData({
        ...inscriptionData,
        copie_bulletin: profileImage,
        bulletin_base64: base64Data,
        bulletin_extension: extension,
      });
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const onSubmitInscription = () => {
    inscriptionData["avec"] = vit_avec;
    inscriptionData["sexe"] = gender;
    inscriptionData["responsable_legal"] = responsable;
    inscriptionData["classe"] = selectedOption;
    inscriptionData["situation_familiale"] = selectedSituation;
    inscriptionData["date_naissance"] = formatDate(selectedDate);
    navigate("/recap", { state: { inscriptionData } });
  };

  const navigate = useNavigate();

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
            <Row>
              <h6 className="text-primary-emphasis">CHERS PARENTS,</h6>
              <p>
                Nous vous remercions de l’intérêt que vous portez au{" "}
                <strong>
                  <i>Sousse Leaders School</i>
                </strong>{" "}
                et nous informons que les inscriptions ont démarré, Si vous
                souhaitez inscrire votre enfant à la rentrée prochaine:
                <strong> 2024-2025</strong> merci de bien vouloir remplir le
                formulaire ci-dessous .
                {/* <p>
                  Pour cela, vous aurez à préparer quelques documents afin de
                  les intégrer au dossier numérique :
                  <ul>
                    <li>Un acte de naissance,</li>
                    <li>Une photo d’identité,</li>
                    <li>Une photo d’identité d’un des deux parents,</li>
                    <li>
                      si votre enfant est scolarisé : un acte de présence de
                      l’école et une copie des bulletins des deux dernières
                      années.
                    </li>
                  </ul>
                  Veuillez remplir ce formulaire et cliquez sur « envoyer ».
                </p> */}
              </p>
            </Row>
            {/* <Form onSubmit={onSubmitInscription}> */}

            {/* <Row className="mb-3">
              <Col lg={3}>
                <Form.Label htmlFor="classe">
                  NIVEAU DEMANDÉ <span className="text-danger">*</span>
                </Form.Label>
              </Col>
              <Row>
                <Col lg={3}>
                  <Form.Label htmlFor="classe">
                    NIVEAU DEMANDÉ <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={8}>
                  <select className="form-select" id="classe" name="classe">
                    <option value="">Choisir ...</option>

                    <option value="1ère">1ère</option>
                    <option value="2ème">2ème</option>
                    <option value="3ème">3ème</option>
                    <option value="4ème">4ème</option>
                  </select>
                </Col>
              </Row>
              <Row>
                <div className="d-flex justify-content-center">
                  <Col lg={3}>
                    <div className="form-check form-check-right mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="formRadio"
                        id="formRadio1"
                        value="1ère"
                        checked={selectedOption === "1ère"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="formRadio1">
                        1ère
                      </label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check form-check-right mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="formRadio"
                        id="formRadio2"
                        value="2ème"
                        checked={selectedOption === "2ème"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="formRadio2">
                        2ème
                      </label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check form-check-right mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="formRadio"
                        id="formRadio3"
                        value="3ème"
                        checked={selectedOption === "3ème"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="formRadio3">
                        3ème
                      </label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check form-check-right mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="formRadio"
                        id="formRadio3"
                        value="4ème"
                        checked={selectedOption === "4ème"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="formRadio3">
                        4ème
                      </label>
                    </div>
                  </Col>
                </div>
                <p>Selected Option: {selectedOption}</p>
              </Row>
            </Row> */}
            <Card.Header>
              <h6 className="mb-3 bg-warning-subtle text-primary">
                NIVEAU DEMANDÉ
              </h6>
              <Row>
                <div className="d-flex justify-content-center">
                  {/* 1ère */}
                  <Col lg={3}>
                    <div>
                      <label
                        className="form-check-label me-2"
                        htmlFor="formRadio1"
                      >
                        1ère
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="formRadio"
                        id="formRadio1"
                        value="1ère"
                        checked={selectedOption === "1ère"}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  {/* 2ème */}
                  <Col lg={3}>
                    <div>
                      <label
                        className="form-check-label me-2"
                        htmlFor="formRadio2"
                      >
                        2ème
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="formRadio"
                        id="formRadio2"
                        value="2ème"
                        checked={selectedOption === "2ème"}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  {/* 3ème */}
                  <Col lg={3}>
                    <div className="d-flex align-items-center">
                      <label
                        className="form-check-label me-2"
                        htmlFor="formRadio3"
                      >
                        3ème
                      </label>
                      <div className="d-flex flex-column">
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="formRadio"
                            id="formRadioMaths"
                            value="3ème Maths"
                            checked={selectedOption === "3ème Maths"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formRadioMaths"
                          >
                            Maths
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="formRadio"
                            id="formRadioScience"
                            value="3ème Science"
                            checked={selectedOption === "3ème Science"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formRadioScience"
                          >
                            Science
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="formRadio"
                            id="formRadioTechnique"
                            value="3ème Technique"
                            checked={selectedOption === "3ème Technique"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formRadioTechnique"
                          >
                            Technique
                          </label>
                        </div>
                      </div>
                    </div>
                  </Col>
                  {/* 4ème */}
                  <Col lg={3}>
                    <div className="d-flex align-items-center">
                      <label
                        className="form-check-label me-2"
                        htmlFor="formRadio4"
                      >
                        4ème
                      </label>
                      <div className="d-flex flex-column">
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="formRadio"
                            id="formRadio4Maths"
                            value="4ème Maths"
                            checked={selectedOption === "4ème Maths"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formRadio4Maths"
                          >
                            Maths
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="formRadio"
                            id="formRadio4Science"
                            value="4ème Science"
                            checked={selectedOption === "4ème Science"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formRadio4Science"
                          >
                            Science
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="formRadio"
                            id="formRadio4Technique"
                            value="4ème Technique"
                            checked={selectedOption === "4ème Technique"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formRadio4Technique"
                          >
                            Technique
                          </label>
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </Row>
            </Card.Header>
            <Card.Header>
              <h6 className="mb-3 bg-warning-subtle text-primary">
                RENSEIGNEMENTS CONCERNANT L’ÉLÈVE
              </h6>
              <Row>
                <Col lg={9}>
                  <Row className="mb-3">
                    <Col lg={4}>
                      <Form.Label htmlFor="nom_eleve">
                        Nom de Famille <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col lg={7}>
                      <input
                        id="nom_eleve"
                        name="nom_eleve"
                        type="text"
                        className="form-control"
                        onChange={onChangeInscription}
                        value={inscriptionData.nom_eleve}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={4}>
                      <Form.Label htmlFor="prenom_eleve">
                        Prénom <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col lg={7}>
                      <input
                        id="prenom_eleve"
                        name="prenom_eleve"
                        type="text"
                        className="form-control"
                        onChange={onChangeInscription}
                        value={inscriptionData.prenom_eleve}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={4}>
                      <Form.Label htmlFor="date_naissance">
                        Date et Lieu de Naissance{" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col lg={3}>
                      <input
                        id="date_naissance"
                        name="date_naissance"
                        placeholder="Entrer Date de Naissance"
                        type="date"
                        className="form-control flatpickr-input"
                        onChange={handleDateChange}
                      />
                    </Col>
                    <Col lg={4}>
                      <input
                        id="lieu_naissance"
                        name="lieu_naissance"
                        placeholder="Entrer Lieu de Naissance"
                        type="text"
                        className="form-control"
                        onChange={onChangeInscription}
                        value={inscriptionData.lieu_naissance}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={4}>
                      <Form.Label htmlFor="sexe">
                        Sexe <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col lg={2}>
                      <Form.Check
                        type="radio"
                        id="sexe-m"
                        name="sexe"
                        label="M"
                        feedback="invalid."
                        value="M"
                        onChange={handleGenderChange}
                      />
                    </Col>
                    <Col lg={3}>
                      <Form.Check
                        type="radio"
                        id="sexe-f"
                        name="sexe"
                        label="F"
                        feedback="invalid."
                        value="F"
                        onChange={handleGenderChange}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={3}>
                  {inscriptionData.photo_base64 !== "" ? (
                    <Image
                      src={`data:image/jpeg;base64, ${inscriptionData.photo_base64}`}
                      alt={inscriptionData.prenom_eleve}
                      id="photo_base64"
                      className="img-thumbnail mb-2"
                      width={205}
                      height={120}
                    />
                  ) : (
                    <div>
                      <div>
                        <input
                          type="file"
                          name="photo_base64"
                          id="photo_base64"
                          accept="image/*"
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                        <label htmlFor="photo_base64">
                          <Button variant="outline-primary" as="span">
                            <i className="ri-image-line"></i> Choose Photo
                          </Button>
                        </label>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="nationalite">
                    Nationalité <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={8}>
                  <input
                    id="nationalite"
                    name="nationalite"
                    type="text"
                    className="form-control"
                    onChange={onChangeInscription}
                    value={inscriptionData.nationalite}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg={3}>
                  <Form.Label htmlFor="adresse_eleve">
                    Adresse <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={8}>
                  <textarea
                    id="adresse_eleve"
                    name="adresse_eleve"
                    rows={3}
                    className="form-control"
                    onChange={onChangeInscription}
                    value={inscriptionData.adresse_eleve}
                  />
                </Col>
              </Row>
              <Row>
                <small>
                  {" "}
                  En cas de changement d’adresse, il est impératif de prévenir
                  l’établissement.
                </small>
              </Row>
            </Card.Header>
            <Card.Header>
              <h6 className="mb-3 bg-warning-subtle text-primary">
                SITUATION FAMILIALE
              </h6>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="situation_familiale">
                    Parents <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={8}>
                  <select
                    className="form-select"
                    id="situation_familiale"
                    name="situation_familiale"
                    onChange={handleSelectSituation}
                  >
                    <option value="">Choisir ...</option>
                    <option value="Mariés">Mariés</option>
                    <option value="Séparés">Séparés</option>
                    <option value="Divorcés">Divorcés</option>
                  </select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="avec">
                    L’enfant vit avec <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={2}>
                  <Form.Check
                    type="radio"
                    id="avec-p"
                    name="avec"
                    label="Ses parents"
                    feedback="invalid."
                    value="Ses parents"
                    onChange={handleVitAvecChange}
                  />
                </Col>
                <Col lg={2}>
                  <Form.Check
                    type="radio"
                    id="avec-p"
                    name="avec"
                    label="Son père"
                    feedback="invalid."
                    value="Son père"
                    onChange={handleVitAvecChange}
                  />
                </Col>
                <Col lg={3}>
                  <Form.Check
                    type="radio"
                    id="avec-m"
                    name="avec"
                    label="Sa mère"
                    feedback="invalid."
                    value="Sa mère"
                    onChange={handleVitAvecChange}
                  />
                </Col>
              </Row>
            </Card.Header>
            <Card.Header>
              <h6 className="mb-3 bg-warning-subtle text-primary">
                SCOLARITE ANTERIEURE
              </h6>
              <Row className="mb-3">
                <table className="table-bordered">
                  <thead>
                    <td>Année Scolaire</td>
                    <td>Etablissement Fréquenté</td>
                    <td>Moyenne 1 er trimèstre</td>
                    <td>Moyenne 2 ème trimèstre</td>
                    <td>Moyenne 3 ème trimèstre</td>
                    <td>Moyenne Annuelle</td>
                  </thead>
                  <tbody>
                    <td>
                      <input
                        id="annee_scolaire"
                        name="annee_scolaire"
                        type="text"
                        className="form-control"
                        onChange={onChangeInscription}
                        value={inscriptionData.annee_scolaire}
                      />
                    </td>
                    <td>
                      <textarea
                        id="etablissement_frequente"
                        name="etablissement_frequente"
                        rows={2}
                        className="form-control mt-2 mb-2"
                        onChange={onChangeInscription}
                        value={inscriptionData.etablissement_frequente}
                      />
                    </td>
                    <td>
                      <input
                        id="moyenne_trimestre_1"
                        name="moyenne_trimestre_1"
                        type="text"
                        className="form-control"
                        onChange={onChangeInscription}
                        value={inscriptionData.moyenne_trimestre_1}
                      />
                    </td>
                    <td>
                      <input
                        id="moyenne_trimestre_2"
                        name="moyenne_trimestre_2"
                        type="text"
                        className="form-control"
                        onChange={onChangeInscription}
                        value={inscriptionData.moyenne_trimestre_2}
                      />
                    </td>
                    <td>
                      <input
                        id="moyenne_trimestre_3"
                        name="moyenne_trimestre_3"
                        type="text"
                        className="form-control"
                        onChange={onChangeInscription}
                        value={inscriptionData.moyenne_trimestre_3}
                      />
                    </td>
                    <td>
                      <input
                        id="moyenne_annuelle"
                        name="moyenne_annuelle"
                        type="text"
                        className="form-control"
                        onChange={onChangeInscription}
                        value={inscriptionData.moyenne_annuelle}
                      />
                    </td>
                  </tbody>
                </table>
              </Row>
            </Card.Header>
            <Card.Header>
              <h6 className="mb-3 bg-warning-subtle text-primary">CONCOURS</h6>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="numero_convocation_concours">
                    N° Convocation Concours{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={3}>
                  <input
                    id="numero_convocation_concours"
                    name="numero_convocation_concours"
                    type="text"
                    className="form-control"
                    onChange={onChangeInscription}
                    value={inscriptionData.numero_convocation_concours}
                  />
                </Col>
                {selectedOption === "7 ème" ? (
                  <Col lg={2}>
                    <Form.Label htmlFor="bulletin_base64">
                      Copie Carnet <span className="text-danger">*</span>
                    </Form.Label>
                  </Col>
                ) : (
                  <Col lg={2}>
                    <Form.Label htmlFor="bulletin_base64">
                      Bulletin Annuel <span className="text-danger">*</span>
                    </Form.Label>
                  </Col>
                )}
                <Col lg={3}>
                  <input
                    id="bulletin_base64"
                    name="bulletin_base64"
                    type="file"
                    className="form-control"
                    onChange={handleFileBulletin}
                  />
                </Col>
              </Row>
            </Card.Header>
            <Card.Header>
              <h6 className="mb-3 bg-warning-subtle text-primary">
                RENSEIGNEMENTS PARENTS
              </h6>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="responsable_legal">
                    Responsable Légal <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={2}>
                  <Form.Check
                    type="radio"
                    id="responsable_legal-p"
                    name="responsable_legal"
                    label="Père"
                    feedback="invalid."
                    value="Père"
                    onChange={handleResponsableChange}
                  />
                </Col>
                <Col lg={3}>
                  <Form.Check
                    type="radio"
                    id="responsable_legal-m"
                    name="responsable_legal"
                    label="Mère"
                    feedback="invalid."
                    value="Mère"
                    onChange={handleResponsableChange}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="nom_parent">
                    Nom de Famille <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={8}>
                  <input
                    id="nom_parent"
                    name="nom_parent"
                    type="text"
                    className="form-control"
                    onChange={onChangeInscription}
                    value={inscriptionData.nom_parent}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="prenom_parent">
                    Prénom <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={8}>
                  <input
                    id="prenom_parent"
                    name="prenom_parent"
                    type="text"
                    className="form-control"
                    onChange={onChangeInscription}
                    value={inscriptionData.prenom_parent}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg={3}>
                  <Form.Label htmlFor="adresse_parent">
                    Adresse <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={8}>
                  <textarea
                    id="adresse_parent"
                    name="adresse_parent"
                    rows={3}
                    className="form-control"
                    onChange={onChangeInscription}
                    value={inscriptionData.adresse_parent}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="profession">Profession</Form.Label>
                </Col>
                <Col lg={8}>
                  <input
                    id="profession"
                    name="profession"
                    type="text"
                    className="form-control"
                    onChange={onChangeInscription}
                    value={inscriptionData.profession}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="nom_societe">
                    Nom de la Société
                  </Form.Label>
                </Col>
                <Col lg={8}>
                  <input
                    id="nom_societe"
                    name="nom_societe"
                    type="text"
                    className="form-control"
                    onChange={onChangeInscription}
                    value={inscriptionData.nom_societe}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={3}>
                  <Form.Label htmlFor="phone">
                    N° Téléphone <span className="text-danger">*</span>
                  </Form.Label>
                </Col>
                <Col lg={8}>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="form-control"
                    onChange={onChangeInscription}
                    value={inscriptionData.phone}
                  />
                </Col>
              </Row>
              <Row>
                <small>
                  En cas de changement d’adresse, de téléphone, il est impératif
                  de prévenir l’établissement.
                </small>
              </Row>
            </Card.Header>
            <Row className="mt-2">
              <Col lg={12}>
                <div className="text-center">
                  <Button
                    style={{
                      backgroundColor: "#317AC1",
                      borderColor: "#317AC1",
                    }}
                    onClick={onSubmitInscription}
                  >
                    Envoyer
                  </Button>
                </div>
              </Col>
            </Row>
            {/* </Form> */}
          </Card.Body>
        </Card>
      </Row>
    </React.Fragment>
  );
};

export default InscriptionLycee;
