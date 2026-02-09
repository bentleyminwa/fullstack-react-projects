export function CreatePost() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className='space-y-3 max-w-lg'>
      <div className=''>
        <label htmlFor='create-title'>Title: </label>
        <input
          id='create-title'
          name='title'
          type='text'
          className='border border-gray-400 outline-none p-2'
        />
      </div>

      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          id='create-author'
          name='author'
          type='text'
          className='border border-gray-400 outline-none p-2'
        />
      </div>

      <div>
        <label htmlFor='create-content'>Content: </label>
        <textarea
          id='create-content'
          name='content'
          className='border border-gray-400 outline-none p-2 w-full'
        />
      </div>

      <button
        type='submit'
        className='bg-gray-500 text-white px-4 py-2 rounded'
      >
        Create Post
      </button>
    </form>
  )
}
