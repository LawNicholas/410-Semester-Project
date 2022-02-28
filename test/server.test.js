const expect = require('chai').expect
const app = require('../api/server')
const request = require('supertest')

describe('server', () => {

	describe('accounts', () => {
        
		it('can create an account', () => {
			return request(app)
				.post('/api/accounts')
				.send({
                    username: "jimbo23",
					email: "example@gmail.com",
					password: "123security"
				})
				.expect(201)
		})

        it('cannot create an account without required fields', () => {
            return request(app)
                .post('/api/accounts')
                .send({
                    username: 'jimbo23'
                })
                .expect(400)
        })
        
		it('can update an account', () => {
			return request(app)
				.put('/api/accounts/account-id')
				.send({
                    progress: 0.5
                })
				.expect(200)
		})

        it("cannot update an account with impropper fields", () => {
			return request(app)
				.put('/api/accounts/account-id')
				.send({
                    progress: "hamburger"
                })
				.expect(400)
		})
        
        it('can login an account', () => {
			return request(app)
				.put('/api/accounts/1/login')
				.send({
                    email: "example@email.com",
                    password: "123security"
                })
                .expect(200)
        })

        it('cannot login an account without account details', () => {
			return request(app)
				.put('/api/accounts/1/login')
				.send()
				.expect(400)
		})

	})
})