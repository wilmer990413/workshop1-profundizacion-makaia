function aggEventListenerModalEditDelete(){
    document.querySelector('.modal__editdelete--close').addEventListener('click', function(){
        document.querySelector('.modal__editdelete--background').style.display = 'none';
    });
}

aggEventListenerModalEditDelete();

export function hideModalEditDelete(){
    document.querySelector('.modal__editdelete--background').style.display = 'none';
    location.reload();
}