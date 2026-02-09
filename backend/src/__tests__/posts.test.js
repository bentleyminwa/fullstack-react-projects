import { beforeEach, describe, expect, test } from '@jest/globals';
import mongoose from 'mongoose';
import { Post } from '../db/models/post.js';
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTags,
  updatePost,
} from '../services/posts.js';

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const postData = {
      title: 'Test Post',
      author: 'Lee Tester',
      content: 'This is a test post content.',
      tags: ['test', 'jest'],
    };

    const createdPost = await createPost(postData);
    console.log(createdPost);

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    const foundPost = await Post.findById(createdPost._id);
    expect(foundPost).toEqual(expect.objectContaining(postData));
    expect(foundPost.createdAt).toBeInstanceOf(Date);
    expect(foundPost.updatedAt).toBeInstanceOf(Date);
  });

  test('with missing title should fail', async () => {
    const postData = {
      author: 'Lee Tester',
      content: 'Post with no title.',
      tags: ['empty', 'title'],
    };

    try {
      await createPost(postData);
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain('`title` is required');
    }
  });

  test('with minimal parameters should succeed', async () => {
    const postData = {
      title: 'Only a title',
    };

    const createdPost = await createPost(postData);
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});

const samplePosts = [
  {
    title: 'First Post',
    author: 'Alice',
    content: 'Content A',
    tags: ['intro', 'welcome'],
  },
  {
    title: 'Second Post',
    author: 'Bob',
    content: 'Content B',
    tags: ['update'],
  },
  {
    title: 'Third Post',
    author: 'Alice',
    content: 'Content C',
    tags: ['news', 'update'],
  },
  { title: 'Fourth Post' },
];

let createdSamplePosts = [];

beforeEach(async () => {
  await Post.deleteMany({});

  createdSamplePosts = [];
  for (const post of samplePosts) {
    const createdPost = new Post(post);
    createdSamplePosts.push(await createdPost.save());
  }
});

describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts();

    expect(posts.length).toEqual(createdSamplePosts.length);
  });

  test('should return posts sorted by createdAt descending by default', async () => {
    const posts = await listAllPosts();
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    );

    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    );
  });

  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    });
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    );

    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    );
  });

  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Alice');
    const expectedPosts = createdSamplePosts.filter(
      (post) => post.author === 'Alice',
    );

    expect(posts.length).toEqual(expectedPosts.length);
  });

  test('should be able to filter posts by tags', async () => {
    const posts = await listPostsByTags('update');
    const expectedPosts = createdSamplePosts.filter((post) =>
      post.tags.includes('update'),
    );

    expect(posts.length).toEqual(expectedPosts.length);
  });
});

describe('getting a post', () => {
  test('should return a post by its ID', async () => {
    const post = await getPostById(createdSamplePosts[0]._id);
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject());
  });

  test('should fail if the post ID does not exist', async () => {
    const post = await getPostById('000000000000000000000000');
    expect(post).toEqual(null);
  });
});

describe('updating a post', () => {
  test('should update the specified property', async () => {
    await updatePost(createdSamplePosts[0]._id, { author: 'Test Author' });
    const updatedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(updatedPost.author).toEqual('Test Author');
  });

  test('should not update other properties', async () => {
    await updatePost(createdSamplePosts[0]._id, { author: 'Test Author' });
    const updatedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(updatedPost.title).toEqual(createdSamplePosts[0].title);
  });

  test('should update the updatedAt timestamp', async () => {
    await updatePost(createdSamplePosts[0]._id, { author: 'Test Author' });
    const updatedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    );
  });

  test('should fail if the post ID does not exist', async () => {
    const post = await updatePost('000000000000000000000000', {
      author: 'Test Author',
    });
    expect(post).toEqual(null);
  });
});

describe('deleting a post', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(createdSamplePosts[0]._id);
    expect(result.deletedCount).toEqual(1);

    const deletedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(deletedPost).toEqual(null);
  });

  test('should fail if the id does not exist', async () => {
    const result = await deletePost('000000000000000000000000');
    expect(result.deletedCount).toEqual(0);
  });
});
