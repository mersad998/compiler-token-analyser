import { transitionTable } from "./transitionTable";

const getRelaterIndexOfEntryInTable = (char: unknown): number => {
/**
 * در این تابع ، چون جدول را به صورا آرایه دو بعدی در آورده ایم ، ایندکس متناظر این کاراکتر در جدول را برمیگرداند
 * در نتیجه هر موقه در جدول ابتدا به ایندکس مرحله فعلی برویم سپس به ایندکسی که از اینجا برمیگردد برویم ، به این معتاست که 
 * جدول را از نظر سطر و ستون پیموده ایم و آن خانه ی جدول را خوانده ایم
 */
  if (char === ";") return 0;
  if (char === "+") return 1;
  if (char === "*") return 2;
  if (char === "(") return 3;
  if (char === ")") return 4;
  if (char === "=") return 5;
  if (char === ">") return 6;
  if (char === "<") return 7;
  if (char === "@") return 8; // replaced tokens of 'if'
  if (char === "#") return 9; // replaced tokens of 'else'
  if (char === "%") return 10; // replaced tokens of 'then'
  if (char === "^") return 11; // replaced tokens of 'int'
  if (char === "&") return 12; // replaced tokens of 'char'
  if (typeof char === "string" && (/[a-z]/.test(char) || /[A-Z]/.test(char))) return 13;
  if (!isNaN(parseFloat(char as string))) return 14;
  if (char === " ") return 15;
  if (char === "$") return 16;
  if (char === ".") return 17;
  if (char === "!") return 18;
  return 19; // error
};

export const checkTransitionTable = (currentState: number, entry: unknown): string | number => {
  const relaterIndexOfEntryInTable = getRelaterIndexOfEntryInTable(entry); // پیمایش ستون
  return transitionTable[currentState][relaterIndexOfEntryInTable];// پیمایش ابتدا سطر سپس ستون
};
