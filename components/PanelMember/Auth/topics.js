import { API } from "../../config";

export const getTopics = async (state) => {
    try {
        const response = await fetch(`${ API }/panelmember/topics/${ state }`, {
            method : "GET",
            headers : {
                authorization : window.sessionStorage.getItem("panelMemberToken")
            }
        });

        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};

export const getTopic = async (id) => {
    try {
        const response = await fetch(`${ API }/panelmember/topic/${ id }`, {
            method : "GET",
            headers : {
                authorization : window.sessionStorage.getItem("panelMemberToken")
            }
        });

        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};

export const evaluateTopic = async (id, evaluation) => {
    try {
        evaluation = JSON.stringify(evaluation);
        const response = await fetch(`${ API }/panelmember/topic/${ id }`, {
            method : "PUT",
            headers : {
                authorization : window.sessionStorage.getItem("panelMemberToken")
            },
            body : evaluation
        });

        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};