const fs = require('fs');

// Reading config file
fs.readFile('./dist/movie-catalog/assets/config/config.template.json', 'utf8', function(err, data) {

    console.log("DEBUUUUUUUG");
    if (err) {
        return console.log(err);
    }

    // Replace env value
    var result = data.replace(/@\[TMDB_API_URL\]/g, process.env.TMDB_API_URL).replace(/@\[TMDB_API_TOKEN\]/g, process.env.TMDB_API_TOKEN);

    // Update the file
    fs.writeFile('./dist/movie-catalog/assets/config/config.json', result, 'utf8', function(err) {
        if (err) return console.log(err);
    });
});