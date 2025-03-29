class Solution:
    def finalPositionOfSnake(self, n: int, commands: List[str]) -> int:
        # i와 j의 좌표를 구하고, 이동한 좌표를 반환한다.
        i, j = 0, 0
        for command in commands:
            if command == 'RIGHT':
                j += 1
            elif command == 'LEFT':
                j -= 1
            elif command == 'DOWN':
                i += 1
            elif command == 'UP':
                i -= 1

        return n * i + j