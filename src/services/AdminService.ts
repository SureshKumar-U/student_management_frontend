const BASEAPI_URL = 'http://localhost:5180/api/v1'

export const GetAllCoursesApi = async (token: string): Promise<any> => {
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


export const getAllStudents = async (token: string): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/students`, {
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



export const getDepartmentListApi = async (token: string): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/departments`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        }
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'request failed');
    }

    return await response.json();


}

export const getDepartmentByIdApi = async (token: string,departmentId:string): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/departments/${departmentId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        }
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'request failed');
    }

    return await response.json();


}

export const UpdateDepartmentApi = async (token: string,departmentId:string,data:any): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/departments/${departmentId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        }
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'request failed');
    }

    return await response.json();


}


export const getAdminDashboardStats = async (token: string): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/admin/dashboard/stats`, {
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







export const GetAllDepartmentsApi = async (token: string): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/departments`, {
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



export const CreateCourseApi = async (token: string, data: any): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/courses`, {
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



export const CreateDepartmentApi = async (token: string, data: any): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/departments`, {
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

export const DeleteCourseApi = async (token: string, courseId: number): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/courses/${courseId}`, {
        method: "DELETE",
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



export const DeleteDepartmentApi = async (token: string, departmentId: number): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/departments/${departmentId}`, {
        method: "DELETE",
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



export const GetCourseByIdApi = async (token: string, courseId: string): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/courses/${courseId}`, {
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


export const UpdateCourseApi = async (token: string, id: string, data: any): Promise<any> => {
    const response = await fetch(`${BASEAPI_URL}/courses/${id}`, {
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






