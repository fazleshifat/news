fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => handleCategory(data.data))
    .catch(err => console.error(err));



// function handleBtn(event) {
//     fetch(`https://openapi.programming-hero.com/api/news/${event}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//         })
//         .catch(err => console.error(err));
// };

const handleCategory = (categories) => {
    const categoryItems = categories.news_category.map(category => {
        const categoryId = category.category_id;
        const categoryName = category.category_name;
        return `
            <li class="nav-item">
            <a class="nav-link text-secondary" href="#${categoryName.toLowerCase()}" data-category-id="${categoryId}">${categoryName}</a>
            </li>
          `;
    }).join('');
    const categoryItem = document.getElementById("categoryItem");
    categoryItem.innerHTML = categoryItems;


    // Add event listener to links in the navbar
    const navbarLinks = document.querySelectorAll('.nav-link');
    const spinner = document.getElementById('spinner');
    errorMessage.innerHTML = "<p class='mb-0'>Please select category to load data</p>";
    navbarLinks.forEach(link => {
        link.addEventListener('click', event => {
            spinner.style.display = 'block';
            event.preventDefault();
            const categoryId = event.target.getAttribute('data-category-id');
            fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
                .then(response => response.json())
                .then(data => {
                    handleNewses(data.data); spinner.style.display = 'none';
                })
                .catch(err => console.error(err));
        });
    });



    const handleNewses = (newses) => {

        const newsItems = newses.map(news => {
            const idNum = news._id;
            const thumbnail = news.thumbnail_url;
            const title = news.title;
            const details = news.details;
            const img = news.author.img;
            const name = news.author.name;
            const date = news.author.published_date;
            const views = news.total_view;
            return `
                <div class="card mb-3" style="max-width: auto;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${thumbnail}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8 my-auto">
                            <div class="card-body">
                                
                            ${title ? '<h5 class="card-title">' + title + '</h5>' : '<p class="card-text">Data not found</p>'}
                             ${details ? '<p class="card-text">' + details.slice(0, 400) + '...</p>' : '<p class="card-text">Data not found</p>'}
                                
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="d-flex align-items-center">
                                        <img style=" max-height: 40px" class="rounded-circle img-fluid" src="${img}" alt="">
                                        <div>
                                        ${name ? '<p class="mb-0">' + name + '</p>' : '<p class="card-text">Data not found</p>'}
                                        ${date ? '<p class="mb-0">' + date + '</p>' : '<p class="card-text">Data not found</p>'}
                                            
                                        </div>
                                    </div>
                                    <div>
                                        <p class="mb-0">Views: ${views || 'Not Found'}</p>
                                    </div>
                                    <button id="news-btn" data-category-id="${idNum || 'Not Found'}" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal${idNum || 'Not Found'}" >-></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal -->
                    <div class="modal fade" id="exampleModal${idNum}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <img src="${thumbnail}" class="" alt="...">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
                                    <p>${details}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

            
            `
        }).join('');
        const newsItem = document.getElementById("newsItem");
        newsItem.innerHTML = newsItems;



        const errorMessage = document.getElementById("errorMessage");
        if (newses.length === 0) {
            errorMessage.innerHTML = `<p class="mb-0">No items found</p>`
        } else {
            errorMessage.innerHTML = `<p class="mb-0">${newses.length} items found</p>`
        }

        // setup for spinner 
        document.getElementById("spinner").style.display = "block";
        setTimeout(function () {
            document.getElementById("spinner").style.display = "none";
        }, 3000);



    };
};


