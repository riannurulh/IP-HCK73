const app = require("../app");
const { test, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");
const { Plan, User, Exercise } = require("../models");

let tokenUser;

beforeAll(async () => {
  try {
    let user = {
      email: "emailadminpost@bbb.ccc",
      password: "12345",
      gender: "male",
      height: 170,
      weight: 90,
      weightGoalOn30day: 70,
    };
    const userssss = await User.findAll();
    let createUser = await User.create(user);
    let createExercise = [
      { name: "Push-up" },
      { name: "Bench Press" },
      { name: "Dumbbell Flyes" },
      { name: "Deadlift" },
      { name: "Pull-up" },
      { name: "Lat Pulldown" },
      { name: "Squat" },
      { name: "Leg Press" },
      { name: "Lunges" },
      { name: "Shoulder Press" },
      { name: "Lateral Raises" },
      { name: "Front Raises" },
      { name: "Bicep Curl" },
      { name: "Tricep Dips" },
      { name: "Hammer Curl" },
      { name: "Treadmill" },
      { name: "Sepeda Statis" },
      { name: "Elliptical" },
      { name: "Rower" },
      { name: "Plank" },
      { name: "Crunches" },
      { name: "Stretching" },
      { name: "Yoga" },
      { name: "Kettlebell Swings" },
      { name: "Medicine Ball Throws" },
      { name: "Battle Ropes" },
    ];

    let exercise = await Exercise.bulkCreate(createExercise);
  } catch (error) {
    console.log(error.message,"dicatch");
  }
});

afterAll(async () => {
  await Exercise.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await Plan.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

test("POST /login login successfully and send access_token", async () => {
  let login = {
    email: "emailadminpost@bbb.ccc",
    password: "12345",
  };
  let response = await request(app).post("/login").send(login);
  expect(response.status).toBe(200);
  // expect(response.body).toBeInstanceOf(Object);
  // expect(response.body).toHaveProperty("access_token", expect.any(String));
});

test("POST /login email cannot be empty", async () => {
  let login = {
    password: "12345",
  };
  let response = await request(app).post("/login").send(login);
  expect(response.status).toBe(400);
  expect(response.body).toBeInstanceOf(Object);
  expect(response.body).toHaveProperty("message", "Email/Password required");
});
test("POST /login password cannot be empty", async () => {
  let login = {
    email: "emailbaru@bbb.ccc",
  };
  let response = await request(app).post("/login").send(login);
  expect(response.status).toBe(400);
  expect(response.body).toBeInstanceOf(Object);
  expect(response.body).toHaveProperty("message", "Email/Password required");
});
test("POST /login your email is invalid", async () => {
  let login = {
    email: "aaa2222@bbb.ccc",
    password: "12345",
  };
  let response = await request(app).post("/login").send(login);
  expect(response.status).toBe(401);
  expect(response.body).toBeInstanceOf(Object);
  expect(response.body).toHaveProperty(
    "message",
    "Error login user not found atau password not matched"
  );
});
test("POST /login your password is invalid", async () => {
  let login = {
    email: "emailbaru@bbb.ccc",
    password: "123499995",
  };
  let response = await request(app).post("/login").send(login);
  expect(response.status).toBe(401);
  expect(response.body).toBeInstanceOf(Object);
  expect(response.body).toHaveProperty(
    "message",
    "Error login user not found atau password not matched"
  );
});
