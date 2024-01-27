import { checkTransitionTable } from "./tokenHelper";
import { transitionTable } from "./transitionTable";
import type { ReadFileType } from "./types";

const replaceKeywords = (inputString: string): string => {
  // Replace 'if' with '@'
  inputString = inputString.replace(/\bif\b/g, "@");

  // Replace 'else' with '#'
  inputString = inputString.replace(/\belse\b/g, "#");

  // Replace 'then' with '%'
  inputString = inputString.replace(/\bthen\b/g, "%");

  // Replace 'int' with '^'
  inputString = inputString.replace(/\bint\b/g, "^");

  // Replace 'char' with '&'
  inputString = inputString.replace(/\bchar\b/g, "&");

  return inputString;
};

export const readFile: ReadFileType = (text) => {
  let currentState = 0;
  const acceptedTokens: string[] = [];

  /**
   * بعضی از کاراکتر ها در این مرحله چون دارای چند حرف هستند
   * در این مرحله باهم ادقام شده و به یک کاراکتر یونیک تبدیل میشوند
   *
   * if => @
   * else => #
   * then => %
   * int => ^
   * char => &
   */
  const uniCharacterText = replaceKeywords(text);

  //   Array.from(uniCharacterText).forEach((character) => {
  for (let i = 0; i < uniCharacterText.length; i++) {
    const character = uniCharacterText[i];

    const tableResult = checkTransitionTable(currentState, character);
    const isAccepted = typeof tableResult === "number" && String(transitionTable[tableResult][0]).includes('accept');

    if (isAccepted) {
      const [, token, back] = String(transitionTable[tableResult][0]).split(" ");

      acceptedTokens.push(token);
      currentState = 0;

      if (back) {
        // در این مرحله حلقه را یک مرحله به عقب برمیگردانیم که همان استار در کنار علامت پذیرش دی اف ای میباشد
        i--;
      }
    } else if (tableResult === "error") {
      acceptedTokens.push("COMPILE ERROR");
    } else if (typeof tableResult === "number") {
      currentState = tableResult;
    } else {
      acceptedTokens.push("COMPILE ERROR");
    }
  }

  return {
    currentState,
    acceptedTokens,
  };
};
