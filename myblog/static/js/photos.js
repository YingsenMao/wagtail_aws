function _get_nice_location_string_us(loc_data) {
    if (loc_data.city && loc_data.state) {
        return loc_data.city + ', ' + loc_data.state;
    } else if (loc_data.city) {
        return loc_data.city + ', ' + loc_data.country;
    } else if (loc_data.state) {
        return loc_data.state + ', ' + loc_data.country;
    } else {
        return loc_data.country;
    }
}

function _get_nice_location_string_intl(loc_data) {
    if (loc_data.city) {
        return loc_data.city + ', ' + loc_data.country;
    } else if (loc_data.state) {
        // For Iceland
        return loc_data.state + ' ' + loc_data.country;
    } else {
        return loc_data.country;
    }
}

function transform_data(data) {
    for (var i = 0; i < data.length; i++) {
        var photo_obj = data[i];
        var metadata = photo_obj.metadata;
        var loc_data = metadata.location;

        // First, transform the date into something usable
        if (metadata.date_taken) {
            var MONTHS = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
            ];
            var d = new Date(Date.parse(metadata.date_taken));
            var month = MONTHS[d.getMonth()];

            metadata.date_taken = month + ' ' + d.getFullYear();
        }

        // Now, make the "nice" location name
        // In US: city, state; Elsewhere: city, country
        if (loc_data.country == 'United States') {
            metadata.nice_location = _get_nice_location_string_us(loc_data);
        } else if (loc_data.country) {
            metadata.nice_location = _get_nice_location_string_intl(loc_data);
        } 
    }

    return data;
}

function render_photogrid($container) {
    var API_URL = 'http://photoapi.xjtian.com/photos/all';
    var tmpl = $('#photo-card-tmpl').html();

    var category = $('#photo-subnav > li.active > a').attr('data-category');
    var final_url = API_URL + '?category=' + category;

    $container.empty();
        
    $.get(final_url, function(data) {
        transform_data(data);

        var rendered = Mustache.render(tmpl, {photos: data});
        $container.html(rendered);
        $container.justifiedGallery({
            rowHeight: 300,
            lastRow: 'center',
            margins: 10,
            border: 10
        });
    });
}