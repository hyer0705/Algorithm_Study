def solution(board, aloc, bloc):

    direction = [(0, -1), (-1, 0), (1, 0), (0, 1)]
    
    def dfs(board, my_loc, your_loc, turn):
        # [1] 재귀 종료 조건. 지금 내 발판이 0인 경우 패배 확정이다.
        x, y = my_loc
        if board[x][y] == 0:
            return turn, 0
        
        # [2] 4방향을 탐색하며 가능한 경우 재귀를 시작한다.
        winner = False
        max_move = 0
        min_move = float('inf')
        for dx, dy in direction:
            nx, ny = x + dx, y + dy
            if 0 <= nx < len(board) and 0 <= ny < len(board[0]) and board[nx][ny] == 1:
                
                # [3] 움직이기 위해 지금 발판을 0처리 해주고,
                board[x][y] = 0
                loser, move = dfs(board, your_loc, [nx, ny], not turn) # 재귀를 할 땐 플레이어 순서를 바꿔준다.
                # [4] 재귀 탐색이 끝나면 발판을 다시 1 처리해준다.(백트래킹)
                board[x][y] = 1
                
                # [5] 지금이 진 사람의 턴이라면 최대한 오래 버티도록 플레이
                if turn == loser:
                    max_move = max(max_move, move + 1)
                # [6] 지금이 이긴 사람의 턴이라면 최대한 빨리 이기도록 플레이
                else:
                    winner = True
                    min_move = min(min_move, move + 1)
        
        
        # [7] 승/패에 맞게 움직임 횟수를 반환
        if winner:
            return (not turn, min_move)
        else:
            return (turn, max_move)
    
    return dfs(board, aloc, bloc, False)[1]

# Test case 1
board = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
aloc = [1, 0]
bloc = [1, 2]
print(solution(board, aloc, bloc))  # Expected output: 5
