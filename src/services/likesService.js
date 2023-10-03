export const getLikes = () => {
    return fetch("http://localhost:8088/likes").then((res) =>
    res.json()
    )
}