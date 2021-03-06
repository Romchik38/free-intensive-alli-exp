window.addEventListener('DOMContentLoaded', () => {
    //GET запрос
    //fetch('https://jsonplaceholder.typicode.com/todos/1')
    //    .then(response => response.json())
    //    .then(json => console.log(json));

    //POST запрос
    //const exaple = {
    //    name: "Ivan"
    //}
    //fetch('https://jsonplaceholder.typicode.com/posts', {
    //        method: "POST",
    //        body: JSON.stringify(exaple)
    //    })
    //    .then(response => response.json())
    //    .then(json => console.log(json));

    const loadContent = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            //.then(json => createElement(json.goods));         если url = 'js/db.json'
            .then(json => createElement(json));              // если url = 'http://localhost:3000/goods'
        callback();
    }
    //Обработка массива json
    function createElement(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');
        //Создание товаров
        arr.forEach(function (item) {
            let card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
                    <img class="goods__img" src="${item.url}" alt="phone">
                    <div class="goods__colors">Доступно цветов: 4</div>
                    <div class="goods__title">
                        ${item.title}
                    </div>
                    <div class="goods__price">
                        <span>${item.price}</span> грн/шт
                    </div>
                    <button class="goods__btn">Добавить в корзину</button>
        `;
            goodsWrapper.appendChild(card);
        })
    }
    let url = 'http://localhost:3000/goods';
    loadContent(url, () => {
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
                let item = products[i].cloneNode(true), //клонируем товар
                    trigger = item.querySelector('button'), //кнопка в клонируемом продукте
                    removeBtn = document.createElement('div'), //новый блок для помещения в верстку
                    empty = cartWrapper.querySelector('.empty'); //сообщение в корзине что наша корзина пуста

                trigger.remove(); // удаляем добаваить в корзину
                showConfirm(); //вызывается анимация корзинки 
                //Крестик
                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times'; //комбинация которая добавляет крестик.
                item.appendChild(removeBtn); //добавление крестика в клонируемый продукт

                cartWrapper.appendChild(item); //добавление выбранного товара в корзину
                if (empty) {
                    empty.remove(); //удаление надписи ваша корзина пуста
                }
                calcGoods(); //подсчет колва в корзине
                calcTotal(); //обновление суммы в корзине
                removeFromCart() // добавление клика на крестик
            })
        })

        //Обрезать заголовки товаров
        function sliceTitle() {
            titles.forEach(function (item) {
                if (item.textContent.length < 70) { //innerHTML-если есть теги то отображает их    textContent-просто текст.
                    return; //ничего не делаем
                } else {
                    const str = item.textContent.slice(0, 71) + '...'; //первый 70 символов
                    item.textContent = str;
                }
            })
        }
        sliceTitle();

        //проигрывание анимации при добавлении в корзину
        function showConfirm() {
            confirm.style.display = 'block';
            let counter = 100;
            const id = setInterval(frame, 10); //запуск анимации каждые 10 милисекунд
            function frame() {
                if (counter == 10) {
                    clearInterval(id);
                    confirm.style.display = 'none';
                } else {
                    counter--;
                    confirm.style.transform = `translateY(-${counter}px)`; //сдвигаться вверх по оси Y.  Свойство css
                    confirm.style.opacity = '.' + counter; //корзинка осчезает
                }

            }
        }

        //Обновлять счетчик товаров
        function calcGoods() { //1 увеличивает корзину, -1 уменьшает корзину
            const item = cartWrapper.querySelectorAll('.goods__item'); //получени колва элементов в коризне
            badge.textContent = item.length; //колво товаров помещается в корзину
        }

        //Подсчет суммы 
        function calcTotal() {
            const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span'); //получить массив цен товаров
            let total = 0;
            prices.forEach(function (item) {
                total += +item.textContent; //суммируем цены
            })
            totalCost.textContent = total;
            //Добавление надписи Ваша корзина пуста
            if (total == 0 && !document.querySelector('.empty')) {
                let empty = document.createElement('div');
                empty.classList.add('empty');
                empty.innerHTML = 'Ваша корзина пока пуста';
                cartWrapper.appendChild(empty);
            }
        }

        //Удаление из корзины
        function removeFromCart() {
            const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove'); //получили массив всех товаров в корзине
            removeBtn.forEach(function (btn) {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove(); //удаление всего родительского элемента
                    calcGoods();
                    calcTotal();
                });
            })

        }
    });
})