const app = require('../app');
const request = require("supertest"); // needed for integration testing to test for endpoints
const db = require('../db/connection');
const testData = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');

beforeEach(() => {
    return seed(testData);
  });
  
  afterAll(() => {
    if (db.end) db.end();
  });

  describe('GET /api/topics', () => {
    xtest('200 responds with an array of topic objects', () =>{
        return request(app)
        .get('/api/topics') // path
        .expect(200) // successful request
        .then(({body}) =>{ // this deconstructs the data to get the key of body
            const {topics} = body;
            expect(topics).toHaveLength(3);
            topics.forEach((topic)=> {
                expect(topic).toHaveProperty('slug', expect.any(String));
                expect(topic).toHaveProperty('description', expect.any(String));
            })
        })
    } )
  })