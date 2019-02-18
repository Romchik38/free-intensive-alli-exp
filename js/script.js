const cartWrapper = document.querySelector('.cart__wrapper'), //Корзина
    cart = document.querySelector('.cart'),
    close = document.querySelector('.cart__close'),
    open = document.querySelector('#cart'), // Получаем по id="cart"
    goodsBtn = document.querySelectorAll('.goods__btn'), //Все кнопки товаров которые есть на странице
    products = document.querySelectorAll('.goods__item'),
    confirm = document.querySelector('.confirm'),
    badge = document.querySelector('.nav__badge'), //колво товаров в корзине
    totalCost = document.querySelector('.cart__total > span'), //span внутри div  Общая стоимость
    titles = document.querySelectorAll('.goods__title');

//Открытие корзины
//Она есть, но display=none и не видна. Для открытия нужно показыть блок.
function openCart() {
    cart.style.display = 'block';
    document.body.style.overflow = 'hidden'; //Делаем так чтобы тело скролилось

}
//Закрытие корзины
function closeCart() {
    cart.style.display = 'none';
    document.body.style.overflow = ''; //Делаем так чтобы тело скролилось

}

open.addEventListener('click', openCart); //Клик на добавить в корзину
close.addEventListener('click', closeCart); //Клик на крестик для закрытия корзины

goodsBtn.forEach(function (btn, i) {
    btn.addEventListener('click', () => {
        let item = products[i].cloneNode(true),             //клонируем товар
            trigger = item.querySelector('button'),         //кнопка в клонируемом продукте
            removeBtn = document.createElement('div'),      //новый блок для помещения в верстку
            empty = cartWrapper.querySelector('.empty');    //сообщение в корзине что наша корзина пуста
             
            trigger.remove();       // удаляем добаваить в корзину
            //Крестик
            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';                 //комбинация которая добавляет крестик.
            item.appendChild(removeBtn);                    //добавление крестика в клонируемый продукт

            cartWrapper.appendChild(item);                  //добавление выбранного товара в корзину
            if (empty) {
                empty.remove();                             //удаление надписи ваша корзина пуста
            }
    })
})



//alert('code works');