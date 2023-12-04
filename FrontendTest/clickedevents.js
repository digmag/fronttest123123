document.addEventListener("click", e => {
    if(e.target.parentElement.tagName ==="UL")
    document.querySelector("#SortBy").value = e.target.textContent;
});