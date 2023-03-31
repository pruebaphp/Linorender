import Swal from "sweetalert2";
const btnsEliminar = document.querySelectorAll('.enlace_eliminar');

addEventListener('DOMContentLoaded',()=>{
    btnsEliminar.forEach(boton=>{
        boton.addEventListener('click',eliminarUsuario);
    })
})


async function eliminarUsuario(e){
    e.preventDefault();
    const idUsuario = (e.target.getAttribute('data-id'));


    Swal.fire({
        title: 'Está seguro de eliminar?',
        text: "No podrá revertir los cambios luego.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            (async()=>{

                const url = `http://localhost:5000/eliminar-usuario/${idUsuario}`;
                const respuesta = await fetch(url,{
                    method:'DELETE',
                });
                const data = await respuesta.json();

                if(data.status){
                    const filaEliminar = (e.target.parentElement.parentElement);
                    filaEliminar.remove();
                    
                    Swal.fire({
            
                        title: 'Genial',
                        text: `${data.msg}`,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Aceptar',
                      })
                }
            })()


        }
      })

}


