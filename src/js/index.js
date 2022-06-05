// step2 요구사항 분석
// TODO localStorage Read & Write
// - [x] localStorage에 데이터를 저장
//   - [x] 메뉴 추가시
//   - [x] 메뉴 수정시
//   - [x] 메뉴 삭제시
// - [ ] localStorage에 있는 데이터를 읽어옴 (새로고침해도 데이터가 남아있게)

// TODO 메뉴판 관리
// - [ ] 에스프레소 메뉴판 관리
// - [ ] 프라푸치노 메뉴판 관리
// - [ ] 블렌디드 메뉴판 관리
// - [ ] 티바나 메뉴판 관리
// - [ ] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [ ] 페이지에 최초로 로딩될 때 localStorage에 에스프레소 메뉴를 읽어옴
// - [ ] 에스프레소 메뉴를 페이지에 그려줌

// TODO 품절 상태 관리
// - [ ] 품절 버튼 추가
// - [ ] 품절 버튼 클릭시 localStorage에 선택값이 저장
// - [ ] 품절 해당 메뉴의 상태 값이 페이지에 그려짐
// - [ ] 클릭 이벤트에서 가장 가까운 li 태그의 class 속성 값에 sold-out을 추가

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu)); // json -> string
  },
  getLocalStorage() {
    localStorage.getItem('menu');
  },
};

function App() {
  // 상태 (변하는 데이터): 메뉴명 (개수는 메뉴명으로부터 계산 가능)
  this.menu = [];

  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요');
      return;
    }

    const espressoMenuName = $('#espresso-menu-name').value;
    this.menu.push({ name: espressoMenuName }); // 상태 값을 로컬스토리지에 저장 -> 상태 변경시 바로 저장
    store.setLocalStorage(this.menu);
    const template = this.menu
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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

    $('#espresso-menu-list').innerHTML = template;
    updateMenuCount();
    $('#espresso-menu-name').value = '';
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    this.menu[menuId].name = updatedMenuName; // 이름 수정
    store.setLocalStorage(this.menu); // localStorage 수정 반영
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm('정말 삭제할까요?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu); // localStorage 삭제 반영
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

const app = new App();
