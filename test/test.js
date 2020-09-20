const assert    = require("chai").assert,
      expect    = require("chai").expect,
      request   = require("supertest"),
      app       = require("../app"),
      clear     = require("./clear");  

// Login
describe("App",()=>{
    describe("Login",()=>{  
        it("Successful login => should redirect to /profil",()=>{
            return request(app)
            .post("/prihlasenie")
            .set("Accept","application/json")
            .type("form")
            .send({"email":"andhox17@gmail.com", "password" : "test"})
            .expect("Location","/profil")
        });  

        it("Failed login => should redirect to /prihlasenie",()=>{
            return request(app)
            .post("/prihlasenie")
            .set("Accept","application/json")
            .type("form")
            .send({"email":"andhox17@gmail.com", "password" : "testt"})
            .expect("Location","/prihlasenie")
        });
    });

// Registration
    describe("Register",()=>{  
        it("Successful registration => should redirect to /registracny-proces",()=>{
            return request(app)
            .post("/registracia")
            .set("Accept","application/json")
            .type("form")
            .send({"email":"testemail@gmail.com", "password" : "test123456"})
            .expect("Location","/registracny-proces")
        });

        it("Failed registration => should redirect to /registracia",()=>{
            return request(app)
            .post("/registracia")
            .set("Accept","application/json")
            .type("form")
            .send({"email":"andhox17@gmail.com", "password" : "test"})
            .expect("Location","/registracia")
        });
    }); 
    
 // Profile
    describe("Profile",()=>{
        it("User is logged in => should redirect to /profil",()=>{
            return request(app)
            .post("/prihlasenie")
            .set("Accept","application/json")
            .type("form")
            .send({"email":"andhox17@gmail.com", "password" : "test"})
            .expect("Location","/profil")
        })

        it("User is not logged in => should redirect to /prihlasenie",()=>{
            return request(app)
            .get("/profil")
            .expect("Location","/prihlasenie")
        })
    })

});

// Remove initial testing data
clear();    