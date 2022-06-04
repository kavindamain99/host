import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <>
      <section class="contact-area" id="contact">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3">
              <div class="contact-content text-center">
                <div class="contact-social">
                  <ul>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <p>Copyright &copy; 2022 All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Footer;
