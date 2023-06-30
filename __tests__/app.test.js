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


describe('GET /api/articles/:article_id/comments', () => {
  test('200 accepts an article_id and responds with an array of comments for that given id ', () => {
    return request(app)
    .get("/api/articles/1/comments")
    .expect(200)
    .then(({body}) => {
      const {comments} = body;
      expect(comments).toHaveLength(11); 
      expect(comments).toBeSorted({key: 'created_at', descending: true});
      comments.forEach((comment) => {
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("votes", expect.any(Number));
        expect(comment).toHaveProperty("created_at", expect.any(String));
        expect(comment).toHaveProperty("author", expect.any(String));
        expect(comment).toHaveProperty("body", expect.any(String));
        expect(comment).toHaveProperty("article_id", expect.any(Number));
      })
    })
  });
  test('200 accepts an article_id and responds with an empty array to illustrate no comments on this article', () => {
    return request(app)
    .get("/api/articles/2/comments")
    .expect(200)
    .then(({body}) => {
      const {comments} = body;
      expect(comments).toEqual([]);
    })
  });
  test('400 reject an article_id with an invalid type of request', () => {
    return request(app)
    .get("/api/articles/badRequest/comments")
    .expect(400)
    .then(({body}) => {
      expect(body.message).toBe("Bad Request");
    })
  });
  test('404 reject an article_id that is valid but not found', () => {
    return request(app)
    .get("/api/articles/100/comments")
    .expect(404)
    .then(({body}) => {
      expect(body.message).toBe("Not Found");
    })
  })
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

describe('DELETE /api/comments/:comment_id', () => {
  test('204 responds with a deleted comment and returns no content', () => {
    return request(app)
    .delete("/api/comments/1")
    .expect(204)
    .then((response)=> {
      expect(response.statusCode).toBe(204)
    })
  });test('404 responds with an error due to comment_id being valid but not existing in the database', () => {
    return request(app)
    .delete("/api/comments/100")
    .expect(404)
    .then((response)=> {
      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe("Not Found")
    })
  });
  test('400 responds with an error due to an invalid request', () => {
    return request(app)
    .delete("/api/comments/invalidRequest")
    .expect(400)
    .then((response)=> {
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Bad Request")
    })
  });
})