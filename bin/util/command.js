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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        const command = {
            needNotifyCount: 0,
            notifyTimes: [],
            repeatNotifyCount: 0,
        };
        let isLegal = true;
        isLegal = isLegal && (yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'needNotifyCount',
                message: '你需要提醒幾次呢？',
                default: 1,
                validate(input) {
                    const pass = input.match(/^\d+$/);
                    if (pass === null)
                        return '請輸入數字';
                    return true;
                },
                transformer(input, answers, flags) {
                    if (flags.isFinal) {
                        return parseInt(input, 10);
                    }
                },
            }
        ]).then((answers) => {
            for (const key of Object.keys(answers)) {
                command[key] = answers[key];
            }
            return true;
        }).catch(reason => {
            console.error(reason);
            return false;
        }));
        console.log(command);
    });
}
exports.default = default_1;
