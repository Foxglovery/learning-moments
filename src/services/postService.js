export const getAllPosts = () => {
  return fetch("http://localhost:8088/posts?_expand=topic&_expand=user").then(
    (res) => res.json()
  );
};

export const getPostById = (postId) => {
  return fetch(`http://localhost:8088/posts?id=${postId}&_&_expand=user&_expand=topic`).then(
    (res) => res.json()
  );
};

export const getPostsByUserId = (userId) => {
  return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=topic`).then(
    (res) => res.json()
  )
}

export const addNewPost = (post) => {
  return fetch(`http://localhost:8088/posts`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(post)
  })
}

export const deletePost = async (postId) => {
  const url = `http://localhost:8088/posts/${postId}`;

  const deleteOptions = {
      method: "DELETE",
  };

  await fetch(url, deleteOptions);
}

// what I had before
// export const getPostById = (postId) => {
//   return fetch(`http://localhost:8088/posts?id=${postId}&_expand=like&_expand=user&_expand=topic`).then(
//     (res) => res.json()
//   );
// };