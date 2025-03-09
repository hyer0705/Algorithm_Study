def solution(commands):
    # [A] 2차원 좌표 -> 1차원 좌표로 변환해주는 함수
    def target(r, c):
        return 50 * (r - 1) + c
    
    # [B] Union-Find 알고리즘 Find 함수
    def find(node):
        if parent[node] == node:
            return node
        parent[node] = find(parent[node])
        return parent[node]
    
    # [C] Union-Find 알고리즘 Union 함수
    def merge(a, b):
        if a == b: return
        parent_a, parent_b = find(a), find(b)
        parent[parent_b] = parent_a
        if table[parent_a] == 'EMPTY':
            table[parent_a] = table[parent_b]
        
    # [D] 입력된 칸과 같은 부모를 가진 칸을 전부 찾아 unmerge 처리해준다.
    def unmerge(a):
        parent_a = find(a)
        table[a] = table[parent_a]
        need_update = []
        # unmerge 대상을 저장해두고 한번에 처리한다. 순차적으로 처리하면 제대로 unmerge 안됨
        for i in range(1, 2501):
            if find(i) == parent_a:
                need_update.append(i)
        for i in need_update:
            parent[i] = i
            if i != a:
                table[i] = 'EMPTY'
    
    answer = []
    table = ['EMPTY'] * 2501
    parent = [i for i in range(2501)]
    for command in commands:
        command_list = command.split()
        # [1] UPDATE
        if command_list[0] == 'UPDATE':
            if len(command_list) == 4:
                r = int(command_list[1])
                c = int(command_list[2])
                value = command_list[3]
                cell = target(r, c)
                parent_cell = find(cell)
                table[parent_cell] = value
            elif len(command_list) == 3:
                value1 = command_list[1]
                value2 = command_list[2]
                for i in range(1, 2501):
                    if table[i] == value1:
                        table[i] = value2
        # [2] MERGE
        elif command_list[0] == 'MERGE':
            r1 = int(command_list[1])
            c1 = int(command_list[2])
            r2 = int(command_list[3])
            c2 = int(command_list[4])
            cell1, cell2 = target(r1, c1), target(r2, c2)
            merge(cell1, cell2)
        # [3] UNMERGE
        elif command_list[0] == 'UNMERGE':
            r = int(command_list[1])
            c = int(command_list[2])
            cell = target(r, c)
            unmerge(cell)
        # [4] PRINT
        elif command_list[0] == 'PRINT':
            r = int(command_list[1])
            c = int(command_list[2])
            cell = target(r, c)
            parent_cell = find(cell)
            answer.append(table[parent_cell])
    return answer