export function obterToken() {
    return localStorage.getItem("token");
}

export function salvarToken(token: string) {
    localStorage.setItem("token", token);
}

export function removeToken() {
    localStorage.removeItem("token");
}