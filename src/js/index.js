// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [x] 메뉴 이름 입력 -> enter 키 입력 추가
// - [x] 메뉴 이름 입력 -> 확인 버튼 클릭 입력 추가
// - [x] 추가되는 메누 마크업은 `ul#espresso-menu-list` 안에 삽입
// - [x] 총 메뉴 개수 count해 상단에 보이기
// - [x] 메뉴 추가시; input 빈 값으로 초기화
// - [x] 사용자 입력값이 빈 값; 추가되지 않음

// TODO 메뉴 수정
// - [x] 메뉴의 수정 버튼 클릭 이벤트; 메뉴 수정 모달창(prompt)
// - [x] 모달창에서 신규 메뉴명 입력; 확인 버튼 클릭 -> 메뉴 수정

// TODO 메뉴 삭제
// - [x] 메뉴의 삭제 버튼 클릭 이벤트; 메뉴 삭제 컨펌(confirm) 모달창
// - [x] 확인 버튼 클릭; 메뉴 삭제
// - [x] 총 메뉴 개수 count해 상단에 보이기

const $ = (selector) => document.querySelector(selector);

function App() {
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      const $menuName = e.target.closest('li').querySelector('.menu-name');
      const updatedMenuName = prompt(
        '메뉴명을 수정하세요',
        $menuName.innerText
      );
      $menuName.innerText = updatedMenuName;
    }

    if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('정말 삭제할까요?')) {
        e.target.closest('li').remove();
      }
      updateMenuCount();
    }
  });

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

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

  $('#espresso-menu-submit-button').addEventListener('click', () => {
    addMenuName();
  });

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

App();
