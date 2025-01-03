# 문제 링크:https://school.programmers.co.kr/learn/courses/30/lessons/258711?language=python3

# 생성된 정점(이하 생성점)의 특징:
# [!]최소 2개의 간선을 보낸다.
# [!]그 어떤 간선도 받지 않는다.
# [!]보내는 간선의 개수 = 그래프의 총 개수 이다.
# [!]생성점에게 간선을 받는 정점들은 모두 다른 그래프 소속이다.

# 이하 3개의 그래프들에 대한 특징에서, 생성점에 영향을 받지 않는 절대 불변의 특징은 앞에 [!]를 붙인다.

# 도넛 그래프(이하 도넛)의 특징 (생성점으로 인한 변수는 괄호 안에 서술)
# [!]모든 점이 1개의 간선을 보낸다
# 모든 점이 1개의 간선을 받는다(생성점으로 인해 단 하나의 점이 1개 더 받는다.)
# 생성점을 고려하지 않을 때 가능한 경우의 수 [보냄,받음] - [1,1]

# 막대 그래프(이하 막대)의 특징 (생성점으로 인한 변수는 괄호 안에 서술)
# [단일]출발점 단일 그래프일 경우 출발점은 0개의 간선을 보내고 0개의 간선을 받는다(이 경우 생성점으로 인해 1개의 간선을 받는다.)
# 막대가 2개 이상의 점으로 구성될 경우 [단일]특징을 갖지 않고 대신 아래의 특징들을 갖는다.
# [!]출발점과 중간점은 1개, 종착점은 0개의 간선을 보낸다.
# 출발점은 0개, 중간점과 종착점은 모두 1개의 간선을 받는다(생성점으로 인해 단 하나의 점이 1개 더 받는다.)
# 생성점을 고려하지 않을 때 가능한 경우의 수 [보냄,받음] - [0,0] [1,0] [1,1] [0,1]

# 8자 그래프(이하 8자)의 특징 (생성점으로 인한 변수는 괄호 안에 서술)
# [!]2n개의 일반점과 1개의 중앙점으로 구성되어 있다. 일반점은 1개, 중앙점은 2개의 간선을 보낸다.
# 일반점은 1개, 중앙점은 2개의 간선을 받는다(생성점으로 인해 단 하나의 점이 1개 더 받는다.)
# 생성점을 고려하지 않을 때 가능한 경우의 수 [보냄,받음] - [1,1] [2,2]
# ----------------------------------------------------------------------------------------

# 생성점 찾는 방법
# 보내는 간선의 개수가 2개 이상인 점을 모두 찾는다. (생성점과 8자의 중앙점들)
# 그 어떤 간선도 받지 않는 점을 찾는다. (여기서 생성점만이 남는다)

# 정답 코드
def solution(edges):
    # 나의 번호: [내가 간선을 보낸 정점의 번호 집합, 나에게 간선을 보낸 정점의 번호 집합]
    dic_edges = {}

    # 모든 정점의 모든 간선 정보를 dic_edges에 기재
    for i in edges:
        if i[0] not in dic_edges:
            dic_edges[i[0]] = [set(), set()]
        dic_edges[i[0]][0].add(i[1])
        if i[1] not in dic_edges:
            dic_edges[i[1]] = [set(), set()]
        dic_edges[i[1]][1].add(i[0])

    # 생성점(spot_gen) 찾기
    spots_gen = [key for key, value in dic_edges.items() if len(value[0]) >= 2]
    for spot in spots_gen:
        if len(dic_edges[spot][1]) == 0:
            spot_gen = spot
            break

    # edges에서 생성점으로 인한 간선 제거 및 생성점에게 간선을 받은 정점 찾기
    one_per_graph = []
    for j in edges:
        if j[0] == spot_gen:
            one_per_graph.append(j[1])
            dic_edges[j[1]][1].discard(spot_gen)

    # 도넛(donut), 막대(bar), 8자(eight) 개수 구하기
    donut, bar, eight = 0, 0, 0
    for k in one_per_graph:
        l = len(dic_edges[k][0]) + len(dic_edges[k][1])
        if l <= 1:
            bar += 1
        elif l == 4:
            eight += 1
        else:
            mysterious_spot = k
            while True:
                mysterious_spot = dic_edges[mysterious_spot][0].pop()
                l = len(dic_edges[mysterious_spot][0]) + len(dic_edges[mysterious_spot][1])
                if mysterious_spot == k:
                    donut += 1
                    breaks
                elif l == 4:
                    eight += 1
                    break
                elif l == 1:
                    bar += 1
                    break

    # 답안 도출
    return [spot_gen, donut, bar, eight]

# -------------------------------------------------------------------------------------------
# 81.2 점, 시간 초과 + 런타임 에러
def solution(edges):
    send = [[] for _ in range(len(edges)+1)]
    receive = [[] for _ in range(len(edges)+1)]
    send_more_than_2 = []
    graph_8_centers = []

    for edge in edges:
        send[edge[0]].append(edge[1])
        receive[edge[1]].append(edge[0])
        if len(send[edge[0]]) >= 2 and edge[0] not in send_more_than_2:
            send_more_than_2.append(edge[0])
    for e in send_more_than_2:
        if len(receive[e]) == 0:
            new_edge = e
        else:
            graph_8_centers.append(e)
    connected_edges = send[new_edge]
    total_graph_cnt = len(send[new_edge])
    
    donut, stick, eight = 0,0,0
    for e in connected_edges:
        if len(send[e]) == 0:
            stick += 1
        else:
            move_edge = send[e][0]
            while True:
                if len(send[move_edge]) == 0:
                    stick += 1
                    break
                if move_edge in graph_8_centers:
                    break
                if move_edge == e:
                    donut += 1
                    break
                move_edge = send[move_edge][0]
    return new_edge, donut, stick, total_graph_cnt-donut-stick