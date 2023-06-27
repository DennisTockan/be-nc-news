const app = require("../app");
const request = require("supertest"); // needed for integration testing to test for endpoints
const db = require("../db/connection");
const apiEndpoints = require('../endpoints.json')
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed({ articleData, commentData, topicData, userData });
});

afterAll(() => {
  if (db.end) db.end();
});

describe("GET /api/topics", () => {
  test("200 responds with an array of topic objects", () => {
    return request(app)
      .get("/api/topics") // path
      .expect(200) // successful request
      .then(({ body }) => {
        // this deconstructs the data to get the key of body
        const { topics } = body;
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });
});
describe("GET /api", ()=> {
  test('200 responds with an object describing the available endpoints on your API', ()=>{
    return request(app)
    .get("/api")
    .expect(200)
    .then(({body}) => {
      expect(body).toEqual(apiEndpoints)
    })
  })
})