const Class = require('../models').Class;
const Post = require('../models').Post;

module.exports = {
  create(req, res) {
    return Class.create({ ...req.body })
      .then(_class => res.status(201).send(_class))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Class
      .findAll({
        include: [{
          model: Post,
          as: 'posts'
        }],
        order: [
          ['id', 'ASC']
        ]
      })
      .then(classes => res.status(200).send(classes))
      .catch(err => res.status(400).send(err));
  },

  async retrieve(req, res) {
    try {
      let _class = await Class.findByPk(req.params.classId, {
        include: [{
          model: Post,
          as: 'posts'
        }]
      });

      if (!_class) {
        return res.status(404).send({
          message: 'Class Not Found'
        });
      }
      
      return res.status(200).send(_class);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async update(req, res) {
    try {
      let _class = await Class.findByPk(req.params.classId, {
        include: [{
          model: Post,
          as: 'posts'
        }]
      });

      if (!_class) {
        return res.status(404).send({
          message: 'Class Not Found'
        });
      }

      await _class.update({ ...req.body });
      return res.status(200).send(_class);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    try {
      let _class = await Class.findByPk(req.params.classId);
      if (!_class) {
        return res.status(404).send({
          message: 'Class Not Found'
        });
      }
      await _class.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}