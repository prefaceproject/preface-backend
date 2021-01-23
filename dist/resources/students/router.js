"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const router = (0, _express.Router)();
router.route('/').get((req, res) => {}).post((req, res) => {});
router.route('/:id').get((req, res) => {}).put((req, res) => {}).delete((req, res) => {});
router.route('/:studentId/sessions').get((req, res) => {});
var _default = router;
exports.default = _default;