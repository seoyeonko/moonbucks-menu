const BASE_URL = 'http://localhost:3000/api';
const MenuApi = {
  // 전체 메뉴 가져옴
  async getAllMenuByCategory(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`);
    return response.json();
  },
  // 메뉴 추가
  async createMenu(category, name) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }), // name: name
    });
    if (!response.ok) {
      console.error('에러가 발생했습니다', response);
    }
  },
  // 메뉴 수정
  async updateMenu(category, name, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!response.ok) {
      console.error('에러가 발생했습니다', response);
    }
    return response.json();
  },
  // 메뉴 품절 처리
  async toggleSoldOutMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      {
        method: 'PUT',
      }
    );
    if (!response.ok) {
      console.error('에러가 발생했습니다', response);
    }
  },
  // 메뉴 삭제
  async deleteMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      console.error('에러가 발생했습니다', response);
    }
  },
};

export default MenuApi;
