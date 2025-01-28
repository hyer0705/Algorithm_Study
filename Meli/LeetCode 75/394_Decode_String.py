# runtime 0ms, memory 17.89MB
class Solution:
    def decodeString(self, s: str) -> str:
        answer = []
        for i in range(len(s)):
            if s[i].isdigit():
                if answer and answer[-1].isdigit():
                    answer[-1] += s[i]
                else:
                    answer.append(s[i])
            elif s[i] == "[":
                answer.append("")
            elif s[i] == "]":
                index = len(answer)-1
                while not answer[index-1].isdigit():
                    answer[index-1] += answer[index]
                    answer.pop(index)
                    index -= 1
                decoded_str = answer.pop(index) * int(answer.pop(index-1))
                answer.append(decoded_str)
            else:
                if not answer:
                    answer.append(s[i])
                else:
                    answer[-1] += s[i]

        return "".join(answer)