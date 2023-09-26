(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Countdown Timer
    function countDownTimer() {	
        var endTime = new Date("31 December 2023 10:00:00 GMT+00:00");
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (days < "10") {
            days = "0" + days;
        }
        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }

        $("#cdt-days").html(days + "<span>-Days-</span>");
        $("#cdt-hours").html(hours + "<span>-Hours-</span>");
        $("#cdt-minutes").html(minutes + "<span>-Mins-</span>");
        $("#cdt-seconds").html(seconds + "<span>-Secs-</span>");

    }

    setInterval(function () {
        countDownTimer();
    }, 1000);


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });
    
})(jQuery);








// Obtener elementos del DOM
//const productList = document.getElementById('product-list');
//const cartItems = document.getElementById('cart-items');
//const cartTotal = document.getElementById('cart-total');

// Inicializar el carrito como un array vacío
//let cart = [];

// Función para agregar un producto al carrito
//function addToCart(id, name, price) {
  // Crear un objeto producto
  //const product = { id, name, price };
  // Agregar el producto al carrito
  //cart.push(product);
  // Actualizar la vista del carrito
  //renderCart();
//}

// Función para renderizar el carrito
//function renderCart() {
  // Limpiar el contenido del carrito
  //cartItems.innerHTML = '';
  // Calcular el total del carrito
  //let total = 0;
  // Recorrer cada producto en el carrito
  //cart.forEach(product => {
    // Crear un elemento li para mostrar el producto en el carrito
    //const li = document.createElement('li');
    //li.innerText = `${product.name} - $${product.price}`;
    // Agregar el elemento li al carrito
    //cartItems.appendChild(li);
    // Sumar el precio del producto al total
    //total += parseFloat(product.price);
  //});
  // Actualizar el total en el carrito
//  cartTotal.innerText = `$${total.toFixed(2)}`;
//}

// Asignar evento click a los botones "Agregar al carrito"
//const addToCartButtons = productList.getElementsByClassName('add-to-cart');
//Array.from(addToCartButtons).forEach(button => {
  //button.addEventListener('click', (event) => {
    //const listItem = event.target.parentElement;
    //const productId = listItem.dataset.id;
    //const productName = listItem.dataset.name;
    //const productPrice = listItem.dataset.price;
    //addToCart(productId, productName, productPrice);
  //});
//});
let productosSeleccionados = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
let total = 0;

fetch('https://zmszgmmzcdolvhbxrskm.supabase.co/rest/v1/untref?select=*', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptc3pnbW16Y2RvbHZoYnhyc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4OTI5NzAsImV4cCI6MjAwNTQ2ODk3MH0.KcTnLJ_4ODZJ-ccqwXPf-d5fO0D1vPIBgGlWrVng6vM',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptc3pnbW16Y2RvbHZoYnhyc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4OTI5NzAsImV4cCI6MjAwNTQ2ODk3MH0.KcTnLJ_4ODZJ-ccqwXPf-d5fO0D1vPIBgGlWrVng6vM'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Aquí puedes realizar cualquier operación con los datos obtenidos
    const listaProductos = data.map((producto) => {
      return `
        <div class="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
          <div class="card product-item text-center border h-250 p-4" style="width: 20rem;" data-id="${producto.id}" data-name="${producto.title}" data-price="${producto.price}">
            <img class="img-fluid mb-4" src="${producto.thumbnail}" alt="${producto.title}">
            <div class="card-body">
              <h5 class="h6 d-inline-block mb-2">${producto.title}</h5>
              <p class="card-text"> ${producto.description}</p>
              <h3 class="text-primary mb-3">Precio: $${producto.price}</h3>
              <button class="btn btn-outline-primary px-3 add-to-cart">Agregar al carrito</button>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById("productos").innerHTML = `<div class="row">${listaProductos.join("")}</div>`;

    const botonesAgregar = document.getElementsByClassName("add-to-cart");
    for (let i = 0; i < botonesAgregar.length; i++) {
      botonesAgregar[i].addEventListener("click", agregarProducto);
    }

    actualizarCarrito();
  })
  .catch((error) => {
    console.error("Error al obtener los productos:", error);
  });

function agregarProducto(event) {
  const producto = event.target.closest(".card");
  const id = producto.getAttribute("data-id");
  const nombre = producto.getAttribute("data-name");
  const precio = parseFloat(producto.getAttribute("data-price"));

  productosSeleccionados.push({ id, nombre, precio });
  console.log(productosSeleccionados);

  actualizarCarrito();

   // Save the shopping cart data in local storage
   localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));
 }
 
 function eliminarProducto(id) {
   productosSeleccionados = productosSeleccionados.filter((producto) => producto.id !== id);
   actualizarCarrito();
 
   // Save the updated shopping cart data in local storage
   localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));
 }
 
 function actualizarCarrito() {
   const listaCarrito = document.getElementById("carrito");
   listaCarrito.innerHTML = "";
 
   total = 0;
 
   productosSeleccionados.forEach((producto) => {
     const itemCarrito = document.createElement("li");
     itemCarrito.innerHTML = `
       <span>${producto.nombre} - $${producto.precio}</span>
       <button class="btn btn-danger btn-sm remove-from-cart">Eliminar</button>
     `;
 
     const botonEliminar = itemCarrito.querySelector(".remove-from-cart");
     botonEliminar.addEventListener("click", () => {
       eliminarProducto(producto.id);
     });
 
     listaCarrito.appendChild(itemCarrito);
 
     total += producto.precio;
   });
 
   const totalCarrito = document.getElementById("total-carrito");
   totalCarrito.textContent = `$${total.toFixed(2)}`;
 
   const opcionesPago = document.getElementById("opciones-pago");
   opcionesPago.innerHTML = `
     <option value="efectivo">Efectivo</option>
     <option value="transferencia">Transferencia</option>
     <option value="tarjeta">Tarjeta de crédito</option>
   `;
 
   calcularTotalConDescuento(opcionesPago.value);
 }
 
 function calcularTotalConDescuento(pagoSeleccionado) {
   let totalConDescuento = total;
 
   if (pagoSeleccionado === "efectivo" || pagoSeleccionado === "transferencia") {
     totalConDescuento *= 0.9; // 10% de descuento
   } else if (pagoSeleccionado === "tarjeta") {
     totalConDescuento *= 2.2; // 120% de recargo
   }
 
   const totalConDescuentoElement = document.getElementById("total-con-descuento");
   totalConDescuentoElement.textContent = `$${totalConDescuento.toFixed(2)}`;
 }
 
 const opcionesPago = document.getElementById("opciones-pago");
 opcionesPago.addEventListener("change", (event) => {
   const pagoSeleccionado = event.target.value;
   calcularTotalConDescuento(pagoSeleccionado);
 });