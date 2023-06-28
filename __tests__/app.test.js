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

describe("GET /api/articles/:article_id", () => {
  test("200 accepts an article_id which responds with the specified article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({body}) => {
        const {article}  = body;
          expect(article.article_id).toEqual(1);
          expect(article).toHaveProperty("title", expect.any(String));
          expect(article).toHaveProperty("topic", expect.any(String));
          expect(article).toHaveProperty("author", expect.any(String));
          expect(article).toHaveProperty("body", expect.any(String));
          expect(article).toHaveProperty("created_at", expect.any(String));
          expect(article).toHaveProperty("votes", expect.any(Number));
          expect(article).toHaveProperty("article_img_url", expect.any(String));
  })
  });
  test("400 reject an article_id with an invalid type of request", () => {
    return request(app)
      .get("/api/articles/badpath")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Bad Request");
  });
  });
  test("404 reject an article_id that is valid but not found", () => {
    return request(app)
      .get("/api/articles/100")
      .expect(404)
      .then(({body}) => {
        expect(body.message).toBe("Not Found");
  });
  });
});
