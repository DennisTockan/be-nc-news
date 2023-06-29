const app = require("../app");
const request = require("supertest"); // needed for integration testing to test for endpoints
const db = require("../db/connection");
const apiEndpoints = require("../endpoints.json");
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

describe("GET /api", () => {
  test("200 responds with an object describing the available endpoints on your API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(apiEndpoints);
      });
  });
});

describe("GET /api/articles", () => {
  test("200 should respond with an article array or article objects with the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        console.log(articles)
        expect(articles).toHaveLength(5); 
        expect(articles).toBeSorted({key: 'created_at', descending: true })
        articles.forEach((article) => {
          expect(article).toHaveProperty("author", expect.any(String));
          expect(article).toHaveProperty("title", expect.any(String));
          expect(article).toHaveProperty("article_id", expect.any(Number));
          expect(article).toHaveProperty("topic", expect.any(String));
          expect(article).toHaveProperty("created_at", expect.any(String));
          expect(article).toHaveProperty("votes", expect.any(Number));
          expect(article).toHaveProperty("article_img_url", expect.any(String));
          expect(article).toHaveProperty("comment_count", expect.any(String));
        });
      });
  });
});


describe("POST /api/articles/:article_id/comments", () => {
  xtest("201 should respond with a new comments for the specified article_id", () => {
    const newComment = {

    };
    return request(app)
    .post()
    .send({})
    .expect(201)
    .then(({body}) => {
      expect(body.newComment).toEqual({


      })
    }
    )
  })
})