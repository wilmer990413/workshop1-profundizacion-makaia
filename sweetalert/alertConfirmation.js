import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.20/+esm'

export async function alertConfirmationAction(message,yes,no){
    Swal.fire({
        title: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,
    }).then( async (result) => {
        if (result.isConfirmed) {
            await yes();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await no();
        }
    });
}

export async function alertMessageSuccessAction(message,action){
    try {
        let result = await Swal.fire({
            title: message,
            icon: 'success',
            confirmButtonText: 'Ok',
        });
        if (result.isConfirmed) {
            await action();
        }
    }catch(error){
        console.error('Error al generar la alerta', error);
    }
}