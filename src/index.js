// write your code here
const imagesArray = []
const commentsArray = []


function createImgCard(image){
    let imgSection = document.querySelector(".image-container")
    let imgCard = document.createElement("div")
    imgCard.setAttribute("class", "image-card")

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
        console.log(image.likes)
        fetch(`http://localhost:3000/images/${image.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                likes : image.likes
            })
        })
    })

    let commentList = document.createElement("ul")
    commentList.setAttribute("class", "comments")
    commentList.setAttribute("id", image.id)

    let commentForm = document.createElement("form")
    commentForm.setAttribute("class", "comment-form")
    commentForm.addEventListener("submit", function(event){
        let inputContent = commentForm.comment.value

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
        .then(json => displayComment(json))
    
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
    imgCard.append(title, postImg, likesSection, commentList, commentForm)
}


function displayComment (comment){
    let belongedToCommentList = document.getElementById(comment.imageId)

    let commentContent = document.createElement("li")
    commentContent.innerText = comment.content

    belongedToCommentList.append(commentContent)
}

// function createNewPost (){

// }



function displayMainPage(){
fetch("http://localhost:3000/images")
    .then(function(response){
        return response.json()
    })
    .then(function(images){
        let imagesArray = images
        for(image of imagesArray) createImgCard(image)
        
    })

fetch("http://localhost:3000/comments")
    .then(function(response){
        return response.json()
    })
    .then(function(comments){
        let commentsArray = comments
        for (comment of commentsArray) displayComment(comment)
    })
}

displayMainPage()