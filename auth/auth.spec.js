const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('/auth', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('POST /register', () => {
        it('should register a user and return status 201 created', () => {
            const newUser = {
                username: 'Tommy',
                password: 'password'
            }
            request(server).post('/api/auth/register').send(newUser).then(res => expect(res.status).toEqual(201))
        })

        it('should return an id when a user is registered', () => {
            const newUser = {
                username: 'Mark',
                password: 'password'
            }
            request(server).post('/api/auth/register').send(newUser).then(res => expect(res.text).toBe('[1]'))
        })
    })

    describe('POST /login', () => {
        it('should login a user and return status 200 ok', async () => {
            const newUser = {
                username: 'Jason',
                password: 'password'
            }
            const addUser = await request(server).post('/api/auth/register').send(newUser);
            const res = await request(server).post('/api/auth/login').send(newUser);
            expect(addUser.status).toEqual(201)
            expect(res.status).toEqual(200)
        }),

            it('should login a user and return a token', async () => {
                const newUser = {
                    username: 'Justin',
                    password: 'password'
                }
                const addUser = await request(server).post('/api/auth/register').send(newUser);
                const res = await request(server).post('/api/auth/login').send(newUser)
                expect(addUser.status).toEqual(201)
                expect(res.body.token)
            })
    })
})