import request from "supertest";
import { app } from '../src/index';
import { server } from "../src/index";

// import test, { describe } from "node:test";

describe("Test ==> root path", () => {
    test("Should get response for the get method", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.text).toEqual("This is the front page")
                console.log("Response: ", response.text)
                done();
            })
    })
})

describe("Test ==> print name", () => {
    test("Should print hello with the passed name", async () => {
        const payload = {
            name: "ahesh"
        }

        const response = await request(app)
            .post("/say-hello")
            .send(payload);

        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(`Hello ${payload.name}`)
    })
})

afterAll(done => {
    server.close(() => {});
    done();
})