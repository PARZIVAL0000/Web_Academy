(function(){
    //Variables...
    const tablaCarrito = document.querySelector('#tabla-carrito tbody'),
        vaciarCarrito = document.querySelector('#vaciar-carrito'),
        cursosAcademia = document.querySelector('.cursos-academia');

    let bancoCursos = []; // -> Un banco donde guarda todos nuestros cursos.

    //Eventos
    LoadEventListener();

    function LoadEventListener(){
        cursosAcademia.addEventListener('click', SeleccionandoCurso);

        tablaCarrito.addEventListener('click', EliminarCurso);

        vaciarCarrito.addEventListener('click', () => {
            bancoCursos = [];
            MostrarHTML();
        })
    }

    //Funciones
    function SeleccionandoCurso(e){
        if(e.target.classList.contains('boton')){
            let $identificador = e.target.getAttribute('data-id');
            ConstruyendoDatos($identificador);
        }
    }

    function EliminarCurso(e){
        if(e.target.classList.contains('eliminar')){
            let $identificador = e.target.parentNode.getAttribute('data-id');
            let $respuesta = bancoCursos.filter(curso => curso.Id !== $identificador);
            
            bancoCursos = [...$respuesta];

            MostrarHTML();
        }
    }

    function ConstruyendoDatos(id){
        //Este nos trea el contenedor que encierra toda la informacion del curso incluido su imagen.
        const $elemento = document.querySelector(`button[data-id="${id}"]`).parentNode.parentNode;
    
        let cursoElegido = {
            Imagen : $elemento.querySelector('img').src,
            Nombre : $elemento.querySelector('.info .tema').textContent,
            Precio : $elemento.querySelector('.info .precio > span').textContent,
            Cantidad : 1,
            Id : id
        }

        //Debemos verificar si el Id del "curslElegido" ya existe en nuestra "bancoCursos".
        //Si es asi, entonces debemos actualizar la Cantidad de nuestro "cursoElegido en el 
        // bancoCursos."
        let $resultado = bancoCursos.some(curso => curso.Id === cursoElegido.Id);
        if($resultado){
            //vamos a actualizar.
            let $respuesta = bancoCursos.map(curso => {
                if(curso.Id === cursoElegido.Id){
                    curso.Cantidad++;
                    return curso;
                }else{
                    return curso;
                }
            });

            bancoCursos = [...$respuesta];
        }else{
            //no existe.
            bancoCursos = [...bancoCursos, cursoElegido];
        }

        MostrarHTML();
    }

    function MostrarHTML(){
        
        LimpiarElCodigo();
        
        bancoCursos.forEach(curso => {

            const {Imagen, Nombre, Precio, Cantidad, Id} = curso;

            const contenedor = document.createElement('tr');
            contenedor.innerHTML = `
                <td>
                    <img style="width:15rem; height:10rem;" src="${Imagen}" alt="Imagen Curso" />
                </td>
                <td>
                    ${Nombre}
                </td>
                <td>
                    <p style="color:rgb( 0 0 0);"><strong>${Precio}<strong></p>
                </td>
                <td>
                    ${Cantidad}
                </td>
                <td>
                    <a href="#" data-id="${Id}" class="eliminar"><p class="eliminar">x<p></a>
                </td>
            `;

            tablaCarrito.appendChild(contenedor);
        })
    }

    function LimpiarElCodigo(){
        while(tablaCarrito.firstElementChild){
            tablaCarrito.removeChild(tablaCarrito.firstElementChild);
        }
    }
})();


