import { knightMoves } from "./knight-moves.js";

describe("knightMoves", () => {
    test("throws when the destination is missing", () => {
        expect(() => knightMoves([0, 0])).toThrow(
            "A destination is required"
        );
    });

    test("returns null for positions outside the board", () => {
        expect(knightMoves([-1, 0], [0, 0])).toBeNull();
        expect(knightMoves([0, 0], [8, 0])).toBeNull();
    });

    test("returns a one-position path when start and destination match", () => {
        expect(knightMoves([3, 4], [3, 4])).toEqual([[3, 4]]);
    });

    test("finds a path for a destination one knight move away", () => {
        expect(knightMoves([0, 0], [1, 2])).toEqual([
            [0, 0],
            [1, 2]
        ]);
    });

    test("finds a shortest path across the board", () => {
        const path = knightMoves([0, 0], [7, 7]);

        expect(path[0]).toEqual([0, 0]);
        expect(path.at(-1)).toEqual([7, 7]);
        expect(path).toHaveLength(7);

        for (let index = 1; index < path.length; index += 1) {
            const dx = Math.abs(path[index][0] - path[index - 1][0]);
            const dy = Math.abs(path[index][1] - path[index - 1][1]);
            expect([dx, dy].sort()).toEqual([1, 2]);
        }
    });
});