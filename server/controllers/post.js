const Post = require('../models').Post;
const User = require('../models').User;

module.exports = {
  create(req, res) {
    return Post.create({ req..body })
      .then(post => res.status(201).send(post))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Post
      .all()
      .then(posts => res.status(200).send(posts))
      .catch(err => res.status(400).send(err));
  },

  async retrieve(req, res) {
    try {
      let post = await Post.findByPk(req.params.postId);

      if (!post) {
        return res.status(404).send({
          message: 'Post Not Found'
        });
      }
      
      return res.status(200).send(post);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  async update(req, res) {
    try {
      let post = await Post.findByPk(req.params.postId);

      if (!post) {
        return res.status(404).send({
          message: 'Post Not Found'
        });
      }

      await post.update({ ..req.body });
      return res.status(200).send(post);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  async delete(req, res) {
    try {
      let post = await Post.findByPk(req.params.postId);
      if (!post) {
        return res.status(404).send({
          message: 'Post Not Found'
        });
      }
      await post.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}