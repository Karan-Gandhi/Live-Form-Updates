"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamMeetings = exports.addMeeting = exports.userBelongsToTeam = exports.removeUser = exports.getTeamAdmin = exports.addUserToTeam = exports.getTeamMembers = exports.addFeedItem = exports.createTeamFeed = exports.updateTeamFeed = exports.getTeamFeed = exports.joinTeam = exports.updateTeamData = exports.getTeamById = exports.createTeam = void 0;
var uuid_1 = require("uuid");
var Firestore_1 = require("../services/Firestore");
var FeedItem_1 = require("../types/FeedItem");
var FirestoreCollections_1 = __importDefault(require("../types/FirestoreCollections"));
var UserUtils_1 = require("./UserUtils");
var NO_SUCH_TEAM_EXISTS = new Error("No such team exists");
var createTeam = function (name, admin, members) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                team = {
                    id: (0, uuid_1.v4)(),
                    name: name,
                    admin: admin,
                    members: __spreadArray(__spreadArray([], members, true), [admin], false),
                };
                members.forEach(function (member) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, UserUtils_1.userJoinTeam)(team.id, member)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); });
                return [4 /*yield*/, (0, UserUtils_1.userJoinTeam)(team.id, admin)];
            case 1:
                _a.sent();
                // update database
                return [4 /*yield*/, (0, exports.createTeamFeed)(team.id)];
            case 2:
                // update database
                _a.sent();
                return [4 /*yield*/, (0, Firestore_1.addData)(FirestoreCollections_1.default.TEAMS, team.id, team)];
            case 3:
                _a.sent();
                return [2 /*return*/, team];
        }
    });
}); };
exports.createTeam = createTeam;
var getTeamById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Firestore_1.readData)(FirestoreCollections_1.default.TEAMS, id)];
            case 1:
                team = _a.sent();
                if (!team) {
                    throw NO_SUCH_TEAM_EXISTS;
                }
                return [2 /*return*/, team];
        }
    });
}); };
exports.getTeamById = getTeamById;
var updateTeamData = function (id, team) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, Firestore_1.addData)(FirestoreCollections_1.default.TEAMS, id, team)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.updateTeamData = updateTeamData;
var joinTeam = function (userID, teamID) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getTeamById)(teamID)];
            case 1:
                team = _a.sent();
                return [4 /*yield*/, (0, UserUtils_1.userJoinTeam)(teamID, userID)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, exports.updateTeamData)(teamID, __assign(__assign({}, team), { members: __spreadArray(__spreadArray([], team.members, true), [userID], false) }))];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.joinTeam = joinTeam;
var getTeamFeed = function (teamId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, Firestore_1.readData)(FirestoreCollections_1.default.TEAM_FEED, teamId)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.getTeamFeed = getTeamFeed;
var updateTeamFeed = function (teamID, feed) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, Firestore_1.addData)(FirestoreCollections_1.default.TEAM_FEED, teamID, feed)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.updateTeamFeed = updateTeamFeed;
var createTeamFeed = function (teamID) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, exports.updateTeamFeed)(teamID, { id: teamID, messages: [] })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.createTeamFeed = createTeamFeed;
var addFeedItem = function (teamID, message, type) { return __awaiter(void 0, void 0, void 0, function () {
    var feed, feedItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getTeamFeed)(teamID)];
            case 1:
                feed = _a.sent();
                if (!feed)
                    throw NO_SUCH_TEAM_EXISTS;
                feedItem = {
                    type: type,
                    content: message,
                    dateCreated: Date.now(),
                };
                return [4 /*yield*/, (0, exports.updateTeamFeed)(teamID, __assign(__assign({}, feed), { messages: __spreadArray(__spreadArray([], feed.messages, true), [feedItem], false) }))];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.addFeedItem = addFeedItem;
var getTeamMembers = function (teamID) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getTeamById)(teamID)];
            case 1:
                team = _a.sent();
                return [2 /*return*/, team.members];
        }
    });
}); };
exports.getTeamMembers = getTeamMembers;
var addUserToTeam = function (teamID, userID) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getTeamById)(teamID)];
            case 1:
                team = _a.sent();
                if (team.members.findIndex(function (user) { return user === userID; }) !== -1)
                    return [2 /*return*/];
                team.members.push(userID);
                return [4 /*yield*/, (0, exports.updateTeamData)(teamID, team)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, UserUtils_1.userJoinTeam)(teamID, userID)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addUserToTeam = addUserToTeam;
var getTeamAdmin = function (teamID) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, exports.getTeamById)(teamID)];
        case 1: return [2 /*return*/, (_a.sent()).admin];
    }
}); }); };
exports.getTeamAdmin = getTeamAdmin;
var removeUser = function (teamID, userID) { return __awaiter(void 0, void 0, void 0, function () {
    var team, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, exports.getTeamById)(teamID)];
            case 1:
                team = _d.sent();
                if (team.members.findIndex(function (user) { return user === userID; }) === -1)
                    return [2 /*return*/];
                team.members.splice(team.members.findIndex(function (member) { return member === userID; }), 1);
                _a = exports.addFeedItem;
                _b = [teamID];
                _c = {};
                return [4 /*yield*/, (0, UserUtils_1.getUserByID)(userID)];
            case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_c.userLeave = (_d.sent()).name, _c), FeedItem_1.FeedType.UserLeave]))];
            case 3:
                _d.sent();
                return [4 /*yield*/, (0, exports.updateTeamData)(teamID, team)];
            case 4:
                _d.sent();
                return [4 /*yield*/, (0, UserUtils_1.removeUserFromTeam)(userID, teamID)];
            case 5:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.removeUser = removeUser;
var userBelongsToTeam = function (teamID, userID) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getTeamById)(teamID)];
            case 1:
                team = _a.sent();
                if (team.members.findIndex(function (memberID) { return memberID === userID; }) === -1)
                    return [2 /*return*/, false];
                else
                    return [2 /*return*/, true];
                return [2 /*return*/];
        }
    });
}); };
exports.userBelongsToTeam = userBelongsToTeam;
var addMeeting = function (teamID, meetingID) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getTeamById)(teamID)];
            case 1:
                team = _a.sent();
                if (team.meetings) {
                    team.meetings.push(meetingID);
                }
                else {
                    team.meetings = [meetingID];
                }
                return [4 /*yield*/, (0, exports.updateTeamData)(teamID, team)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addMeeting = addMeeting;
var getTeamMeetings = function (teamID) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getTeamById)(teamID)];
            case 1:
                team = _a.sent();
                return [2 /*return*/, team.meetings];
        }
    });
}); };
exports.getTeamMeetings = getTeamMeetings;
