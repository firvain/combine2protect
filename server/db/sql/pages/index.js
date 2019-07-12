"use strict";

const QueryFile = require("pg-promise").QueryFile;
const path = require("path");
module.exports = {
  pages: {}
};

// Helper for linking to external query files;
function sql(file) {
  const fullPath = path.join(__dirname, file); // generating full path;

  const options = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // Example of using static pre-formatting parameters -
    // we have variable 'schema' in each of our SQL files:
    params: {
      schema: "public" // replace ${schema~} with "public"
    }
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

//////////////////////////////////////////////////////////////////////////
