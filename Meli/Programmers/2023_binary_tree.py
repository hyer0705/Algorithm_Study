def valid_tree(s):
    # 길이가 1이면 더 이상 분할할 수 없으므로 True 반환
    if len(s) == 1:
        return True

    mid = len(s) // 2
    left, right = s[:mid], s[mid+1:]
    
    # 현재 노드가 dummy(0)라면, 해당 노드의 서브트리에는 1이 있으면 안됨.
    if s[mid] == '0':
        if '1' in left or '1' in right:
            return False
    
    # 좌우 서브트리도 재귀적으로 확인
    return valid_tree(left) and valid_tree(right)


def solution(numbers):
    answer = []
    
    for num in numbers:
        # 10진수를 이진 문자열로 변환 (접두어 '0b' 제거)
        binary = bin(num)[2:]
        n = len(binary)
        
        # 이진 문자열의 길이가 2^k - 1 형태가 되도록 k를 찾음.
        k = 0
        while (2 ** k - 1) < n:
            k += 1
        
        full_length = 2 ** k - 1
        
        # 왼쪽을 0으로 채워 full binary tree의 노드 수에 맞춤.
        padded = binary.zfill(full_length)
        
        # 조건을 만족하면 1, 아니면 0을 결과에 추가.
        answer.append(1 if valid_tree(padded) else 0)
    
    return answer

# 테스트 실행
print(solution([7, 42, 5]))  # [1, 1, 0]
print(solution([63, 111, 95]))  # [1, 1, 0]