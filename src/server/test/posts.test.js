const axios = require('axios');
const crypto = require('crypto');

// criado umas reqs para teste

const generate = () => {
    return crypto.randomBytes(20).toString('hex');
}
const createPost = async (post) => {
    try{
        const response = await axios({
            url: 'http://127.0.0.1:3000/posts',
            method: 'POST',
            data: post
        });
        const id = response.data._id;
        return id;
    }catch(err){
        console.log(err);
        return err;
    }

}

const deletePost = async (id) => {
    try{
        const response = await axios({
            url: `http://127.0.0.1:3000/posts/${id}`,
            method: 'DELETE'
        });
        return response.data;
    }catch(err){
        console.log(err);
        return err;
    }
}

const getPosts = async () => {
    try{
        const response = await axios({
            url: `http://127.0.0.1:3000/posts`,
            method: 'GET'
        });
        return response.data;
    }catch(err){
        console.log(err);
        return err;
    }
}

const getPost = async (id) => {
    try{
        const response = await axios({
            url: `http://127.0.0.1:3000/posts/${id}`,
            method: 'GET'
        });
        return response.data;
    }catch(err){
        console.log(err);
        return err;
    }
}



test("Should create", async () => {
    // given - dado que
    const post = {title: generate(), content: generate()};
   
    // when - quando acontecer
    const id = await createPost(post);

    // then - então
    const deletedPost = await deletePost(id);
    //console.log("deletedPost -> ",deletedPost);

});

test("Should get posts", async () => {
    const posts = await getPosts();
    //console.log(posts);
});

test("Should get one post", async () => {
    const newPost = {title: generate(), content: generate()};
    const id = await createPost(newPost);
    const post = await getPost(id);
    const deletedPost = await deletePost(id);
    //console.log(post);
})


