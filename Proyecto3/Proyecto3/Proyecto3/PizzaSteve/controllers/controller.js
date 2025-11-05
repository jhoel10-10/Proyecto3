const Controller = {
  cart: [],

  init: () => {
    // Cargar contenido dinámico inicial
    Controller.loadMenu();
    Controller.loadPromotions();
    Controller.initCartListeners();
    Controller.loadCartFromStorage();
  },

  loadMenu: () => {
    const pizzas = pizzaData.pizzas;
    View.renderPizzaMenu(pizzas);
  },

  loadPromotions: () => {
    const promotions = pizzaData.promotions;
    View.renderPromotions(promotions);
  },

  // Funciones del Carrito
  initCartListeners: () => {
    const cartBtn = document.getElementById('cartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartBtn) {
      cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Controller.openCart();
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        Controller.checkout();
      });
    }
  },

  addToCart: (pizza) => {
    const existingItem = Controller.cart.find(item => item.id === pizza.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      Controller.cart.push({
        ...pizza,
        quantity: 1
      });
    }
    
    Controller.updateCart();
    Controller.saveCartToStorage();
    View.showAddToCartAnimation();
  },

  removeFromCart: (pizzaId) => {
    Controller.cart = Controller.cart.filter(item => item.id !== pizzaId);
    Controller.updateCart();
    Controller.saveCartToStorage();
  },

  updateQuantity: (pizzaId, change) => {
    const item = Controller.cart.find(item => item.id === pizzaId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        Controller.removeFromCart(pizzaId);
      } else {
        Controller.updateCart();
        Controller.saveCartToStorage();
      }
    }
  },

  updateCart: () => {
    View.renderCart(Controller.cart);
    Controller.updateCartBadge();
  },

  updateCartBadge: () => {
    const totalItems = Controller.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      cartCount.textContent = totalItems;
      if (totalItems > 0) {
        cartCount.style.display = 'flex';
      } else {
        cartCount.style.display = 'none';
      }
    }
  },

  openCart: () => {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
  },

  checkout: () => {
    if (Controller.cart.length === 0) {
      alert('Tu carrito está vacío. ¡Agrega algunas pizzas primero!');
      return;
    }

    const total = Controller.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = Controller.cart.map(item => 
      `${item.quantity}x ${item.name} - Bs. ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    alert(`🎉 ¡Pedido Confirmado!\n\n${itemsList}\n\nTotal: Bs. ${total.toFixed(2)}\n\nEn una aplicación real, aquí se procesaría el pago y se enviaría el pedido.`);
    
    Controller.cart = [];
    Controller.updateCart();
    Controller.saveCartToStorage();
    
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (cartModal) {
      cartModal.hide();
    }
  },

  saveCartToStorage: () => {
    localStorage.setItem('pizzaSteve_cart', JSON.stringify(Controller.cart));
  },

  loadCartFromStorage: () => {
    const savedCart = localStorage.getItem('pizzaSteve_cart');
    if (savedCart) {
      Controller.cart = JSON.parse(savedCart);
      Controller.updateCart();
    }
  }
};

// Inicializar el controlador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', Controller.init);
