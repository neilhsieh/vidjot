if (process.env.NODE_ENV === 'production') {
  module.exports = {mongoURI: "mongodb://neil:bob1234@ds127015.mlab.com:27015/vidjot-prod"}
} else {
  module.exports = {mongoURI: "mongodb://localhost/vidjot-dev"}
}
