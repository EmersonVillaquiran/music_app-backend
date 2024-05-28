const request = require('supertest');
const app = require('../app.js');


let id;

test("GET /actors should return 2 actors", async() => {
    const res = await request(app).get("/actors");
		expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});


test("POST /actors should add a actors", async () => {
    const newActor = {
        firstName: "Camilo",
        lastName: "Villa",
        nationality: "Colombiano",
        image: "No image",
        birthday: "1994/09/19"
    }
    const res = await request(app).post("/actors").send(newActor);
        id = res.body.id;
		expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(newActor.name);
});

test("PUT /actors should update a actors", async () => {
    const updatedActors = {
        firstName: "Camilo Actualizado", 

}
const res = await request(app).put(`/actors/${id}`).send(updatedActors);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedActors.name);
});

test("DELETE /actors should delete a actor", async () => {
    const res = await request(app).delete(`/actors/${id}`);
        expect(res.status).toBe(204);
});
