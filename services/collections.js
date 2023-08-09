import {alertHTTPConextion} from "../sweetalert/alertHTTP.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';
const endpointCollections = 'http://localhost:3000/collections';

export const listCollections = async () => {
    try {
        const response = await axios.get(endpointCollections);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const collectionsData = response.data;
            return collectionsData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}
export const collectionsById = async (id) =>{
    try {
        const response = await axios.get(endpointCollections+'/'+id);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            const collectionsByIdData = response.data;
            return collectionsByIdData;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export const createCollection = async (data) => {
    try {
        const response = await axios.post(endpointCollections, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status !== 201){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return response.status;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export const updateCollection = async (id,data) => {
    try {
        const response = await axios.put(endpointCollections+'/'+id, data);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return response.status;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export const deleteCollection = async (id) => {
    try {
        const response = await axios.delete(endpointCollections+'/'+id);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return response.status;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}
