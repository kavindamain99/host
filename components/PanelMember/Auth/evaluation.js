import { API } from "../../config";

export const getPresentations = async () => {
    try {
        const response = await fetch(`${ API }/panelmember/student/presentations`, {
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

export const getPresentation = async (id) => {
    try {
        const response = await fetch(`${ API }/panelmember/student/presentation/${ id }`, {
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

export const getGroup = async (id) => {
    try {
        const response = await fetch(`${ API }/panelmember/student/group/${ id }`, {
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

export const evaluate = async (id, marks) => {
    console.log(marks)
    try {
        const response = await fetch(`${ API }/panelmember/evaluation/${ id }`, {
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                authorization : window.sessionStorage.getItem("panelMemberToken")
            },
            body : JSON.stringify(marks)
        });

        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};

export const updatePresentationState = async(id) => {
    try {
        const response = await fetch(`${ API }/panelmember/student/presentaton/${ id }`, {
            method : "PUT",
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

