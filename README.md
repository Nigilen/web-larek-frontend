# Проектная работа «Веб-ларек»

**СТЕК**: HTML, SCSS, TS, Webpack, ООП

**ДЕПЛОЙ**: [ссылка](https://nigilen.github.io/web-larek-frontend/)

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

![alt text](https://github.com/Nigilen/web-larek-frontend/blob/main/uml.png)


## Подход разработки
В данном проекте используется событийно-ориентированный подход, который предполагает, что взаимодействие между различными компонентами приложения осуществляется через обмен сообщениями, вызванными определенными событиями. 

Кроме того, в проекте используется модель MVP (Model-View-Presenter), которая разделяет приложение на три основных компонента: модель, представлениe и презентатор. Модель отвечает за работу с данными и бизнес-логикой, представление представляет собой интерфейс пользователя, а презентатор связывает модель и представление, обрабатывая события и передавая данные между ними. 

## Базовый код

### Класс `Model<T>`

Абстрактные класс дженерик, обощающий в себе конструктор и метод привязки события. 

**Конструктор:** 

- принимает на вход объект данных неявного типа и объект события типа `IEvent`.
- производит слияние входящего объекта с родительским

**Методы:** 

- `emmitChanges` — регистрирует входящее событие в `EventEmitter`

### Класс `Component<T>`

Абстрактные класс дженерик, обобщающий в себе конструктор и основные методы работы с компонентами отображения. 

**Конструктор:** 

- принимает на вход `container` типа `HTMLElement`

**Методы:** 

- `toggleClass` — метод переключения класса элемента
- `setDisabled` — метод блокировки кнопки
- `setText` — метод установки текста элемента
- `setImage` — метод установки изображения элемента и его `alt`
- `render` — метод слияния входящих данных и отрисовки элемента

### Класс `EventEmitter`

Класс `EventEmitter` обеспечивает работу событий. Функциональность класса стандартная: возможность установить/снять слушатели событий, вызвать слушателей при возникновении события. 

### Класс `Api`

Хранит основные поля и методы, необходимые при работе с сервером. 

Получает и хранит базовый url (`baseUrl`) и опции запроса (`options`). 

Методы позволяют обработать запрос, отправить и получить данные. 

## Компоненты модели данных (Model)

### Класс `LarekApi`

Основной класс работы с сетью в проекте. Расширяется базовым классом `Api`. 

**Конструктор**

- принимает передает в родительский конструктор `Api` поля `baseUrl` и `options`
- принимает и сохраняет входящий `url` запроса в `cdn`

**Поля**

- `cdn` — хранит входящий `url`

**Методы**

- `getProductList` — метод получения списка товаров с сервера
- `orderProducts` — метод отправки данных заказа на сервер

### Класс `AppState`

Является моделью данных приложения в целом. Данный класс содержит в себе все основные группы данных страницы и методы работы с ними. 

Тут распределяются данные частей приложения: каталог, превью, корзина, форма заказа,

Расширяется базовым абстрактным классом `Model<T>` по интерфейсу `IAppState`. 

```tsx
export interface IAppState {
  catalog: IProductItem[];
  preview: string;
  basket: string[];
  order: IOrder;
  total: string | number;
  loading: boolean;
}
```

**Поля**

- `catalog` — для данных списка товаров пришедших с сервера
- `preview` — для данных товара открытого в превью
- `basket` — для данных товаров добавленных в корзину
- `order` — для данных заказа, который отправляется на сервер
- `formErrors` — для ошибок валидации

**Методы**

- `clearBasket` — очистка данных корзины
- `addToOrder` — добавить товар в заказ
- `removeFromOrder` — удалить товар из заказа
- `setCatalog` — установить данные в каталог
- `setPreview` — установить данные в превью
- `setProductToBasket` — установить данные в корзину
- `removeProductToBasket` — удалить данные товара из корзины
- `get statusBasket` — получить статус корзины
- `get bskt` — получить данные товаров в корзине
- `set total` — установить сумму товаров в корзине
- `getTotal` — получить сумму товаров в корзине
- `setOrderField` — установить поле заказа
- `setContactsField` — установить поле контактов
- `validateOrder` — провести валидацию данных заказа
- `validateContacts` — провести валидацию данных контактов

### Класс `ProductItem`

Является моделью хранения данных товара: идентификатора, заголовка, описания, категории, изображения, цены. 

Расширяется базовым абстрактным классом `Model<T>` по интерфейсу `IProductItem`. 

```tsx
export interface IProductItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}
```

## Компоненты представления (View)

### Класс `Card`

Отвечает за отображение данных карточки товара в каталоге.  

Поля отвечают за связь с разметкой, методы за наполнение разметки данными. 

Расширяется базовым абстрактным классом `Component<T>` по интерфейсу  `ICard`

```tsx
interface ICard {
  title: string;
  category: string;
  image: string;
  price: number;
  text: string;
}
```

**Конструктор**

- принимает `container` типа `HTMLElement` и опциональный объект события `actions` типа `ICardActions`
    
    ```tsx
    interface ICardActions {
      onClick: (event: MouseEvent) => void;
    }
    ```
    
- передает `container` в родительский конструктор
- сохраняет необходимые элементы разметки в полях
- если объект `actions` был передан, то вешает слушатель клика на `container` с вызовом объекта события `actions`

**Поля**

- `_title` — хранит разметку заголовка карточки
- `_category` — хранит разметку категории карточки
- `_image` — хранит разметку изображения карточки
- `_price` — хранит разметку цены карточки
- `_categoryColor` — является словарем для дальнейшей модификации класса категории в зависимости от ее содержимого

**Методы**

- `set title` — установка содержимого заголовка
- `set category` — установка содержимого категории
- `set image` — установка содержимого изображения
- `set price` — установка содержимого цены

### Класс `CardPreview`

Отвечает за отображение данных карточки товара в превью.  

Поля отвечают за связь с разметкой, методы за наполнение разметки данными. 

Расширяется классом `Card<T>` по интерфейсу  `ICardPreview`

```tsx
interface ICardPreview {
  text: string;
}
```

**Конструктор**

- принимает `container` типа `HTMLElement` и опциональный объект события `actions` типа `ICardActions`
    
    ```tsx
    interface ICardActions {
      onClick: (event: MouseEvent) => void;
    }
    ```
    
- передает `container` и `actions` в родительский конструктор
- сохраняет необходимые элементы разметки в полях
- если объект `actions` был передан, то вешает слушатель клика на `_button` с вызовом объекта события `actions`, слушатель с `container` при этом удаляется

**Поля**

- `_text` — хранит разметку описания превью
- `_button` — хранит разметку кнопки превью

**Методы**

- `set text` — установка содержимого описания превью

### Класс `CardBasket`

Отвечает за отображение данных карточки товара в каталоге.  

Поля отвечают за связь с разметкой, методы за наполнение разметки данными. 

Расширяется базовым абстрактным классом `Component<T>` по интерфейсу  `ICardBasket`

```tsx
interface ICardBasket {
  title: string;
  price: number;
  index: number;
}
```

**Конструктор**

- принимает `container` типа `HTMLElement` и опциональный объект события `actions` типа `ICardActions`
    
    ```tsx
    interface ICardActions {
      onClick: (event: MouseEvent) => void;
    }
    ```
    
- передает `container` в родительский конструктор
- сохраняет необходимые элементы разметки в полях
- если объект `actions` был передан, то вешает слушатель клика на `_button` с вызовом объекта события `actions`, слушатель с `container` при этом удаляется

**Поля**

- `_title` — хранит разметку заголовка
- `_button` — хранит разметку кнопки удаления
- `_price` — хранит разметку цены
- `_index` — хранит разметку порядкового номера

**Методы**

- `set title` — установка содержимого заголовка
- `set index` — установка содержимого порядкового номера
- `set price` — установка содержимого цены

### Класс `Page`

Отвечает за отображение данных составляющих элементов страницы: каталог, корзина, счетчик товаров в корзине 

Поля отвечают за связь с разметкой, методы за наполнение разметки данными, а также метод закрытия/открытия для прокрутки страницы при открытии/закрытии модального окна. 

Расширяется базовым абстрактным классом `Component<T>` по интерфейсу  `IPage`

```tsx
interface IPage {
  catalog: HTMLElement[]
}
```

**Конструктор**

- принимает `container` типа `HTMLElement` и объект `event` типа `IEvent`
- передает `container` в родительский конструктор
- сохраняет необходимые элементы разметки в полях
- вешает на кнопку корзины `_basket` слушатель события `click`, при котором регистрируется событие `basket:open`

**Поля**

- `_counter` — хранит разметку счетчика товаров в корзине
- `_catalog` — хранит разметку каталога товаров
- `_wrapper` — хранит разметку обертки страницы
- `_basket` — хранит разметке кнопки корзины

**Методы**

- `set counter` — устанавливает значение в счетчике товаров корзины
- `set catalog` — устанавливает каталог
- `set locked` — устанавливает класс, препятствующий прокрутке страницы

### Класс `Modal`

Отвечает за отображение модального окна. 

По сути своей является «коробкой» для любого содержимого. Потому и имеет минимум полей и методов, которые связаны в основном с закрытием и открытием окна, а также наполнение его нужным контентом. 

Расширяется базовым абстрактным классом `Component<T>` по интерфейсу  `IModalData`

```tsx
interface IModalData {
  content: HTMLElement;
}
```

**Конструктор**

- принимает `container` типа `HTMLElement` и объект `event` типа `IEvent`
- передает `container` в родительский конструктор
- сохраняет необходимые элементы разметки в полях
- вешает слушатель `click` на кнопку закрытия `_closeButton` и `container` с методом закрытия окна `close` в качестве колбека
- вешает слушатель `click` на `content`,  для остановки распространения события при совершении клика на контенте модального окна. Иными словами — чтобы не закрыть окно при клике на его контент.

**Поля**

- `_closeButton` — разметка кнопки закрытия модального окна
- `_content` — разметка контейнера для контента модального окна

**Методы**

- `set content` — установить контент модального окна
- `open` — открыть модальное окно
- `close` — закрыть модальное окно
- `render` — отрисовать данные контента и открыть модальное окно

### Класс `Basket`

Отвечает за отображение корзины в модальном окне. Можно сказать, что служит контентом для модалки. Имеет возможность удаления позиции товара из корзины. 

Расширяется базовым абстрактным классом `Component<T>` по интерфейсу  `IBasket`

```tsx
interface IBasket {
  items: HTMLElement[];
  total: number;
}
```

**Конструктор**

- принимает `container` типа `HTMLElement` и объект `event` типа `IEvent`
- передает `container` в родительский конструктор
- сохраняет необходимые элементы разметки в полях
- если есть `button`, вешает на нее слушатель `click` с регистрацией события `order:open` в качестве колбека

**Поля**

- `_list` — хранит разметку обертки списка товаров
- `_total` — хранит разметку для суммы товаров
- `button` — хранит разметку кнопки перехода на шаг оформления заказа
- `items` — хранит список товаров в корзине

**Методы**

- `set items` — устанавливает товары в разметку `_list`
- `set total` — устанавливает значение суммы товаров

### Класс `Order`

Отвечает за отображение первого шага заказа в модальном окне. 

Расширяется классом `Form<T>` по интерфейсу  `IOrderForm`

```tsx
export interface IOrderForm {
  payment?: string;
  address?: string;
  phone?: string;
  email?: string;
  total?: string | number;
}
```

**Конструктор**

- принимает `container` типа `HTMLElement` и объект `event` типа `IEvent`
- передает `container` и `event` в родительский конструктор
- сохраняет необходимые элементы разметки в полях
- на кнопки выбора формы оплаты вешает слушатель `click` по которому методом `payment` производится установка класса активности на эту самую кнопку

**Поля**

- `_buttons` — хранит разметку кнопок формы оплаты

**Методы**

- `set payment` — устанавливает класс активности на кнопку
- `set address` — устанавливает значение поля адрес

### Класс `Contacts`

Отвечает за отображение второго шага заказа в модальном окне. 

Расширяется классом `Form<T>` по интерфейсу  `IOrderForm`

**Конструктор**

- принимает `container` типа `HTMLElement` и объект `event` типа `IEvent`
- передает `container` и `event` в родительский конструктор

**Методы**

- `set phone` — устанавливает значение поля телефона
- `set email` — устанавливает значение поля почты

### Класс `Form<T>`

Отвечает за основные способы работы с формой и ее валидацию. 

Класс является дженериком и принимает в переменной `T` тип данных компонента отображения. 

Расширяется базовым абстрактным классом `Component<T>` по интерфейсу  `IFormState`

```tsx
interface IFormState {
  valid: boolean;
  errors: string[];
}
```

**Конструктор**

- принимает `container` типа `HTMLElement` и объект `event` типа `IEvent`
- передает `container` и `event` в родительский конструктор
- сохраняет необходимые элементы разметки в полях
- вешает на `container` слушатель `input` при котором определяется поле воздействия, его имя и значение, которые после отправляются методу класса `onInputChange` в качестве аргументов
- вешает на `container` слушатель `submit` при котором происходит регистрация события с указанием имени `container`

**Поля**

- `_submit` — хранит разметку кнопки отправки формы
- `_errors` — хранит разметку вывода ошибок валидации

**Методы**

- `onInputChange` — регистрирует событие с именем конкретного поля
- `set valid` — метод установки валидности
- `set errors` — метод установки ошибки
- `render` — отрисовка формы и ее элементов

### Класс `Success`

Отвечает за отображение успешного оформления заказа в модальном окне. Можно сказать, что служит контентом для модалки. 

Расширяется базовым абстрактным классом `Component<T>` по интерфейсу  `ISuccess`

```tsx
interface ISuccess {
  total: number;
}
```

**Конструктор**

- принимает `container` типа `HTMLElement` и опциональный объект события `actions` типа `ISuccessActions`
    
    ```tsx
    interface ISuccessActions {
      onClick: () => void;
    }
    ```
    
- передает `container` в родительский конструктор
- сохраняет необходимые элементы разметки в полях
- если объект `actions` был передан, то вешает слушатель клика на `_close` с вызовом объекта события `actions`

**Поля**

- `_total` — разметка общей суммы товаров в заказе
- `_close` — разметка кнопки закрытия окна

**Методы**

- `set total` — установка значения общей суммы
