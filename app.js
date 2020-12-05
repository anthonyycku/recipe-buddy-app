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
    }, 1200);
    setTimeout(() => {
      $(".wrapper").css("position", "").css("filter", "");
      $(".nav").css("pointer-events", "");
      window.location = page;
    }, 1300);
  }

  $("body").on("click", ".navLink", (e) => {
    if ($(e.currentTarget).text() === "Recipes") {
      loading("recipes.html");
    } else if ($(e.currentTarget).text() === "Home") {
      loading("index.html");
    }
  })

  //AJAX
  getAPI = (name, item) => {
    let query = "https://api.edamam.com/search?app_id=27da4460&app_key=f383bd2a1f9529580b0c88db70d1e990&q=" + name;
    $.ajax({
      url: query,
      method: "GET",
    }).then(
      (data) => {
        for (let i = 0; i < data.hits.length; i++) {
          let newItem = $("<p>").text(data.hits[i].recipe.ingredients[i].text);
          $(".results").append(newItem);
        }
      });
  }
  // RECIPES Page
  $("input[type='submit']").on("click", (e) => {
    e.preventDefault();
    let name = $("input[type='text']").val();
    getAPI(name, "ingredients");
  })

}) // end of jquery