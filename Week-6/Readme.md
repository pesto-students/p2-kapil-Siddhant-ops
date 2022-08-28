# Pesto Week 6 assignments

Following are the files added according to the assignments

- W3Exercise6.1
  - index.js
- W3Exercise6.2
  - index.js
- W3Exercise6.3
  - index.js
- W3Exercise6.4
  - index.js
- W3Exercise6.5
  - index.js
- W3Exercise6.6
  - index.js

All JS files can run with

```
node path-to-file
```

## Exercise 6.1 Max Sum Contiguous Subarray

Find the contiguous subarray within an array, A of length N which has the largest sum.

Input Format:

The first and the only argument contains an integer array, A.

Output Format: Return an integer representing the maximum possible sum of the contiguous subarray.

Constraints: 1 <= N <= 1e6 -1000 <= A[i] <= 1000

For example:

Input 1: `A = [1, 2, 3, 4, -10]`

Output 1: `10`

Explanation 1: `The subarray [1, 2, 3, 4] has the maximum possible sum of 10.`

Input 2: `A = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`

Output 2: `6`

Explanation 2: `The subarray [4,-1,2,1] has the maximum possible sum of 6.`

---

## Exercise 6.2 Spiral Order Matrix II

Problem Description :

Given a matrix of m \* n elements (m rows, n columns), return all elements of the matrix in spiral order.

Example:

Given the following matrix:

```javascript
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
```

You should return `[1, 2, 3, 6, 9, 8, 7, 4, 5]`

## Exercise 6.3 Sort array of 0's, 1's and 2's

Given an array of size N containing only 0s, 1s, and 2s.

Sort the array in ascending order.

Example 1:

Input: `N = 5, arr[]= { 0, 2, 1, 2, 0 }`

Output: `0 0 1 2 2`

Explanation: 0's 1's and 2's are segregated into ascending order.

Example 2:

Input: `N = 3, arr[] = { 0, 1, 0 }`

Output: `0 0 1`

Explanation: 0s 1s and 2s are segregated into ascending order.

Time Complexity: O(N) & Expected Auxiliary Space: O(1)

Constraints: 1 <= N <= 10^6 0 <= A[i] <= 2

## Exercise 6.4 Best time to buy and sell stock

You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1: `Input: prices = [7,1,5,3,6,4]`

Output: `5`

Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2: `Input: prices =[7,6,4,3,1]`

Output: `0`

Explanation: In this case, no transactions are done and the maxprofit = 0 Constraints: 1 <= prices.length <= 105 0 <= prices[i] <= 104

## Exercise 6.5 Pair with difference

Given an one-dimensional unsorted array A containing N integers.

You are also given aninteger B, find if there exists a pair of elements in the array whose difference is B.

Return 1 if any such pair exists else return 0.

Problem Constraints : `1 <= N <= 105 -103 <= A[i]<= 103 -105 <= B <= 105`

Input Format : First argument is an integer array A of size N. Second argument is aninteger B.

Output Format Return 1 if any such pair exists else return 0.

Example Input 1: `A = [5, 10, 3, 2, 50, 80], B = 78`

Output 1: `1`

Example Explanation 1: `Pair (80, 2) gives a difference of 78.`

Example Input 2: `A = [-10, 20], B = 30`

Output 2: `1`

Explanation 2: `Pair (20, -10) gives a difference of 30 i.e 20 - (-10) => 20 + 10 => 30`
