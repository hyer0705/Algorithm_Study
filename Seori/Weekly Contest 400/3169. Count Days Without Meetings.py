class Solution:
    def countDays(self, days: int, meetings: List[List[int]]) -> int:
        
        # [1] Sort the meetings by start time and end time in descending order
        #  -> so that we can ignore the meetings that start time is same as start
        meetings.sort(key = lambda x: (x[0], -x[1]))

        start, latest = meetings[0][0], meetings[0][1]
        answer = start - 1
        for i in range(len(meetings) - 1):
            # [2-1] If the next meeting starts before the current meeting ends, update the start, latest
            if start < meetings[i+1][0] <= latest:
                start = meetings[i+1][0]
                latest = max(latest, meetings[i+1][1])
            # [2-2] If the next meeting starts after the current meeting ends, it means there is a gap between the meetings
            elif meetings[i+1][0] > latest:
                answer += meetings[i+1][0] - latest - 1
                start = meetings[i+1][0]
                latest = meetings[i+1][1]
        answer += days - latest
        return answer