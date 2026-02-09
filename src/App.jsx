import { PostList } from './components/PostList'

import { CreatePost } from './components/CreatePost'
import { PostFilter } from './components/PostFilter'
import { PostSorting } from './components/PostSorting'

export function App() {
  const posts = [
    {
      title: 'Full-Stack React Projects',
      contents: "Let's become full-stack developers!",
      author: 'Daniel Bugl',
    },
    { title: 'Hello React!' },
  ]
  return (
    <div className='max-w-lg p-8'>
      <CreatePost />
      <br />
      <hr />
      <PostFilter field='author' />
      <br />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
