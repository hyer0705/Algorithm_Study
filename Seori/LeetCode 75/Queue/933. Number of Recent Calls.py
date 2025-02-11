class RecentCounter:
    # [1] __init__ 메서드는 클래스 생성 시 실행되는 부분이다.
    #     사용할 queue를 생성해준다.
    def __init__(self):
        self.queue = []
        return None

    # [2] 앞서 생성한 queue에 ping 값을 넣고, queue의 가장 앞부분의 크기를 비교한 뒤 길이를 반환한다.
    def ping(self, t: int) -> int:
        queue = self.queue
        queue.append(t)
        while queue[0] < t - 3000:
            queue.pop(0)
        return len(queue)