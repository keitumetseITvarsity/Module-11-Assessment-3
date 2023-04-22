var rootPath;

function init(){
    rootPath = "https://mysite.itvarsity.org/api/mini-blog/";

    document.getElementById("getAll").addEventListener("click", getAllPosts);
    document.getElementById("getPopular").addEventListener("click", getPopularPosts);
    document.getElementById("getLatest").addEventListener("click", getLatestPosts);

    getAllPosts();
}

function getAllPosts(){
    var category = "getAll";
    fetchPosts(category);
    setActiveLink(category);


}

function getPopularPosts(){
    var category = "getPopular";
    fetchPosts(category);
    setActiveLink(category);

}
   

function getLatestPosts(){
    var category = "getLatest";
    fetchPosts(category);
    setActiveLink(category);

}

function fetchPosts(category){
    var url = rootPath + 'get-posts/?category=' + category;
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
           displayPosts(data);  
        })
        
}

function displayPosts(data){
    var output = "";

    for(var i = 0; i < data.length; i++){

        output += `
            <div class="card mb-4 box-shadow">
                <div class="card-header">
                    <h4 class="my-0 font-weight-normal">${data[i][0]}</h4>
                </div>
                <div class="card-body">
                    <img src="${rootPath}/uploads/${data[i][3]}" class="card-img-top" alt="Card image cap">
                    <p class="card-text">${data[i][1]}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-lg btn-link"><i class="fas fa-heart"></i></button>
                            <button type="button" class="btn btn-lg btn-link"><i class="fas fa-comment"></i></button>
                            <button type="button" class="btn btn-lg btn-link"><i class="fas fa-retweet"></i></button>
                        </div>
                        <small class="text-muted">${data[i][2]}</small>
                    </div>
                </div>
                
            </div>
        `;
    
    }
    document.getElementById("posts").innerHTML = output;
}

function setActiveLink(id){
    document.getElementById("getAll").classList.remove("active");
    document.getElementById("getPopular").classList.remove("active");
    document.getElementById("getLatest").classList.remove("active");

    document.getElementById(id).classList.add("active");

}