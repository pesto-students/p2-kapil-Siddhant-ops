const findJudge = (n, trust) => {
  const graph = new Map();
  for (let [giver, receiver] of trust) {
    if (!graph.has(giver)) {
      graph.set(giver, new Set());
    }
    graph.get(giver).add(receiver);
  }
  for (let i = 1; i <= n; i++) {
    if (!graph.has(i)) {
      return i;
    }
  }
  return -1;
};

const exps = [
  {
    n: 2,
    trust: [[1, 2]],
    result: 2,
  },
  {
    n: 3,
    trust: [
      [1, 3],
      [2, 3],
    ],
    result: 3,
  },
  {
    n: 3,
    trust: [
      [1, 3],
      [2, 3],
      [3, 1],
    ],
    result: -1,
  },
];

for (const i of exps) {
  console.log(
    "find judge:",
    findJudge(i.n, i.trust),
    findJudge(i.n, i.trust) === i.result
  );
}
