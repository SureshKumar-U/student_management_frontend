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
export const getStudentApi = async (token: string,studentId:string): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/students/student/${studentId}`, {
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




export const UpdateStudentApi = async (token: string,data:any, studentId:string): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/students/${studentId}`, {
        method: "PUT",
        body: JSON.stringify(data),
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


export const addCourseToStudentApi = async (token: string, data:any): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/student_enrollment`, {
        method: "POST",
        body: JSON.stringify(data),
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


export const getAllMyCoursesApi = async (token: string, userId:number): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/students/courses/${userId}`, {
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

export const getAllCoursesApi = async (token: string): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/courses`, {
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









