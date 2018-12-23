const userController = require('../controllers').user;
const postController = require('../controllers').post;
const semesterController = require('../controllers').semester;
const classController = require('../controllers')._class;

module.exports = (app) => {
  app.get('/api/signin', userController.signin);

  app.post('/api/user', userController.create);
  app.get('/api/user/:userId', userController.retrieve);
  app.get('/api/users', userController.list);
  app.put('/api/user/:userId', userController.update);
  app.delete('/api/user/:userId', userController.delete);

  app.post('/api/post', postController.create);
  app.get('/api/post/:postId', postController.retrieve);
  app.get('/api/posts', postController.list);
  app.put('/api/post/:postId', postController.update);
  app.delete('/api/post/:postId', postController.delete);

  app.post('/api/semester', semesterController.create);
  app.get('/api/semester/:semesterId', semesterController.retrieve);
  app.get('/api/semesters', semesterController.list);
  app.put('/api/semester/:semesterId', semesterController.update);
  app.delete('/api/semester/:semesterId', semesterController.delete);

  app.post('/api/class', classController.create);
  app.get('/api/class/:classId', classController.retrieve);
  app.get('/api/classes', classController.list);
  app.put('/api/class/:classId', classController.update);
  app.delete('/api/class/:classId', classController.delete);
}