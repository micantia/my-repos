class PostsList{

    constructor(posts) {
        this.array = posts;
        this.array.sort(this.sortByDate);

        this.authors = new Set();

        for(let i = 0; i < this.array.length; i++) {
            this.authors.add(this.array[i].author);
        }

    }

    sortByDate = (o1, o2) => {
        return Date.parse(o2.createdAt) - Date.parse(o1.createdAt);
    };
    getPage = (skip = 0, top = 10, filter) => {

        if(typeof skip !== "number" || typeof top !== "number") {
            return [];
        }

        let tmp = this.array;


        if (filter) {
            if(filter.author && (typeof filter.author !== "string" || filter.author.length === 0) ||
                filter.createdAt && !filter.createdAt instanceof Date) {

                return [];
            }

            if(filter.author) {
                tmp = tmp.filter((item) => {
                    return item.author === filter.author;
                });
            }

            if(filter.createdAt) {
                tmp = tmp.filter((item) => {
                    return Date.parse(item.createdAt) === Date.parse(filter.createdAt);
                })
            }

            if(filter.hashtags){
                tmp = tmp.filter((item) => {
                    if(typeof item.hashtags === "undefined") {
                        return false;
                    }
                    return filter.hashtags.every((tag) =>{
                        return item.hashtags.includes(tag);
                    })
                })
            }


        }
        return tmp.slice(skip, skip + top);
    };
    get = (id) => {
        if(typeof id == "string" && id.valueOf() >= 0){
            return this.array.find((item) => item.id === id);
        }
        return -1;
    };
    add = (post) => {
        if(PostsList.validate(post)) {
            if(!this.authors.has(post.author)) {
                this.authors.add(post.author);
            }
            this.array.push(post);
            this.array.sort(this.sortByDate);
            return true;
        }
        else {
            return false;
        }
    };

    addAll = (posts) => {

        let notValidatedPosts = [];

        for(let i = 0; i < posts.length; i++) {
            if(PostsList.validate(posts[i])) {
                if(!this.authors.has(posts[i].author)) {
                this.authors.add(posts[i].author);
            }
                this.add(posts[i]);
            } else {
                notValidatedPosts.push(posts[i]);
            }
        }

        return notValidatedPosts;

    }

    edit = (id, post) => {
        let index = this.array.findIndex(item => item.id === id);
        if(typeof this.edit === 'undefined') {
            return false;
        }

        if(post.description) {
            this.array[index].description = post.description;
        }
        if(post.photoLink) {
            this.array[index].photoLink = post.photoLink;
        }
        if(post.hashtags) {
            this.array[index].hashtags = post.hashtags;
        }
        return true;
    };
    remove = (id) => {
        if(typeof id == "string" && id.valueOf() >= 0) {
            this.array.splice(this.array.findIndex(item => item.id === id), 1);
            return true;
        }
        return false;
    };
    static validate = (post) => {
        if (!post) {
            return false;
        }
        if (post.id === "" || typeof post.id !== "string") {
            return false;
        }
        if (post.description === "" || typeof post.description !== "string")
            return false;
        if (!(post.createdAt instanceof Date))
            return false;
        if (post.author === "" || typeof post.author !== "string")
            return false;
        if (post.photoLink === "" || typeof post.photoLink !== "string")
            return false;
        if (post.rating === null || typeof post.rating !== "number")
            return false;
        return true;
    };

    clear = () => {
        this.array = [];
    }


}

let pl = new PostsList(posts);