const axios = require('axios');
const crypto = require('crypto');

// TODO reimplement all test cases to new database


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

const base_url = "http://127.0.0.1:3000";
const post = {title: generate(), content: generate()};


test("Should create post and delete post", async () => {

    const newPost = await generateRequest(
        `${base_url}/posts`, "POST", post);
    

    expect(newPost.status).toBe(201);
    expect(newPost.data.title).toBe(post.title);
    expect(newPost.data.content).toBe(post.content);

    const deletedPost = await generateRequest(
        `${base_url}/posts/${newPost.data._id}`, "DELETE");

    expect(deletedPost.status).toBe(200);
    expect(deletedPost.data.title).toBe(newPost.data.title);
    expect(deletedPost.data.content).toBe(newPost.data.content);
});


test("Should create post, get post and delete post", async () => {

    const newPost = await generateRequest(
        `${base_url}/posts`, "POST", post);
    
    expect(newPost.status).toBe(201);

    const getPost = await generateRequest(
        `${base_url}/posts/${newPost.data._id}`, "GET");
    
    expect(getPost.status).toBe(200);
    expect(getPost.data.title).toBe(post.title);
    expect(getPost.data.content).toBe(post.content);
    
    const deletedPost = await generateRequest(
        `${base_url}/posts/${newPost.data._id}`, "DELETE");
    
    expect(deletedPost.status).toBe(200);
    expect(deletedPost.data.title).toBe(newPost.data.title);
    expect(deletedPost.data.content).toBe(newPost.data.content);

});

test("Should create, update and delete post", async () => {
    const newPost = await generateRequest(
        `${base_url}/posts`, "POST", post);

    expect(newPost.status).toBe(201);

    const updatedPost = await generateRequest(
        `${base_url}/posts/${newPost.data._id}`, "PUT", post);
    
    expect(updatedPost.status).toBe(200);
    expect(newPost.data.title).toBe(post.title);
    expect(newPost.data.content).toBe(post.content);
    expect(updatedPost.data._id).toBe(newPost.data._id);
    
    const deletedPost = await generateRequest(
        `${base_url}/posts/${newPost.data._id}`, "DELETE");

    expect(deletedPost.status).toBe(200);
    expect(deletedPost.data.title).toBe(newPost.data.title);
    expect(deletedPost.data.content).toBe(newPost.data.content);
    expect(deletedPost.data._id).toBe(updatedPost.data._id);

});

test("Should get posts", async () => {
    const posts = await generateRequest(`${base_url}/posts`,  "GET");

});


test.only('Should not update a post', async () => {
    post_id = 1;
    const updatedPost = await generateRequest(`${base_url}/posts/${post_id}`, 'PUT', post);
    expect(updatedPost.status).toBe(404);
    console.log(updatedPost.data);
});


