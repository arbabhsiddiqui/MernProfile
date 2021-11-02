import React from "react";

import "./Footer.styles.scss";

const Footer = () => {
  return (
    <footer id="footer" className="footer-area mt-5">
      <div className="container">
        <div className="pt-5 mt-5">
          <div className="social text-center">
            <h5 className="text-uppercase text-light">Connect me on</h5>
            <a href="https://github.com/arbabhsiddiqui">
              <i className=" fab fa-github"></i>
            </a>
            <a href="https://codepen.io/ArbabHussain?__cf_chl_jschl_tk__=dd27b23af80259c25d2564f1eeb12d8f999b9372-1599065768-0-AX5RuhlehGdWRhTiCd0nyNWEU5TWVYuMdQlXne0irGraMJkroIlIb-JUcEFWJpO9uiLBPsXLOi9urg_kvFXyxQ7BgE-guU-K16gDuFid2O3zjnVHpSAj3E2tfnI6XBqrYmUkI322pa0gO4gmABSZAbWZmbZDK9cv9ZF1MLWOGl1-lMoOEpbv6Tuw8KZTq2REQck0d-kX4FsF1dBFRsJsVDTRZUcWiKXh3E4nx4cPNrtKqpiCzPohZ0A8bH_zvKyWHe-IAs3mg12_j6zyMIXB5nT7rNYHgQrltvg_aXjj4NZ7zLCi7BOiYj8nQwFTlBWE9-smbGT1O1OkpokPDVKiu1VD0Quc1hcmwgFeUnn3Ya08">
              <i className=" fab fa-codepen"></i>
            </a>
            <a href="https://www.instagram.com/arbabh.siddiqui/">
              <i className=" fab fa-instagram"></i>
            </a>
            <a href="mailto:arbabh411@gmail.com">
              <i className=" fab fa-google"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
