'use strict';

const e = require('express');
const {app} = require('../src/server.js');
const supertest = require('supertest');

const mockRequest = supertest(app);

describe('API Server', () => {

  it('should append a timestamp to the request object', async () => {
    let response = await mockRequest.get('/');
    expect(response.headers.rt).toBeDefined();
  });

  it('should respond with a 404 on an invalid route', async () => {
    let response = await mockRequest.get('/foo');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

  it('should respond with a 500 when the server has an error', async () => {
    let response = await mockRequest.get('/broken');
    expect(response.status).toBe(500);
  });

  it('should respond with a 200 for the / route', async () => {
    let response = await mockRequest.get('/');
    expect(response.status).toBe(200);
  });

  it('should respond with a "Hello World" for the / route', async () => {
    let response = await mockRequest.get('/');
    expect(response.text).toBe('Hello World');
  });

  it('should respond with a 200 and the provided name for /person route', async () => {
    let response = await mockRequest.get('/person?name=john');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('john');
  });

  it('should respond with a 500 when name parameter is missing for /person route', async () => {
    let response = await mockRequest.get('/person?name=');
    expect(response.status).toBe(500);
  });
});