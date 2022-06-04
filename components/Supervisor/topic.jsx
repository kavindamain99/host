import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTopic, updateState } from "./Auth/topics";
import MainNavBar from "./Core/mainNavBar";
import Footer from "./Core/footer";
import Swal from 'sweetalert2'

export const SupervisorTopic = () => {
    const { id } = useParams();

    const [topic, setTopic] = useState({});
    const [error, setError] = useState(false);

    const loadTopic = async () => {
        try {
            const topic = await getTopic(id)
            if(topic.error) {
                if(topic.message) {
                    setError(topic.message);
                }
                else {
                    setError(topic.error);
                }
            }
            else {
                setTopic(topic);
            }
        }
        catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadTopic();
    }, []);

    const updateTopicState = (state) => {
        setError(false);
        const textState = state.charAt(0).toUpperCase() + state.substring(0, 6).slice(1)
        Swal.fire({
            title : "Confirm " + textState,
            icon : "warning",
            showCancelButton : true,
            confirmButtonText : textState,
            confirmButtonColor : "#df4759"
        }).then(result => {
            if(result.isConfirmed) {
                updateState(id, state).then(topic => {
                    if(topic.error) {
                        if(topic.message) {
                            setError(topic.message);
                        }
                        else {
                            setError(topic.error);
                        }
                    }
                    else {
                        Swal.fire(
                            textState + "ed",
                            'Topic ' + textState + "ed",
                            'success'
                        );
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    };

    const showError = () => error && (
        <div className="alert alert-danger" role="alert" style={{ "height" : "40px", "line-height" : "40px", "padding" : "0px 15px" }}>
            { error }
        </div>
    );

    const dynamicSupervisor = () => {
        if(topic.state && topic.state === "accepted") {
            return(
                <div>
                    <h5>Accepted by,</h5>
                    <p>{ topic.supervisorName }</p>
                    <p>{ topic.supervisorId }</p>
                    <p>{ topic.role }</p>
                </div>
            );
        }

        if(topic.state && topic.state === "rejected") {
            return(
                <div>
                    <h5>Rejected by,</h5>
                    <p>{ topic.supervisorName }</p>
                    <p>{ topic.supervisorId }</p>
                    <p>{ topic.role }</p>
                </div>
            );
        }
    };

    const dynamicPanelMember = () => {
        if(topic.evaluated === true) {
            return(
                <div>
                    <h5>Evaluated by,</h5>
                    <p>{ topic.panelMemberName }</p>
                    <p>{ topic.panelMemberId }</p>
                </div>
            );
        }
    };

    const dynamic = () => {
        if(topic.state && topic.state === "pending") {
            return(
                <div className="d-grid gap-2">
                    <button className="btn btn-dark" onClick={ () => { updateTopicState("accepted") } }>Accept</button>
                    <button className="btn btn-danger" onClick={ () => { updateTopicState("rejected") } }>Reject</button>
                </div>
            );
        }

        if(topic.state && topic.state === "accepted"  && topic.evaluated === false) {
            return(
                <div className="d-grid gap-2">
                    <button className="btn btn-danger" onClick={ () => { updateTopicState("rejected") } }>Reject</button>
                </div>
            );
        }
        if(topic.state && topic.state === "rejected") {
            return(
                <div className="d-grid gap-2">
                    <button className="btn btn-dark" onClick={ () => { updateTopicState("accepted") } }>Accept</button>
                </div>
            );
        }
    }

    const viewTopic = () => !error && (
        <div>
            { MainNavBar() }
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-lg card-registration" style={{ "borderRadius" : "15px" }}>
                                <div className="card-body p-4 p-md-5">
                                    <h3 style={{ "textAlign" : "center" }}>{ topic.topic }</h3>
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-6">
                                        <h5>Group ID</h5>
                                            <p>{ topic.groupId }</p>
                                            <h5>Field</h5>
                                            <p>{ topic.field }</p>
                                        </div>
                                        <div className="col-sm-3">
                                            { dynamicSupervisor() }
                                        </div>
                                        <div className="col-sm-3">
                                            { dynamicPanelMember() }
                                        </div>
                                        <h5>Description</h5>
                                        <p>{ topic.description }</p>
                                        <br />
                                        { dynamic() }
                                    </div>                           
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            { Footer() }
        </div>
    );

    return(
        <div>
            { showError() }
            { viewTopic() }
        </div>
    );
};

export default SupervisorTopic;