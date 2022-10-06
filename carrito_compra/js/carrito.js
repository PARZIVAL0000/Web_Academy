(function(){
    const $tablaCarrito = document.querySelector('.tabla-carrito');

    document.addEventListener('DOMContentLoaded', () => {
        Carrito();
    })
    
    function Carrito(){
        const $carrito = document.querySelector('.header .carrito img');
        $carrito.addEventListener('click', () => {

            let elemento = document.querySelector('.revelar');
            if(elemento){
                $tablaCarrito.classList.remove('revelar');
            }else{

                $tablaCarrito.classList.add('revelar');
            }

            
        })
    }

})();