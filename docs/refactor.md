Objective:
Demystify a seemingly difficult refactor through a methodical line by line approach that leans on passing tests.

# Intro to TypeScript:
(Skip if room feels confident in TypeScript)

## JS vs. TS
TypeScript is a super set of JavaScript. Everything JavaScript can do TypeScript can.

- JS = Dynamic type
- TS = Static type
    - TS can allow both
      
Typescript compiles to javascript.
- When you compile a TS program is when you run into errors

Compile ts file with errors and show that it still executes the compiled JavaScript
```bash
tsc example.ts
node example.js
```

# Ultimate Tic Tac Toe:

- Open project in browser and introduce rules

## Intro to refactoring:
- We are going to be mainly working in the `handleClick` method of `UltimateTicTacToe.tsx`
- We are going to refactor this puppy using clean code principles and good TypeScript practices
- Overview of some existing structures
    - introduce the TypeScript structures in the file
        - BoardWithCachedWinner interface
            - The Ultimate board array is full of these see `createBoard`
        - And a type BoardType

### Project was written to work and then abandoned without refactoring code.
- “Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”
- It’s too hard for ChatGPT to even understand

### Program was written TDD:
- This is to our advantage as the refactorers.
- We can now confidently make changes to the program knowing our tests will catch us
- This isn’t a test writing workshop, so you shouldn’t need to write any tests.
    - No change you make should make the tests break
        - If you break the tests undo your last change until they are working again
- Use `yarn test —watch`

## Goal for this refactor
Reduce `handleClick` method line count:
47 lines of code -> less than 20 lines
- While increasing readability

### Charlie’s refactors:
#### Calculating sub board win
Let’s look at the first few lines of our function.
- Problem: board should be treated as immutable
- Problem: what even is the `nextBoard` array?
    - we don't need access to every board in the array, just the subBoard we are change with the click
- `nextBoard[boardIndex][squareIndex] = xIsNext ? "X" : “O”;` is hard to read and I’m not sure if I understand what it’s doing

```ts
const currentPlayer = xIsNext ? "X" : "O";
const nextUltBoard: BoardWithCachedWinner[] = [...board];
const nextSubBoard: BoardWithCachedWinner = nextUltBoard[boardIndex];

nextSubBoard.board[squareIndex] = currentPlayer;
```

`board` should be treated as immutable, so let's remove references to that

#### Pull out win if else
- What’s this doing?
    - It is incrementing wins
    
Let’s pull this logic out into a method.

#### Branches in loops in branches... Why?

- What is this things job?
- Let’s comment out a branch of logic and see what happens to our tests
- It decides which boards are disabled
    - What it’s doing
        - `enable all boards if super play would be illegal`
        - `disable every board that is not the last sub play`
    - What do we know about the rules of our game
        - Winning boards are always disabled
        - Every other board is conditionally disabled based on where last play was
    - Considering above, this seems logically disjointed.

Let's pull it into a method and then refactor it.

Programing problems
- This is looping over the same thing
    - So the very least we could do is invert it

Let's try to extract the logic
```ts
// if the subboard was a winner or the sub-board play would force next player to play on a won board
// then enable all non-won boards
if (nextUltBoard[boardIndex].winner || nextUltBoard[squareIndex].winner) {
    board.forEach(board => {
        if (board.winner) {
            board.disabled = true
        } else {
            board.disabled = false
        }
    })
// Else disable every board except the one that corresponds with subplay
} else {
    for (let i = 0; i < board.length; i++) {
        if (i === squareIndex){
            nextUltBoard[i].disabled = false
        } else {
            nextUltBoard[i].disabled = true
        }
    }
}
```

Let's take this slowly, one structure at a time:

```ts
// this is a boolean setting a boolean, that's redundent
if (board.winner) {
    board.disabled = true
} else {
    board.disabled = false
}
```
Reduce to
```ts
board.disabled = board.winner
```

```ts
// this is also a boolean setting a boolean. But what are we really asking here?
if (i === squareIndex){
    nextUltBoard[i].disabled = false
} else {
    nextUltBoard[i].disabled = true
}
```
```ts
// shorter, but definitely doesn't read well
nextUltBoard[i].disabled = nextUltBoard[i] !== (i === squareIndex)
```
```ts
// Again what are we actually asking here?
// Does the subBoard index equal the clicked square index
nextLegalPlay = nextUltBoard[squareIndex]
nextUltBoard[i].disabled = nextUltBoard[i] !== nextLegalPlay
```

with these simplified it's looking easier to combine the loop than ever. But now that the loop bodies are reduced we need to answer the question of the first if
```ts
nextLegalPlay = nextUltBoard[squareIndex]

// If the the board is a winner than disable all winners? that doesn't make sense. We always want to disable winners
if (nextUltBoard[boardIndex].winner || nextLegalPlay.winner) {
    board.forEach(board => {
        board.disabled = board.winner !== null
    })
} else {
    for (let i = 0; i < board.length; i++) {
        nextUltBoard[i].disabled = nextUltBoard[i] !== nextLegalPlay
    }
}
```

```ts
nextLegalPlay = nextUltBoard[squareIndex]

// If the the board is a winner than disable all winners? that doesn't make sense. We always want to disable winners
if (nextLegalPlay.winner) {
    board.forEach(board => {
        board.disabled = board.winner !== null
    })
} else {
    for (let i = 0; i < board.length; i++) {
        nextUltBoard[i].disabled = nextUltBoard[i] !== nextLegalPlay
    }
}
```
Now you can see that we aren't asking the right question. We don't need to know if the board is a winner we need to know if the board is not a winner. 
That way we can enable it if there is an exception to the normal rules. 
```ts
nextLegalPlay = nextUltBoard[squareIndex]

// If the the board is a winner than disable all winners? that doesn't make sense. We always want to disable winners
nextUltBoard.forEach(subBoard => {
    // The winner boards being disabled isn't a condition they are always disabled. 
    subBoard.disabled = subBoard.winner !== null

    if (!nextLegalPlay.winner) {
        nextUltBoard[i].disabled = nextUltBoard[i] !== nextLegalPlay
    }
})
```

final function:

```ts
function determineLegalPlays(nextUltBoard: BoardWithCachedWinner[], squareIndex: number) {
    const nextLegalPlay = nextUltBoard[squareIndex]

    nextUltBoard.forEach(subBoard => {
        subBoard.disabled = subBoard.winner !== null
        
        if (!nextLegalPlay.winner) {
            subBoard.disabled = subBoard !== nextLegalPlay
        }
    })
}
```




