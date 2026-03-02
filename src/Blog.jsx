import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getPosts } from './api/posts'
import { CreatePost } from './components/CreatePost'
import { PostFilter } from './components/PostFilter'
import { PostList } from './components/PostList'
import { PostSorting } from './components/PostSorting'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const { data: posts = [] } = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  return (
    <div className='max-w-lg p-8'>
      <CreatePost />
      <br />
      <hr />
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onChangeOrder={(value) => setSortOrder(value)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
