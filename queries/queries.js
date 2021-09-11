const queries = {
    
    getTableColumns: (TABLE)=>`SHOW COLUMNS FROM ${TABLE}`,
    
    select: (table, fields, keys, options) => {
        return `SELECT ${fields} FROM ${table} WHERE ${keys} ${options}`
    }
    
}

module.exports = queries;