export const getLikes = () => {
    return fetch("http://localhost:8088/likes").then((res) =>
    res.json()
    )
}

export const getLikesByPostId = (postId) => {
    return fetch(`http://localhost:8088/likes?postId=${postId}`).then(
      (res) => res.json()
    );
  };

  export const updateLike = (like) => {
    // fetches and updates service ticket with id of ticket closed
    return fetch(`http://localhost:8088/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like),
    })
}