'use strict';

/* Тестовые данные */

const authors = [
  {
    key: 'А',
    items: [
      {
        author: 'Адамс Гай',
        books: [
          {
            genre: 'Детские книги',
            title: 'Очень добрая история',
            year: '2020',
            img: 'book-cover-345.jpg',
            price: '560 ₽',
            summary: 'Мудрая и добрая сказка, в которой просто и проникновенно говорится о самом важном: о дружбе, любви, о том, как важно помогать друг другу. Книга знакомит читателя с историей девочки Анны, которая приехала в маленький угрюмый городок. Своими поступками она запустила цепочку добрый дел и подружила всех жителей города, которые уже и забыли, как радоваться жизни.',
          },
          {
            genre: 'Детские книги',
            title: 'Чудище по имени Лень',
            year: '2019',
            img: 'book-cover-348.jpg',
            price: '480 ₽',
            summary: 'Сказка о необычном чудовище, которое иногда приходит ко всем. Герои сказки узнают, что это самая обычная лень, которая живёт в каждом из нас. На борьбу с ленью они приглашают звёздного мага, который способен победить чудовище.',
          },
          {
            genre: 'Детские книги',
            title: 'Загадка таинственного озера',
            year: '2018',
            img: 'book-cover-347.jpg',
            price: '630 ₽',
            summary: 'Тайну этого озера не могут разгадать уже много лет. Но оно совсем не страшное, а наоборот, с волшебной и чистой водой, способной дать силу и уставшему путнику и раненому зверю.',
          },
        ],
      },
      {
        author: 'Агутин Леонид',
        books: [
          {
            genre: 'Детские книги',
            title: 'Лесной оркестр',
            year: '2019',
            img: 'book-cover-346.jpg',
            price: '1100 ₽',
            summary: 'Все жители леса объединились, чтобы устроить Мишке сюрприз на День Рождения. Что же было подарком на День Рождения и как отметили этот день лесные жители.',
          },
          {
            genre: 'Художественная литература',
            title: 'Хранитель снов',
            year: '2016',
            img: 'book-cover-353.jpg',
            price: '460 ₽',
            summary: 'Происходит ужасное – у всех людей в мире пропали добрые сны и мечты. На помощь приходит хранитель снов. Но ему не обойтись без помощи своих юных друзей.',
          },
        ],
      },
    ],
  },
  {
    key: 'Б',
    items: [
      {
        author: 'Белицкая Светлана',
        books: [
          {
            genre: 'Хобби и досуг',
            title: 'Беззаботная лама',
            year: '2017',
            img: 'book-cover-350.jpg',
            price: '460 ₽',
            summary: 'Легкая и юмористическая история о ламе, которую ничего никогда не заботит. У нее все всегда хорошо. Ничто на свете не может огорчить беззаботную ламу.',
          },
        ],
      },
    ],
  },
  {
    key: 'В',
    items: [
      {
        author: 'Вагнер Марк',
        books: [
          {
            genre: 'Художественная литература',
            title: 'Единорожка',
            year: '2015',
            img: 'book-cover-354.jpg',
            price: '760 ₽',
            summary: 'Приключения забавного и неуклюжего единорожки Лилу, который отправился на поиски друзей. Добрая и поучительная история, полная забавных приключений.',
          },
        ],
      },
    ],
  },
  {
    key: 'Г',
    items: [],
  },
  {
    key: 'Д',
    items: [],
  },
  {
    key: 'Е',
    items: [],
  },
  {
    key: 'Ё',
    items: [],
  },
  {
    key: 'Ж',
    items: [],
  },
  {
    key: 'И',
    items: [],
  },
  {
    key: 'Й',
    items: [],
  },
  {
    key: 'К',
    items: [],
  },
  {
    key: 'Л',
    items: [],
  },
  {
    key: 'М',
    items: [],
  },
  {
    key: 'Н',
    items: [],
  },
  {
    key: 'О',
    items: [],
  },
  {
    key: 'П',
    items: [],
  },
  {
    key: 'Р',
    items: [],
  },
  {
    key: 'С',
    items: [],
  },
  {
    key: 'Т',
    items: [],
  },
  {
    key: 'У',
    items: [],
  },
  {
    key: 'Ф',
    items: [],
  },
  {
    key: 'Х',
    items: [],
  },
  {
    key: 'Ц',
    items: [],
  },
  {
    key: 'Ч',
    items: [],
  },
  {
    key: 'Ш',
    items: [],
  },
  {
    key: 'Щ',
    items: [],
  },
  {
    key: 'Ы',
    items: [],
  },
  {
    key: 'Э',
    items: [],
  },
  {
    key: 'Ю',
    items: [],
  },
  {
    key: 'Я',
    items: [],
  },
];

const navContainer = document.querySelector('.site-nav');
const authorsContainer = document.querySelector('.authors');
const booksContainer = document.querySelector('.books');

const addChildElementsFromString = (parent, domString) => {
  parent.innerHTML = '';
  parent.insertAdjacentHTML('beforeend', domString);
};

const createNavItemString = ({key, items}) => {
  return `
  <li class="site-nav-item">
    <a class="site-nav-link" ${items.length > 0 ? `href="#${key}"` : ''}>${key}</a>
  </li>
  `
};

const createSectionString = ({key, items}) => {
  return `
  <section class="authors-section">
    <h2 id="${key}">${key}</h2>
    <ul class="author-list">
      ${items.map(({author, books}) => {
        const declension = window.getDeclension({count: books.length, one: 'книга', few: 'книги', many: 'книг'});
        return `
        <li class="author-item">
          <a class="author-link" data-value="${author}" href="#">
            <h3>${author}</h3>
            <p>${declension}</p>
          </a>
        </li>
        `;
      }).join('')}
    </ul>
  </section>
  `;
};

const createEmptyBooksString = () => {
  return `
    <h2>Книги</h2>
    <p>Нажмите на автора, чтобы посмотреть список его книг</p>
  `;
};

const createBooksString = ({author, books}) => {
  return `
    <h2>${author}</h2>
    <ul class="book-list">
      ${books.map(({title, year, img, price, summary}) => {
        return `
        <li class="book-item">
          <article class="book">
            <img src="img/${img}" width="95" height="130" alt="${title}">
            <div class="title-wrapper">
              <h3>${title}</h3>
              <p class="year">${year}</p>
            </div>
            <p class="price">${price}<a class="cart" href="#">Купить</a></p>
            <p class="description short">${summary}</p>
            <a class="more" href="#">Читать дальше</a>
          </article>
        </li>
        `;
      }).join('')}
    </ul>
  `;
};

const render = () => {
  const navElementString = authors.map(createNavItemString).join('');
  const authorsElementsString = authors.map(createSectionString).join('');
  const emptyBooksElementString = createEmptyBooksString();
  
  addChildElementsFromString(navContainer, navElementString);
  addChildElementsFromString(authorsContainer, authorsElementsString);
  addChildElementsFromString(booksContainer, emptyBooksElementString);
}

const authorClickHandler = (evt) => {
  const element = evt.target.closest('a');
  if (!element) {
    return;
  }
  evt.preventDefault();
  
  const {value} = element.dataset;
  
  const authorsGroup = authors.find(({key}) => value.toUpperCase().indexOf(key.toUpperCase()) === 0);
  
  if (authorsGroup && authorsGroup.items) {
    const currentAuthor = authorsGroup.items.find((item) => item.author === value);
    
    if (currentAuthor) {
      const booksString = createBooksString(currentAuthor);
      
      addChildElementsFromString(booksContainer, booksString);
    }
  }
};

const moreLinkClickHandler = (evt) => {
  const element = evt.target.closest('a.more');
  if (!element) {
    return;
  }
  evt.preventDefault();
  
  const bookContainer = element.closest('.book');
  const descriptionElement = bookContainer.querySelector('.description');
  
  if (descriptionElement) {
    descriptionElement.classList.toggle('short');
    element.textContent = descriptionElement.classList.contains('short') ? 'Читать дальше' : 'Скрыть описание';
  }
};

const navItemsClickHandler = (evt) => {
  const element = evt.target.closest('a');
  if (!element) {
    return;
  }
  evt.preventDefault();
  
  const blockId = element.getAttribute('href');
  
  if (blockId && blockId !== '#') {
    const block = document.querySelector(blockId);
    
    if (block) {
      block.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
  
};

const init = () => {
  render();
  
  authorsContainer.addEventListener('click', authorClickHandler);
  booksContainer.addEventListener('click', moreLinkClickHandler);
  navContainer.addEventListener('click', navItemsClickHandler);
};

init();
