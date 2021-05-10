// write your code here
const imagesArray = []



 
    
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

    imgCard.append(title, postImg, likesSection)
}



fetch("http://localhost:3000/images")
    .then(function(response){
        return response.json()
    })
    .then(function(images){
        let imagesArray = images
        for(image of imagesArray) createImgCard(image)
        console.log(imagesArray)
    })