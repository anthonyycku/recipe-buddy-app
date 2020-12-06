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
      $(".wrapper").css("filter", "");
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
        let dictionary = {};
        console.log(data.hits[0].recipe);
        $(".results").empty();
        for (let i = 0; i < data.hits.length; i++) {
          let frame = $("<div class='frame'>").attr("id", i);
          let frameImage = $("<img class='frameImage'>").attr("src", data.hits[i].recipe.image);
          let frameText = $("<div class='frameText'>").text(data.hits[i].recipe.label);
          frame.append(frameImage);
          frame.append(frameText);
          $(".results").append(frame);

          dictionary[i] = {
            nutrients: data.hits[i].recipe.totalNutrients,
            ingredients: data.hits[i].recipe.ingredients,
            source: data.hits[i].recipe.url
          };


        }
      });
  } //end of ajax


  // RECIPES Page
  $("input[type='submit']").on("click", (e) => {
    e.preventDefault();
    let name = $("input[type='text']").val();
    getAPI(name);
  })


  //create result items

  $(".results").on("click", ".frame", (e) => {
    let id;
    createResult(id, e);
    //  console.log($(e.currentTarget).children().eq(1).text());
  })

  //close modal
  $("body").on("click", ".close", (e) => {
    $(".resultModal").css("display", "none");

    $(".resultModal").remove();
  })

  //create modal
  createResult = (id, e) => {
    $("body").append("<div class='resultModal'>");
    $(".resultModal").css("display", "flex");
    $(".resultModal").append($("<div class='insideModal'>"))

    $(".insideModal").append($("<div class='modalTitle'>").text($(e.currentTarget).children().eq(1).text()));
    $(".resultModal").append($("<div class='close'>").text("X"));
  }

}) // end of jquery