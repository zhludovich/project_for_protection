// cart-page.js - логика страницы корзины
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем счетчик при загрузке
    cartManager.updateCartCounter();
    
    // Загружаем товары в корзину
    loadCartItems();
    
    // Добавляем обработчики событий
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    document.getElementById('checkout-btn').addEventListener('click', checkout);
});

function loadCartItems() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartItems = cartManager.getCartItems();
    
    if (cartManager.isEmpty()) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>В корзине ничего нет</h2>
                <p>Ваша корзина пуста, пожалуйста выберите товары</p>
               
            </div>
        `;
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    }
    
    cartContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class = "left-details">
            <div class = 'helpnite1'>
            <img src="${item.image}" alt="${item.name}" class="item-image">
            </div>
            <div class = "helpnite">
            
                <div class="item-name"><b>Название -</b> ${item.name}</div>
                <div class="item-category">Категория ${item.category}</div>
            </div>
            </div>
            <div class="item-details">
                <div class="item-price">${item.price.toLocaleString('ru-RU')} ₽</div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">Удалить</button>
            </div>
        `;
        cartContainer.appendChild(cartItemElement);
    });
    
    // Добавляем обработчики для кнопок в корзине
    addCartEventListeners();
    updateCartSummary();
}

function addCartEventListeners() {
    // Кнопки "+"
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const item = cartManager.cart.find(item => item.id === productId);
            cartManager.updateQuantity(productId, item.quantity + 1);
            loadCartItems(); // Перезагружаем корзину
        });
    });
    
    // Кнопки "-"
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const item = cartManager.cart.find(item => item.id === productId);
            cartManager.updateQuantity(productId, item.quantity - 1);
            loadCartItems(); // Перезагружаем корзину
        });
    });
    
    // Кнопки "Удалить"
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            cartManager.removeProduct(productId);
            loadCartItems(); // Перезагружаем корзину
        });
    });
}

function updateCartSummary() {
    const totalItems = cartManager.getTotalItems();
    const subtotal = cartManager.getTotalPrice();
    const delivery = totalItems > 0 ? 2500 : 0;
    const vat = Math.round(subtotal * 0.1);
    const total = subtotal + delivery + vat;
    
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('subtotal').textContent = `${subtotal.toLocaleString('ru-RU')} ₽`;
    document.getElementById('delivery').textContent = `${delivery.toLocaleString('ru-RU')} ₽`;
    document.getElementById('vat').textContent = `${vat.toLocaleString('ru-RU')} ₽`;
    document.getElementById('total').textContent = `${total.toLocaleString('ru-RU')} ₽`;
}

function clearCart() {
    if (confirm('Вы уверены, что хотите очистить корзину?')) {
        cartManager.clearCart();
        loadCartItems();
    }
}

function checkout() {
    if (cartManager.isEmpty()) {
        alert('Корзина пуста!');
        return;
    }
    
    alert('Спасибо за заказ! В ближайшее время с вами свяжется наш менеджер.');
    cartManager.clearCart();
    loadCartItems();
}