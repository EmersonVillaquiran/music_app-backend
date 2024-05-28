const request = require('supertest');
const app = require('../app.js');
const Genre = require('../models/Genre.js');
const Director = require('../models/Director.js');
const Actor = require('../models/Actor.js');


let id;

test("GET /movies should return 2 movies", async() => {
    const res = await request(app).get("/movies");
		expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});


test("POST /movies should add a movies", async () => {
    const newMovies = {
        name: 'Matrix',
        image: 'No image',
        synopsis: 'Película del siglo',
        releaseYear: 2001

    }
    const res = await request(app).post("/movies").send(newMovies);
        id = res.body.id;
		expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(newMovies.name);
});

test("PUT /movies should update a movies", async () => {
    const updatedMovies = {
        name: 'Matrix actualizado'

}
const res = await request(app).put(`/movies/${id}`).send(updatedMovies);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedMovies.name);
});


test('POST /movies/:id/genres debe insertar el genero de una película', async() => {
    const genre = await Genre.create({
        name: "Pop"
    }); 
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBe(1)
})

test('POST /movies/:id/directors debe insertar los directores de una película', async() => {
    const director = await Director.create({
        firstName: "Camilo",
        lastName: "Villa",
        nationality: "Colombiano",
        image: "No image",
        birthday: "1994/09/19"
    }); 
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id])
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/actors debe insertar los actores de una película', async() => {
    const actor = await Actor.create({
        firstName: "Camilo",
        lastName: "Villa",
        nationality: "Colombiano",
        image: "No image",
        birthday: "1994/09/19"
    }); 
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBe(1)
});

test("DELETE /movies should delete a movies", async () => {
    const res = await request(app).delete(`/movies/${id}`);
        expect(res.status).toBe(204);
});
