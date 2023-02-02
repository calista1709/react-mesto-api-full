import { apiConfig } from "./constants";

class Api {
  constructor(options) {
    this._host = options.baseUrl;
    this._headers = options.headers;
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, { 
      headers: this._headers
    })
      .then(this._getJsonOrError);
  }  

  setUserInfo(newInfo) {
    return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newInfo.name,
        about: newInfo.about
      })
    })
      .then(this._getJsonOrError);
  }

  changeAvatar(avatar) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
      .then(this._getJsonOrError);
  }

  getInitialCards() {
    return fetch(`${this._host}/cards`, {
      headers: this._headers
    })
      .then(this._getJsonOrError);
  }

  setCard(newPhoto) {
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newPhoto.name,
        link: newPhoto.link
      })
    })
      .then(this._getJsonOrError);
  }

  deleteCard(id) {
    return fetch(`${this._host}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getJsonOrError);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers
    })
      .then(this._getJsonOrError);
  }
}

const api = new Api(apiConfig);

export default api;

