const EMPTY_SYMBOL = ' ';
const BOARD_SIZE = 3;

export class Game {
    private lastSymbol = EMPTY_SYMBOL;
    private board = new Board();

    play(symbol: string, x: number, y: number): void {
        if (this.isInvalidMove(symbol, x, y)) {
            throw new Error("Invalid move");
        }
        this.lastSymbol = symbol;
        this.board.addTile(symbol, x, y);
    }

    private isInvalidMove(symbol: string, x: number, y: number): boolean {
        const firstInvalid = this.lastSymbol === EMPTY_SYMBOL && symbol === 'O';
        const samePlayer = symbol === this.lastSymbol;
        const occupied = this.board.getTile(x, y).Symbol !== EMPTY_SYMBOL;
        return firstInvalid || samePlayer || occupied;
    }

    winner(): string {
        for (let i = 0; i < BOARD_SIZE; i++) {
            const winner = this.checkRow(i);
            if (winner !== EMPTY_SYMBOL) return winner;
        }
        return EMPTY_SYMBOL;
    }

    private checkRow(row: number): string {
        const first = this.board.getTile(row, 0).Symbol;
        if (first === EMPTY_SYMBOL) return EMPTY_SYMBOL;
        for (let col = 1; col < BOARD_SIZE; col++) {
            if (this.board.getTile(row, col).Symbol !== first) {
                return EMPTY_SYMBOL;
            }
        }
        return first;
    }
}

interface Tile {
    X: number;
    Y: number;
    Symbol: string;
}

class Board {
    private tiles: Tile[][] = Array.from({ length: BOARD_SIZE }, (_, i) =>
        Array.from({ length: BOARD_SIZE }, (_, j) => ({ X: i, Y: j, Symbol: EMPTY_SYMBOL }))
    );

    getTile(x: number, y: number): Tile {
        return this.tiles[x][y];
    }

    addTile(symbol: string, x: number, y: number): void {
        this.tiles[x][y].Symbol = symbol;
    }
}
