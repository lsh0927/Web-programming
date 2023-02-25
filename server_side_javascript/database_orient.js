const OrientDBClient = require('orientjs').OrientDBClient;
let session;
let client;

(async function() {
  try {
     client = await OrientDBClient.connect({
      host: 'localhost',
      port: 2424,
      username: 'root',
      password: 'dltmdgjs0927'
    });

     session = await client.session({
      name: 'o2',
      username: 'root',
      password: 'dltmdgjs0927'
    });

    // Use the session to execute queries
    const results = await session.query('SELECT * FROM topic');
    console.log(results);
  } catch (err) {
    console.error(err);
  } finally {
    if (session) {
      await session.close();
    }
    if (client) {
      await client.close();
    }
  }
})();
