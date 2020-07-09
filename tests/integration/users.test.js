const request = require('supertest');
const User = require('../../models/user');
let server;

describe('/api/users', () => {
  beforeEach(() => {
    server = require('../../app');
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });

  describe('GET', () => {
    it('should return all genres', async () => {
      const users = [
        {
          name: 'asdf1',
          email: 'asdf2',
        },
        {
          name: 'zxcv3',
          email: 'zxcv4',
        },
      ];
      User.collection.insertMany(users);

      const res = await request(server).get('/api/users');
      console.log(res.body);
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(d => { return d === 'asdf1' }));
      expect(res.body.some(d => { return d === 'zxcv3' }));
    });
  });

  describe('GET/:id', () => {
    it('should return the user with the given id', async () => {
      const user = new User({ name: 'a', email: 'b' });
      await user.save();

      const res = await request(server).get(`/api/users/${user._id}`)
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', user.name);
    });
  });

  describe('POST', () => {
    it('should add a user', async () => {
      const body = { name: 'a', email: 'b' };

      const res = await request(server)
        .post('/api/users/')
        .send(body);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'a');
      expect(res.body).toHaveProperty('email', 'b');
    });
  });

  describe('PUT/:id', () => {
    it('should update a user', async () => {
      const user = new User({ name: 'a', email: 'b' });
      await user.save();
      const id = user._id;

      const res = await request(server)
        .put(`/api/users/${id}`)
        .send({ name: 'c', email: 'b' });
 
      expect(res.body).toHaveProperty('name', 'c');
    });
  });

  describe('DELETE/:id', () => {
    it('should delete a user', async () => {
      const user = new User({ name: 'a', email: 'b' });
      await user.save();
      const id = user._id;
  
      await request(server)
        .delete(`/api/users/${id}`);
        
      const deletedUser = await User.findById(id);
  
      expect(deletedUser).toBeNull();
    });
  });
});
