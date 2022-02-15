// const db = require("/");
const connection = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("/Users/matt/northcoders/projects/be-nc-news/db/data/test-data/index.js");

afterAll(() => connection.end());

beforeEach(() => seed(testData));

//------------------------------------------------------------------------------------------------------------------------------------

describe("/api/topics", () => {
  describe("GET topics", () => {
    test("responds with an array of topic objects, each with properties of slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              topics: expect.any(Array),
            })
          );
        });
    });
    test("responds with status 404 and msg 'path not found'", () => {
      return request(app)
        .get("/api/topix")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("path not found");
        });
    });
  });
});
