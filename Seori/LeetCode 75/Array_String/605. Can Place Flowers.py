class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        # [1] 양 옆에 꽃이 없는 경우에만 꽃을 심을 수 있다. You can plant flowers only if there are no flowers on both sides.
        count = 0
        length = len(flowerbed)
        for i in range(length):
            if not flowerbed[i]:
                if i > 0 and flowerbed[i - 1]:
                    continue
                if i < length - 1 and flowerbed[i + 1]:
                    continue
                flowerbed[i] = 1
                count += 1
        
        # [2] 심을 수 있는 꽃의 개수가 n보다 크거나 같으면 True, 아니면 False를 반환한다. 
        #     Return True if the number of flowers that can be planted is greater than or equal to n, otherwise False.
        return True if count >= n else False