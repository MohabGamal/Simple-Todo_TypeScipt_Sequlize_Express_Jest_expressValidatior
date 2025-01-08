import request from 'supertest';
import app from '../src/app';
import { TodoInstance } from '../src/todo/model';

// test create todo endpoint
describe('create todo', () => {
  const todo = {
    title: 'Create todo',
  };

  test('should respond with a todo record and successful creation message', async () => {
    // Create a mock function that returns the 'todo' object
    const mockCreateTodo = jest.fn((): any => todo);
    // Replace the 'create' method of the 'TodoInstance' object with the mock function
    jest.spyOn(TodoInstance, 'create').mockImplementation(mockCreateTodo);

    /* Test the '/create' endpoint but skip the 'create' method that modifies the database
       and use the mock function instead 
       so it is just testing the endpoint only */
    const res = await request(app).post('/create').send(todo);

    expect(mockCreateTodo).toHaveBeenCalled();
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('record');
  });

  test('should handle todo creation error', async () => {
    // Create a mock function that throws an error
    const mockCreateTodo = jest.fn((): any => {
      throw 'error';
    });
    jest.spyOn(TodoInstance, 'create').mockImplementation(mockCreateTodo);

    const res = await request(app).post('/create').send({ title: 'test' });
    expect(mockCreateTodo).toHaveBeenCalled();
    expect(res.statusCode).toEqual(500);
    expect(res.body.msg).toEqual('Error creating record');
  });

  test('should check that title exists in request body', async () => {
    const res = await request(app).post('/create').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');

    const errors = res.body.errors;
    expect(errors.some((error: any) => error.msg === 'Title is required')).toBe(
      true
    );
  });

  test('should check that completed is 0 or false in request body', async () => {
    const res = await request(app).post('/create').send({ completed: 5 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');

    const errors = res.body.errors;
    const isErrorFound = errors.some(
      (error: any) => error.msg === 'completed must inistatiated with false'
    );
    expect(isErrorFound).toBe(true);
  });
});

// test read many todo endpoint
describe('read many todos', () => {
  test('should return array of records', async () => {
    const res = await request(app).get('/read?limit=2&offset=0');
    expect(res.statusCode).toEqual(200);
    expect(res.body.records).toBeInstanceOf(Array);
    expect(res.body.msg).toEqual('Records fetched successfully');
  });

  test('should handle todo read error', async () => {
    const mockReadTodos = jest.fn((): any => {
      throw 'error';
    });
    jest.spyOn(TodoInstance, 'findAll').mockImplementation(mockReadTodos);

    const res = await request(app).get('/read?limit=2&offset=0');
    expect(mockReadTodos).toHaveBeenCalled();
    expect(res.statusCode).toEqual(500);
    expect(res.body.msg).toEqual('Error fetching records');
  });

  test('should check that limit exists in request query', async () => {
    const res = await request(app).get('/read?offset=0');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');

    const errors = res.body.errors;
    const isErrorFound = errors.some(
      (error: any) => error.msg === 'Limit is required'
    );
    expect(isErrorFound).toBe(true);
  });

  test('should check that Limit is required and Int and between 1 to 10', async () => {
    const limit = [0, 11, 4.5 ,'test'];

    limit.forEach(async (limit: any) => {
      const res = await request(app).get(`/read?limit=${limit}&offset=0`);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');

      const errors = res.body.errors;
      const isErrorFound = errors.some(
        (error: any) => error.msg === 'Limit must be an Int and between 1 to 10'
      );
      expect(isErrorFound).toBe(true);
    });
  });

  test('should check that Offset is Int', async () => { 
    const offset = ['test', 4.5];

    offset.forEach(async (offset: any) => {
      const res = await request(app).get(`/read?limit=2&offset=${offset}`);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');

      const errors = res.body.errors;
      const isErrorFound = errors.some(
        (error: any) => error.msg === 'Offset must be an Int'
      );
      expect(isErrorFound).toBe(true);
    });
  })
});


