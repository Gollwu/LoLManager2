/*
 * Expose routes related to Teams
 */
var Express = require('express'),
    router = Express.Router(),
    handler = require('./teams/teams.js');

// GET all teams
router.get('/', handler.getTeams);

router.get('/:teamid', handler.getTeamById);

module.exports = router;