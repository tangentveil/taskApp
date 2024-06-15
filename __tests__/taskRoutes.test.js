import request from 'supertest';
import app from '../in'; // Ensure the path is correct to your app entry file

describe('Task Routes', () => {
  let token;

  beforeAll(async () => {
    // Mock user login to get a token
    // Assume there's a user in the database with these credentials
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    token = res.body.token; // Adjust according to your login response structure
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Test Description'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Test Task');
  });

  it('should fetch tasks', async () => {
    const res = await request(app)
      .get('/tasks/get')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should update a task', async () => {
    const newTask = await request(app)
      .post('/tasks/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Task to Update',
        description: 'Description to Update'
      });
    const taskId = newTask.body._id;

    const res = await request(app)
      .put(`/tasks/update/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task',
        description: 'Updated Description'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Task');
  });

  it('should delete a task', async () => {
    const newTask = await request(app)
      .post('/tasks/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Task to Delete',
        description: 'Description to Delete'
      });
    const taskId = newTask.body._id;

    const res = await request(app)
      .delete(`/tasks/delete/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
