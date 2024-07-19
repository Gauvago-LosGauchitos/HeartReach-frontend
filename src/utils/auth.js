export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const getLoggedUser = () => {
    const user = localStorage.getItem('userLogued');
    return user ? JSON.parse(user) : null;
}