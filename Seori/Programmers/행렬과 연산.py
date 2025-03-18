from collections import deque

def solution(rc, operations):
    
    # 행렬의 네 모서리 값을 각각 deque에서 회전하도록 하는 함수
    def Rotate():
        rows[height - 1].append(outer_columns[1].pop())
        outer_columns[0].append(rows[height - 1].popleft())
        rows[0].appendleft(outer_columns[0].popleft())
        outer_columns[1].appendleft(rows[0].pop())
        
    # 행렬의 가장 마지막 행이 맨 위로 오도록 deque에서 처리해주는 함수
    def ShiftRow():
        rows.appendleft(rows.pop())
        outer_columns[0].appendleft(outer_columns[0].pop())
        outer_columns[1].appendleft(outer_columns[1].pop())
    
    # 효율성을 위해서 각 행을, 그리고 처음과 끝 열을 deque로 변환
    height, width = len(rc), len(rc[0])
    rows = deque(deque(row[1:-1]) for row in rc)
    outer_columns = [deque(rc[h][0] for h in range(height)), deque(rc[h][width - 1] for h in range(height))]
    
    for operation in operations:
        if operation == 'Rotate':
            Rotate()
        elif operation == 'ShiftRow':
            ShiftRow()
    
    # 결과값을 행렬 형태로 반환
    answer = []
    for h in range(height):
        answer.append([])
        answer[h].append(outer_columns[0][h])
        answer[h].extend(rows[h])
        answer[h].append(outer_columns[1][h])
        
    return answer