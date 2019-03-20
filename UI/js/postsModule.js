var posts = [
    {
        id: "1",
        description: "lorem",
        createdAt: new Date("2019-03-05T21:00:00"),
        author: "micantia",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146fcd/ak7Rtu0l_iE.jpg",
        hashtags: ["1", "hafs2", "first"],
        rating: 142
    },
    {
        id: "2",
        description: "vaflya",
        createdAt: new Date("2019-03-05T21:15:00"),
        author: "delorias",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146fcd/ak7Rtu0l_iE.jpg",
        hashtags: ["1", "hafs2"],
        rating: 142241
    },
    {
        id: "3",
        description: "grim eyed dido yield me",
        createdAt: new Date("2029-03-05T21:21:00"),
        author: "micantia",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146fcd/ak7Rtu0l_iE.jpg",
        hashtags: ["1", "hafs2", "anotherone"],
        rating: 14223
    },
    {
        id: "4",
        description: "lorem",
        createdAt: new Date("2018-02-05T21:22:00"),
        author: "micantia",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146fcd/ak7Rtu0l_iE.jpg",
        hashtags: ["1", "hafs2", "gundyr"],
        rating: 7423
    },
    {
        id: "5",
        description: "mirona black",
        createdAt: new Date("2019-03-05T22:22:00"),
        author: "konyaka",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146ffd/2DUUYim6DYY.jpg",
        hashtags: ["guray"],
        rating: 2624
    },
    {
        id: "6",
        description: "new meme format",
        createdAt: new Date("2019-03-05T22:21:00"),
        author: "konyaka",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146ffd/2DUUYim6DYY.jpg",
        hashtags: ["minecraft"],
        rating: 92
    },
    {
        id: "7",
        description: "ya lechu",
        createdAt: new Date("2019-03-05T22:12:00"),
        author: "moryak",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146ffd/2DUUYim6DYY.jpg",
        hashtags: ["1", "fortnyte"],
        rating: 0
    },
    {
        id: "8",
        description: "new meme format",
        createdAt: new Date("2019-03-05T20:22:00"),
        author: "konyaka",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146fc5/3i0qb3PmhI4.jpg",
        hashtags: ["1", "hafs2", "first"],
        rating: 8560
    },
    {
        id: "9",
        description: "Module",
        createdAt: new Date("2019-03-05T20:10:00"),
        author: "konyaka",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146fc5/3i0qb3PmhI4.jpg",
        hashtags: ["52", "ga"],
        rating: 27490
    },
    {
        id: "10",
        description: "pulya dura",
        createdAt: new Date("2019-03-05T14:15:00"),
        author: "mirui",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146fc5/3i0qb3PmhI4.jpg",
        hashtags: ["neformat", "first"],
        rating: 6893
    },
    {
        id: "11",
        description: "photocard",
        createdAt: new Date("2019-03-05T14:10:00"),
        author: "mirui",
        photoLink: "https://sun2.beltelecom-by-minsk.userapi.com/c849128/v849128262/146fc5/3i0qb3PmhI4.jpg",
        hashtags: ["1"],
        rating: 1
    }

]

let postModule = (function () {


    let filter = undefined;

    let array = posts;

    let sortByDate = (o1, o2) => {
        return Date.parse(o1.createdAt) - Date.parse(o2.createdAt);
    };


    let getPhotoPosts = (skip = 0, top = 10, filter) => {

        let tmp = array;
        if(typeof skip !== "number" || typeof top !== "number") {
            return [];
        }
        if(!filter) {
            posts.sort(sortByDate);
        }

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
    }
    let getPhotoPost = (id) => {
        if(typeof id == "string" && id.valueOf() >= 0){
            return array.find((item) => item.id == id);
        }
        return -1;
    }
    let validatePost = (post) => {
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
    }
    let addPhotoPost = (post) => {
        if(validatePost(post)) {
            array.push(post);
            array.sort(sortByDate);
            return true;
        }
        else {
            return false;
        }
    }
    let editPhotoPost = (id, post) => {
        let index = array.findIndex(item => item.id === id);
        if(typeof editPhotoPost === 'undefined') {
            return false;
        }

        if(post.description) {
            array[index].description = post.description;
        }
        if(post.photoLink) {
            array[index].photoLink = post.photoLink;
        }
        if(post.hashtags) {
            array[index].hashtags = post.hashtags;
        }
        return true;
    }
    let removePhotoPost = (id) => {
        if(typeof id == "string" && id.valueOf() >= 0) {
            array.splice(array.findIndex(item => item.id === id), 1);
            return true;
        }
        return false;
    }

    return {
        getPhotoPosts,
        getPhotoPost,
        validatePost,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost
    }

}());

