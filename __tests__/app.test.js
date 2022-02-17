// const db = require("/");
const connection = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("/Users/matt/northcoders/projects/be-nc-news/db/data/test-data/index.js");

afterAll(() => connection.end());

beforeEach(() => seed(testData));

// TESTS -------------------------------------------------------------------------------------------------------------------------------

describe("app", () => {
  describe("GET /api/not-a-path", () => {
    describe("error handler catches all invalid paths with status 404", () => {
      test("responds with status 404 and msg 'path not found'", () => {
        return request(app)
          .get("/api/notAValidPath")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("path not found");
          });
      });
    });
  });
  describe("/api/topics", () => {
    test("GET request responds with an array of topic objects, each with properties of slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(topics).toBeInstanceOf(Array);
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
    test("responds with status 404 and msg 'path not found'", () => {
      return request(app)
        .get("/api/topix") //  <<< bad request
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("path not found");
        });
    });
  });
  describe("/api/articles/:article_id", () => {
    test("GET request responds with an article object", () => {
      const article_id = 1;
      return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article).toBeInstanceOf(Object);
          articleArray = [article];
          articleArray.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: article_id,
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });
    test("requesting an invalid id path should respond with a status 400 ", () => {
      return request(app)
        .get("/api/articles/cat")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request - page not found");
        });
    });
    test("should respond with a status 404 when passed an article_id number that doesn't exist", () => {
      // const article_id = 78383;
      return request(app)
        .get(`/api/articles/3232233`)
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("path not found");
        });
    });
  });
});
