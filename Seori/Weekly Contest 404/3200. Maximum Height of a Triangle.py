class Solution:
    def maxHeightOfTriangle(self, red: int, blue: int) -> int:
        
        # [A] 2개의 색을 변수로 받아 첫 번째 색을 1층부터 쌓아가며 최대 높이를 구하는 함수 정의 Define a function that takes two colors as variables and builds the first color from the first floor to find the maximum height.
        def maximum_height(first: int, second: int) -> int:
            now = 1
            height = 0
            while True:
                if first < now:
                    return height
                first -= now
                now += 1
                height += 1

                if second < now:
                    return height
                second -= now
                now += 1
                height += 1

        # [1] 빨강과 파랑을 maximum_height 함수에 넣어서 최대값을 반환한다. Put red and blue in the maximum_height function to return the maximum value.
        return max(maximum_height(red, blue), maximum_height(blue, red))