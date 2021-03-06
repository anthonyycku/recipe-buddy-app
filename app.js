//jquery
$(() => {

  //loading function for animation
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

  //Navigation links
  $("body").on("click", ".navLink", (e) => {
    if ($(e.currentTarget).text() === "Recipes") {
      loading("recipes.html");
    } else if ($(e.currentTarget).text() === "Home") {
      loading("index.html");
    } else if ($(e.currentTarget).text() === "About") {
      loading("about.html");
    }
  })


  //AJAX
  let dictionary = {};
  getAPI = (name, item) => {
    let query = "https://api.edamam.com/search?app_id=27da4460&app_key=f383bd2a1f9529580b0c88db70d1e990&q=" + name;
    $.ajax({
      url: query,
      method: "GET",
    }).then(
      (data) => {
        dictionary = {};
        $(".results").empty();
        for (let i = 0; i < data.hits.length; i++) {
          let frame = $("<div class='frame'>").attr("id", i);
          let frameImage = $("<img class='frameImage'>").attr("src", data.hits[i].recipe.image);
          let frameText = $("<div class='frameText'>").text(data.hits[i].recipe.label);
          frame.append(frameImage);
          frame.append(frameText);
          $(".results").append(frame);

          //dictionary
          dictionary[i] = {
            nutrients: data.hits[i].recipe.totalNutrients,
            ingredients: data.hits[i].recipe.ingredients,
            source: data.hits[i].recipe.url
          };
        }
      });
  } //end of ajax


  //Submit function
  $("input[type='submit']").on("click", (e) => {
    e.preventDefault();
    let name = $("input[type='text']").val();
    getAPI(name);
  })

  //create result items
  $(".results").on("click", ".frame", (e) => {
    let id = $(e.currentTarget).attr("id");
    createResult(id, e);
  })

  //create modal
  createResult = (id, e) => {
    $("body").append("<div class='resultModal'>");
    $(".resultModal").css("display", "flex");
    $(".resultModal").append($("<div class='insideModal'>"))
    $(".resultModal").append($("<div class='close'>").text("X"));

    $(".insideModal").append($("<div class='modalTitle'>").text($(e.currentTarget).children().eq(1).text()));
    $(".insideModal").append($("<div class='modalBody'>"));
    $(".insideModal").append($("<div class='modalFooter'>"));

    //ingredients
    let ingredientLength = dictionary[id].ingredients.length;
    for (let j = 0; j < ingredientLength; j++) {
      $(".modalBody").append($("<p>").text(dictionary[id].ingredients[j].text));
    }

    //source
    $(".modalFooter").append($("<p>").text("Recipe Instructions: "))
    $(".modalFooter").append($(`<a href = "${dictionary[id].source}">`).text("Here"));


    //tooltip
    $(".modalFooter").append($("<img src='img/nutrition.png' class='tooltip'>"));
    $(".insideModal").append($("<div class='tooltipBox'>"));

    $(".tooltipBox").append($("<p class='tooltipText'>").text("Fat: " + Math.floor(dictionary[id].nutrients.FAT.quantity) + dictionary[id].nutrients.FAT.unit));
    $(".tooltipBox").append($("<p class='tooltipText'>").text("Sugar: " + Math.floor(dictionary[id].nutrients.SUGAR.quantity) + dictionary[id].nutrients.SUGAR.unit));
    $(".tooltipBox").append($("<p class='tooltipText'>").text("Sodium: " + Math.floor(dictionary[id].nutrients.NA.quantity) + dictionary[id].nutrients.NA.unit));

    $(".tooltip").on("mouseover", () => {
      $(".tooltipBox").css("visibility", "visible");
    })
    $(".tooltip").on("mouseleave", () => {
      $(".tooltipBox").css("visibility", "hidden");
    })

  }

  //close modal
  $("body").on("click", ".close", (e) => {
    $(".resultModal").css("display", "none");

    $(".resultModal").remove();
  })
}) // end of jquery