document.addEventListener("DOMContentLoaded", function () {
  // Select everything that should go to the listing page
  const listingTriggers = document.querySelectorAll(".go-to-listing");

  listingTriggers.forEach(function (element) {
    element.addEventListener("click", function () {
      window.location.href = "listing.html";
    });
  });
});
