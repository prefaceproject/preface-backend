"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ = require("../");

const router = (0, _express.Router)();
router.route('/').get(async (req, res) => {
  const books = await _.Book.find({});
  res.json(books);
});
router.route('/:id').get((req, res) => {}).put((req, res) => {}).delete((req, res) => {});
var _default = router;
exports.default = _default;