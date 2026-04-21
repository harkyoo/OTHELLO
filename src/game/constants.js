export const BOARD_SIZE = 8;

export const PLAYERS = {
  BLACK: 'black',
  WHITE: 'white',
};

export const EMPTY_CELL = null;

export const DIRECTIONS = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];

export const INITIAL_DISC_POSITIONS = {
  [PLAYERS.WHITE]: [
    { row: 3, col: 3 },
    { row: 4, col: 4 },
  ],
  [PLAYERS.BLACK]: [
    { row: 3, col: 4 },
    { row: 4, col: 3 },
  ],
};

export const STARTING_PLAYER = PLAYERS.BLACK;

export const STATUS_MESSAGES = {
  TURN: {
    [PLAYERS.BLACK]: '흑 차례',
    [PLAYERS.WHITE]: '백 차례',
  },
  INVALID_MOVE: '유효하지 않은 위치입니다.',
  PASS: {
    [PLAYERS.BLACK]: '흑이 둘 수 있는 곳이 없어 턴을 넘깁니다.',
    [PLAYERS.WHITE]: '백이 둘 수 있는 곳이 없어 턴을 넘깁니다.',
  },
  WINNER: {
    [PLAYERS.BLACK]: '흑 승리',
    [PLAYERS.WHITE]: '백 승리',
    draw: '무승부',
  },
};
