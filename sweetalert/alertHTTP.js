import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.20/+esm'

export function alertHTTPConextion (e){
    Swal.fire({
        text:e.message,
        confirmButtonText: 'Refresh',
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
}