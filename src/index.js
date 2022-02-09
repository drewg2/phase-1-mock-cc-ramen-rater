document.addEventListener("DOMContentLoaded",function(){  //loads your js into the browser
    function fetchRamens(){
        fetch("http://localhost:3000/ramens")
        .then(response => response.json() )
        .then(data => renderRamens(data))
    }

    const ramenMenu = document.getElementById('ramen-menu')
    const newRamenForm = document.querySelector('#new-ramen')

    newRamenForm.addEventListener("submit",function(event){
        event.preventDefault();
        const newRamenName = document.querySelector("#new-name").value
        const newRamenRestaurant = document.querySelector("#new-restaurant").value
        const newRamenImage = document.querySelector("#new-image").value
        const newRamenRating = document.querySelector("#new-rating").value
        const newRamenComment = document.querySelector("#new-comment").value 
        let newRamen = {
            id: 6, 
            name: newRamenName,
            restaurant: newRamenRestaurant,
            image: newRamenImage,
            rating: newRamenRating,
            comment: newRamenComment,
        };
        const newImageElem = document.createElement("img")
        newImageElem.setAttribute("src",newRamen.image)
        newImageElem.setAttribute("id",newRamen.id)
        newImageElem.addEventListener("click", function(){
            renderRamen(newRamen)
        })
        ramenMenu.appendChild(newImageElem)
        newRamenForm.reset()
    })

    function renderRamens(ramens){
        ramens.forEach(ramen => { //iterates through ramen and sets new html element named img and then sets the "src" atrribute for the images
            const ramenImage = document.createElement("img") 
            ramenImage.setAttribute("src", ramen.image )
            ramenImage.setAttribute("id", ramen.id)
            ramenImage.addEventListener("click", function(){
                fetchRamen(ramenImage)
            })
            ramenMenu.appendChild(ramenImage)
        })
    }
    
    function fetchRamen(ramen){
        fetch(`http://localhost:3000/ramens/${ramen.id}`)
        .then(response => response.json())
        .then(data => renderRamen(data))
    }

    function renderRamen(ramen){
        const ramenImage = document.querySelector('.detail-image')
        ramenImage.setAttribute("src",ramen.image)
        const ramenName = document.querySelector('.name')
        ramenName.innerText = ramen.name
        const ramenRestaurant = document.querySelector('.restaurant')
        ramenRestaurant.innerText = ramen.restaurant
        const ramenRating = document.querySelector('#rating-display')
        ramenRating.innerText = ramen.rating
        const ramenComment = document.querySelector('#comment-display')
        ramenComment.innerText = ramen.comment
    }
    fetchRamens();
});