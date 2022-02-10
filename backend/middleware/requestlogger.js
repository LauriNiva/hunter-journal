const requestlogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('Headers:  ', request.headers)
  console.log('---')
  next()
};

export default requestlogger;