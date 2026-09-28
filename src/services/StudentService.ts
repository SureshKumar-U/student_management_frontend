const BASEAPI_URL = 'http://localhost:5180/api/v1'


export const getStudentByIdApi = async (token: string,userId:number): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/students/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        }
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
    }

    return await response.json();


}



