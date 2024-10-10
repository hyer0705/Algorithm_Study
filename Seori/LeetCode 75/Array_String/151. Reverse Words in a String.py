class Solution:
    def reverseWords(self, s: str) -> str:
        # 공백을 기준으로 split하고, 빈 값을 제거하여 다시 역순으로 join한다.
        list_s = s.split(" ")
        while "" in list_s:
            list_s.remove("")
        return " ".join(list_s[::-1])