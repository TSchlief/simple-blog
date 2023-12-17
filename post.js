var monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

class Post {
    constructor(author, title, content, id, date){
        this.author = author;
        this.title = title;
        this.content = content;
        this.id = id;
        this.date = date;
    }
    
    toPostHTML(){
        let month = this.date.getMonth();
        let day = this.date.getDay()
        let date = monthNames[month] + " " + day;
        return `
            <div postid=${this.id} class="post">
                    <a href="/" ><—back</a>
                    <h3>${this.title}</h3>
                    <p class="author" >Written by: ${this.author} -- ${date}</p>
                    <a href="/edit?id=${this.id}" >edit</a>  <a href="/delete?id=${this.id}" class="delete">delete</a>
                    <p>${this.content}</p>
            </div>
        `;
    }
    
    toPostLinkHTML(){
        let month = this.date.getMonth();
        let day = this.date.getDate()
        let date = monthNames[month] + " " + day;
        return `
            <div postid=${this.id} class="post">
                <a href="/post?id=${this.id}">
                    <h2 class="post-title">${this.title}</h2>
                    <p class="author" >Written by: ${this.author} -- ${date}</p>
                    <p>${this.content}</p>
                </a>
            </div>
        `;
    }
}

export default class BlogPost{
    constructor(posts=[]){
        this.posts = posts;
        this.id = 0;
    }

    createPost(req){
        console.log(req.body)
        let body = req.body;
        let date = new Date();

        let newPost = new Post(
            body.author,
            body.title,
            body.content,
            this.id,
            date
        );
        this.id++;
        this.posts.unshift(newPost);
      
    }

    getPost(id){
        for (let i = 0; i < this.posts.length; i++){
            if (this.posts[i].id === id){
                return this.posts[i];
            }
        }
    }
    
    editPost(req){
        let body = req.body;
        let date = new Date();
        let id = parseInt(req.query.id);
        this.deletePost(id)
        this.createPost(req);
    }
    
    deletePost(id){
        
        for (let i = 0; i < this.posts.length; i++){
            if (this.posts[i].id === id){
                this.posts.splice(i, 1);
            }
        }
        
    }


}