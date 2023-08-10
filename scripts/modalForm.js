function aggEventListenerModalForm(){
    document.getElementById('closeImgCreate').addEventListener('click', function(){
        document.getElementById('createModal').style.display = 'none';
        document.querySelector('#createModal form').reset();
    });
    document.getElementById('closeImgEdit').addEventListener('click', function(){
        document.getElementById('editModal').style.display = 'none';
        document.querySelector('#editModal form').reset();
    });
}

aggEventListenerModalForm();

export function hideModalForm(){
    document.querySelector('.modal__form--background').style.display = 'none';
    location.reload();
}