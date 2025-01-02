function getIntersection(arr1: number[], arr2: number[]): number[] {
  const uniqueArr1 = [...new Set(arr1)];
  const uniqueArr2 = [...new Set(arr2)];

  const intersection = uniqueArr1.filter((number) => uniqueArr2.includes(number));

  return intersection;
}

function getUniqueDifference(arr: number[], intersection: number[]): number[] {
  const difference = arr.filter((number) => !intersection.includes(number));
  const unique = [...new Set(difference)];

  return unique;
}

function findDifference(nums1: number[], nums2: number[]): number[][] {
  const intersection = getIntersection(nums1, nums2);

  const result: number[][] = [[], []];
  result[0] = getUniqueDifference(nums1, intersection);
  result[1] = getUniqueDifference(nums2, intersection);

  return result;
}
