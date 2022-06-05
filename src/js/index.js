import { $ } from './utils/dom.js';
import store from './store/index.js';
import MenuApi from './api/index.js';

// step3
// TODO 서버 요청 부분
// - [x] 웹 서버를 띄운다.
// - [x] 서버에 새로운 메뉴명이 추가될 수 있도록 요청
// - [x] 카테고리별 메뉴 리스트를 불러옴
// - [x] 서버에 메뉴가 수정될 수 있도록 요청
// - [x] 서버에 메뉴의 품절 상태가 토글될 수 있도록 요청
// - [x] 서버에 메뉴가 삭제될 수 있도록 요청

// TODO 리팩터링 부분
// - [x] localStorage에 저장하는 로직은 지운다.
// - [x] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.

// TODO 사용자 경험
// - [ ] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert으로 예외처리를 진행한다.
// - [ ] 중복되는 메뉴는 추가할 수 없다.

function App() {
  // 상태 (변하는 데이터): 메뉴명, 현재 클릭된 카테고리 (개수는 메뉴명으로부터 계산 가능)
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';
  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    ); // [ {}, {}, {}, ... ]
    render();
    initEventListeners();
  };

  const render = async () => {
    // 1. 업데이트된 데이터 불러옴
    // this.menu[this.currentCategory]에 데이터를 바인딩해야 반영됨
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );

    // 2. 업데이트된 데이터를 렌더링
    const template = this.menu[this.currentCategory]
      .map((menuItem) => {
        return `<li data-menu-id="${
          menuItem.id
        }" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name ${
        menuItem.isSoldOut ? 'sold-out' : ''
      }">${menuItem.name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
      })
      .join(''); // 배열 형태로 된 li 태그들을 하나의 문자열 마크업으로
    // map(): ['<li></li>', '<li></li>', ... ]
    // join(''): <li></li><li></li>...

    $('#menu-list').innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  const addMenuName = async () => {
    if ($('#menu-name').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const menuName = $('#menu-name').value;

    // 메뉴 중복시 예외 처리
    const duplicatedItem = this.menu[this.currentCategory].find(
      (menuItem) => menuItem.name === $('#menu-name').value
    );
    if (duplicatedItem) {
      alert('이미 등록된 메뉴입니다. 다시 입력해 주세요');
      $('#menu-name').value = '';
      return;
    }

    // 1. 메뉴 추가
    await MenuApi.createMenu(this.currentCategory, menuName);
    // 2. 전체 메뉴 불러오기 (추가된 메뉴 포함)
    render();
    $('#menu-name').value = '';
  };

  const updateMenuName = async (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    // 1. 메뉴 수정
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);
    // 2. 전체 메뉴 불러오기 (수정된 메뉴 포함)
    render();
  };

  const removeMenuName = async (e) => {
    if (confirm('정말 삭제할까요?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      // 1. 메뉴 삭제
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      // 2. 전체 메뉴 불러오기 (삭제된 메뉴 반영)
      render();
    }
  };

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    // 1. 메뉴 품절 처리
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    // 2. 전체 메뉴 불러오기 (품절 처리된 메뉴 포함)
    render();
  };

  const changeCategory = (e) => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name');
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  };

  const initEventListeners = () => {
    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e);
        return;
      }

      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e);
        return;
      }

      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e);
        return;
      }
    });

    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('#menu-submit-button').addEventListener('click', addMenuName);

    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') {
        return;
      }
      addMenuName();
    });

    $('nav').addEventListener('click', changeCategory);
  };
}

const app = new App();
app.init(); // app이 instance로 띄워짐
