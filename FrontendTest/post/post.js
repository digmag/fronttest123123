let path = window.location.pathname;
let id = path.split('/')[2];
let url = "blog.kreosoft.space/api/post/"+id;
function parsetime(time){
    let datetime = time.split("T");
    let YYMMDD = datetime[0].split("-");
    let HHMMSS = datetime[1].split(".")[0].split(":");
    let newtime = "Создан "+YYMMDD[2]+"-"+YYMMDD[1]+"-"+YYMMDD[0]+" "+HHMMSS[0]+":"+HHMMSS[1];
    return newtime;
}
$.ajax({
    type: "GET",
    contentType: "application/json",
    url: "https://blog.kreosoft.space/api/post/"+id,         /* Куда отправить запрос */
    dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
        /* Данные передаваемые в массиве */
    success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
            /* В переменной data содержится ответ от index.php. */
            create(data);
        }
});

function create(data){
    document.querySelector("#Title").textContent = data.title;
    document.querySelector("#Author").textContent = data.author;
    document.querySelector("#Description").textContent = data.description;
    console.log(data)
    if(data.image != null){
        document.querySelector("#Image").src = data.image;
    }
    else{
        document.querySelector("#Image").parentElement.style.display = "none";
    }
    document.querySelector("#Time").textContent = parsetime(data.createTime);
    addlikes(data);
    putcoms(data);
}

function putcoms(data){
    let parent = document.querySelector("#Comm").parentElement;
    parent.style.display = "";
    let coms = data.comments;
    for(let i = 0; i<data.commentsCount; i++){
        let clone = document.querySelector("#Comm").cloneNode(true);
        clone.id = "";
        clone.style.display = "";
        clone.querySelector("#Author").textContent = coms[i].author;
        clone.querySelector("#Text").textContent = coms[i].content;
        clone.querySelector("#CTime").textContent = parsetime(coms[i].createTime);
        parent.appendChild(clone);
    }
}

function addlikes(data){
    let comlike = ["Комментарии", "Лайки"];
    for(let i =0; i<2; i++){
        let clonecole = document.querySelector("#ucol").cloneNode(true);
        clonecole.id = "";
        clonecole.style.display = "";
        clonecole.textContent = comlike[i]+" ";
        if(i%2==0){
            clonecole.textContent += data.commentsCount;
        }
        else{
            clonecole.classList.add("text-end")
            clonecole.textContent += data.likes;
        }
        document.querySelector("#ucol").parentElement.appendChild(clonecole);
    }

}
/*
<div class = "row align-items-center bg-info">
          <div class = "col text-start" id = "Coms"></div>
          <div class = "col text-end" id = "Likes"></div>
        </div>
*/