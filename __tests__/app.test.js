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
        expect(articles).toHaveLength(5);
        expect(articles).toBeSorted({ key: "created_at", descending: true });
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
describe("PATCH: /api/articles/:article_id", () => {
  test("200 should increase the votes of the article by the incremented amount", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.votes).toBe(101);
      });
  });
  test("200 should decrease the votes of the article by the decremented amount", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -5 })
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.votes).toBe(95);
      });
  });
  test("200 should display the new and patched article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -5 })
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.title).toEqual("Living in the shadow of a great man");
        expect(article.topic).toEqual("mitch");
        expect(article.author).toEqual("butter_bridge");
        expect(article.body).toEqual("I find this existence challenging");
        expect(article.created_at).toEqual("2020-07-09T20:11:00.000Z");
        expect(article.votes).toEqual(95);
        expect(article.article_img_url).toEqual(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("404 returns an valid article_id which does not exist", () => {
    return request(app)
      .patch("/api/articles/100")
      .send({ inc_votes: 50 })
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Article Id not found");
      });
});
test("400 returns an valid article_id which does not exist", () => {
  return request(app)
    .patch("/api/articles/1")
    .send({ invalidRequest: 6 })
    .expect(400)
    .then(({ body }) => {
      const { message } = body;
      expect(message).toBe("Bad Request");
    });
});
test("400 returns an invalid article_id type (non-integer) which does not exist", () => {
  return request(app)
    .patch("/api/articles/banana")
    .send({ invalidRequest: 6 })
    .expect(400)
    .then(({ body }) => {
      const { message } = body;
      expect(message).toBe("Bad Request");
    });
});
});