import React, { useState } from "react";
import { signIn } from "./Auth/registration";
import NavBar from "./Core/navBar";

export const PanelMemberSignIn = () => {
    const [user, setUser] = useState({
        email : '',
        password : '',
    });

    const [error, setError] = useState(false);

    const {
        email,
        password,
    } = user;

    const handleChange = name => event => {
        const value = event.target.value;
        setUser({...user, [name] : value});
    };

    const panelMemberSignIn = event => {
        setError(false);
        event.preventDefault();
        signIn(user).then(data => {
            if(data.error) {
                setUser({...user, password : ''});
                if(data.message) {
                    setError(data.message);
                }
                else {
                    setError(data.error);
                }
            }
            else {
                window.sessionStorage.setItem("panelMemberToken", data.token);
                window.location.href = '/panelmember/documents';
            }
        }).catch(error => {
            console.log(error);
        });
    };

    const signInForm = () => (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ "borderRadius" : "15px" }}>
                            <div className="card-body p-4 p-md-5">
                                { showError() }
                                <h2 className="mb-4 pb-2 pb-md-0 mb-md-5" style={{ "textAlign" : "center" }}>Panel Member Sign In</h2>
                                <form className="row g-3 needs-validation" noValidate onSubmit={ panelMemberSignIn } >
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" onChange={ handleChange("email") } value={ email } required/>
                                        <div className="invalid-feedback">
                                            Please provide an email
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" onChange={ handleChange("password") } value={ password } required/>
                                        <div className="invalid-feedback">
                                            Please provide a password
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-dark" type="submit">Sign In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    (function () {
        'use strict'

        var forms = document.querySelectorAll('.needs-validation')

        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }
      
              form.classList.add('was-validated')
            }, false)
          })
    })();

    const showError = () => error && (
        <div className="alert alert-danger" role="alert" style={{ "height" : "40px", "line-height" : "40px", "padding" : "0px 15px" }}>
            { error }
        </div>
    );

    return(
        <div>
            { NavBar() }
            { signInForm() }
        </div>
    );
};

export default PanelMemberSignIn;