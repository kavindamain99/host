import { API } from "../../config";

export const signUp = async (user) => {
    try {
        user = JSON.stringify(user);

        const response = await fetch(`${ API }/supervisor/signup`, {
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

export const signIn = async (user) => {
    try {
        user = JSON.stringify(user);

        const response = await fetch(`${ API }/supervisor/signin`, {
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