import { API } from "../../config";

export const getDocuments = async () => {
    try {
        const response = await fetch(`${ API }/panelmember/documents`, {
            method : "GET",
            headers : {
                authorization : window.sessionStorage.getItem("panelMemberToken")
            }
        });
        console.log(response);
        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};