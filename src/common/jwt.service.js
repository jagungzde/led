const ID_TOKEN_KEY = "myToken";

export const getToken = () => {
    var tokenObject = JSON.parse(localStorage.getItem(ID_TOKEN_KEY));
    return tokenObject;
};

export const saveToken = token => {
    window.localStorage.setItem(ID_TOKEN_KEY, JSON.stringify(token));
};

export const destroyToken = () => {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
