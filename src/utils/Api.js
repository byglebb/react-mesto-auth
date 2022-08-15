class Api {
  constructor({ url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    this.urlCards = this.url + `/cards`;
    return fetch(this.urlCards, {
      headers: this.headers
    })
      .then(this.handleResponse)
  }

  addCard(objectValues) {
    return fetch(this.urlCards, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(objectValues)
    })
      .then(this.handleResponse)
  }

  getUserInfo() {
    this.urlInfo = this.url + `/users/me`;
    return fetch(this.urlInfo, {
      headers: this.headers
    })
      .then(this.handleResponse)
  }

  setUserInfo(objectValues) {
    return fetch(this.urlInfo, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(objectValues)
    })
      .then(this.handleResponse);
  }

  toggleLikeButton(id, isLiked) {
    return fetch(this.urlCards + `/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  deleteCard(id) {
    return fetch(this.urlCards + `/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  updateAvatar(objectValues) {
    return fetch(this.urlInfo + `/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(objectValues)
    })
      .then(this.handleResponse);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'a2bace0a-be7d-4cc4-8ecd-6f5d9788fa19',
    'Content-Type': 'application/json'
  }
});

export default api;