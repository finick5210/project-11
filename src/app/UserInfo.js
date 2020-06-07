import { addClass } from '../utils/Utils';

export default class UserInfo {
    setUserInfo(name, job, avatar) {
        this.name = name;
        this.job = job;
        this.avatar = avatar;
    }

    // Можно лучше: Ссылки на эти dom-элементы можно сохранить в this в методе create,
    // таким образом не будет нужды их передавать каждый раз в метод.
    updateUserInfo(nameElement, jobElement, avatarElement) {
        nameElement.textContent = this.name;
        jobElement.textContent = this.job;
        avatarElement.setAttribute('style', 'background-image: url(' + this.avatar + ')');
    }

    create(rootElement) {
        const userPhoto = document.createElement('div');
        const userData = document.createElement('div');
        const userInfoButton = document.createElement('button');
        const userName = document.createElement('h1');
        const userJob = document.createElement('p');
        const editButton = document.createElement('button');

        userName.textContent = this.name;
        userJob.textContent = this.job;
        editButton.innerHTML = 'Edit';
        userInfoButton.innerHTML = '+';

        addClass(userPhoto, 'user-info__photo');
        addClass(userData, 'user-info__data');
        addClass(userInfoButton, 'button');
        addClass(userInfoButton, 'user-info__button');
        addClass(userName, 'user-info__name');
        addClass(userJob, 'user-info__job');
        addClass(editButton, 'user-info__edit-button');

        userPhoto.setAttribute('style', 'background-image: url(' + this.avatar + ')');

        userData.appendChild(userName);
        userData.appendChild(userJob);
        userData.appendChild(editButton);

        rootElement.appendChild(userPhoto);
        rootElement.appendChild(userData);
        rootElement.appendChild(userInfoButton);
    }
}
