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
  test("200 should respond with an article array of article objects with the correct properties", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(apiEndpoints);
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200 accepts an article_id and responds with an array of comments for that given id ", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toHaveLength(11);
        expect(comments).toBeSorted({ key: "created_at", descending: true });
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("article_id", expect.any(Number));
        });
      });
  });
  test("200 accepts an article_id and responds with an empty array to illustrate no comments on this article", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
  test("400 reject an article_id with an invalid type of request", () => {
    return request(app)
      .get("/api/articles/badRequest/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad Request");
      });
  });
  test("404 reject an article_id that is valid but not found", () => {
    return request(app)
      .get("/api/articles/100/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not Found");
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
describe("POST /api/articles/:article_id/comments", () => {
  test("200 should add the comment inserted for the specified article_id", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is the new comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment.body).toBe("This is the new comment");
      });
  });
  test("400 should return an error if passed an empty body", () => {
    const newComment = {
      username: "butter_bridge",
      body: "",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad Request");
      });
  });
  test("404 should return an error if there is no article for this article_id", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Hello, this is the new comment",
    };
    return request(app)
      .post("/api/articles/100/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("There is no article");
      });
  });
  test("404 should return an error if the specified user does not", () => {
    const newComment = {
      username: "Dennis-Tockan",
      body: "Hello, this is the new comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Username not found");
      });
  });
});

describe("GET /api/users", () => {
  test("200 responds with an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toHaveProperty("username", expect.any(String));
          expect(user).toHaveProperty("name", expect.any(String));
          expect(user).toHaveProperty("avatar_url", expect.any(String));
        });
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204 responds with a deleted comment and returns no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then((response) => {
        expect(response.statusCode).toBe(204);
      });
  });
  test("404 responds with an error due to comment_id being valid but not existing in the database", () => {
    return request(app)
      .delete("/api/comments/100")
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Not Found");
      });
  });
  test("400 responds with an error due to an invalid request", () => {
    return request(app)
      .delete("/api/comments/invalidRequest")
      .expect(400)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Bad Request");
      });
  });
});
describe("GET /api/articles", () => {
  test("200 accept the topic query when filtering the articles by topic value", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(4);
        articles.forEach((article) => {
          expect(article.topic).toEqual("mitch");
        });
      });
  });
  test("404 rejects the topic query when trying to filter the articles with an invalid query", () => {
    return request(app)
      .get("/api/articles?topic=bob")
      .expect(404)
      .then(({ body }) => {
        const { articles } = body;
        expect(body.message).toBe("Not Found");
      });
  });
  test("200 accept the sort_by query which sorts the article_id by in descending order ", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(5);
        expect(articles).toBeSortedBy("article_id", { descending: true });
      });
  });
  test("400 response with an invalid sort query input", () => {
    return request(app)
      .get("/api/articles?sort_by=date_of_birth")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid Sort Query");
      });
  });
  test("200 response with an ordered query in ascending order of date (created_at)", () => {
    return request(app)
      .get("/api/articles?order=ASC")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(5);
        expect(articles).toBeSortedBy("created_at");
      });
  });
  test("400 response with an invalid sort query input", () => {
    return request(app)
      .get("/api/articles?order=top_to_bottom")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid Order Query");
      });
  });
});
