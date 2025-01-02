def solution(edges):
    
    # [1] 임의의 정점 random_node 찾기
    random_node = 0
    
    # [1-1] edges에 담긴 각 정점의 관계를 인접리스트에 저장한다. random_node를 찾기 위해 역방향 또한 저장한다.
    adj_list = [[] for _ in range(1000001)]
    adj_reverse_list = [[] for _ in range(1000001)]
    for u, v in edges:
        adj_list[u].append(v)
        adj_reverse_list[v].append(u)
        
    # [1-2] random_node는 인접한 정점으로 단방향 연결되므로, 2개 이상의 연결 관계를 가지며, 역방향 인접리스트에는 원소가 없다.
    for i in range(1, 1000001):
        if len(adj_list[i]) > 1 and not adj_reverse_list[i]:
            random_node = i
            break

    # [A] 특정 정점을 포함하는 그래프의 모양을 검사하는 함수 check_graph를 정의한다
    def check_graph(node):
		    # [A-1] 정점 node를 포함하는 그래프의 node_count, edge_count를 구한다.
		    # visited = [0] * 1000001 --> 이거 때문에 시간 초과 발생했었다.
        visited[node] = 1
        node_count, edge_count = 1, 0
        queue = [node]
        while queue:
            now = queue.pop(0)
            for next in adj_list[now]:
                edge_count += 1
                if not visited[next]:
                    queue.append(next)
                    visited[next] = 1
                    node_count += 1
        
        # [A-2] 문제에서 주어지는 조건을 활용하여 그래프의 모양을 찾아낸다.
        if node_count == edge_count:
            return "doughnut"
        elif node_count == edge_count + 1:
            return "bar"
        elif node_count == edge_count - 1:
            return "eight"
    
    # [2] 임의의 정점에서 연결된 각 그래프의 모형 찾기
    doughnut, bar, eight = 0, 0, 0
    visited = [0] * 1000001
    for adj_node in adj_list[random_node]:
        shape = check_graph(adj_node)
        if shape == "doughnut":
            doughnut += 1
        elif shape == "bar":
            bar += 1
        elif shape == "eight":
            eight += 1
        
    
    return [random_node, doughnut, bar, eight]