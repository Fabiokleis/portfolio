const axios = require('axios');
const crypto = require('crypto');

const generate = () => {
    return crypto.randomBytes(20).toString('hex');
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
const data = {name: generate(), email: generate(), password: generate()};


test("Should get a user", async () => {
    const response = await generateRequest(base_url, "GET");
    const id = response.data[(response.data.length-1)].id;
    const getUser = await generateRequest(`${base_url}/${id}`, "GET");

    expect(response.status).toBe(200);
    expect(getUser.status).toBe(200);
    expect(getUser.data[0].id).toBe(id);
});


test("Should create a user", async () => {
    const response = await generateRequest(base_url, "POST", data);
    const getUsers = await generateRequest(base_url, "GET");
    const id = getUsers.data[(getUsers.data.length-1)].id;
   
    expect(response.status).toBe(201);
    expect(getUsers.status).toBe(200);
    expect(response.data[0].id).toBe(id);
});

test("Should update a user", async () => {
    const getUsers = await generateRequest(base_url, "GET");
    const id = getUsers.data[(getUsers.data.length-1)].id;
    const response = await generateRequest(`${base_url}/${id}`, "PUT", {name: data.name});
    
    expect(response.status).toBe(200);
    expect(getUsers.status).toBe(200);
    expect(response.data[0].id).toBe(id);
});

test("Should delete a user", async () => {
    const getUsers = await generateRequest(base_url, "GET");
    const id = getUsers.data[(getUsers.data.length-1)].id;
    const response = await generateRequest(`${base_url}/${id}`, "DELETE");

    expect(response.status).toBe(200);
    expect(getUsers.status).toBe(200);
    expect(response.data[0].id).toBe(id);
});


