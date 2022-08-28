const threeSumClosest = (nums, target) => {
    let closest = 0;
    let minDiff = Infinity;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 2; i++) {
        let j = i + 1;
        let k = nums.length - 1;
        while (j < k) {
            let sum = nums[i] + nums[j] + nums[k];
            let diff = Math.abs(sum - target);
            if (diff < minDiff) {
                minDiff = diff;
                closest = sum;
            }
            if (sum < target) {
                j++;
            }
            else {
                k--;
            }
        }
    }
    return closest;
};
console.log(threeSumClosest([-1, 2, 1, -4], 1));
