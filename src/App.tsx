import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Recap from "pages/Recap";
import { InscriptionProvider } from "pages/InscriptionContext/InscriptionContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "pages/Home";
import Inscriptions from "pages/Inscription";

const App = () => {
  return (
    <InscriptionProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Inscriptions />} />
        <Route path="/recap" element={<Recap />} />
      </Routes>
    </InscriptionProvider>
  );
};

export default App;
