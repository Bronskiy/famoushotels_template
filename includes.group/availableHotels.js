$( function() {
  var availableHotels = [
    {exp:channel:entries channel="hotels" orderby="opening_date_timeline" status="open|Full Plan" limit="999" sort="asc" dynamic="no" cache="yes" refresh="576"}
    "{title}"{if count != total_results},{/if}
    {/exp:channel:entries}
  ];
  $( "#suggest-hotel" ).autocomplete({
    source: availableHotels,
    change: function(event, ui) {
        if (ui.item) {
            $("#suggest-hotel").after('<p class="suggest-notify">' + ui.item.value + ' already in our database.' + '</p>');
        } else {
            $(".suggest-notify").remove();
        }
    }
  });
} );
