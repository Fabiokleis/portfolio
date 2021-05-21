const axios = require('axios');
const crypto = require('crypto');

const generate = () => {
    const password = crypto.randomBytes(20).toString('ascii');
    const name = "user_"+crypto.randomBytes(10).toString('hex');
    const email = "user_"+crypto.randomBytes(10).toString('hex')+"@gmail.com";

    return {name, email, password};
}


const generateRequest = async (url, method, post) => {
    const methods = ["GET", "POST", "DELETE", "PUT"];
     if(!methods.some(met => met === method)) return "method not exist";

        try{
            const response = await axios({
                     url: url,
                     method: method,
                     data: post,
                     validateStatus:false
                 });
                return response;
        }catch(err){
            console.log(err);
            return err;
        }
}

const base_url = "http://127.0.0.1:3000/users";
const data = generate();


test("Should register user", async () => {
    const userResponse = await generateRequest(base_url, "POST", data);
   
    expect(userResponse.status).toBe(201);
});

test("Should login user", async () => {
    const loginResponse = await generateRequest(`${base_url}/login`, 
        "POST", {email: data.email, password: data.password});
    
    const jwt = loginResponse.headers["authorization-token"];
    axios.defaults.headers["authorization-token"] = jwt;

    expect(loginResponse.status).toBe(200);
});

test("Should get user", async () => {
    const getResponse = await generateRequest(base_url, "GET");
    
    expect(getResponse.status).toBe(200);
});

test("Should update user", async () => {
    const newData = generate();
    const updateResponse = await generateRequest(base_url,
        "PUT", {email: data.email, password: newData.password});

    expect(updateResponse.status).toBe(200);

});


test("Should delete user", async () => {
    const deleteResponse = await generateRequest(base_url, "DELETE");

    expect(deleteResponse.status).toBe(200);
});

