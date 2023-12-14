import * as fs from 'fs';

// Reading config file
fs.readFile(
  './dist/movie-catalog/assets/config/config.template.json',
  'utf8',
  (err, data) => {
    if (err) {
      return console.log(err);
    }

    const vercelUrl = ['preview', 'development'].includes(
      process.env['VERCEL_ENV']
    )
      ? process.env['VERCEL_URL']
      : 'movie-catalog-flax.vercel.app';

    // Replace env value
    const result = data
      .replace(/@\[TMDB_API_URL\]/g, process.env['TMDB_API_URL'] ?? '')
      .replace(/@\[TMDB_API_TOKEN\]/g, process.env['TMDB_API_TOKEN'] ?? '')
      .replace(/@\[PRODUCTION\]/g, process.env['PRODUCTION'] ?? '')
      .replace(
        /@\[VERCEL_PROXY_URL\]/g,
        process.env['VERCEL_URL'] ? `https://${vercelUrl}/api` : ''
      );

    // Update the file
    fs.writeFile(
      './dist/movie-catalog/assets/config/config.json',
      result,
      'utf8',
      err => (err ? console.log(err) : null)
    );
  }
);

fs.rm('./dist/movie-catalog/assets/config/config.template.json', err =>
  err ? console.log(err) : null
);
