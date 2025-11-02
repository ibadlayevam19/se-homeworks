(1) Smell #1: Repeated use of ' ' to represent empty tiles

Original lines: 2, 8, 35, 44, 53, etc.
Example:

private _lastSymbol: string = ' ';
if (this._board.TileAt(x, y).Symbol !== ' ') { ... }


Refactoring: Added a constant to store the empty symbol:

const EMPTY_SYMBOL = ' ';


Improvement:

Avoids magic values scattered through the code.

Makes updates easier if the symbol changes later.

Keeps the code more consistent and readable.

(2) Smell #2: Repeated logic for checking winners in each row

Original lines: 35–73 – The same pattern was used multiple times for different rows.
Refactoring: Moved the repeated part into a helper function:

private checkRow(row: number): string { ... }


and iterated through rows inside winner().
Improvement:

Removes unnecessary repetition (DRY principle).

Easier to maintain or extend (e.g., columns, diagonals).

Makes the winner-checking logic more organized.

(3) Smell #3: Inconsistent method naming style

Original lines: 7, 26
Refactoring: Adjusted to follow the camelCase style used in TypeScript:

public play(...)
public winner()


Improvement:

Aligns with TypeScript naming conventions.

Improves code clarity and makes method names intuitive.

(4) Smell #4: Using .find() on a 1D array for board lookups

Original lines: 74–91

this._plays.find((t: Tile) => t.X === x && t.Y === y)


Refactoring: Switched to a 2D array structure for direct access:

this._tiles[x][y]


Improvement:

Avoids inefficient linear searches.

Better matches the logical structure of a board.

Simplifies code and improves performance.

(5) Smell #5: Hardcoded board dimension

Original lines: 76–80

for (let i = 0; i < 3; i++)


Refactoring: Introduced a constant to define board size:

const BOARD_SIZE = 3;


Improvement:

Makes the size easy to modify in the future.

Prevents repeated “magic numbers.”

Increases flexibility and readability.
