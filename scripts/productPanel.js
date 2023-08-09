
import { listProducts,createProduct } from '../services/products.js';
import {alertConfirmationCreate,alertCreate} from '../sweetalert/alertConfirmation.js';

const formCreate = document.getElementById('createProduct');

formCreate.addEventListener( 'submit', async function (event) {
    event.preventDefault();
    const formCreateData = new FormData(formCreate);
    const productData = {};
    for (let [key, value] of formCreateData.entries()) {
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

function getCollectionsForm(){
    
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
}

function startCreateProduct(){
    document.getElementById('createModal').style.display = 'flex';
}

startProductPanel();