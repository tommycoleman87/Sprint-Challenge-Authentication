const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
describe('/auth', () => {
    beforeEach(async () => {
        await db('users')
    })

    describe('POST /register', () => {
        it('should register a user and return status 201 created',  () => {
            const newUser = {
                name: 'Tommy',
                password: 'password'
            }
            request(server).post('/api/auth/register').send(newUser).then(res => expect(res.status).toEqual(201))
        })

        it('should return an id when a user is registered', () => {
            const newUser = {
                name: 'Tommy',
                password: 'password'
            }
            request(server).post('/api/auth/register').send(newUser).then(res => expect(res.text).toEqual('1'))
        })
    })

    describe('POST /login', () => {
        it('should login a user and return status 200 ok', () => {
            const newUser = {
                name: 'Tommy',
                password: 'password'
            }
            request(server).post('/api/auth/register').send(newUser).then(res => {
                expect(res.status).toEqual(201)
                request(server).post('/api/auth/login').send(newUser).then(result => {
                    expect(result.status).toEqual(201)
                })    
            })
        }),

        it('should login a user and return a token', async () => {
            const newUser = {
                name: 'Tommy',
                password: 'password'
            }
            await request(server).post('/api/auth/register').send(newUser).then(res => expect(res.status).toEqual(201))
            await request(server).post('/api/auth/login').send(newUser).then(result => expect(result.authorization))   
        })
    })
})