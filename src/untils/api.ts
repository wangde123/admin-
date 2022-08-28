import http from "./http";
export const getData = (params: object) => http.get("/api/students/list", params)
export const getDel = (data: object) => http.post("/api/students/del", data)
export const getAdd = (data: object) => http.post("/api/students/add", data)
export const upDate = (data: object) => http.post("/api/students/update", data)
export const getKeyApi = (params?: object) => http.get("/api/users/key", params)
export const loginApi = (data?: object) => http.post("/api/users/login", data)


