import React, { useState } from "react";
import { signUp } from "./Auth/registration";
import NavBar from "./Core/navBar";

export const PanelMemberSignUp = () => {
    const [user, setUser] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        confirmPassword : '',
        degree : '',
        contactNumber : '',
    });

    const [error, setError] = useState(false);

    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        degree,
        contactNumber,
    } = user;

    const handleChange = name => event => {
        const value = event.target.value;
        setUser({...user, [name] : value});
    };

    const panelMemberSignUp = event => {
        setError(false);
        event.preventDefault();
        signUp(user).then(data => {
            if(data.error) {
                if(data.message) {
                    setError(data.message);
                }
                else {
                    setError(data.error);
                }
            }
            else {
                window.location.href = '/panelmember/signin'
            }
        }).catch(error => {
            console.log(error);
        });
    };

    const signUpForm = () => (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ "borderRadius" : "15px" }}>
                            <div className="card-body p-4 p-md-5">
                                <form className="row g-3 needs-validation" noValidate onSubmit={ panelMemberSignUp } >
                                    <h2 className="mb-4 pb-2 pb-md-0 mb-2" style={{ "textAlign" : "center" }}>Panel Member Sign Up</h2>
                                    { showError() }
                                    <div className="col-md-6">
                                        <label htmlFor="first-name" className="form-label">First name</label>
                                        <input type="text" className="form-control" id="first-name" onChange={ handleChange("firstName") } value={ firstName } required/>
                                        <div className="invalid-feedback">
                                            Please provide a first name
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="last-name" className="form-label">Last name</label>
                                        <input type="text" className="form-control" id="last-name" onChange={ handleChange("lastName") } value={ lastName } required/>
                                        <div className="invalid-feedback">
                                            Please provide a last name
                                        </div>
                                    </div>
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
                                    <div className="col-md-6">
                                        <label htmlFor="re-password" className="form-label">Confirm password</label>
                                        <input type="password" className="form-control" id="re-password" onChange={ handleChange("confirmPassword") } value={ confirmPassword } required/>
                                        <div className="invalid-feedback">
                                            Please provide a password
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="degree" className="form-label">Faculty</label>
                                        <select id="degree" className="form-select" onChange={ handleChange("degree") } required>
                                            <option selected disabled value="none">Choose...</option>
                                            <option value="computing">Faculty of Computing</option>
                                            <option value="engineering">Faculty of Engineering</option>
                                            <option value="business">Faculty of Business</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="contact-number" className="form-label">Contact number</label>
                                        <input type="tel" className="form-control" id="contact-number" onChange={ handleChange("contactNumber") } value={ contactNumber } required/>
                                        <div className="invalid-feedback" id="contact-number">
                                            Please provide a contact number
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-dark" type="submit">Sign Up</button>
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
            { signUpForm() }
        </div>
    );
};

export default PanelMemberSignUp;