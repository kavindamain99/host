import { API } from "../../config";

export const signUp = async (user) => {
    try {
        user = JSON.stringify(user);
        const response = await fetch(`${ API }/panelmember/signup`, {
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            body : user
        });
        return await response.json();

        /* if(result.error) {
            return result;
        } */
    }
    catch(error) {
        console.log(error);
    }
};

export const signIn = async (user) => {
    try {
        user = JSON.stringify(user);

        const response = await fetch(`${ API }/panelmember/signin`, {
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            body : user
        });

        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
};