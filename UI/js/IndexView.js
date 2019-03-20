class IndexView {

    constructor(PostsList) {
        this.postsList = PostsList;
        this.postsDiv = document.getElementById("posts");
        this.skip = 0;
        this.top = 10;
        this.filter = undefined;
    }

    loadPosts = (skip = 0, top = 10, filter) => {

        this.skip = skip;
        this.top = top;
        this.filter = filter;

        let posts = this.postsList.getPage(this.skip, this.top, this.filter);

        if(posts !== []) {
            for(let i = 0; i < posts.length; i++) {
                let hashtagsHTML = '';
                for(let j = 0; j < posts[i].hashtags.length; j++) {
                    hashtagsHTML += '<a href="#" class="hashtag">#' + posts[i].hashtags[j] + '</a>';
                }

                this.postsDiv.innerHTML += ' <div class="feed-row">\n' +
                    '                    <img src="' + posts[i].photoLink + '" alt="">\n' +
                    '                    <div class="post-info">\n' +
                    '                        <p class="author">uploaded by <a href="profile/1">' + posts[i].author + '</a> <span class="date">(' + posts[i].createdAt + ')</span></p>\n' +
                    '                        <p class="post-description">\n'
                                                + posts[i].description +
                    '                        </p>\n' +
                    '                        <div class="post-hashtags">\n'
                                                +
                                                    hashtagsHTML
                                                +
                    '                       </div> <div class="divider"></div>\n' +
                    '                        <div class="post-actions">\n' +
                    '                            <div class="action-btn upvote"></div>\n' +
                    '                            <span class="post-rating">' + posts[i].rating + '</span>\n' +
                    '                            <div class="action-btn downvote"></div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>'
            }
        }

    }

    loadMore = () => {
        this.skip += this.postsList.getPage(this.skip, this.top, this.filter).length;
        this.top += 10;

        this.loadPosts(this.skip, this.top, this.filter);
    }

}

let iv = new IndexView(pl);