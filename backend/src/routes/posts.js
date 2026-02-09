import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTags,
  updatePost,
} from '../services/posts.js';

export function postsRouter(app) {
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, tag, author } = req.query;
    const sortOptions = { sortBy, sortOrder };

    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'Query by either author or tag, not both.' });
      } else if (author) {
        return res.json(await listPostsByAuthor(author, sortOptions));
      } else if (tag) {
        return res.json(await listPostsByTags(tag, sortOptions));
      } else {
        return res.json(await listAllPosts(sortOptions));
      }
    } catch (err) {
      console.error('Error listing posts', err);
      return res.status(500).end();
    }
  });

  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const post = await getPostById(id);
      if (post === null) return res.status(404).end();
      return res.json(post);
    } catch (err) {
      console.error(`Error fetching post with id ${id}`, err);
      return res.status(500).end();
    }
  });

  app.post('/api/v1/posts', async (req, res) => {
    try {
      const post = await createPost(req.body);
      return res.status(201).json(post);
    } catch (err) {
      console.error('Error creating post', err);
      return res.status(500).end();
    }
  });

  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body);
      return res.json(post);
    } catch (err) {
      console.error('Error updating post', err);
      return res.status(500).end();
    }
  });

  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const { deleteCount } = await deletePost(req.params.id);
      if (deleteCount === 0) return res.sendStatus(404);
      return res.status(204).end();
    } catch (err) {
      console.error('Error deleting post', err);
      return res.status(500).end();
    }
  });
}
