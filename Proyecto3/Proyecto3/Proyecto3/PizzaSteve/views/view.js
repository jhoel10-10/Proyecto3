const View = {
  renderPizzaMenu: (pizzas) => {
    const menuGrid = document.getElementById('pizzaMenu');
    menuGrid.innerHTML = pizzas.map(pizza => `
      <div class="col">
        <div class="card h-100">
          <img src="${pizza.img}" class="card-img-top" alt="${pizza.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${pizza.name}</h5>
            <p class="card-text">${pizza.description}</p>
            <div class="mt-auto">
              <div class="pizza-price">${pizza.price.toFixed(2)}</div>
              <button class="btn btn-primary w-100" data-pizza-id="${pizza.id}">
                <i class="fas fa-shopping-cart me-2"></i>Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    
    // Agregar event listeners a los botones de ordenar
    document.querySelectorAll('[data-pizza-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pizzaId = e.currentTarget.getAttribute('data-pizza-id');
        const pizza = pizzas.find(p => p.id == pizzaId);
        Controller.addToCart(pizza);
      });
    });
  },

  renderPromotions: (promotions) => {
    const promoContainer = document.getElementById('promoContainer');
    promoContainer.innerHTML = promotions.map(promo => `
      <div class="col">
        <div class="card h-100 text-center p-3 position-relative">
          <span class="promo-badge">${promo.discount}</span>
          <div class="card-body d-flex flex-column justify-content-center">
            <h5 class="card-title display-6 mb-3">
              <i class="fas fa-gift me-2" style="color: var(--accent-color);"></i>
              ${promo.title}
            </h5>
            <p class="card-text mb-4">${promo.description}</p>
            <button class="btn btn-primary btn-lg mt-auto" data-promo="${promo.title}">
              <i class="fas fa-tag me-2"></i>¡La quiero!
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Agregar event listeners a los botones de promociones
    document.querySelectorAll('[data-promo]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const promoTitle = e.currentTarget.getAttribute('data-promo');
        View.showPromoConfirmation(promoTitle);
      });
    });
  },

  renderCart: (cartItems) => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart text-center py-5">
          <i class="fas fa-shopping-basket fa-4x mb-3" style="color: var(--primary-color); opacity: 0.5;"></i>
          <h4>Tu carrito está vacío</h4>
          <p class="text-muted">¡Agrega algunas pizzas deliciosas!</p>
        </div>
      `;
      cartTotal.textContent = 'Bs. 0.00';
      return;
    }
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItemsContainer.innerHTML = cartItems.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">Bs. ${item.price.toFixed(2)} c/u</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" data-action="decrease" data-id="${item.id}">
              <i class="fas fa-minus"></i>
            </button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" data-action="increase" data-id="${item.id}">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="cart-item-subtotal">Bs. ${(item.price * item.quantity).toFixed(2)}</div>
          <button class="cart-item-remove mt-2" data-remove-id="${item.id}">
            <i class="fas fa-trash me-1"></i>Eliminar
          </button>
        </div>
      </div>
    `).join('');
    
    cartTotal.textContent = `Bs. ${total.toFixed(2)}`;
    
    // Agregar event listeners para los botones de cantidad
    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.getAttribute('data-action');
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const change = action === 'increase' ? 1 : -1;
        Controller.updateQuantity(id, change);
      });
    });
    
    // Agregar event listeners para los botones de eliminar
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-remove-id'));
        Controller.removeFromCart(id);
      });
    });
  },

  showAddToCartAnimation: () => {
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
      cartBtn.style.animation = 'none';
      setTimeout(() => {
        cartBtn.style.animation = 'cartBounce 0.5s ease';
      }, 10);
    }
    
    // Mostrar notificación temporal
    View.showNotification('¡Producto agregado al carrito! 🍕');
  },

  showNotification: (message) => {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <i class="fas fa-check-circle me-2"></i>${message}
    `;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      animation: slideInRight 0.3s ease-out;
      font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  },

  showPromoConfirmation: (promoTitle) => {
    alert(`¡Genial! 🎉\n\nHas seleccionado: ${promoTitle}\n\nEn una aplicación real, aquí se aplicaría la promoción a tu pedido.`);
  }
};