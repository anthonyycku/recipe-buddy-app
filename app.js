$(() => {
  loading = (page) => {
    $(".modal").css({
      "display": "flex",
      "justify-content": "center",
      "align-items": "center"
    });
    $(".wrapper").css("filter", "grayscale(100%)");
    $(".nav").css("pointer-events", "none");
    setTimeout(() => {
      $(".modal").css("display", "none");
    }, 1500);
    setTimeout(() => {
      $(".wrapper").css("position", "").css("filter", "");
      $(".nav").css("pointer-events", "");
      window.location = page;
    }, 1700);
  }

  $("body").on("click", ".navLink", (e) => {
    if ($(e.currentTarget).text() === "Recipes") {
      loading("recipes.html");
    } else if ($(e.currentTarget).text() === "Home") {
      loading("index.html");
    }
  })

  //AJAX
  let query = "https://api.edamam.com/search?app_id=27da4460&app_key=f383bd2a1f9529580b0c88db70d1e990&q=shrimp";
  $.ajax({
    url: query,
    method: "GET",
  }).then(
    (data) => {
      console.log(data.hits);
    });
})