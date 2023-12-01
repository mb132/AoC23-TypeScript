import { splitLines } from "../../utils/splitLine";

function combineFirstLastNumber(input: string[]): number {
  return Number(input[0] + input[input.length - 1])
}

function parseNumberFromString(input: string): string {
  const replaceMap = new Map<string, string>([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9']
  ]);
  let out = input;

  replaceMap.forEach((replacement, word) => {
    if (input == word) {
      out = replacement;}
  });
  
  return out;
}


const first = (input: string) => {
  let solution = 0;
  let rowC = 1;
  let rows = splitLines(input);
  rows.forEach(element => {
    let numbers = [...element.replace(/[^0-9]/g, '')];
    solution += combineFirstLastNumber(numbers);
    console.log(rowC++, numbers, combineFirstLastNumber(numbers) + " -> ", solution);
  });

  return "Solution1: " + solution;
};

const expectedFirstSolution = 'solution 1';

function findAllDigits(inputString: string) {
  const results: string[] = [];
  const regex =
    /1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine/g;
  let start = 0;

  while (start < inputString.length) {
    regex.lastIndex = start;
    const match = regex.exec(inputString);

    if (match) {
      results.push(match[0]);
      start = match.index + 1; 
    } else {
      break; 
    }
  }
  return results;
}

const second = (input: string) => {
  let solution = 0;
  let rows = splitLines(input);
  rows.forEach(row => {
    let rowArray = findAllDigits(row);
    rowArray = rowArray.map((str) => parseNumberFromString(str))
    solution += combineFirstLastNumber(rowArray);
  });
  return 'Solution 2: ' + solution;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
