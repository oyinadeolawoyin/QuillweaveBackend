const { sendError } = require("../utilis/sendError");
// src/controllers/workspaceController.js
const workspaceService = require("../services/workspaceservice");

async function getWeeklyTargetFeed(req, res) {
  try {
    const writers = await workspaceService.getWritersWorkingTowardWeeklyTarget(req.user?.id ?? null);
    res.json(writers);
  } catch (err) {
    sendError(res, err);
  }
}

async function getDraftPlanFeed(req, res) {
  try {
    const writers = await workspaceService.getDraftPlanFeed(req.user?.id ?? null);
    res.json(writers);
  } catch (err) {
    sendError(res, err);
  }
}

async function getWorkspaceFeed(req, res) {
  try {
    const members = await workspaceService.getWorkspaceMembers(req.user?.id ?? null);
    res.json(members);
  } catch (err) {
    sendError(res, err);
  }
}

async function getWeeklyWinners(req, res) {
  try {
    const winners = await workspaceService.getWeeklyGoalCompleters(req.user?.id ?? null);
    res.json(winners);
  } catch (err) {
    sendError(res, err);
  }
}

async function getFinishedDraftsFeed(req, res) {
  try {
    const finished = await workspaceService.getRecentlyFinishedDraftPlans(req.user?.id ?? null);
    res.json(finished);
  } catch (err) {
    sendError(res, err);
  }
}

async function getTopStreaks(req, res) {
  try {
    const leaders = await workspaceService.getTopStreakLeaderboard(req.user?.id ?? null);
    res.json(leaders);
  } catch (err) {
    sendError(res, err);
  }
}

async function getMyStats(req, res) {
  try {
    const stats = await workspaceService.getMyWorkspaceStats(req.user.id);
    res.json(stats);
  } catch (err) {
    sendError(res, err);
  }
}

// Lightweight — just the single plan the dashboard's weekly-target ring
// spotlights (the one the writer most recently logged progress on), without
// pulling streaks/history too. `me/stats` already includes this under
// `weeklyGoalPlan`; this exists for callers that only need it.
async function getMyWeeklyGoalPlan(req, res) {
  try {
    const plan = await workspaceService.getMyWeeklyGoalPlan(req.user.id);
    res.json(plan);
  } catch (err) {
    sendError(res, err);
  }
}

// Day-by-day words/chapters/scenes for the workspace activity graph.
// ?days=7|15|30 (default 30, clamped to that range).
async function getMyActivitySeries(req, res) {
  try {
    const series = await workspaceService.getMyActivitySeries(req.user.id, req.query.days);
    res.json(series);
  } catch (err) {
    sendError(res, err);
  }
}

// "Send card" on a writer who's already logged/sprinted today.
async function sendCard(req, res) {
  try {
    const { toUserId, cardType } = req.body;
    const result = await workspaceService.sendEncouragementCard(req.user, toUserId, cardType);
    res.status(201).json(result);
  } catch (err) {
    sendError(res, err, 400);
  }
}

async function getMyProfile(req, res) {
  try {
    const profile = await workspaceService.getWorkspaceProfile(req.user.id);
    res.json(profile);
  } catch (err) {
    sendError(res, err);
  }
}

async function updateMyProfile(req, res) {
  try {
    const profile = await workspaceService.updateWorkspaceProfile(req.user.id, req.body);
    res.json(profile);
  } catch (err) {
    sendError(res, err, 400);
  }
}

module.exports = {
  getWeeklyTargetFeed,
  getWeeklyWinners,
  getDraftPlanFeed,
  getWorkspaceFeed,
  getFinishedDraftsFeed,
  getTopStreaks,
  getMyStats,
  getMyWeeklyGoalPlan,
  getMyActivitySeries,
  sendCard,
  getMyProfile,
  updateMyProfile,
};