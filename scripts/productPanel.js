
import { listProducts,createProduct,updateProduct,productById,deleteProduct } from '../services/products.js';
import { listCollections } from '../services/collections.js';
import {alertConfirmationAction,alertMessageSuccessAction} from '../sweetalert/alertConfirmation.js';

const formCreate = document.getElementById('createProduct');
const formEdit = document.getElementById('editProduct');

async function startProductPanel(){
    let products = await listProducts();
    let tableProducts = document.querySelector('.article__items--table');
    products.forEach(product => {
        tableProducts.innerHTML+= `
        <tr class="article__items--table--tr">
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.company}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.stock}</td>
            <td>${product.discount}</td>
            <td>${product.genre}</td>
            <td>${product.collections}</td>
            <td>
                <figure class="images__products">
                    <img src="${product.images[0].link}" alt="images product">
                </figure>
            </td>
        </tr>
        `;
    });
    document.querySelector('.create').addEventListener('click', ()=>{startCreateProduct()});
    aggEventsTableProducts();
}

function startCreateProduct(){
    document.getElementById('createModal').style.display = 'flex';
    printCollectionsInFrom();
    formCreate.addEventListener( 'submit', async function (event) {
        event.preventDefault();
        actionButtonCreateProduct();
    });
}

async function printCollectionsInFrom(){
    let collections = await listCollections();
    let selectsCollections = document.querySelectorAll('select[name="collections"]');
    for (let index = 0; index < selectsCollections.length; index++) {
        selectsCollections[index].innerHTML = '';
        collections.forEach(collection => {
            selectsCollections[index].innerHTML+=`
            <option value="${collection.id}">${collection.name}</option>
            `;
        });
    }
}

async function actionButtonCreateProduct(){
    const formCreateData = new FormData(formCreate);
    let productData = cleanDataFormProduct(formCreateData);
    await alertConfirmationAction(
        '¿Esta seguro que quiere crear el producto?',
        async ()=>{
            let response = await createProduct(productData);
            if(response === 201){
                await alertMessageSuccessAction(
                    'El producto se creo con exito',
                    async () =>{
                        document.querySelector('.modal__form--background').style.display = 'none';
                        location.reload();
                    }
                );
            }
        },
        ()=>{}
    );
}

function cleanDataFormProduct(formData){
    const productData = {};
    for (let [key, value] of formData.entries()) {
        productData[key] = value;
    }
    let auxJson = {
        images: []
    }
    auxJson.images[0]={link: productData.image1};
    auxJson.images[1]={link: productData.image2};
    auxJson.images[2]={link: productData.image3};
    auxJson.images[3]={link: productData.image4};
    delete productData.image1;
    delete productData.image2;
    delete productData.image3;
    delete productData.image4;
    Object.assign(productData, auxJson);
    return productData;
}

function aggEventsTableProducts(){
    let productsInTable = document.querySelectorAll('.article__items--table--tr');
    for (let index = 0; index < productsInTable.length; index++) {
        productsInTable[index].addEventListener('click',function () {selectionEditOrDelete(index);});
    }
}

function selectionEditOrDelete(index){
    let idProduct = document.querySelectorAll('.article__items--table--tr ')[index].querySelector('td').textContent;
    document.querySelector('.modal__editdelete--background').style.display = 'flex';
    document.querySelector('.modal__editdelete').focus();
    document.querySelector('.edit').addEventListener('click', ()=>{startEditProduct(idProduct)});
    document.querySelector('.delete').addEventListener('click',()=>{startDeleteProduct(idProduct)});
}

async function startDeleteProduct(idProduct){
    await alertConfirmationAction(
        '¿Esta seguro que quiere eliminar el producto?',
        async () => {
            let response = await deleteProduct(idProduct);
            if(response === 200){
                await alertMessageSuccessAction(
                    'El producto se elimino con exito',
                    async () =>{
                        document.querySelector('.modal__editdelete--background').style.display = 'none';
                        location.reload();
                    }
                );
            }
        },
        ()=>{}
    );
}

function startEditProduct(idProduct){
    document.getElementById('editDeleteModal').style.display='none';
    document.getElementById('editModal').style.display = 'flex';
    printCollectionsInFrom();
    completeFormEdit(idProduct);
    formEdit.addEventListener('submit',async function(event){
        event.preventDefault();
        actionButtonUpdateProduct(idProduct);
    });
}

async function completeFormEdit(idProduct){
    let product = await productById(idProduct);
    formEdit.name.value = product.name;
    formEdit.company.value = product.company;
    formEdit.price.value = product.price;
    formEdit.description.value = product.description;
    formEdit.stock.value = product.stock;
    formEdit.discount.value = product.discount;
    formEdit.genre.value = product.genre;
    formEdit.collections.value = product.collections;
    formEdit.image1.value = product.images[0].link;
    formEdit.image2.value = product.images[1].link;
    formEdit.image3.value = product.images[2].link;
    formEdit.image4.value = product.images[3].link;
}

async function actionButtonUpdateProduct(idProduct){
    const formEditData = new FormData(formEdit);
    let productData = cleanDataFormProduct(formEditData);
    await alertConfirmationAction(
        '¿Esta seguro que quiere editar el producto?',
        async () => {
            let response = await updateProduct(idProduct,productData);
            if(response === 200){
                await alertMessageSuccessAction(
                    'El producto se actualizo con exito',
                    async () =>{
                        document.querySelector('.modal__form--background').style.display = 'none';
                        location.reload();
                    }
                );
            }
        },
        ()=>{}
    );
}

startProductPanel();