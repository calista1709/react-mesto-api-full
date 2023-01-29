const BASE_URL = 'https://api.calista709.nomoredomainsclub.ru';

function checkResOk(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'email': email
    })
  })
    .then(checkResOk)
};

export function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'email': email
    })
  })
    .then(checkResOk)
};

export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then(checkResOk)
}; 