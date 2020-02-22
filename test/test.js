// Just a few examples of unit tests to demonstrate the purpose

const assert    = require("chai").assert,
      expect    = require("chai").expect,
      request   = require("supertest"),
      app       = require("../app");

describe("App",()=>{
    describe("Login",()=>{  
        it("Successful login => should redirect to /profil",()=>{
            return request(app)
            .post("/prihlasenie")
            .set("Accept","application/json")
            .type("form")
            .send({"email":"andhox17@gmail.com", "password" : "test"})
            .then((res)=>{
                assert.equal(res.header.location,"/profil")
            });
        });  

        it("Failed login => should redirect to /prihlasenie",()=>{
            return request(app)
            .post("/prihlasenie")
            .set("Accept","application/json")
            .type("form")
            .send({"email":"andhox17@gmail.com", "password" : "testt"})
            .then((res)=>{
                assert.equal(res.header.location,"/prihlasenie")
            }); 
        });
    });

    describe("Register",()=>{  
        it("Successful registration => should redirect to /registracny-proces",()=>{
            return request(app)
            .post("/registracia")
            .set("Accept","application/json")
            .type("form")
            .send({"email":"viliamslovak@gmail.com", "password" : "test123456"})
            .then((res)=>{
                assert.equal(res.header.location,"/registracny-proces")
            }); 
        });

        it("Failed registration => should redirect to /registracia",()=>{
            return request(app)
            .post("/registracia")
            .set("Accept","application/json")
            .type("form")
            .send({"email":"andhox17@gmail.com", "password" : "test"})
            .then((res)=>{
                assert.equal(res.header.location,"/registracia")
            }); 
        });
    });   

});