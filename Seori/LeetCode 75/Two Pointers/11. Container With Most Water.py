class Solution:
    def maxArea(self, height: List[int]) -> int:
        # [1] 투 포인터를 이용하여 높이가 낮은 쪽의 포인터를 이동시킨다.
        left, right = 0, len(height) - 1
        answer = min(height[right], height[left]) * (right - left)
        while left < right:
            if height[left] < height[right]:
                left += 1
            else: right -= 1
            answer = max(answer, (min(height[right], height[left]) * (right - left)))

        return answer