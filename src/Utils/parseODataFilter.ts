export const parseODataFilter = (filter: string): { sql: string } => {
    const sqlParts: string[] = [];
  
    let idx = 0;

    const conditions = filter.split(/\s+and\s+/i);
  
    // contains(productName,'laptop')
    conditions.forEach(condition => {
      if(condition.includes('contains')){
        const containsMatch = /contains\((\w+),\'(.+?)\'\)/g;
        condition = condition.replace(containsMatch, (_, field, value) => {
          sqlParts.push(`${field} LIKE ${`%${value}%`}`);
          return '';
        });
      }
      
      // price gt 500
      if(/(\w+)\s+(gt|lt|eq|ne|ge|le)\s+('?[^']+'?)/g.test(condition)){
        const simpleMatch = /(\w+)\s+(gt|lt|eq|ne|ge|le)\s+('?[^']+'?)/g;
        condition = condition.replace(simpleMatch, (_, field, op, value) => {
          let sqlOp = '';
      
          switch (op) {
              case 'gt': sqlOp = '>'; break;
              case 'lt': sqlOp = '<'; break;
              case 'eq': sqlOp = '='; break;
              case 'ne': sqlOp = '!='; break;
              case 'ge': sqlOp = '>='; break;
              case 'le': sqlOp = '<='; break;
          }
      
          // Remove quotes from string
          //if (value.startsWith("'") && value.endsWith("'")) {
            //value = value.slice(1, -1);
          //} else {
            //value = Number(value);
          //}
      
          sqlParts.push(`${field} ${sqlOp} ${value}`);
          return '';
        });
      }
    });
  
    // Combine SQL WHERE
    const sql = sqlParts.join(' AND ');
    return { sql };
}