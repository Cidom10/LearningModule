import axios from "axios";

const useApi = () => {

    let api = axios.create({baseURL: "http://127.0.0.1:8000/api/"});

    //Grabs all lessons available
    let getAllLessons = async () => {
        try {
            let res = await api.get("lessons/")
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Get steps of a specific lesson
    let getLessonSteps = async (lessonId) => {
        try {
            let res = await api.get(`lessons/${lessonId}/steps/`);
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }
    
    //Get components of a specific step
    let getAllStepComps = async (lessonId, stepId) => {
        try {
            let res = await api.get(`lessons/${lessonId}/steps/${stepId}/comps/`)
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Grabs lesson based on ID
    let getLesson = async (lessonId) => {
        try {
            let res = await api.get(`lessons/${lessonId}/`)
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Grabs step based on ID
    let getStep = async (lessonId, stepId) => {
        try {
            let res = await api.get(`lessons/${lessonId}/steps/${stepId}/`)
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Grabs component based on ID
    let getComp = async (lessonId, stepId, compId) => {
        try {
            let res = await api.get(`lessons/${lessonId}/steps/${stepId}/comps/${compId}`)
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Posts a lesson to the list
    let createLesson = async (postData) => {
        try {
            let res = await api.post(`lessons/`, postData)
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Posts a step to a lesson
    let createStep = async (lessonId, postData) => {
        try {
            let res = await api.post(`lessons/${lessonId}/steps/`, postData)
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Posts a component to a step
    let createComp = async (lessonId, stepId, compType, info) => {
        try {
            let res = await api.post(`lessons/${lessonId}/steps/${stepId}/comps/`, {
                "componentType": compType,
                "info": info
            })
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Deletes lesson, steps, and components pertaining to lessonId
    let deleteLesson = async (lessonId) => {
        try {
            let res = await api.delete(`lessons/${lessonId}/delete/`)
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Delete step and all joined components
    let deleteStep = async (lessonId, stepId) => {
        try {
            let res = await api.delete(`lessons/${lessonId}/steps/${stepId}/delete/`)
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    //Delete component
    let deleteComponent = async (lessonId, stepId, compId) => {
        try {
            let res = await api.post(`lessons/${lessonId}/steps/${stepId}/comps/${compId}/delete/`)
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    return {
        getAllLessons,
        getLessonSteps,
        getAllStepComps,

        getLesson,
        getStep,
        getComp,
        
        createLesson,
        createStep,
        createComp,

        deleteLesson,
        deleteStep,
        deleteComponent
    }
}

export default useApi;