const axios = require('axios');

test("Should get posts", async function() {
    const reponse = await axios({
        url: 'http://127.0.0.1:3000/posts',
        method: 'GET'
    });
    const posts = reponse.data;
    expect(posts).toHaveLength(2);
    const firstPost = posts[0];
    expect(firstPost._id).toBe('6096051a131979bfe4b928d8');
    expect(firstPost.title).toBe("Meu portifolio");
    expect(firstPost.content).toBe("apenas um teste!");
});
