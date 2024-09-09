class Solution:
    def countPairs(self, nums: List[int]) -> int:

        # [A] 두 수가 Almost Equal인지 확인하는 함수 check를 정의한다.
        #     Define a function check to check if two numbers are Almost Equal.
        def check(longer: int, shorter: int) -> int:

            # [A-1] 앞에 0을 더해서 두 수의 길이를 맞춘다. Add 0s in front to match the length of two numbers.
            longer, shorter = str(longer), str(shorter)
            length_longer = len(longer)
            while length_longer > len(shorter):
                shorter = '0' + shorter
            
            # [A-2] 두 수가 같다면 비교할 필요가 없다. If two numbers are the same, no need to compare.
            if longer == shorter:
                return 1
            
            # [A-3] 길이가 2인 경우, 두 수가 대칭인지 확인한다. If the length is 2, check if two numbers are symmetric.
            elif length_longer == 2:
                if longer == shorter[::-1]:
                    return 1
            
            # [A-4] 두 수의 다른 숫자가 2개이고, 서로 위치가 바뀌었을 때 같다면 Almost Equal이다.
            #       If two numbers have two different numbers and are the same when their positions are swapped, they are Almost Equal.
            else:
                not_equal = 0
                index_first, index_second = 0, 0
                for k in range(length_longer):
                    if longer[k] != shorter[k]:
                        if not_equal == 0:
                            not_equal = 1
                            index_first = k
                        elif not_equal == 1:
                            not_equal = 2
                            index_second = k
                        else:
                            return 0

                if index_second and (longer[index_first] == shorter[index_second] and longer[index_second] == shorter[index_first]):
                    return 1
            
            return 0
    
        # [1] nums의 모든 조합을 비교하여 Almost Equal인 쌍의 개수를 반환한다. Compare all combinations of nums and return the number of Almost Equal pairs.
        result = 0
        n = len(nums)
        for i in range(n-1):
            for j in range(i+1, n):
                longer, shorter = nums[i], nums[j]
                if nums[j] >= nums[i]:
                    longer, shorter = nums[j], nums[i]
                
                result += check(longer, shorter)

        return result