"use strict";
// const sql = require("../sql").users;
const cs = {}; // Reusable ColumnSet objects.
class LayersRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;

    // set-up all ColumnSet objects, if needed:
    createColumnsets(pgp);
  }
  // Returns all layers records;
  all(layerName, xmin, ymin, xmax, ymax) {
    const queryString = `
    WITH bbox AS (
      SELECT ST_MakeEnvelope(${xmin},${ymin},${xmax},${ymax}, 4326) as geometry
    )
      SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(feature)
      )
      FROM (
        SELECT jsonb_build_object(
          'type',       'Feature',
          'id',         objectid,
          'geometry',   ST_AsGeoJSON(geom)::jsonb,
          'properties', to_jsonb(inputs) - 'gid' - 'geometry' -'geom'
        ) AS feature
          FROM (
            SELECT * FROM "${layerName}","bbox" WHERE "${layerName}".geom && bbox.geometry
          ) inputs
      ) features;`;
    return this.db.any(queryString);
  }
}
function createColumnsets(pgp) {
  // create all ColumnSet objects only once:
  if (!cs.insert) {
    // Type TableName is useful when schema isn't default "public" ,
    // otherwise you can just pass in a string for the table name.
    const table = new pgp.helpers.TableName({
      table: "layers",
      schema: "public"
    });

    cs.insert = new pgp.helpers.ColumnSet(["name"], { table });
    cs.update = cs.insert.extend(["?id"]);
  }
  return cs;
}

module.exports = LayersRepository;
