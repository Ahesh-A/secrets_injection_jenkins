import request from "supertest";
import {app} from '../src/index';
// import test, { describe } from "node:test";

describe("Test ==> root path", () => {
    test("Should get response for the get method", done => {
        request(app)
        .get("/")
        .then(response => {
            expect(response.statusCode).toBe(200)
            done();
        })
    })
})
