document.ready(function () {
	const amenities = {};
	$("li input[type=checkbox]").change(function () {
		if (this.checked) {
			amenities[this.dataset.name] = this.dataset.id;
		} else {
			delete amenities[this.dataset.name];
		}
		$(".amenities h4").text(Object.keys(amenities).sort().join(", "));
	});

	$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});

  $.ajax({
    url: placeSearchUrl,
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: '{}',
    success: (places) => {
      $.each(places, (index, place) => {
        $('section.places').append(`<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest(s)</div>
            <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
          </div>
          <div class="user">
          <div class="description">
            ${place.description}
          </div>
        </article>`);
      });
    },
    error: (err) => {
      console.log("Failed Request:", err);
    }
  });
});

