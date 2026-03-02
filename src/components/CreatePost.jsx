import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3 max-w-lg'>
      <div className=''>
        <label htmlFor='create-title'>Title: </label>
        <input
          id='create-title'
          name='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border border-gray-400 outline-none p-2'
        />
      </div>

      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          id='create-author'
          name='author'
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border border-gray-400 outline-none p-2'
        />
      </div>

      <div>
        <label htmlFor='create-content'>Content: </label>
        <textarea
          id='create-content'
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='border border-gray-400 outline-none p-2 w-full'
        />
      </div>

      <button
        type='submit'
        disabled={!title || createPostMutation.isPending}
        className='bg-gray-500 text-white px-4 py-2 rounded'
      >
        {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
      </button>

      {/* post creation success message */}
      {createPostMutation.isSuccess ? (
        <p className='text-green-500 pt-3'>Post created successfully!</p>
      ) : null}
    </form>
  )
}
