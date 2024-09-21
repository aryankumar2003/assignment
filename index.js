"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs/promises");
// Function to calculate fuel fill events and total consumption
function processFuelData(fuelData) {
    var totalFuelConsumed = 0;
    var lastFuelLevel = fuelData[0].fuel_level;
    var fuelFillEvents = [];
    var currentEventStart = null;
    // Traverse through the data to find fuel fill events and calculate consumption
    for (var i = 1; i < fuelData.length; i++) {
        var currentFuelLevel = fuelData[i].fuel_level;
        var fuelDifference = currentFuelLevel - lastFuelLevel;
        if (fuelDifference > 0) {
            // Start of a fuel fill event
            if (currentEventStart === null) {
                currentEventStart = fuelData[i - 1].timestamp;
            }
            // End of the fuel fill event
            fuelFillEvents.push({
                start_time: currentEventStart,
                end_time: fuelData[i].timestamp,
                fuel_filled: fuelDifference,
                location: fuelData[i].location,
            });
            currentEventStart = null; // Reset the event start
        }
        // Accumulate total fuel consumption
        if (fuelDifference < 0) {
            totalFuelConsumed += Math.abs(fuelDifference);
        }
        lastFuelLevel = currentFuelLevel;
    }
    return { fuelFillEvents: fuelFillEvents, totalFuelConsumed: totalFuelConsumed };
}
// Function to read fuel data and process it
function readAndProcessFuelData(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var data, fuelDataArray, _a, fuelFillEvents, totalFuelConsumed, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.readFile(filePath, 'utf-8')];
                case 1:
                    data = _b.sent();
                    fuelDataArray = JSON.parse(data);
                    _a = processFuelData(fuelDataArray), fuelFillEvents = _a.fuelFillEvents, totalFuelConsumed = _a.totalFuelConsumed;
                    // Output the fuel fill events
                    fuelFillEvents.forEach(function (event) {
                        console.log("Fuel Filled: ".concat(event.fuel_filled, " liters"));
                        console.log("Start time: ".concat(new Date(event.start_time).toLocaleString()));
                        console.log("End time: ".concat(new Date(event.end_time).toLocaleString()));
                        console.log("Location: (".concat(event.location.latitude, ", ").concat(event.location.longitude, ")"));
                        console.log('---------------------------------------');
                    });
                    // Output the total fuel consumed
                    console.log("Total fuel consumed for the day: ".concat(totalFuelConsumed, " liters"));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error('Failed to read and process fuel data:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Call the function with the path to your JSON file
readAndProcessFuelData('./response.json'); // Make sure the path is correct
