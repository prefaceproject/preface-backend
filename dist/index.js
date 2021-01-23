"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _crud = _interopRequireDefault(require("./utils/crud"));

var _router = _interopRequireDefault(require("./resources/users/router.js"));

var _router2 = _interopRequireDefault(require("./resources/books/router.js"));

var _router3 = _interopRequireDefault(require("./resources/sessions/router.js"));

var _router4 = _interopRequireDefault(require("./resources/students/router.js"));

var _router5 = _interopRequireDefault(require("./auth/router.js"));

var _resources = require("./resources");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const app = (0, _express.default)();
const port = process.env.PORT || 5000;
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use('/api/users', _router.default);
app.use('/api/books', _router2.default);
app.use('/api/sessions', _router3.default);
app.use('/api/students', _router4.default);
app.use('/api/auth', _router5.default);
app.get('/test', (req, res) => {
  res.send({
    express: 'Test call to backend'
  });
});
app.get('/example_saga_request', (req, res) => {
  res.send({
    message: 'Saga success '
  });
});
(0, _resources.connectDb)().then(async () => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});