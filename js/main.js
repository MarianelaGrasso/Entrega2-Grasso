    let productos = []
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []

    const contenedorProductos = document.getElementById("contenedor-productos");
    const carritoHTML = document.getElementById("carrito");
    const totalHTML = document.getElementById("total");
    const inputBusqueda = document.getElementById("buscador");

    fetch("./data/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data
            mostrarProductos(productos)
        })
        .catch(error => console.error("Error al cargar productos:", error))

    function mostrarProductos(lista) {
        contenedorProductos.innerHTML = "";

    lista.forEach(producto => {

        const div = document.createElement("div");

        div.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>$${producto.precio}</p>
        <button id="btn-${producto.id}">Agregar al carrito</button>`;

        div.querySelector("button").addEventListener("click", () => {
            agregarAlCarrito(producto);
        })

        contenedorProductos.appendChild(div);

        });
    };


function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    
    Toastify({
        text: "Agregado con éxito!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to left, #515858, #232423)",
    },
    
    }).showToast();

    };

function mostrarCarrito() {
    carritoHTML.innerHTML = "";

    carrito.forEach((item) => {
        const div = document.createElement("div");

        div.innerHTML= `<img src="${item.imagen}" class="img-carrito">
        <h3>${item.nombre}</h3>
        <p>$${item.precio}</p>
        <button>Eliminar del carrito</button>`

        div.querySelector("button").addEventListener("click", () => {
            eliminarDelCarrito(item.id);
    });

        carritoHTML.appendChild(div);

    })

    calcularTotal();

};

function calcularTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    totalHTML.textContent = `Total: $${total}`;
};

function eliminarDelCarrito(idProducto) {

Swal.fire({
    title: `Eliminar este producto?`,
    text: ``,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar"
}).then(result => {
    if (result.isConfirmed) {
        carrito = carrito.filter(item => item.id !== idProducto)
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito()

    Swal.fire({
    title: "El producto fue eliminado",
    text: "",
    icon: "success"
    });

    }
}); 

}

inputBusqueda.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtrados = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
});

document.getElementById("vaciar").addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito(); 
});

mostrarCarrito();

document.getElementById("pagar").addEventListener("click", pagar);
function pagar(){
    if (carrito.length === 0) {
    Swal.fire({
    title: "Su carrito esta vacío, agregue algún producto",
    icon: "warning",
    draggable: true
});
    } else{
        Swal.fire({
        title: "Procedemos con el pago! <br> Ya casi es tuyo!",
        icon: "success",
        draggable: true
});
    }
}

mostrarCarrito();