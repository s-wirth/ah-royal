# Problem to solve

Given a set amount of cards with a power level between -99 and 99, how many cards can be picked up by the player without their power level going below 0?

- The player starts with a power level of 0
- The player picks up a card
- The player's power level is increased or decreased by the card's power level
- Power level >= 0 is allowed, power level < 0 is not allowed
- Cards need to be picked up in order
- The goal is to pick up as many cards as possible without going below 0

# Examples

## Example 1
- Given cards: [3, 4, -6, -1, -2, -3, 7, 2]
- Expected result: 7
- Pick up [3, 4, -1, -2, -3, 7, 2]
- Skip -6
- Likely mistake - Result: 6 - Picked up [3, 4, -6, -1, 7, 2]
- Picking up the -6 brings the player power down to 1, which makes picking up the -2 and -3 impossible

## Example 2
- Given cards: [2, 1, 1, -4, -1, 2, -1, -3, 2]
- Expected result: 8
- Pick up [2, 1, 1, -1, 2, -1, -3, 2]
- Skip -4
- Likely mistake - Result: 7 - Picked up [2, 1, 1, -4, 2, -1, 2]
- Picking up the -4 brings the player power down to 0, which in itself is fine, but prevents the player from later picking up the one of the -1 and the -3 impossible

# Solution

1. Split the initial card array into arrays of positive and negative cards, without affecting their order
  - Input: cardArr = [3, 4, -6, -1, -2, -3, 7, 2]
  - Output: splitCardArr = [[3, 4], [-6, -1, -2, -3], [7, 2]]

2. Calculate the sum of the sub-arrays
  - If they're positive, add the numbers up, add their sum to the player power level and increment the amount of picked cards by the amount of cards in the sub array
  - If they're negative, add up the sum and compare against the current power level.
    - If the sum would take the power level below 0, remove the first element of the negative sub-array, compare sums again
    - Do this until the sum of the negative card sub array no longer takes the power level below 0
      - On first iteration, splitCardArr[1]'s sum (-10) will be greater than the over all player power level (7) so we remove the first element of the array, the negative 6 and try again
      - On the second iteration the sum of splitCardArr[1] (-6) is not going to take the power level below 0, so we can pick up the next 3 negative cards [-1, -2, -3]

3. We can not change the order in which we pick up the cards, we can only skip picking one up. By removing the first element of negative card sub arrays and recalculating their sum, we can make sure that we pick up the maximum number of negative cards in a row.
 
<img width="507" height="314" alt="Screenshot 2025-08-03 at 14 41 02" src="https://github.com/user-attachments/assets/0e34e33e-c9bd-4648-9a31-0bdf1043c80e" />
