class PostsView {

    constructor(PostsList) {
        this.postsList = PostsList;
        this.postsDiv = document.getElementById("posts");
        this.skip = 0;
        this.top = 10;
        this.filter = undefined;

        this.addAuthors();
        this.loadPosts();
    }

    postHTML = (post) => {
        let postHTML = '';
        let hashtagsHTML = '';
        for(let j = 0; j < post.hashtags.length; j++) {
            hashtagsHTML += '<a href="#" class="hashtag">#' + post.hashtags[j] + '</a>';
        }

        postHTML += '  <img src="' + post.photoLink + '" class="editable" alt="">\n' +
                    '                    <div class="post-info">\n' +
                    '                        <p class="author">uploaded by <a href="profile/1">' + post.author + '</a> <span class="date">(' + post.createdAt + ')</span></p>\n' +
                    '                        <p class="post-description editable">\n'
                                                + post.description +
                    '                        </p>\n' +
                    '                        <div class="post-hashtags editable">\n'
                                                +
                                                    hashtagsHTML
                                                +
                    '                       </div> <div class="divider"></div>\n' +
                    '                        <div class="post-actions">\n' +
                    '                            <div class="action-btn upvote"></div>\n' +
                    '                            <span class="post-rating">' + post.rating + '</span>\n' +
                    '                            <div class="action-btn downvote"></div>\n' +
                    '                        </div>\n' +
                    '                    </div>'
        return postHTML;
    }

    loadPosts = (skip = 0, top = 10, filter) => {

        this.skip = skip;
        this.top = top;
        this.filter = filter;

        let posts = this.postsList.getPage(this.skip, this.top, this.filter);

        if(posts !== []) {
            for(let i = 0; i < posts.length; i++) {
                let post = document.createElement("div");
                post.id = "post-" + posts[i].id;
                post.classList = "feed-row";
                post.innerHTML = this.postHTML(posts[i]);
                this.postsDiv.appendChild(post);
            }
        }

    }

   

    editPost = (id, post) => {
        this.postsList.edit(id, post);

        let postHTML = document.getElementById("post-" + id);
        let postInnerContentHTML = postHTML.getElementsByClassName("editable");
        console.log(postHTML);

        if(post.description) {
            postInnerContentHTML[1].innerHTML = post.description; 
        }
        if(post.photoLink) {
            postInnerContentHTML[0].src = post.photoLink;
        }
        if(post.hashtags) {
            postInnerContentHTML[2].innerHTML = '';
            for(let i = 0; i < post.hashtags.length; i++) {
                postInnerContentHTML[2].innerHTML += '<a href="#" class="hashtag">#' + post.hashtags[i] + '</a>';
            }
        }
    }

    addPost = (post) => {
        let topPostId = this.postsList.array[0].id;
        if(this.postsList.add(post)) {
            let postNode = document.createElement("div");
            postNode.id = "post-" + post.id;
            postNode.classList = "feed-row";
            postNode.innerHTML = this.postHTML(post);
            this.postsDiv.insertBefore(postNode, document.getElementById("post-" + topPostId));
        }

    }

    removePost = (id) => {
        this.postsList.remove(id);
        let post = document.getElementById("post-" + id);
        this.postsDiv.removeChild(post);
    }

    loadMore = () => {
        this.skip += this.postsList.getPage(this.skip, this.top, this.filter).length;
        this.top += 10;

        this.loadPosts(this.skip, this.top, this.filter);
    }   

    addAuthors = () => {
        let authors = document.getElementById("authors");
        for(let item of this.postsList.authors) {
            authors.innerHTML += '<option value=' + item + '>' + item + '</option>';
        }
    }

}

let pv = new PostsView(pl);