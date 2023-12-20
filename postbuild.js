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
      // .replace(/@\[TMDB_API_TOKEN\]/g, process.env['TMDB_API_TOKEN'] ?? '')
      .replace(/@\[PRODUCTION\]/g, process.env['PRODUCTION'] ?? '')
      .replace(/@\[FIRE_PROJECT_ID\]/g, process.env['FIRE_PROJECT_ID'] ?? '')
      .replace(/@\[FIRE_APP_ID\]/g, process.env['FIRE_APP_ID'] ?? '')
      .replace(
        /@\[FIRE_STORAGE_BUCKET\]/g,
        process.env['FIRE_STORAGE_BUCKET'] ?? ''
      )
      .replace(/@\[FIRE_API_KEY\]/g, process.env['FIRE_API_KEY'] ?? '')
      .replace(/@\[FIRE_AUTH_DOMAIN\]/g, process.env['FIRE_AUTH_DOMAIN'] ?? '')
      .replace(
        /@\[FIRE_MESSAGING_SENDER_ID\]/g,
        process.env['FIRE_MESSAGING_SENDER_ID'] ?? ''
      )
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
