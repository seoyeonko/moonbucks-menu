// step2 요구사항 분석
// TODO localStorage Read & Write
// - [ ] localStorage에 데이터를 저장
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

function App() {
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
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
    };

    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(espressoMenuName)
    );
    updateMenuCount();
    $('#espresso-menu-name').value = '';
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm('정말 삭제할까요?')) {
      e.target.closest('li').remove();
    }
    updateMenuCount();
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

App();
