function knightMoves(start, target) {
    //an 8 * 8 dimensions chess-board - Empty for Now
    const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

    //8 Possible moves knight can make on the board
    const possibleMoves = [
        [2, 1], //Knight moves 2 rows forward - 1 col backward
        [1, 2], //Knight moves - 1 row forward - 2 col forward
        [-2, 1], //Knight moves - 2 rows backward - 1 col forward
        [-1, 2], //Knight moves - 1 row backward - 2 col forward
        [2, -1], //Knight moves - 2 rows forward - 2 col backward
        [1, -2], //Knight moves - 1 row forward - 2 col backward
        [-2, -1], //Knight moves - 2 row backward - 1 col backward
        [-1, -2] //Knight moves - 1 row backward - 2 col backward
    ];

    //queue stores the positions travelled by knight
    const queue = [];
    //visited set keeps record of the travelled position
    const visited = new Set();

    //BFS implementation - loop continues as long as there are items in the queue;

    //==>Start Enqueue process with starting position
    queue.push( {position: start, path: [start]});
    visited.add([...start]);

    while(queue.length > 0) {
        //Dequeue position form queue
        const { position, path} = queue.shift();

        //if position dequeued is the same as target position - you have found shortest path
        if(position[0] === target[0] && position[1] === target[0]) {
            return path;
        } else {
            //for every move made out of all possible moves 
            for(const move of possibleMoves) {
                //both row and column coordinates have been changed relative to the move made
                const newRowPos = position[0] + move[0];
                const newColPos = position[1] + move [1];

                //Check to see that moves do not go out of the board boundaries
                //If the knight's posiiton changed at least once and it did not go out of the 8 * 8 board dimensions
                if(newRowPos >= 0 && newRowPos < 8 && newColPos >= 0 && newColPos < 8) {
                    const newKnightPosition = [newRowPos, newColPos];

                    //Also, if the visited array does not have new-knight-position recorded; Enqueue the new-knight-position and record it in the visited array
                    if(!visited.has([...newKnightPosition])) {
                        queue.push( {position: newKnightPosition, path: [...path, newKnightPosition]} );
                        visited.add([...newKnightPosition]);
                    }
                }
            }
        }
    }
    // but if queue is empty - queue.length <= 0
    return null || "No item Enqueued";
}

//Test functionality
let start = [7, 5];
let target = [0, 3];

const path = knightMoves(start, target);
const moves = console.log(`Happened in ${path.length - 1} moves`);

if(path) {
    console.log(`Shortest path from [${start}] to [${target}] is -->>`);
    for(const position of path) {
        console.log(position);
    }
} else {
    console.log(`No path exists from ${start} to ${target}`);
}