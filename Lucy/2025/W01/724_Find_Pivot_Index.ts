function pivotIndex(nums: number[]): number {
  const numsLen = nums.length;

  if (numsLen === 1) return 0;

  const prefixSum = new Array(numsLen).fill(0);
  prefixSum[0] = nums[0];

  const rangeSum = Array.from({ length: numsLen }, () => [0, 0]); // rangeSum: [Pivot Index를 기준으로 왼쪽 합, Pivot Index를 기준으로 오른쪽 합] 요소들을 모아 놓은 배열

  for (let i = 1; i < numsLen; i++) {
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }

  rangeSum[0][1] = prefixSum[numsLen - 1] - prefixSum[0];
  rangeSum[numsLen - 1][0] = prefixSum[numsLen - 2];

  for (let pivotIndex = 1; pivotIndex < numsLen - 1; pivotIndex++) {
    rangeSum[pivotIndex][0] = prefixSum[pivotIndex - 1];
    rangeSum[pivotIndex][1] = prefixSum[numsLen - 1] - prefixSum[pivotIndex];
  }

  for (let i = 0; i < rangeSum.length; i++) {
    const [leftSum, rightSum] = rangeSum[i];
    if (leftSum === rightSum) return i;
  }

  return -1;
}
