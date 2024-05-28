const request = require('supertest');
const app = require('../app.js');


let id;

test("GET /directors should return 2 directors", async() => {
    const res = await request(app).get("/directors");
		expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});


test("POST /directors should add a directors", async () => {
    const newDirectors = {
        firstName: "Camilo",
        lastName: "Villa",
        nationality: "Colombiano",
        image: "No image",
        birthday: "1994/09/19"
    }
    const res = await request(app).post("/directors").send(newDirectors);
        id = res.body.id;
		expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(newDirectors.name);
});

test("PUT /directors should update a directors", async () => {
    const updatedDirector = {
        firstName: "Camilo Actualizado", 

}
const res = await request(app).put(`/directors/${id}`).send(updatedDirector);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedDirector.name);
});

test("DELETE /directors should delete a directors", async () => {
    const res = await request(app).delete(`/directors/${id}`);
        expect(res.status).toBe(204);
});
