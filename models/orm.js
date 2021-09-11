const connection = require("./connection");
const { getTableColumns, select } = require("../queries/queries");

let db = null;
let tableName = null;

async function executeQuery(query) {
  return db.then((obj) => {
    return obj.execute(query);
  });
}

function setTableName(table) {
  tableName = table;
}

function closeConnection() {
  return db.then((obj) => obj.end());
}

function executeRawQuery(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await executeQuery(query);

      //closeConnection()

      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
}

function getOptionString(options) {
  let optionChain = "";

  if (options?.orderby) {
    optionChain += `ORDER BY ${options.orderby} `;

    if (options?.sort) {
      optionChain += `${options.sort} `;
    }
  }

  if (options?.limit) {
    optionChain += `LIMIT ${options.limit}`;
  }

  console.log(optionChain);

  return optionChain;
}

function getColumns() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("tablename:", tableName);

      const [rows] = await executeQuery(getTableColumns(tableName));

      let fields = [];

      await Promise.all(
        await rows.map((item) => {
          fields.push(item.Field);
        })
      );

      resolve(fields);
    } catch (error) {
      reject(error);
    }
  });
}

function findAll(params = null) {
  return new Promise(async (resolve, reject) => {
    try {
      let fields = "*";
      let keys = "1";
      let options = "";

      if (params?.where) {
        keys = "";
        let search_keys = Object.keys(params.where);
        let search_values = Object.values(params.where);

        search_keys.forEach((key, i) => {
          keys = keys + `${key}='${search_values[i]}' OR `;
        });

        keys = keys.substring(0, keys.length - 3);
      }

      if (params?.attributes) {
        fields = "";

        if (params.attributes?.exclude) {
          let fields_excluded = params.attributes.exclude;

          let columns = await getColumns();

          let field_keys = columns.filter((column) => {
            if (!fields_excluded.includes(column)) {
              return column;
            }
          });

          field_keys.forEach((field) => {
            fields = fields + `${field}, `;
          });

          fields = fields.substring(0, fields.length - 2);
        } else {
          let field_keys = params.attributes;

          field_keys.forEach((field) => {
            fields = fields + `${field}, `;
          });

          fields = fields.substring(0, fields.length - 2);
        }

        if (fields === "") fields = "*";
      }

      if (params?.options) options = getOptionString(params.options);

      let [rows] = await executeQuery(select(tableName, fields, keys, options));

      //closeConnection()

      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
}

function findByPk(params) {
  return new Promise(async (resolve, reject) => {
    try {
      let fields = "*";
      let keys = `id=${params}`;

      if (typeof params === "number") {
        let [rows] = await executeQuery(
          select(tableName, fields, keys, (options = ""))
        );

        //closeConnection()

        resolve(rows);
      } else {
        throw String(`the primary key must be an integer value `);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function isObjEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

const findOneValidator = (params) => {
  let msg = [];

  if (params.where === null || params.where === undefined)
    msg.push(`where object was not found with search keys`);
  if (isObjEmpty(params.where)) msg.push(`where object has no search keys`);

  return msg;
};

function findOne(params = null) {
  return new Promise(async (resolve, reject) => {
    try {
      let fields = "*";
      let keys = "";
      let options = "";
      let msg = findOneValidator(params);

      if (!msg[0]) {
        delete params.options.limit;

        let search_keys = Object.keys(params.where);
        let search_values = Object.values(params.where);

        search_keys.forEach((key, i) => {
          keys = keys + `${key}='${search_values[i]}' OR `;
        });

        keys = keys.substring(0, keys.length - 3) + " LIMIT 1";

        if (params.attributes) {
          fields = "";

          if (params.attributes?.exclude) {
            let fields_excluded = params.attributes.exclude;

            let columns = await getColumns();

            let field_keys = columns.filter((column) => {
              if (!fields_excluded.includes(column)) {
                return column;
              }
            });

            field_keys.forEach((field) => {
              fields = fields + `${field}, `;
            });

            fields = fields.substring(0, fields.length - 2);
          } else {
            let field_keys = params.attributes;

            field_keys.forEach((field) => {
              fields = fields + `${field}, `;
            });

            fields = fields.substring(0, fields.length - 2);
          }

          if (fields === "") fields = "*";
        }

        if (params?.options) options = getOptionString(params.options);

        let [rows] = await executeQuery(
          select(tableName, fields, keys, options)
        );

        //closeConnection()

        resolve(rows);
      } else {
        let str = "";

        msg.forEach((i) => {
          console.log(i);
          str = str + `${i}`;
        });

        throw String(str);
      }
    } catch (error) {
      reject(error);
    }
  });
}

class ORM {
  constructor(tableName) {
    db = connection();
    setTableName(tableName);
  }

  findAll(params) {
    return findAll(params);
  }

  findByPk(params) {
    return findByPk(params);
  }

  findOne(params) {
    return findOne(params);
  }

  query(params) {
    return executeRawQuery(params);
  }
}

module.exports = ORM;
