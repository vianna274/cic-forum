const userController = require('../controllers').user;
const postController = require('../controllers').post;

module.exports = (app) => {
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
}