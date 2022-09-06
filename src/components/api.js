const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
    headers: {
      authorization: '1939a454-f819-4dfe-a512-f506105c67c3',
      'Content-Type': 'application/json',
    }
  }
  
export function deletePlace(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) =>{
        console.log(err);
      })  
  }

export function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
  })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) =>{
          console.log(err);
      })  
  }
  
export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
  })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) =>{
            console.log(err);
        })  
  }

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
      })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) =>{
            console.log(err);
        })  
}


export function submitProfileForm(nameInput, jobInput) {
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
  })
})
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) =>{
            console.log(err);
        })  
}


export function submitPlaceForm(namePlaceInput, imageInput) {
    return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: namePlaceInput.value,
        link: `${imageInput.value}`
  })
})
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) =>{
            console.log(err);
        })  
}

export function changeAvatar(avatarInput) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${avatarInput.value}`,
    })})
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) =>{
            console.log(err);
        })  
}

export function renderProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) =>{
                console.log(err);
            })  
    }
