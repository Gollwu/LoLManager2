/*
 * Expose routes related to Teams
 */
var Express = require('express'),
    router = Express.Router(),
    handler = require('./handlers/teams.handler');

// GET all teams
router.get('/', handler.getTeams);

router.get('/:teamid', handler.getTeamById);

module.exports = router;