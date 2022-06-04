// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [ ] 메뉴 이름 입력 -> enter 키 입력 추가
// - [ ] 추가되는 메누 마크업은 `ul#espresso-menu-list` 안에 삽입
// - [ ] 총 메뉴 개수 count해 상단에 보이기
// - [ ] 메뉴 추가시; input 빈 값으로 초기화
// - [ ] 사용자 입력값이 빈 값; 추가되지 않음

const $ = (selector) => document.querySelector(selector);

function App() {
  // form 태그가 자동으로 전송되는 것을 막아줌
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // 메뉴 입력 받기
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
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
    }
  });
}

App();

// TODO 메뉴 수정
// - [ ] 메뉴의 수정 버튼 클릭 이벤트; 메뉴 수정 모달창
// - [ ] 모달창에서 신규 메뉴명 입력; 확인 버튼 클릭 -> 메뉴 수정

// TODO 메뉴 삭제
// - [ ] 메뉴의 삭제 버튼 클릭 이벤트; 메뉴 삭제 컨펌 모달창
// - [ ] 확인 버튼 클릭; 메뉴 삭제
// - [ ] 총 메뉴 개수 count해 상단에 보이기
