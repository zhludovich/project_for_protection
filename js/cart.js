// cart.js - общие функции для управления корзиной
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }
    
    // Добавить товар в корзину
    addProduct(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCounter();
        this.showNotification('Товар добавлен в корзину!');
    }
    
    // Удалить товар из корзины
    removeProduct(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCounter();
    }
    
    // Обновить количество товара
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeProduct(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartCounter();
            }
        }
    }
    
    // Очистить всю корзину
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCounter();
    }
    
    // Получить общее количество товаров
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Получить общую стоимость
    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Сохранить корзину в LocalStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    
    // Обновить счетчик в шапке сайта
    updateCartCounter() {
        const totalItems = this.getTotalItems();
        
        // Обновляем ВСЕ счетчики на странице
        const counters = document.querySelectorAll('.cart-count, #counter_p, .cart-counter');
        counters.forEach(counter => {
            counter.textContent = totalItems;
        });
        
    }
    
    // Показать уведомление
    showNotification(message) {
        // Можно добавить красивые уведомления
        console.log(message);
        // Или показать alert для простоты
        // alert(message);
    }
    
    // Получить все товары корзины
    getCartItems() {
        return this.cart;
    }
    
    // Проверить пуста ли корзина
    isEmpty() {
        return this.cart.length === 0;
    }
}

// Создаем глобальный экземпляр менеджера корзины
const cartManager = new CartManager();