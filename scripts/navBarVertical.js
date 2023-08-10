export function initNavBarVertical(){
    document.querySelector('.modal-navbar_background').style.display = 'flex';
    document.querySelector('.modal-navbar_close-icon img ').addEventListener('click', function(){
        document.querySelector('.modal-navbar_background').style.display = 'none';
    });
}