export async function getPosts(queryParams) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?${new URLSearchParams(
      queryParams,
    )}`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }

  return res.json()
}

export async function createPost(post) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  if (!res.ok) {
    throw new Error('Failed to create post!')
  }

  return res.json()
}

export async function updatePost(postId, updatedPost) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    },
  )

  if (!res.ok) {
    throw new Error('Failed to update post!')
  }

  return res.json()
}

export async function deletePost(postId) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
    {
      method: 'DELETE',
    },
  )

  if (!res.ok) {
    throw new Error('Failed to delete post!')
  }
}
