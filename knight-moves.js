
function isValidPosition(x, y) {
    if (x > 7 || x < 0) return false;
    if (y > 7 || y < 0) return false;
    return true;
}

function move(x, y, num1, num2) {
    return [x + num1, y + num2];
}

export function knightMoves(start = [0, 0], end) {
    const possibles = [
        [2, 1],
        [1, 2],
        [-2, -1],
        [-1, -2],
        [-2, 1],
        [-1, 2],
        [2, -1],
        [1, -2]
    ];

    if (!end) throw new Error("A destination is required");

    if (
        !isValidPosition(start[0], start[1]) ||
        !isValidPosition(end[0], end[1])
    ) {
        return null;
    }

    
    const queue = [start];

    const visited = new Set([start.toString()]);

    const parent = new Map();
    parent.set(start.toString(), null);

    while (queue.length > 0) {
        const current = queue.shift();

        if (
            current[0] === end[0] &&
            current[1] === end[1]
        ) {
            const path = [];
            let position = end.toString();

            while (position !== null) {
                path.push(position.split(",").map(Number));
                position = parent.get(position);
            }

            return path.reverse();
        }

        for (const possible of possibles) {
            const next = move(
                current[0],
                current[1],
                possible[0],
                possible[1]
            );

            const key = next.toString();

            if (
                isValidPosition(next[0], next[1]) &&
                !visited.has(key)
            ) {
                visited.add(key);

                parent.set(key, current.toString());

                
                queue.push(next);
            }
        }
    }

    return null;
}

