module.exports = function validateSchema(schema, data) {
  return function() {
    const validation = schema.validate(data);
    
    if(validation.error) {
      throw validation.error;
    }
    
    return data;
  };
};
