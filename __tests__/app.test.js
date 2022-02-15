// const db = require("/");
const connection = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("/Users/matt/northcoders/projects/be-nc-news/db/data/test-data/index.js");

afterAll(() => connection.end());

beforeEach(() => seed(testData));

//------------------------------------------------------------------------------------------------------------------------------------

describe("GET /api/topics", () => {
  test("responds with an array of topic objects, each with properties of slug and description", () => {
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
      .get("/api/topix")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found"); // put in to error handling tests ^^^^
      });
  });
});
