import { initDatabase } from './db/init.js';
import { Post } from './db/models/post.js';

await initDatabase();

const post = new Post({
  title: 'My First Post',
  author: 'Daniel Bugl',
  content: 'This is the content of my first post.',
  tags: ['mongoose', 'mongodb', 'nodejs'],
});

const newPost = await post.save();
await Post.findByIdAndUpdate(newPost._id, {
  $set: { title: 'Updated Post Title' },
});

const posts = await Post.find({});
console.log('All Posts:', posts);
