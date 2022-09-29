import axios from 'axios';

const API_URL = '/api/tutorials/';

const getTutorials = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);

    return response.data;
}

const getById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + id, config);

    return response.data;
}

const update = async (updateData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = {
        title: updateData.title,
        description: updateData.description,
        published: updateData.published,
    }
    const response = await axios.put(API_URL + updateData._id, data, config);

    return response.data;
}

const del = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config);

    return response.data;
}

const create = async (tutorial, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, tutorial, config);

    return response.data;
}

const tutorialService = {
    getTutorials,
    getById,
    update,
    del,
    create
}
export default tutorialService;