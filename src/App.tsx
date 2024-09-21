import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Recap from "pages/Recap";
import { InscriptionProvider } from "pages/InscriptionContext/InscriptionContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "pages/Home";
import Inscriptions from "pages/Inscription";
import IndexPage from "pages/IndexPage";

const App = () => {
  return (
    <InscriptionProvider>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/" />} /> */}
        <Route path="/inscription" element={<Home />} />
        <Route path="/" element={<IndexPage />} />
        <Route path="/inscriptionCollège" element={<Inscriptions />} />
        <Route path="/inscriptionLycée" element={<Inscriptions />} />
        <Route path="/recap" element={<Recap />} />
      </Routes>
    </InscriptionProvider>
  );
};

export default App;
