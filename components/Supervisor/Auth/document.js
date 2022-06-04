import { API } from "../../config";

export const getDocuments = async () => {
    try {
        const response = await fetch(`${ API }/supervisor/documents`, {
            method : "GET",
            headers : {
                authorization : window.sessionStorage.getItem("supervisorToken")
            }
        });
        console.log(response);
        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};