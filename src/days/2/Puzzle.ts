import { BADFLAGS } from "dns";
import { splitLines } from "../../utils/splitLine";

type Game = {
  id: number;
  bags: Bag[];
};

type Bag = {
  red?: number;
  green?: number;
  blue?: number;
};

function parseGames(input: string) {
  const games: Game[] = [];
  const gameStrings = splitLines(input);
  gameStrings.forEach(gameString => {
    const [idString, bagString] = gameString.split(': ');
    const id = parseInt(idString.replace('Game ', ''));
    const bags = bagString.split('; ').map(stringToBag);
    games.push({ id, bags });
  });
  return games;
};

function stringToBag(input: string): Bag {
  const bag: Bag = {};
  input.trim;
  const parts = input.split(', ');

  parts.forEach(part => {
    const [quantity, color] = part.split(' ');
    bag[color as keyof Bag] = parseInt(quantity);
  });

  return bag;
};

function matchesCondition(input: Bag, condition: Bag): boolean {
  if (input.red > condition.red ||
    input.blue > condition.blue ||
    input.green > condition.green) {
    return false;
  }
  return true;
};

const first = (input: string) => {
  const games: Game[] = parseGames(input);
  let solution = 0;
  const condition: Bag = { red: 12, green: 13, blue: 14 };

  games.forEach(g => {
    let fitsCondition = true;
    g.bags.forEach(b => {
      if (!matchesCondition(b, condition)) {
        fitsCondition = false;
      }
    });
    if (fitsCondition) {
      solution += g.id;
    }
  });
  return 'Part 1: ' + solution;
};

const expectedFirstSolution = '2776';

function getMinSet(game: Game): Bag {
  let minBag: Bag = { ...game.bags[0] };

  game.bags.forEach((b, index) => {
    if (index === 0) return; // Skip the first bag because it's already used for initialization
    for (let color in b) {
      if (b.hasOwnProperty(color)) {
        minBag[color as keyof Bag] = minBag[color as keyof Bag] > b[color as keyof Bag] ?
          minBag[color as keyof Bag] : b[color as keyof Bag];
      }
    }
  });

  return minBag;
}

function getSetPower(set: Bag): number {
  let power = 1;
  for (let color in set) {
    if (set.hasOwnProperty(color)) {
      power *= set[color as keyof Bag];
    }
  }
  return power;
}

const second = (input: string) => {
  const games: Game[] = parseGames(input);
  let solution = 0;
  games.forEach(g => {
    let minSet = getMinSet(g);
    console.log(minSet);
    solution += getSetPower(minSet);
  });

  return 'Part 2: ' + solution;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };


