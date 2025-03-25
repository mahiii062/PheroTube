function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }

}


function loadCategories() {
    // 1. fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        // 2. convert promise to data
        .then((res) => res.json())
        // 3. send data to display
        .then((data) => displayCategories(data.categories));
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos)
        });
}

const loadCategoriesVideos = (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickButton = document.getElementById(`btn-${id}`);
            clickButton.classList.add("active");
            // console.log(clickButton);
            displayVideos(data.category);
        });
};


const loadVideoDetails = (videoId) => {
    console.log(videoId);

    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video));
};


const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML =
        `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
    `;
};

// category
// :
// "Music"
// category_id
// :
// "1001"

// {
//     "category_id": "1001",
//     "video_id": "aaah",
//     "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//     "title": "Colors of the Wind",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//             "profile_name": "Ethan Clark",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "233K",
//         "posted_date": "16090"
//     },
//     "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }


function displayCategories(categories) {
    // get the container
    // console.log(categories);

    const categoryContainer = document.getElementById('category-container');

    // loop operation on array of object
    for (let cat of categories) {
        // console.log(cat);

        // create element
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
                <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

        `;
        // append the element
        categoryContainer.append(categoryDiv);

    }
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');

    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `        <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Ooops!! Sorry,there is no content here</h2>
        </div>`;

        return;
    }

    videos.forEach(video => {
        console.log(video);
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" class="rounded-xl" />
                <span class="absolute bottom-2 right-2 text-white text-sm rounded bg-black px-2">3hrs 56min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">
                        Midnight Serenade
                    </h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show details</button>
        </div>
    `;
        //append
        videoContainer.append(videoCard)
    });
}

loadCategories();
// loadVideos();