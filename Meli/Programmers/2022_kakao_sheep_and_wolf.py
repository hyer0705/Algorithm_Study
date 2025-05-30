def solution(info, edges):
    from collections import defaultdict

    graph = defaultdict(list)
    for parent, child in edges:
        graph[parent].append(child)

    max_sheep = 0

    def dfs(current, sheep, wolf, possible):
        nonlocal max_sheep
        if info[current] == 0:
            sheep += 1
        else:
            wolf += 1

        if wolf >= sheep:
            return

        max_sheep = max(max_sheep, sheep)

        next_possible = possible + graph[current]
        next_possible.remove(current)

        for node in next_possible:
            dfs(node, sheep, wolf, next_possible[:])

    dfs(0, 0, 0, [0])
    return max_sheep