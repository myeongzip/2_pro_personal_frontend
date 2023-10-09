const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"


async function getWish(wishId) {
    const response = await fetch(`${(backend_base_url)}/wishes/${wishId}/`)

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

async function loadWish(wishId) {
    const response = await getWish(wishId); // 오류: Uncaught (in promise) ReferenceError: getWish is not defined 
    console.log(response)
    // for(var key in response){
    //     console.log(key+' '+response[key]);
    // }
    // console.log(response)
    // console.log(response_json.images)
    
    const wishTitle = document.getElementById("wish-title")
    const wishName = document.getElementById("wish-name")
    const wishImage = document.getElementById("wish-image")
    const wishContent = document.getElementById("wish-content")

    wishTitle.innerText = response.title
    wishName.innerText = response.wish_name
    wishContent.innerText = response.content
    wishImage.src = response.images
    console.log(wishImage.src)
    

    // console.log(response.images)        // [{image: '/media/wish/wish_img/6/image2.jpg'}, {image: '/media/wish/wish_img/6/image3.jpg'}]
    // console.log(response.images[1])     // {image: '/media/wish/wish_img/6/image3.jpg'}
    // console.log(response.images.values) // ƒ values() { [native code] }

    for (const image of response.images) {  
        console.log(image.image)                      // {image: '/media/wish/wish_img/6/image2.jpg'}와 {image: '/media/wish/wish_img/6/image3.jpg'}가 따로 콘솔로그에 찍힘
    }


    const newImage = document.createElement("img")

    if (response.images.length > 0) {
        for (const image of response.images) {
            newImage.src = "http://127.0.0.1:8000" + image.image                
        }
        // for (var image of response.images) {
        //     newImage.setAttribute("src", '${backend_base_url}${image}')
        // }
    } else {
        default_image_url = "/media/wish/wish_img/wish_img/default_img.jpg"
        wishImage.src = "http://127.0.0.1:8000" + default_image_url
    }
    

}

async function loadComments(wishId) {
    const response = await getWish(wishId);
    const response_json = await response.comments
    console.log(response_json)

    const commentAuthor = document.getElementById("comment-author")
    const commentContent = document.getElementById("comment-content")
    const commentCreatedAt = document.getElementById("comment-created")
    // commentAuthor.innerText = response_json.comments.author
    // commentContent.innerText = response_json.comments.content
    // commentCreatedAt.innerText = response_json.comments.created_at
    // var json = { 'NAME':'홍길동', 'SEX':'남', 'AGE':'99세'};

    // Object.keys(response_json)
    // for(key in Range(response_json.length)) {
    //     alert('key:' + key + ' / ' + 'value:' + response_json[key]);
    // }
    response_json.forEach(comment => {
        
    }
        )

}


window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);  // 화면이 로드되면 window.location.search를 이용해 로드된 화면의 url을 가져와서 urlParams라는 object로 만들어준다.
    const wishId = urlParams.get('wish_id');                        // wish_id를 가져오기
    // console.log(wishId)
    await loadWish(wishId);
    await loadComments(wishId);
}