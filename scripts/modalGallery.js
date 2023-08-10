export function showModalGallery(product){
    document.querySelector('.modal__gallery--background').style.display = 'flex';
    printHTMLModalGallery();
    document.getElementById('imgP').style.backgroundImage = `url('${product.images[0].link}')`;
    document.getElementById('mg1').src = product.images[0].link;
    document.getElementById('mg2').src = product.images[1].link;
    document.getElementById('mg3').src = product.images[2].link;
    document.getElementById('mg4').src = product.images[3].link;
    document.querySelector('.modal__gallery--close').addEventListener('click', function(){
        document.querySelector('.modal__gallery--background').style.display = 'none';
        document.querySelector('.modal__gallery--background').innerHTML = '';
    });
    document.querySelector('.modal__gallery--next').addEventListener('click',function(){nextOrPlusImageModalGallery(product.images,"+","imgP")});
    document.querySelector('.modal__gallery--previous').addEventListener('click',function(){nextOrPlusImageModalGallery(product.images,"-","imgP")});
    transtionImageModalGalller(product);
}

function transtionImageModalGalller(product){
    for (let index = 0; index < 4; index++) {
        document.getElementById('mg'+(index+1)).src = product.images[index].link;
        document.getElementById('mg'+(index+1)).addEventListener('mouseover', function(){document.getElementById("imgP").style.backgroundImage = `url('${product.images[index].link}')`;});
        document.getElementById('mg'+(index+1)).addEventListener('mouseout', function(){document.getElementById('imgP').style.backgroundImage = `url('${product.images[0].link}')`;});
    }
}

function nextOrPlusImageModalGallery(images,accion,id){
    let url = document.getElementById(id).style.backgroundImage.replace("url","").replace("(","").replace(")","").replaceAll('"',"");
    let resultado = images.find((item)=> item.link === url);
    const position = images.indexOf(resultado);
    switch (true) {
        case position === 0 && accion === "+":
            document.getElementById(id).style.backgroundImage = `url('${images[1].link}')`;
            break;
        case position === 1 && accion === "+":
            document.getElementById(id).style.backgroundImage = `url('${images[2].link}')`;
            break;
        case position === 2 && accion === "+":
            document.getElementById(id).style.backgroundImage = `url('${images[3].link}')`;
            break;
        case position === 3 && accion === "+":
            document.getElementById(id).style.backgroundImage = `url('${images[0].link}')`;
            break;
        case position === 0 && accion === "-":
            document.getElementById(id).style.backgroundImage = `url('${images[3].link}')`;
            break;
        case position === 1 && accion === "-":
            document.getElementById(id).style.backgroundImage = `url('${images[0].link}')`;
            break;
        case position === 2 && accion === "-":
            document.getElementById(id).style.backgroundImage = `url('${images[1].link}')`;
            break;
        case position === 3 && accion === "-":
            document.getElementById(id).style.backgroundImage = `url('${images[2].link}')`;
            break;
    }
}

function printHTMLModalGallery(){
    document.querySelector('.modal__gallery--background').innerHTML = `
    <article class="modal__gallery">
        <div class="modal__gallery--container---close">
            <img class="modal__gallery--close" src="../images/icon-close.svg" alt="icon close">
        </div>
        <div id="imgP" class="modal__gallery--image--container">
            <figure class="modal__gallery--previous">
                <img src="../images/icon-previous.svg" alt="previous">
            </figure>
            <figure class="modal__gallery--next">
                <img src="../images/icon-next.svg" alt="next">
            </figure>
        </div>
        <div class="modal__gallery--images">
            <div class="modal__gallery--thumbnails">
                <figure class="modal__gallery--thumbnail">
                    <img id="mg1" src="../images/zapatato-bosi-1.png"   alt="thumbnail 1">
                </figure>
                <figure class="modal__gallery--thumbnail">
                    <img id="mg2" src="../images/zapatato-bosi-1.png"   alt="thumbnail 2">
                </figure>
                <figure class="modal__gallery--thumbnail">
                    <img id="mg3" src="../images/zapatato-bosi-1.png"   alt="thumbnail 3">
                </figure>
                <figure class="modal__gallery--thumbnail">
                    <img id="mg4" src="../images/zapatato-bosi-1.png"   alt="thumbnail 4">
                </figure>
            </div>
        </div>
    </article>
    `;
}
