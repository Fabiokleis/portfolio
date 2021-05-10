const axios = require('axios');
const crypto = require('crypto');

// refatorado em uma funcao generica para request

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
                     data: post
                 });
                return response.data;
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
   
    expect(newPost.title).toBe(post.title);
    expect(newPost.content).toBe(post.content);

    const deletedPost = await generateRequest(
        `${base_url}/posts/${newPost._id}`, "DELETE");

    expect(deletedPost.title).toBe(newPost.title);
    expect(deletedPost.content).toBe(newPost.content);
});


test("Should create post, get post and delete post", async () => {

    const newPost = await generateRequest(
        `${base_url}/posts`, "POST", post);

    const data = await generateRequest(
        `${base_url}/posts/${newPost._id}`, "GET");

    expect(data.title).toBe(post.title);
    expect(data.content).toBe(post.content);
    
    const deletedPost = await generateRequest(
        `${base_url}/posts/${newPost._id}`, "DELETE");

    expect(deletedPost.title).toBe(newPost.title);
    expect(deletedPost.content).toBe(newPost.content);

});

test("Should create, update and delete post", async () => {
    const newPost = await generateRequest(
        `${base_url}/posts`, "POST", post);

    const updatedPost = await generateRequest(
        `${base_url}/posts/${newPost._id}`, "PUT", post);
    
    expect(newPost.title).toBe(post.title);
    expect(newPost.content).toBe(post.content);
    expect(updatedPost._id).toBe(newPost._id);
    
    const deletedPost = await generateRequest(
        `${base_url}/posts/${newPost._id}`, "DELETE");

    expect(deletedPost.title).toBe(newPost.title);
    expect(deletedPost.content).toBe(newPost.content);
    expect(deletedPost._id).toBe(updatedPost._id);

});

test("Should get posts", async () => {
    const posts = await generateRequest(`${base_url}/posts`,  "GET");

    //expect(posts.length).toBe(3);
});





