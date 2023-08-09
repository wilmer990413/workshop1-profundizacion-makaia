
import { listProducts,createProduct,updateProduct,productById } from '../services/products.js';
import { listCollections } from '../services/collections.js';
import {alertConfirmationCreate,alertCreate,alertConfirmationEdit} from '../sweetalert/alertConfirmation.js';

const formCreate = document.getElementById('createProduct');
const formEdit = document.getElementById('editProduct');

formCreate.addEventListener( 'submit', async function (event) {
    event.preventDefault();
    const formCreateData = new FormData(formCreate);
    let productData = cleanDataFormProduct(formCreateData);
    await alertConfirmationCreate(
        async ()=>{
            let response = await createProduct(productData);
            if(response === 201){
                await alertCreate(
                    async () =>{
                        document.querySelector('.modal__form--background').style.display = 'none';
                        location.reload();
                    }
                );
            }
        },
        ()=>{}
    );
});

formEdit.addEventListener('submit',async function(event){
    event.preventDefault();
    const formEditData = new FormData(formEdit);
    let productData = cleanDataFormProduct(formEditData);
    await alertConfirmationEdit(
        async () => {
            let response = await updateProduct(productData);
            if(response === 201){
                await alertCreate(
                    async () =>{
                        document.querySelector('.modal__form--background').style.display = 'none';
                        location.reload();
                    }
                );
            }
        },
        ()=>{}
    );
});

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

async function startProductPanel(){
    let products = await listProducts();
    let tableProducts = document.querySelector('.article__products--table');
    products.forEach(product => {
        tableProducts.innerHTML+= `
        <tr class="article__products--table--tr">
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

function aggEventsTableProducts(){
    let productsInTable = document.querySelectorAll('.article__products--table--tr');
    for (let index = 0; index < productsInTable.length; index++) {
        productsInTable[index].addEventListener('click',function () {selectionEditOrDelete(index);});
    }
}

function selectionEditOrDelete(index){
    let idProduct = document.querySelectorAll('.article__products--table--tr ')[index].querySelector('td').textContent;
    document.querySelector('.modal__editdelete--background').style.display = 'flex';
    document.querySelector('.edit').addEventListener('click', ()=>{startEditProduct(idProduct)});
}

function startEditProduct(idProduct){
    document.getElementById('editDeleteModal').style.display='none';
    document.getElementById('editModal').style.display = 'flex';
    printCollectionsInFrom();
    completeFormEdit(idProduct);
}

function startCreateProduct(){
    document.getElementById('createModal').style.display = 'flex';
    printCollectionsInFrom();
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

startProductPanel();