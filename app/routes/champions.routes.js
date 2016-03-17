/*
 * Expose routes related to Champions
 */
var Express = require('express'),
    router = Express.Router(),
    handler = require('./handlers/champions.handler');

router.get('/', handler.getChampions);

module.exports = router;