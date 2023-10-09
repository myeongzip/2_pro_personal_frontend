window.onload = async () => {
    console.log('메인 페이지 연결 완료')

    if (localStorage.getItem("access")) {
        const payload = localStorage.getItem("payload")
        //console.log(payload)
    
        const payload_parse = JSON.parse(payload)
        console.log(payload_parse)

        const user_username = document.getElementById("user_username")
        //console.log(payload_parse.username)
        user_username.innerText = payload_parse.username

        const user_profile_img = document.getElementById("user_profile_img")
        console.log(payload_parse.profile_img)
        if (payload_parse.profile_img) {
            user_profile_img.src = "http://127.0.0.1:8000" + payload_parse.profile_img
        }
        //////// style ////////
        user_profile_img.classList.add("profile_img")

        document.getElementById("user_info").style.display = ""
        document.getElementById("btn_logout").style.display = ""
        document.getElementById("btn_sign_up_page").style.display = "none"
        document.getElementById("btn_login_page").style.display = "none"

    }

    await loadMainpage()

    async function loadMainpage() {

        const response = await fetch('http://127.0.0.1:8000/wishes/', {
            method : 'GET'
        })
        const response_json = await response.json()
        //console.log(response_json)

        const wish_list = document.getElementById('id_wish_list')

        response_json.forEach(wish => {
            //console.log(wish)                                           // {id: 9, author: 'ss', title: '4th wish', wish_name: '닥터마틴', content: '신발 url', …}
            //console.log(wish.images)                                    // 0: {image: '/media/wish/wish_img/4/%EC%A1%B1%EB%B0%9C%EC%97%94_%EC%86%8C%EB%A7%A5.jpg'}
            //console.log(wish.images[0])                                 // {image: '/media/wish/wish_img/4/%EC%A1%B1%EB%B0%9C%EC%97%94_%EC%86%8C%EB%A7%A5.jpg'}

            const wish_div = document.createElement('div')
            const wish_author_a = document.createElement('a')
            const wish_url_a = document.createElement('a')
            const wish_title_p = document.createElement('p')
            const wish_thumbnail_img = document.createElement('img')

            wish_author_a.href = "http://127.0.0.1:5500/wish/"
            wish_author_a.innerText = wish.author
            wish_url_a.href = "http://127.0.0.1:5500/wish/detail.html?wish_id=" + wish.id
            wish_title_p.innerText = wish.title

            //////// 위시 이미지가 있으면 첫 번째 이미지를 썸네일로 지정 ////////
            //////// 위시 이미지가 없을 경우 디폴트 이미지 url을 정의 ////////
            if (wish.images.length > 0) {
                thumbnail = wish.images[0].image
                console.log(thumbnail)
            } else {
                default_image_url = "/media/wish/wish_img/4/%EC%A1%B1%EB%B0%9C%EC%97%94_%EC%86%8C%EB%A7%A5.jpg"
                thumbnail = default_image_url
            }
            wish_thumbnail_img.src = "http://127.0.0.1:8000" + thumbnail

            wish_url_a.appendChild(wish_title_p)
            wish_url_a.appendChild(wish_thumbnail_img)
            wish_div.appendChild(wish_author_a)
            wish_div.appendChild(wish_url_a)
            wish_list.appendChild(wish_div)

            //////// style ////////
            wish_div.classList.add('wish')
            wish_thumbnail_img.classList.add('wish_thumbnail')
        })
    }
}

function handleLogout() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('payload')

    
    document.getElementById("user_info").style.display = 'none'
    document.getElementById("btn_logout").style.display = "none"
    document.getElementById("btn_sign_up_page").style.display = ""
    document.getElementById("btn_login_page").style.display = ""
}
