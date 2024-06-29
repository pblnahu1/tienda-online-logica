let localStorage;

if (typeof window === "undefined") {
    localStorage = {
        storage: {},
        setItem(key, value) {
            this.storage[key] = value;
        },
        getItem(key) {
            return this.storage[key] || null;
        },
        removeItem(key) {
            delete this.storage[key];
        },
        clear() {
            this.storage = {};
        }
    };
} else {
    localStorage = window.localStorage;
}

async function fetchingApi() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Listado de Productos", data);
    } catch (error) {
        console.error("Ups!", error);
    }
}

async function fetchAndFilterProductsByCategory(category) {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filteredProducts = data.filter(product => product.category === category);
        console.log(`Productos de ${category}: `, filteredProducts);
    } catch (error) {
        console.error("Error al obtener los productos: ", error);
    }
}

let cart = [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    console.log("Producto añadido al carrito: ", product);
    console.log("Carrito actualizado: ", cart);
    saveCart();
}

async function addProductToCart(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        addToCart(data);
    } catch (error) {
        console.error("Error al añadir el producto al carrito: ", error);
    }
}

function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            cart = cart.filter(product => product.id !== productId);
        }
    }
    console.log("Producto eliminado del carrito. Carrito actualizado: ", cart);
    saveCart();
}

function calculateTotal() {
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    console.log("Total del carrito: ", total);
    return total;
}

function updateCartProductQuantity(productId, quantity) {
    const product = cart.find(product => product.id === productId);
    if (product) {
        product.quantity = quantity;
        console.log("Carrito actualizado: ", cart);
    } else {
        console.log("Producto no encontrado en el carrito");
    }
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Carrito guardado en el Local Storage");
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        console.log("Carrito cargado desde Local Storage: ", cart);
    }
}

function processCheckout() {
    const total = calculateTotal();
    console.log(`Procesando pago de ${total}...`);
    // Simulo el proceso de pago
    setTimeout(() => {
        console.log("Pago realizado con éxito");
        cart = [];
        saveCart();
    }, 3500);
}

const render = async () => {
    await fetchingApi();
    await fetchAndFilterProductsByCategory('electronics');
    await addProductToCart(1);
    await addProductToCart(2);
    await addProductToCart(20);
    calculateTotal();
    updateCartProductQuantity(1, 3);
    setTimeout(() => {
        removeFromCart(20);
        calculateTotal();
    }, 2500);
    loadCart();
    await addProductToCart(1);
    calculateTotal();
    processCheckout();
}

render();
