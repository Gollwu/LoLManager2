/*
 * Expose routes related to Champions
 */
var Express = require('express'),
    router = Express.Router(),
    handler = require('./champions/champions.js');

router.get('/', handler.getChampions);

module.exports = router;