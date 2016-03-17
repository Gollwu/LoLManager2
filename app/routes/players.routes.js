/*
 * Expose routes related to Players
 */
var Express = require('express'),
    router = Express.Router(),
    handler = require('./handlers/players.handler');

router.get('/', handler.getPlayers);

router.get('/:playerid', handler.getPlayerById);

router.get('/:playerid/affinityPlayer/:otherplayerid', handler.getAffinityToPlayer);

router.get('/:playerid/affinityChampion/:championid', handler.getAffinityToChampion);

module.exports = router;