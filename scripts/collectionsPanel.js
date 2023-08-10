import { listCollections, collectionsById ,createCollection, updateCollection, deleteCollection} from '../services/collections.js';
import {alertConfirmationAction,alertMessageSuccessAction} from '../sweetalert/alertConfirmation.js';
import { hideModalForm } from './modalForm.js';
import { hideModalEditDelete } from './modalEditDelete.js';
import { initNavBarVertical } from './navBarVertical.js';

const formCreate = document.getElementById('createCollection');
const formEdit = document.getElementById('editCollection');

async function startCollectionPanel(){
    let collections = await listCollections();
    let tableColections = document.querySelector('.article__items--table');
    collections.forEach(collection => {
        tableColections.innerHTML+= `
        <tr class="article__items--table--tr">
            <td>${collection.id}</td>
            <td>${collection.name}</td>
        </tr>
        `;
    });
    document.querySelector('.create').addEventListener('click', ()=>{startCreateCollection()});
    document.querySelector('.header__menu--icon').addEventListener('click', ()=>{initNavBarVertical()});
    aggEventsTableCollections();
}

function startCreateCollection(){
    document.getElementById('createModal').style.display = 'flex';
    formCreate.addEventListener( 'submit', async function (event) {
        event.preventDefault();
        actionButtonCreateCollection();
    });
}

async function actionButtonCreateCollection(){
    const formCreateData = new FormData(formCreate);
    const collectionData = cleanDataFormCollection(formCreateData);
    await alertConfirmationAction(
        '¿Esta seguro que quiere crear la colección?',
        async ()=>{
            let response = await createCollection(collectionData);
            if(response === 201){
                await alertMessageSuccessAction(
                    'La colleción se creo con exito',
                    async () =>{
                        hideModalForm();
                    }
                );
            }
        },
        ()=>{}
    );
}

function aggEventsTableCollections(){
    let collectionsInTable = document.querySelectorAll('.article__items--table--tr');
    for (let index = 0; index < collectionsInTable.length; index++) {
        collectionsInTable[index].addEventListener('click',function () {selectionEditOrDelete(index);});
    }
}

function selectionEditOrDelete(index){
    let idCollection = document.querySelectorAll('.article__items--table--tr ')[index].querySelector('td').textContent;
    document.querySelector('.modal__editdelete--background').style.display = 'flex';
    document.querySelector('.modal__editdelete').focus();
    document.querySelector('.edit').addEventListener('click', ()=>{startEditCollection(idCollection)});
    document.querySelector('.delete').addEventListener('click',()=>{startDeleteCollection(idCollection)});
}

async function startEditCollection(idCollection){
    document.getElementById('editDeleteModal').style.display='none';
    document.getElementById('editModal').style.display = 'flex';
    let collection = await collectionsById(idCollection);
    formEdit.name.value = collection.name;
    formEdit.addEventListener('submit',async function(event){
        event.preventDefault();
        const formEditData = new FormData(formEdit);
        let collectionData = cleanDataFormCollection(formEditData);
        await alertConfirmationAction(
            '¿Esta seguro que quiere editar el producto?',
            async () => {
                let response = await updateCollection(idCollection,collectionData);
                if(response === 200){
                    await alertMessageSuccessAction(
                        'La colección se actualizo con exito',
                        async () =>{
                            hideModalForm();
                        }
                    );
                }
            },
            ()=>{}
        );
    });
}

async function startDeleteCollection(idCollection){
    await alertConfirmationAction(
        '¿Esta seguro que quiere eliminar la colección?',
        async () => {
            let response = await deleteCollection(idCollection);
            if(response === 200){
                await alertMessageSuccessAction(
                    'El producto se elimino con exito',
                    async () =>{
                        hideModalEditDelete();
                    }
                );
            }
        },
        ()=>{}
    );
}

function cleanDataFormCollection(formData){
    const collectionData = {};
    for (let [key, value] of formData.entries()) {
        collectionData[key] = value;
    }
    return collectionData;
}

startCollectionPanel();