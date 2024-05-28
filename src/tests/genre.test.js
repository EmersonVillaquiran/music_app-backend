const request = require('supertest');
const app = require('../app.js');


let id;

test("GET /genres should return 2 genres", async() => {
    const res = await request(app).get("/genres");
		expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});


test("POST /genres should add a genres", async () => {
    const newGenre = {
        name: 'Ciencia ficción'
    }
    const res = await request(app).post("/genres").send(newGenre);
        id = res.body.id;
		expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(newGenre.name);
});

test("PUT /genres should update a genres", async () => {
    const updatedGenres = {
        name: 'Ciencia ficción actualizado'

}
const res = await request(app).put(`/genres/${id}`).send(updatedGenres);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedGenres.name);
});

test("DELETE /genres should delete a genres", async () => {
    const res = await request(app).delete(`/genres/${id}`);
        expect(res.status).toBe(204);
});
