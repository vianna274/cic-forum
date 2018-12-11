const Semester = require('../models').Semester;
const Class = require('../models').Class;
module.exports = {
  create(req, res) {
    return Semester.create({ ...req.body })
      .then(semester => res.status(201).send(semester))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Semester
      .findAll({
        include: [{
          model: Class,
          as: 'classes'
        }],
        order: [
          ['id', 'ASC']
        ]
      })
      .then(semesters => res.status(200).send(semesters))
      .catch(err => res.status(400).send(err));
  },

  async retrieve(req, res) {
    try {
      let semester = await Semester.findByPk(req.params.semesterId, {
        include: [{
          model: Class,
          as: 'classes'
        }]
      });

      if (!semester) {
        return res.status(404).send({
          message: 'Semester Not Found'
        });
      }
      
      return res.status(200).send(semester);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async update(req, res) {
    try {
      let semester = await Semester.findByPk(req.params.semesterId, {
        include: [{
          model: Class,
          as: 'classes'
        }]
      });

      if (!semester) {
        return res.status(404).send({
          message: 'Semester Not Found'
        });
      }

      await semester.update({ ...req.body });
      return res.status(200).send(semester);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    try {
      let semester = await Semester.findByPk(req.params.semesterId);
      if (!semester) {
        return res.status(404).send({
          message: 'Semester Not Found'
        });
      }
      await semester.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}