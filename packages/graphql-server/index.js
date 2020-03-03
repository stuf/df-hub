require('dotenv').config();

require('./lib/index')
  .listen()
  .then(({ url }) => {
    console.log(`Server running at ${url}`);
  });
