import Axios from 'axios';


const axiosInstance = Axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "3796a674-8052-4373-ae01-8c81619058d1_"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"

})

const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response => response.data));
    },
    followUser(id) {
        return axiosInstance.post(`follow/${id}`, {})
            .then((response => response.data.resultCode));
    },
    unfollowUser(id) {
        return axiosInstance.delete(`follow/${id}`)
            .then((response => response.data.resultCode));
    },

}
const profileAPI = {
    getUserProfile(userId) {
        return axiosInstance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return axiosInstance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return axiosInstance.put(`profile/status`, { status: status })
            .then((response) => response.data.resultCode);
    },
    savePhotoOnServer(file) {
        const formData = new FormData();
        formData.append('image', file);
        return axiosInstance.put(`profile/photo`, formData)
            .then((response) => response.data);
    },
    saveProfileOnServer(profile) {
        return axiosInstance.put(`profile`, profile);
    }
}
const authAPI = {
    auth() {
        return axiosInstance.get(`auth/me`)
            .then(response => response.data);
    },
    logIn(email, password, rememberMe, captcha) {
        return axiosInstance.post(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data);
    },
    logOut() {
        return axiosInstance.delete(`auth/login`)
            .then(response => response.data);
    }
}

const securityAPI = {
    getCaptcha() {
        return axiosInstance.get(`security/get-captcha-url`)
            .then(response => response.data);
    }
}
export { usersAPI, profileAPI, authAPI, securityAPI };
