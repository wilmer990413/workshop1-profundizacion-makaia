document.getElementById('closeImgCreate').addEventListener('click', function(){
            document.getElementById('createModal').style.display = 'none';
            document.querySelector('#createModal form').reset();
});

document.getElementById('closeImgEdit').addEventListener('click', function(){
    document.getElementById('editModal').style.display = 'none';
    document.querySelector('#editModal form').reset();
});