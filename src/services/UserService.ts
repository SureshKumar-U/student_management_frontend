import type { ILogin, ISignUp, } from "../Types";

const BASEAPI_URL = 'http://localhost:5180/api/v1'

export const LoginApi = async (data: ILogin):Promise<any>  => {
    const response = await fetch(`${BASEAPI_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"

        }
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
    }

    return await response.json();
}

export const SignUpApi = async (data: ISignUp):Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"

        }
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
    }
    return await response.json();


}

export const GetAllUsers = async ():Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/auth/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"

        }
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
    }

    return await response.json();


}

export const DeleteUserApi = async():Promise<any> =>{
    
}



