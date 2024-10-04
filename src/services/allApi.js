import { BASE_URL } from "./baseurl"
import { commonApi } from "./commonApi"

// register API
export const registerApi = async (userDetails) => {
    return await commonApi("POST", `${BASE_URL}/user/register`, userDetails, "")
}

// login api
export const loginApi = async (userDetails) => {
    return await commonApi('POST', `${BASE_URL}/user/login`, userDetails, "")
}

// add project api
export const addProjectApi = async (projectDetails, reqHeader) => {
    return await commonApi('POST', `${BASE_URL}/project/addproject`, projectDetails, reqHeader)
}

// get home projects 3 nos api
export const getHomeProjectApi = async () => {
    return await commonApi('GET', `${BASE_URL}/project/homeproject`, "", "");
}

//get all projects
export const getAllProjectApi = async (reqHeader,searchKey) => {
    // query param syntax
    // path?key=value
    return await commonApi('GET', `${BASE_URL}/project/allProject?search=${searchKey}`, "",reqHeader);
}

//get user project
export const getUserProjectApi = async (reqHeader) => {
    return await commonApi('GET', `${BASE_URL}/project/userProject`, "",reqHeader);
}

// update project
export const editUserProjectApi = async (projectId,reqBody,reqheader)=>{
    return await commonApi('PUT',`${BASE_URL}/project/editproject/${projectId}`,reqBody,reqheader)
}

// delete project
export const deleteProjectApi=async (projectId,reqHeader)=>{
    return await commonApi('DELETE',`${BASE_URL}/project/delete/${projectId}`,"",reqHeader)
}