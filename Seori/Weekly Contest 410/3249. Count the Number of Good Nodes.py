# 실패한 코드
class Solution:
    def countGoodNodes(self, edges: List[List[int]]) -> int:
        
        # [A] edges로 주어진 트리에서 자식 노드 개수와 good 노드 개수를 반환하는 dfs 함수를 정의한다.
        #     define the dfs function that returns the number of child nodes and good nodes in the tree given by edges.
        def dfs(parent: int) -> int:
            count_current_child = -1
            count_total_child = 0
            count_good = 0
            is_good = 1

            # [A-1] 현재 parent에서 이어진 자식 노드들을 탐색한다.
            for child in nodes[parent]:
                # [A-2] 첫 번재 자식일 경우, 자식 노드의 개수와 good 노드의 개수를 구한다.
                if count_current_child == -1:
                    count_current_child, count_good = dfs(child)
                    count_total_child += count_current_child
                # [A-3] 첫 번째 자식이 아닌 경우 자식 노드 개수를 비교하여 현재 parent가 good 노드인지 확인한다.
                else:
                    count_next_child, count_next_good = dfs(child)
                    if count_current_child != count_next_child:
                        is_good = 0
                    count_total_child += count_next_child
                    count_good += count_next_good

            # [A-4] 현재 parent가 good인지 판별하여 자식 노드 개수와 good 노드 개수를 반환한다.
            if is_good:
                return count_total_child + 1, count_good + 1
            return count_total_child + 1, count_good

        # [1] edges로 주어진 관계를 nodes에 저장하고, dfs(0)을 호출하여 결과를 반환한다.
        #     단, 이 풀이는 0부터 시작하는 트리를 가정하므로, dfs(0)을 호출한다. -> 실패 원인
        nodes = [[] for _ in range(len(edges) + 1)]
        for parent, child in edges:
            nodes[parent].append(child)
        return dfs(0)[1]