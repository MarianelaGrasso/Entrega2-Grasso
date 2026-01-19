const productos = [
    {
        id: 1,
        nombre: "Vela Cedrón",
        descripcion: "Fragancia herbal y fresca, ideal para relajación.",
        precio: 4500,
        imagen: "images/velacedron.jpg"
    },
    {
        id: 2,
        nombre: "Vela Vainilla",
        descripcion: "Dulce y cálida, perfecta para ambientar tus espacios.",
        precio: 4800,
        imagen: "images/vainilla.jpg"
    },
    {
        id: 3,
        nombre: "Vela Maderas",
        descripcion: "Aromas intensos y sofisticados.",
        precio: 5000,
        imagen: "images/velaamaderada.jpeg"
    },

    {
        id: 4,
        nombre: "Vela Naranja-Canela",
        descripcion: "Aroma fresco, refrescante y dulce",
        precio: 5000,
        imagen: "images/vela-naranja-canela.jpg"
    },

    {
        id: 5,
        nombre: "Vela en Moldes",
        descripcion: "Aromas en stock.",
        precio: 5000,
        imagen: "images/moldes2.webp"
    },

    {
        id: 6,
        nombre: "Velas a medida",
        descripcion: "Aromas en stock, molde o en contenedor",
        precio: 5000,
        imagen: "images/medidas.webp"
    },

    {
        id: 7,
        nombre: "Vela Rojos",
        descripcion: "Aroma frutos rojos",
        precio: 5000,
        imagen: "images/frutos-rojos.webp"
    },

    {
        id: 8,
        nombre: "Vela Lavanda Class",
        descripcion: "Aroma a lavanda refrescante",
        precio: 5000,
        imagen: "images/lavanda.jpg"
    },

    {
        id: 9,
        nombre: "Velas para eventos, moldes a medida.",
        descripcion: "Aromas en stock, molde.",
        precio: 5000,
        imagen: "images/fabricmoldes.png"
    },

    {
        id: 10,
        nombre: "Velas Minimal",
        descripcion: "Aroma cueros y maderas",
        precio: 5000,
        imagen: "images/cemento.jpg"
    }
];

    const contenedorProductos = document.getElementById("contenedor-productos");
    const carritoHTML = document.getElementById("carrito");
    const totalHTML = document.getElementById("total");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function mostrarProductos() {
    productos.forEach((producto) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio}</p>
            <button id="btn-${producto.id}">Agregar al carrito</button>
        `;

        contenedorProductos.appendChild(div);

        // Evento al botón
        document
            .getElementById(`btn-${producto.id}`)
            .addEventListener("click", () => {
                agregarAlCarrito(producto);
            });
    });
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    carritoHTML.innerHTML = "";

    carrito.forEach((prod) => {
        const li = document.createElement("li");
        li.textContent = `${prod.nombre} - $${prod.precio}`;
        carritoHTML.appendChild(li);
    });

    calcularTotal();
}

function calcularTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    totalHTML.textContent = `Total: $${total}`;
}

document.getElementById("vaciar").addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito(); // ← refresco
});


mostrarProductos();
mostrarCarrito();