import { API } from "../../config";

export const getDocuments = async (type) => {
    try {
        const response = await fetch(`${ API }/supervisor/student/documents/${ type }`, {
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

export const getDocument = async (id) => {
    try {
        const response = await fetch(`${ API }/supervisor/student/document/${ id }`, {
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

export const getGroup = async (id) => {
    try {
        const response = await fetch(`${ API }/supervisor/student/group/${ id }`, {
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

export const evaluateDocument = async (id, marks) => {
    try {
        const response = await fetch(`${ API }/supervisor/evaluation/document/${ id }`, {
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                authorization : window.sessionStorage.getItem("supervisorToken")
            },
            body : JSON.stringify(marks)
        });

        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};

export const evaluateFinalThesis = async (id, marks) => {
    try {
        const response = await fetch(`${ API }/supervisor/evaluation/finalthesis/${ id }`, {
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                authorization : window.sessionStorage.getItem("supervisorToken")
            },
            body : JSON.stringify(marks),
        });

        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};

export const updateDocumentState = async(id) => {
    try {
        const response = await fetch(`${ API }/supervisor/student/document/${ id }`, {
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