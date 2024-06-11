public class Solution
{
    public int CountDays(int days, int[][] meetings)
    {
        // 시작일을 기준으로 오름차순 정렬.
        Array.Sort(meetings, (a, b) => a[0].CompareTo(b[0]));

        int result = 0;

        int startDay = meetings[0][0];
        int endDay = meetings[0][1];

        // 위에서 시작일을 기준으로 정렬을 했으므로, 0번 인덱스의 시작일 전까지는 미팅 스케줄이 없기 때문에 result에 startDay를 넣어줌.
        // -1을 해주는 이유는, 일 수가 올바르게 계산되기 위해서 해준다. ( ex) startDay가 2라면, 1일의 빈 스케쥴이 있는 것이므로 -1을 해주는 것이다. )
        result = startDay - 1;

        for (int i = 1; i < meetings.Length; i++)
        {
            int nextScheduleStartDay = meetings[i][0];
            int nextScheduleEndDay = meetings[i][1];

            // 기존에 저장되어 있던 endDay가 다음 스케쥴의 시작 날짜보다 작다면,
            // 그 차이만큼 빈 날이 있는 것이므로 빈 날만큼 result에 더해주고,
            // endDay를 다음 스케줄의 종료 날짜로 넣어준다.
            if (endDay < nextScheduleStartDay)
            {
                result += nextScheduleStartDay - endDay - 1;
                endDay = nextScheduleEndDay;
            }

            // 기존에 저장되어 있던 endDay가 다음 스케줄의 시작 날짜와 종료날짜 중간에 있다면,
            // 연속해서 스케쥴이 잡혀있는 것이므로 단순하게 endDay를 다음 스케줄의 종료날짜로 바꿔준다.
            else if (endDay >= nextScheduleStartDay && endDay < nextScheduleEndDay)
            {
                endDay = nextScheduleEndDay;
            }
        }

        // 마지막으로, (총 일 수 - 가장 마지막 스케줄 종료일)만큼을 result에 더해주면 모든 빈 스케쥴을 구할 수 있다.
        return result + (days - endDay);
    }
}