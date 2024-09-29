window.addEventListener("scroll", function () {
    var footer = document.getElementById("footer");
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        footer.classList.add("show-footer");
    } else {
        footer.classList.remove("show-footer");
    }
});
