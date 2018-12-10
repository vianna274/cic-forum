const User = require('../models').User;
const Post = require('../models').Post;
module.exports = {
  create(req, res) {
    return User.create({ ...req.body })
      .then(user => res.status(201).send(user))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return User
      .findAll({
        include: [{
          model: Post,
          as: 'posts'
        }]
      })
      .then(users => res.status(200).send(users))
      .catch(err => res.status(400).send(err));
  },

  async retrieve(req, res) {
    try {
      let user = await User.findByPk(req.params.userId, {
        include: [{
          model: Post,
          as: 'posts'
        }]
      });

      if (!user) {
        return res.status(404).send({
          message: 'User Not Found'
        });
      }

      return res.status(200).send(user);
    } catch(err) {
      return res.status(400).send(err);
    }
  },

  async update(req, res) {
    try {
      let user = await Todo.findByPk(req.params.userId, {
        include: [{
          model: Post,
          as: 'posts'
        }]
      });

      if (!user) {
        return res.status(404).send({
          message: 'User Not Found'
        });
      }
      
      await user.update({ ...req.body });
      return res.status(200).send(user);
    } catch(err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    try {
      let user = await User.findByPk(req.params.userId);
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found'
        });
      }
      await user.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async signin(req, res) {
    try {
      let user = await User.findOne({
        where: {
          ...req.query
        },
        include: [{
          model: Post,
          as: 'posts'
        }]
      });

      if(!user) {
        return res.status(404).send({
          message: 'User Not Registered'
        });
      }
      return res.status(200).send(user);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};