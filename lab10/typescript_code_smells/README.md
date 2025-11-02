1 Repeated use of the blank space ' ' for empty tiles

Found at: Lines 2, 8, 35, 44, 53, and others.

The same literal ' ' was scattered throughout the file to represent an empty tile.

How I improved it:
Created a clear constant at the top of the file:

const EMPTY_SYMBOL = ' ';


Why it’s better:

Makes the code less error-prone and easier to modify later.

Reduces duplication and clarifies meaning.

Enhances readability since the intent is explicit.

2 Repeated logic for checking row winners

Found at: Lines 35–73

Each row was checked manually with almost identical code.

How I improved it:
Extracted the duplicated code into a helper method:

private checkRow(row: number): string { ... }


and replaced the repeated blocks with a simple loop inside winner().

Why it’s better:

Removes repetitive code (DRY principle).

Easier to maintain and extend (for columns or diagonals).

The winner() method is now concise and focused.

3 Non-idiomatic method names

Found at: Lines 7, 26

Methods used PascalCase (Play, Winner) which goes against TypeScript naming conventions.

How I improved it:
Renamed them to:

play()  and  winner()


Why it’s better:

Matches standard JavaScript/TypeScript camelCase style.

Improves consistency and makes the API more intuitive.

4 Inefficient tile lookup using .find()

Found at: Lines 74–91

Each tile was stored in a single array and searched linearly using .find() every time.

How I improved it:
Replaced the 1D list with a 2D array (this._tiles[x][y]) for direct access.

Why it’s better:

No need to iterate through all tiles → faster lookups.

More natural and readable representation of the board.

Simplifies the logic inside getTile() and addTile().

5 Magic number for board size

Found at: Lines 76–80

The number 3 appeared in multiple places to define the board dimensions.

How I improved it:
Introduced a constant:

const BOARD_SIZE = 3;


Why it’s better:

Centralizes configuration in one place.

Makes scaling or modifying the board size effortless.

Prevents “magic numbers” and improves clarity.