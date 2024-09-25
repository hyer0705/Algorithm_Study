class Solution:
    def getSneakyNumbers(self, nums: List[int]) -> List[int]:
        # index() 메서드는 가장 앞의 인덱스 값만 반환하므로, 이번에는 중복값을 찾아내기 위하여 사용하였습니다.
        # The index() method returns only the first index value, so this time I used it to find duplicate values.
        two = []
        for i in range(len(nums)):
            if i != nums.index(nums[i]):
                two.append(nums[i])
        return two