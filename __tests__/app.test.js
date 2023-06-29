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

describe('GET /api/articles/:article_id/comments', () => {
  xtest('200 accepts an article_id and responds with an array of comments for that given id ', () => {
    return request(app)
    .get("/api/articles/1/comments")
    .expect(200)
    .then(({body}) => {
      const {comments} = body;
      console.log(comments, 'comments')
      expect(comments).toHaveLength(11); 
      expect(comments).toBeSorted({key: 'created_at', descending: true})
      comments.forEach((comment) => {
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("votes", expect.any(Number));
        expect(comment).toHaveProperty("created_at", expect.any(String));
        expect(comment).toHaveProperty("author", expect.any(String));
        expect(comment).toHaveProperty("body", expect.any(String));
        expect(comment).toHaveProperty("article_id", expect.any(Number));
      })
    })
  })
  test('400 reject an article_id with an invalid type of request', () => {
    return request(app)
    .get("/api/articles/badRequest/comments")
    .expect(400)
    .then(({body}) => {
      expect(body.message).toBe("Bad Request");
    })
  })
  test('404 reject an article_id that is valid but not found', () => {
    return request(app)
    .get("/api/articles/100/comments")
    .expect(404)
    .then(({body}) => {
      expect(body.message).toBe("Not Found");
    })
  })
})