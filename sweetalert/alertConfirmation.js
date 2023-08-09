import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.20/+esm'

export async function alertConfirmationEdit(si,no){
    Swal.fire({
        title: '¿Esta seguro que quiere editar el producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,
    }).then( async (result) => {
        if (result.isConfirmed) {
            await si();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await no();
        }
    });
}

export async function alertConfirmationCreate(si,no){
    Swal.fire({
        title: '¿Esta seguro que quiere crear el producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,
    }).then( async (result) => {
        if (result.isConfirmed) {
            await si();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await no();
        }
    });
}

export async function alertConfirmation(si,no){
    Swal.fire({
        title: '¿Esta seguro que quiere terminar de comprar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,
    }).then( async (result) => {
        if (result.isConfirmed) {
            await si();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await no();
        }
    });
}

export async function alertConfirmationBuy(si,no){
    Swal.fire({
        title: '¿Esta seguro que quiere efectuar la compra?',
        text: 'Una vez efectuada la compra para cancelar el pedido comuniquese con soporte.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,
    }).then( async (result) => {
        if (result.isConfirmed) {
            await si();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await no();
        }
    });
}

export function alertNoCheckout (){
    Swal.fire({
        title: 'No tiene productos en el carrito',
        icon: 'info',
        confirmButtonText: 'Ok',
    }).then((result) => {
        if (result.isConfirmed) {
        }
    });
}

export async function alertCreate (action){
    try {
        let result = await Swal.fire({
            title: 'El producto se creo con exito',
            icon: 'info',
            confirmButtonText: 'Ok',
        });
        if (result.isConfirmed) {
            await action();
        }
    }catch(error){
        console.error('Error al generar la alerta', error);
    }
}

export async function alertUpdate (action){
    try {
        let result = await Swal.fire({
            title: 'El producto se actualizo con exito',
            icon: 'info',
            confirmButtonText: 'Ok',
        });
        if (result.isConfirmed) {
            await action();
        }
    }catch(error){
        console.error('Error al generar la alerta', error);
    }
}