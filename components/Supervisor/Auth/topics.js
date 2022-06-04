import { API } from "../../config";

export const getTopics = async (state) => {
    try {
        const response = await fetch(`${ API }/supervisor/topics/${ state }`, {
            method : "GET",
            headers : {
                authorization : window.sessionStorage.getItem("supervisorToken")
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
        const response = await fetch(`${ API }/supervisor/topic/${ id }`, {
            method : "GET",
            headers : {
                authorization : window.sessionStorage.getItem("supervisorToken")
            }
        });

        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};

export const updateState = async (id, state) => {
    try {
        const response = await fetch(`${ API }/supervisor/topic/${ id }/${ state }`, {
            method : "PUT",
            headers : {
                authorization : window.sessionStorage.getItem("supervisorToken")
            }
        });

        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};