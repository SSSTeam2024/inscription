import React, { useEffect, useState } from "react";
import logolight from "assets/images/sls-logo2.png";
import mocukup from "assets/img/unnamed.webp";
import "./style.css";
import { Button } from "react-bootstrap";
import { useFetchFileQuery } from "features/file/fileSlice";
const IndexPage: React.FC = () => {
  document.title = "Accueil | Sousse Leaders School";
  const { data: fileBlob, isSuccess } = useFetchFileQuery();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  useEffect(() => {
    if (isSuccess && fileBlob) {
      const url = URL.createObjectURL(fileBlob);
      setDownloadUrl(url); // Store the download URL
    }
  }, [fileBlob, isSuccess]);
  const tog_Ios = () => {
    const link = document.createElement("a");
    link.href = "https://apps.apple.com/app/sls-sousse/id6692633299";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const tog_Android = () => {
    const link = document.createElement("a");
    link.href = "https://play.google.com/store/apps/details?id=tn.sls.school";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const tog_Apk = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "sls.apk"; // The file name for the download
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <>
      <header className="menu-bg">
        <div className="menu">
          <div>
            <img src={logolight} alt="Mobile App logo" className="w-50" />
          </div>
          <nav className="menu-nav">
            <ul>
              <li>
                <a href="#">Accueil</a>
              </li>
              <li>
                <a href="/inscription">Inscription</a>
              </li>
            </ul>
          </nav>
        </div>

        <section className="intro-bg">
          <div className="intro">
            <div>
              <h1>
                Sousse Leaders <br />
                <span>School</span>
              </h1>
              <p>
                Etablissement d'enseignement secondaire privé situé à Sousse.
              </p>
              <div className="hstack gap-3">
                <Button
                  variant="outline-primary rounded-pill btn-lg"
                  onClick={tog_Ios}
                >
                  <i className="ri-apple-fill"></i>App Store
                </Button>
                <Button
                  variant="outline-primary rounded-pill btn-lg"
                  onClick={tog_Android}
                >
                  <i className="ri-google-play-line"></i>Play Store
                </Button>
                <Button
                  variant="outline-primary rounded-pill btn-lg"
                  onClick={tog_Apk}
                  disabled={!downloadUrl} // Disable the button if downloadUrl is not available
                >
                  <i className="ri-android-fill"></i> Apk
                </Button>
              </div>
            </div>
            <div className="intro-img">
              <img src={mocukup} alt="" />
            </div>
          </div>
        </section>
      </header>
    </>
  );
};
export default IndexPage;
