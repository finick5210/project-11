export default class Api {
    constructor(params) {
        const { baseUrl, headers } = params;

        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUser() {
        return fetch(`${this._baseUrl}users/me`, {
            headers: this._headers
        })
            .then(
                res => res.ok ? res.json() : Promise.reject(res)
            );
    }

    getCards() {
        return fetch(`${this._baseUrl}cards`, {
            headers: this._headers
        })
            .then(
                res => res.ok ? res.json() : Promise.reject(res)
            );
    }

    updateProfile(profileInfo) {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(profileInfo)
        }).then(
            res => res.ok ? res.json() : Promise.reject(res)
        );
    }

    addCard(card) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(card)
        }).then(
            res => res.ok ? res.json() : Promise.reject(res)
        );
    }
}
