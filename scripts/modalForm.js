document.querySelector('.modal__form--close').addEventListener('click', function(){
    document.querySelector('.modal__form--background').style.display = 'none';
    document.querySelector('.modal__form--background form').reset();
});