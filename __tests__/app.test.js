const connection = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("/Users/matt/northcoders/projects/be-nc-news/db/data/test-data/index.js");

afterAll(() => connection.end());

beforeEach(() => seed(testData));

// TESTS -------------------------------------------------------------------------------------------------------------------------->

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
    test("GET - request responds with an article object", () => {
      const article_id = 1;
      return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          [article].forEach((article) => {
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
    test("GET - requesting an invalid id path should respond with a status 400 ", () => {
      return request(app)
        .get("/api/articles/cat")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
    test("GET - respond with a status 404 when passed an article_id number that doesn't exist", () => {
      return request(app)
        .get(`/api/articles/3232233`)
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("path not found");
        });
    });
    test("PATCH - should respond with status 200 and updated object when patched with vote incrementation", () => {
      const votesUpdate = { inc_votes: 1 };
      const article_id = 2;
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(votesUpdate)
        .expect(200)
        .then(({ body: { articleUpdate } }) => {
          expect(articleUpdate).toEqual({
            article_id: 2,
            title: "Sony Vaio; or, The Laptop",
            topic: "mitch",
            author: "icellusedkars",
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            created_at: "2020-10-16T05:03:00.000Z",
            votes: 1,
          });
        });
    });
    test("PATCH - should respond with status 200 and updated object when vote is decremented", () => {
      const votesUpdate = { inc_votes: -20 };
      const article_id = 2;
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(votesUpdate)
        .expect(200)
        .then(({ body: { articleUpdate } }) => {
          expect(articleUpdate).toEqual({
            article_id: 2,
            title: "Sony Vaio; or, The Laptop",
            topic: "mitch",
            author: "icellusedkars",
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            created_at: "2020-10-16T05:03:00.000Z",
            votes: -20,
          });
        });
    });
    test("PATCH - should respond with a 400 bad request when passed an invalid inc_votes value ", () => {
      const article_id = 1;
      const votesUpdate = { inc_votes: "mwjxndwfegfd" };
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(votesUpdate)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
    test("PATCH - should respond with a 400 bad request when passed an invalid key", () => {
      const article_id = 1;
      const votesUpdate = { inc: 1 };
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(votesUpdate)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
    test("PATCH - should respond with a 400 bad request when patching with no request", () => {
      const article_id = 1;
      const votesUpdate = {};
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(votesUpdate)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
    test("PATCH - should respond with a 404 when trying to update non existent article", () => {
      const article_id = 455464;
      const votesUpdate = { inc_votes: 1 };
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(votesUpdate)
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("path not found");
        });
    });
  });
});
