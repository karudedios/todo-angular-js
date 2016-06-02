module.exports = function PromisedResponse(body) {
  return (req, res, next) => {
    
    body(req, res, next)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err.message);
      });
  };
};
