var arrayProductos =  [
    {
        "denominacion": "nigiri",
        "imagen": "images/productos/nigiri.png",
        "descripcion": "6 nigiris de arroz en diferentes versiones: salmón, calamar y tamago (tortilla).",
        "cantidad": 10,
        "precio": 3.95, 
        "promocion": true
    },
    {
        "denominacion": "maki",
        "imagen": "images/productos/maki.png",
        "descripcion": "5 deliciosos makis de arroz, relleno de salmon/cangrejo y aguacate/pepino.",
        "cantidad": 10,
        "precio": 4.95, 
        "promocion": true
    },
    {
        "denominacion": "temaki",
        "imagen": "images/productos/temaki.png",
        "descripcion": "3 rollos de temaki de anguila/gamba/atun y tamago/pepino/aguacate.",
        "cantidad": 10,
        "precio": 5.95, 
        "promocion": false
    },
    {
        "denominacion": "uramaki",
        "imagen": "images/productos/uramaki.png",
        "descripcion": "5 uramakis de salmon, aguacate y queso crema, rebozados en semillas de sésamo y amapola.",
        "cantidad": 10,
        "precio": 5.95, 
        "promocion": false
    },
    {
        "denominacion": "edamame",
        "imagen": "images/productos/edamame.png",
        "descripcion": "Vaianas de soja hervidas, con un toque de salsa de soja y sésamo.",
        "cantidad": 10,
        "precio": 2.95, 
        "promocion": true
    },
    {
        "denominacion": "onigiri",
        "imagen": "images/productos/onigiri.png",
        "descripcion": "5 Bolitas de arroz en diferentes formas. ¡Qué no te quiten tu favorita!",
        "cantidad": 10,
        "precio": 3.95, 
        "promocion": false
    },
    {
        "denominacion": "tofu",
        "imagen": "images/productos/tofu.png",
        "descripcion": "Ración de tofu a la plancha acompañado de otra verduras.",
        "cantidad": 10,
        "precio": 3.95, 
        "promocion": false
    },
    {
        "denominacion": "tempuras",
        "imagen": "images/productos/tempuras.png",
        "descripcion": "6 tempuras de gamba extra-crunchy. No podrás parar después de la primera.",
        "cantidad": 10,
        "precio": 4.95, 
        "promocion": true
    },
    {
        "denominacion": "sashimi",
        "imagen": "images/productos/sashimi.png",
        "descripcion": "Finos cortes de atún, besugo y sepia, servidos junto con salsa de rábano y wasabi.",
        "cantidad": 10,
        "precio": 7.95, 
        "promocion": false
    },
    {
        "denominacion": "helado matcha",
        "imagen": "images/productos/helado.png",
        "descripcion": "Helado de té matcha acompañado con lichis y mango.",
        "cantidad": 10,
        "precio": 5.95, 
        "promocion": false
    },   
]
var arrayPedidos = [];
var carrito = document.querySelector("#carrito");
var productos = document.querySelector(".productos");
var notificacion = document.querySelector("#notificacion");
var pedidos = document.querySelector(".pedidos");
var botonEliminarTodo = document.querySelector(".eliminar-todo");
var precioFinal = document.querySelector(".total");
window.onload = agregaProductos();

//  **LISTENERS**
botonEliminarTodo.addEventListener("click", borrarTodosPedidos);

//  **FUNCIONES**
function agregaProductos() {
    //Creo una tarjeta de producto que me servirá de molde
    let tarjetaMolde = document.createElement("div");
    tarjetaMolde.className = "tarjeta";

    //Creo los elementos de la tarjeta ...
    let imagen = document.createElement("img");
    let denominacion = document.createElement("h3");
    let descripcion = document.createElement("p");
    let precio = document.createElement("strong");
    precio.innerHTML = "€/pedido";
    let contador = document.createElement("div");
    contador.className = "contador";
        let boton1 = document.createElement("div");
        boton1.className = "boton-mas";
        boton1.innerHTML = "+";
        let input = document.createElement("div");
        input.innerHTML = "0";
        let boton2 = document.createElement("div");
        boton2.className = "boton-menos";
        boton2.innerHTML = "-";
        contador.appendChild(boton2);
        contador.appendChild(input);
        contador.appendChild(boton1);
    let cantidad = document.createElement("p");
    cantidad.className = "cantidad";
    cantidad.innerHTML = "Cantidad disponible: ";
    let anadirProducto = document.createElement("a");
    anadirProducto.innerHTML = "Añadir Producto";
    
    // ... y los añado a la tarjeta
    tarjetaMolde.appendChild(imagen);
    tarjetaMolde.appendChild(denominacion);
    tarjetaMolde.appendChild(descripcion);
    tarjetaMolde.appendChild(precio);
    tarjetaMolde.appendChild(contador);
    tarjetaMolde.appendChild(cantidad);
    tarjetaMolde.appendChild(anadirProducto);

    console.log(tarjetaMolde.children);

    // Asigno los valores de cada objeto a un clon de tarjetaMolde, inmediatamente añadiendo dicho clon al DOM
    arrayProductos.forEach(x => {
        tarjeta = tarjetaMolde.cloneNode(true);
        tarjeta.children[0].setAttribute("src", x.imagen);
        tarjeta.children[1].innerHTML = x.denominacion;
        tarjeta.children[2].innerHTML = x.descripcion;
        tarjeta.children[3].innerHTML = x.precio + tarjeta.children[3].innerHTML;
        tarjeta.children[5].innerHTML += x.cantidad;
        productos.appendChild(tarjeta);
    });

    // Nuevas variables después de ser añadidos los elementos al DOM
    var botonesPedido = document.querySelectorAll(".productos a");
    var botonesMas = document.querySelectorAll(".boton-mas");
    var botonesMenos = document.querySelectorAll(".boton-menos");

    // Listeners de las nuevas variables
    botonesPedido.forEach(x => {
        x.addEventListener("click", agregaPedido);
    });
    botonesMenos.forEach(x => {
        x.addEventListener("click", actualizaContador);
    });
    botonesMas.forEach(x => {
        x.addEventListener("click", actualizaContador);
    });
}

function actualizaContador(evento) {
    let boton = evento.target;
    
    switch (boton.className) {
        case "boton-menos":
            if (Number(boton.nextElementSibling.innerHTML) <= 0) {
                boton.nextElementSibling.style.backgroundColor = "red";
                setTimeout(() => {
                    boton.nextElementSibling.style.backgroundColor = "grey";
                }, 1000);
                break;
            }
            boton.nextElementSibling.innerHTML = Number(boton.nextElementSibling.innerHTML) - 1;
            break;
        case "boton-mas":
            let cantidadMaxima;
            arrayProductos.forEach(x => {
                if (x.denominacion == boton.parentElement.parentElement.children[1].innerHTML)
                    cantidadMaxima = x.cantidad;
            });
            if (Number(boton.previousElementSibling.innerHTML) == cantidadMaxima) {
                boton.parentElement.nextElementSibling.style.color = "red";
                setTimeout(() => {
                    boton.parentElement.nextElementSibling.style.color = "inherit";
                }, 1000);
                break;
            }
            boton.previousElementSibling.innerHTML = Number(boton.previousElementSibling.innerHTML) + 1;
            break;
        default:
            console.log("Ha ocurrido un error con las cantidades");
    }
}

function agregaPedido(evento) {
    //Guardo la tarjeta del producto seleccionado en el evento y, a partir de este, construyo un pedido que añado al carrito
    let producto = evento.target.parentElement;
    let pedido = document.createElement("div");
    pedido.className = "pedido";

    // CONTROL DE ERRORES: antes de crear nada, me aseguro de que todos los datos recogidos durante el evente sean correctos; si no, me salgo de la función
        // ERROR 1: La cantidad es igual a 0
        if (producto.children[4].children[1].innerHTML == 0) { 
            producto.children[4].children[1].style.backgroundColor = "red";
            setTimeout(() => {
                producto.children[4].children[1].style.backgroundColor = "grey";
            }, 1000);            
        }
        // ERROR 2: Ya existe un pedido del mismo producto (no deseo crear otro, sino sumar la nueva cantidad a la del pedido ya existente)
        // (Personal) Importante poner "else if" y no sólo "if"; con "if", da igual si el ERROR 1 es "true" o "false", siempre se ejecutaría o bien este "if" o el "else" de abajo => en "true" suma 0 a la cantidad, siendo un cambio inperceptible al usuario, pero innecesario e ineficiente en cuanto a código | en "false" crearía un pedido de cantidad 0, que es justo lo que queremos evitar.
        else if (arrayPedidos.includes(producto.children[1].innerHTML)) { 
            Array.from(pedidos.children).forEach(x => {
                if (x.children[1].innerHTML == producto.children[1].innerHTML) {
                    // Reconstruyo la información del pedido añadiendole la nueva cantidad
                    let cantidadPedido =  Number(x.children[2].innerHTML.slice(0, x.children[2].innerHTML.indexOf(" "))) + Number(producto.children[4].children[1].innerHTML);
                    let precioUnitario = producto.children[3].innerHTML;
                    let precioTotal = (Number(cantidadPedido) * Number(precioUnitario.slice(0, precioUnitario.indexOf("€")))).toFixed(2) + "€";
                    x.children[2].innerHTML = cantidadPedido + " &#215; " + precioUnitario + " = " + precioTotal;
                    // Actualizo la cantidad en arrayProductos
                    let cantidadProducto;
                    arrayProductos.forEach(x => {
                        if (x.denominacion == producto.children[1].innerHTML) {
                            x.cantidad -= Number(producto.children[4].children[1].innerHTML);
                            cantidadProducto = x.cantidad; 
                        }
                    });
                    //Actualizo la tarjeta del producto
                    producto.children[5].innerText = "Cantidad disponible: " + cantidadProducto;
                    
                    //Como he modificado un elemento, tengo que actualizar el precio final
                    actualizaPrecioFinal();
                }
            });
        }
        else {
            //Creo la imagen del pedido
            let imagen = document.createElement("img");
            imagen.src = producto.children[0].src;
            imagen.alt = producto.children[0].alt;
            pedido.appendChild(imagen);
            
            //Creo el nombre del pedido
            let nombre = document.createElement("h3");
            nombre.innerHTML = producto.children[1].innerHTML;
            pedido.appendChild(nombre);

            //Creo la informacion del pedido (cantidad x precioUnitario = precioTotal)
            let informacion = document.createElement("p");

                // 1 - Guardo la cantidad (arriba en el control de errores me asegure de que no haya una cantidad igual a 0)
                let cantidadPedido;
                cantidadPedido = producto.children[4].children[1].innerHTML;

                // Actualizo la cantidad en arrayProductos
                let cantidadProducto;
                arrayProductos.forEach(x => {
                    if (x.denominacion == producto.children[1].innerHTML) {
                        x.cantidad -= Number(cantidadPedido);
                        cantidadProducto = x.cantidad; 
                    }
                });
                //Actualizo la tarjeta del producto
                producto.children[5].innerText = "Cantidad disponible: " + cantidadProducto;

                // 2 - Guardo el precioUnitario
                let precioUnitario = producto.children[3].innerHTML;

                // 3 - Calculo el precioTotal
                let precioTotal;
                precioTotal = (Number(cantidadPedido) * Number(precioUnitario.slice(0, precioUnitario.indexOf("€")))).toFixed(2) + "€";

            informacion.innerHTML = cantidadPedido + " &#215; " + precioUnitario + " = " + precioTotal;
            pedido.appendChild(informacion);

            //Creo el botón "eliminar" del pedido
            let botonEliminar = document.createElement("div");
            botonEliminar.addEventListener("click", borraPedido);
            botonEliminar.className = "eliminar";
            pedido.appendChild(botonEliminar);

            //Añado el nuevo elemento al carrito
            pedidos.appendChild(pedido);
                    
            //Registro en arrayPedidos (para que me salte el ERROR 2 en la siguiente ocasión que se pida ese mismo producto)
            arrayPedidos.push(producto.children[1].innerHTML);
            
            //Como he añadido un elemento, tengo que actualizar la notificación 
            actualizaNotificacion();

            //Como he añadido un elemento, tengo que actualizar el precio final
            actualizaPrecioFinal();
        }
    // Reseteo el contador a 0: si la cantidad de pedidos fuese mayor que la mitad de la cantidad restante, se podría añadir más de lo que existe, mostrando valores negativos en la cantidad disponible
    producto.children[4].children[1].innerHTML = 0;
} 

function borraPedido(evento) {
    //Guardamos el pedido a borrar
    let pedido =  evento.target.parentElement;
    
    //Borro el pedido
    pedidos.removeChild(pedido);
    
    //Debo "devolver" la cantidad de pedidos borrados a la cantidad diponible de productos en su tarjeta correspondiente
    // Actualizo la cantidad en arrayProductos
    let cantidadProducto, denominacionProducto;
    arrayProductos.forEach(x => {
        if (x.denominacion == pedido.children[1].innerHTML) {
            x.cantidad += Number(pedido.children[2].innerHTML.substr(0, pedido.children[2].innerHTML.indexOf(" ")));
            cantidadProducto = x.cantidad;
            denominacionProducto = x.denominacion;
        }
    });
    //Actualizo la tarjeta del producto
    Array.from(productos.children).forEach(x => {
        if (x.children[1].innerHTML == denominacionProducto) {
            x.children[5].innerHTML = "Cantidad disponible: " + cantidadProducto;
            x.children[5].style.color = "#119226";
            setTimeout(() => {
                x.children[5].style.color = "inherit";
            }, 1000);
        }
    });

    // Al eliminar el producto de la lista de pedidos, tengo que eliminarlo de arrayPedidos también 
    arrayPedidos.splice(arrayPedidos.indexOf(pedido.children[1]), 1);
    console.log(arrayPedidos);

    //Como he borrado un elemento, tengo que actualizar la notificación 
    actualizaNotificacion();

    //Como he borrado un elemento, tengo que actualizar el precio final
    actualizaPrecioFinal();
}

function borrarTodosPedidos() {
    // Para todos los pedidos ...
    Array.from(pedidos.children).forEach(x => {
        // ... lanzo un evento "click" sobre el boton de eliminar (el 4º hijo del pedido), que hará que el listener que habíamos asignado a estos botones ejecute la función borraPedido() para cada uno de los pedidos
        let evento = new Event("click");
        x.children[3].dispatchEvent(evento);
    })
}

function actualizaPrecioFinal () {
    let suma = 0;
    Array.from(pedidos.children).forEach(x => {
        suma += Number(x.children[2].innerHTML.slice(x.children[2].innerHTML.indexOf("=")+1, -1));
    });
    precioFinal.innerHTML = "TOTAL: " + suma.toFixed(2) + "€";
}

function actualizaNotificacion() {
    notificacion.innerHTML = pedidos.children.length;
    if (notificacion.innerHTML == 0) {
        notificacion.style.display = "none";
    }
    else {
        notificacion.style.display = "flex";
    }
}