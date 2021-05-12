// write your code here
const imagesArray = []
const commentsArray = []


function createImgCard(image){
    let imgSection = document.querySelector(".image-container")
    let imgCard = document.createElement("div")
    imgCard.setAttribute("class", "image-card")
    let delCard = document.createElement("button")
     
    delCard.innerHTML = " X "
    delCard.setAttribute("style","display: inline-block; float: right;")
    delCard.addEventListener("click", function(){
        fetch(`http://localhost:3000/images/${image.id}`,{
            method:"DELETE"})
            .then(imgCard.remove())
    })


    imgSection.append(imgCard)

    let title = document.createElement("h2")
    title.setAttribute("class","title")
    title.innerText = image.title

    let postImg = document.createElement("img")
    postImg.setAttribute("class","image")
    postImg.setAttribute("src", image.image)
    postImg.setAttribute("alt", image.title)

    let likesSection = document.createElement("div")
    likesSection.setAttribute("class","likes-section")

    let numOfLike = document.createElement("span")
    numOfLike.setAttribute("class", "likes")
    numOfLike.innerText = image.likes

    let likeButton = document.createElement("button")
    likeButton.setAttribute("class", "like-button")
    likeButton.innerText = "♥"
    likesSection.append(numOfLike, likeButton)
    likeButton.addEventListener('click', function(){
        image.likes ++
        fetch(`http://localhost:3000/images/${image.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                likes : image.likes
            })
        })
        .then(response => response.json())
        .then(function(json){
            numOfLike.innerText = json.likes
           
        })

    })

    let commentList = document.createElement("ul")
    commentList.setAttribute("class", "comments")
    commentList.setAttribute("id", image.id)

    let commentsArray = image.comments

    if(commentsArray !== undefined){
        for (comment of commentsArray){
            let commentLi = document.createElement("li")
            let commentContent = document.createElement("p")
            let delComment = document.createElement("button")
           
            commentContent.innerText = comment.content
            commentContent.setAttribute("style","display: inline-block")
            delComment.innerHTML = " X "
            delComment.setAttribute("style","display: inline-block; float: right;")

            delComment.addEventListener("click", function(event){
                event.preventDefault()
                fetch(`http://localhost:3000/comments/${comment.id}`,{
                    method:"DELETE"})
                    .then(commentLi.remove())
            })


            commentLi.append(commentContent, delComment)
            commentList.append(commentLi)
        } 
    }

    let commentForm = document.createElement("form")
    commentForm.setAttribute("class", "comment-form")
    commentForm.addEventListener("submit", function(event){
        let inputContent = commentForm.comment.value
        event.preventDefault()
        fetch(`http://localhost:3000/comments`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                content: inputContent,
                imageId: image.id
            })
        })
        .then(response => response.json())
        .then(function(newSaveComment){
            let commentContent = document.createElement("li")
            commentContent.innerText = newSaveComment.content
    
            commentList.append(commentContent)})
    
    })

    let formInput = document.createElement("input")
    formInput.setAttribute("class", "comment-input")
    formInput.setAttribute("name","comment")
    formInput.setAttribute("type","text")
    formInput.setAttribute("placeholder","Leave your comment here")

    let commentButton = document.createElement("button")
    commentButton.setAttribute("class", "comment-button")
    commentButton.innerText = "Post"

    commentForm.append(formInput, commentButton)
    imgCard.append(delCard,title, postImg, likesSection, commentList, commentForm)
}



function createNewPost (postForm){
   
        fetch(`http://localhost:3000/images`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title: postForm.title.value,
                likes: 0,
                image: postForm.image.value
            })
        })
         .then(function (response) {
            return response.json();
            })

        .then(function(json){
                createImgCard(json)
            })
    
}

function displayMainPage(){
    fetch("http://localhost:3000/images")
        .then(function(response){
            return response.json()
        })
        .then(function(images){
            let imagesArray = images
            for(image of imagesArray) createImgCard(image)
        })

    let postForm = document.querySelector(".comment-form")
    postForm.addEventListener('submit', function(event){
        event.preventDefault()
        createNewPost(postForm)
    })
}


displayMainPage()