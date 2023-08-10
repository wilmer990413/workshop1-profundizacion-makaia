import {alertHTTPConextion} from "../sweetalert/alertHTTP.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';
const endpointProducts = 'http://localhost:3000/products';

export const listProducts = async () => {
    try {
        const response = await axios.get(endpointProducts); 
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return response.data;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export const productByName = async (name) => {
    try {
        const response = await axios.get(endpointProducts+'?name='+name);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return response.data;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export const productById = async (id) => {
    try {
        const response = await axios.get(endpointProducts+'/'+id);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return response.data;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export const listProductsByGenre = async (genre) => {
    try {
        const response = await axios.get(endpointProducts+'?genre='+genre);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return response.data;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export const createProduct = async (data) => {
    try {
        const response = await axios.post(endpointProducts, data, {
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

export const updateProduct = async (id,data) => {
    try {
        const response = await axios.put(endpointProducts+'/'+id, data);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return response.status;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(endpointProducts+'/'+id);
        if(response.status !== 200){
            throw new Error('Error en la respuesta HTTP: ' + response.status);
        }else{
            return response.status;
        }
    } catch(e) {
        alertHTTPConextion(e);
    }
}
