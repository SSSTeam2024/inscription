import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Image, Row } from "react-bootstrap";
import logolight from "assets/images/sls-logo2.png";
import "./home.scss";
const Home = () => {
  let college = "College";
  let lycee = "Lycee";
  return (
    <Card className="m-4 p-4">
      <Card.Header className="bg-white">
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
          <Col lg={8}>
            <div className="mt-4">
              <h2 className="text-center text-primary-emphasis fw-bold">
                <i>Sousse Leaders School Collège et Lycée Privés</i>
              </h2>
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <div className="container">
            <Link
              to="/inscription"
              className="custom-link"
              state={college}
              style={{ textDecoration: "none" }}
            >
              <div className="main-box box3">
                <div className="card3">
                  <div className="card-main">
                    <div className="logo">
                      <span className="circle circle1"></span>
                      <span className="circle circle2"></span>
                      <span className="circle circle3"></span>
                      <span className="circle circle4"></span>
                      <span className="circle circle5">
                        <svg
                          className="svg"
                          viewBox="0 0 200 200"
                          fill="black"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="50"
                            y="80"
                            width="100"
                            height="20"
                            fill="#8B4513"
                            stroke="black"
                            stroke-width="2"
                          />

                          <rect
                            x="50"
                            y="40"
                            width="100"
                            height="40"
                            fill="#8B4513"
                            stroke="black"
                            stroke-width="2"
                          />

                          <rect
                            x="50"
                            y="100"
                            width="10"
                            height="60"
                            fill="#8B4513"
                            stroke="black"
                            stroke-width="2"
                          />
                          <rect
                            x="140"
                            y="100"
                            width="10"
                            height="60"
                            fill="#8B4513"
                            stroke="black"
                            stroke-width="2"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="glass"></div>
                    <div className="content">
                      <span className="title">Collège</span>
                      <br />
                      <span className="text-black-50">
                        <span className="fw-bold">Inscription des élèves:</span>
                        <br />
                        De la septième à la neuvième année.
                      </span>
                    </div>
                    <div className="bottom">
                      <div className="social-buttons-container"></div>
                      <div className="view-more"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link
              to="/inscription"
              className="custom-link"
              state={lycee}
              style={{ textDecoration: "none" }}
            >
              <div className="main-box box3">
                <div className="card3">
                  <div className="card-main">
                    <div className="logo">
                      <span className="circle circle1"></span>
                      <span className="circle circle2"></span>
                      <span className="circle circle3"></span>
                      <span className="circle circle4"></span>
                      <span className="circle circle5">
                        <svg
                          className="svg"
                          viewBox="0 0 200 200"
                          fill="yellow"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon
                            points="100,20 120,80 180,80 130,120 150,180 100,140 50,180 70,120 20,80 80,80"
                            fill="gold"
                            stroke="orange"
                            stroke-width="3"
                          />

                          <polygon
                            points="100,30 115,75 165,85 125,115 135,160 100,130 65,160 75,115 35,85 85,75"
                            fill="yellow"
                            stroke="gold"
                            stroke-width="2"
                            opacity="0.7"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="glass"></div>
                    <div className="content">
                      <span className="title">Lycée</span>
                      <br />
                      <span className="text-black-50">
                        <span className="fw-bold">Inscription des élèves:</span>{" "}
                        <br />
                        De la première à la quatrième année du secondaire
                      </span>
                    </div>
                    <div className="bottom">
                      <div className="social-buttons-container"></div>
                      <div className="view-more"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </Row>
      </Card.Body>
      <footer className="text-center mt-4">
        <p></p>
      </footer>
    </Card>
  );
};

export default Home;
