function putintoblox(data){
    let posts = data.posts;
    console.log(posts);
    let pagination = data.pagination;
    posts.forEach(e => {
        let clone = document.querySelector("#Post").cloneNode(true);
        clone.style.display = "";
        clone.id = "";
        clone.querySelector("#Title").textContent = e.title;
        clone.querySelector("#Title").href = "/post/"+e.id;
        clone.querySelector("#Description").textContent = e.description;
        clone.querySelector("#Name").textContent = e.author;
        clone.querySelector("#Date").textContent = parsetime(e.createTime);
        if(e.image != null){
            clone.querySelector("#Image").src = e.image;
        }
        document.querySelector("#Posts").appendChild(clone);
    });
}
function get_posts(url){
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,         /* Куда отправить запрос */
        dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            /* Данные передаваемые в массиве */
        success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
                /* В переменной data содержится ответ от index.php. */
                putintoblox(data);
            }
    
    });
};
window.addEventListener("load", ()=>{
    const url = new URL("https://blog.kreosoft.space/api/post");
    url.search = window.location.search;
    console.log(url.toString())
    get_posts(url.toString());
});

function parsetime(timeformat){
    let datetime = timeformat.split("T");
    let YYMMDD = datetime[0].split("-");
    let HHMMSS = (datetime[1].split(".")[0]).split(":");
    let newdatetime = YYMMDD[2]+"."+YYMMDD[1]+"."+YYMMDD[0]+" "+HHMMSS[0]+":"+HHMMSS[1];
    return newdatetime;
}

function parseparams(search){
    let result ={};
    let stringparams = search.split("?")[1];
    let queryParamArray = stringparams.split('&');
    queryParamArray.forEach(e=>{
        let item = e.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}
function convert(date){
    let x = "";
    switch (date) {
        case "По дате создания (сначала новые)":
            x = "CreateDesc";
            break;
        case "По дате создания (сначала старые)":
            x = "CreateAsc";
            break;
        case "По количеству лайков(возрастание)":
            x = "LikesAsc";
            break;
        case "По количеству лайков(убывание)":
            x = "LikesDesc";
            break;
        default:
            break;
    }
    return x;
}

document.querySelector("#paramBtn").addEventListener("click", ()=>{
    let statement = {};
    let new_url = new URL(window.location.origin);
    let old_url = new URL(window.location.href);
    if(old_url.search.includes("page")){
        statement.page = parseparams(old_url.search).page;
    }
    if(document.querySelector("#SortBy").value !=""){
        statement.sorting = convert(document.querySelector("#SortBy").value);
    }
    if(document.querySelector("#AuthorName").value != ""){
        statement.authorName = document.querySelector("#AuthorName").value;
    }
    if(document.querySelector("#flexCheckChecked").checked){
        statement.onlyMyCommunities = true;
    }
    let params = new URLSearchParams(statement);
    new_url.search = params.toString();
    window.location.href = new_url;
});