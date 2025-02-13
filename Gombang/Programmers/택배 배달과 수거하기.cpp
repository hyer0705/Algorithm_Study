#include <string>
#include <vector>

using namespace std;

// 벡터에서 역순으로 체크하여 1이 아닌 인덱스를 찾는 함수.
int findFirstCheckIndex(vector<int>& vec)
{
    int firstCheckIndex = 0;

    for (int i = vec.size() - 1; i >= 0; i--)
    {
        if (vec[i] != 0)
        {
            firstCheckIndex = i;
            break;
        }
    }

    return firstCheckIndex;
}

// 벡터에 대해서 특정 인덱스부터 역순으로 탐색하여 cap만큼 감소하기 위한 함수.
void Process(vector<int>& vec, int& nextIndex, int cap)
{
    int accumulatedNum = 0;
    for (int i = nextIndex; i >= 0; i--)
    {
        nextIndex = i;
        if (accumulatedNum + vec[i] <= cap)
        {
            accumulatedNum += vec[i];
            vec[i] = 0;
        }
        else
        {
            vec[i] -= cap - accumulatedNum;
            break;
        }
    }
}

long long solution(int cap, int n, vector<int> deliveries, vector<int> pickups) {
    long long answer = 0;

    // 배달 및 수거 해야할 맨뒤의 인덱스를 찾는 과정.
    int nextDeliveryIndex = findFirstCheckIndex(deliveries);
    int nextPickupIndex = findFirstCheckIndex(pickups);

    // Test Case 2번.
    // 모든 집들에 대해서 아무런 배달과 수거를 하지 않아도 된다면 바로 종료.
    if (nextDeliveryIndex == 0 && deliveries[0] == 0 &&
        nextPickupIndex == 0 && pickups[0] == 0)
        return answer;

    while (true)
    {
        // 가장 먼 지점부터 배달 또는 수거를 하기 위해서 진행.
        int moveDistance = nextDeliveryIndex > nextPickupIndex ?
            nextDeliveryIndex + 1 : nextPickupIndex + 1;

        Process(deliveries, nextDeliveryIndex, cap);
        Process(pickups, nextPickupIndex, cap);

        answer += moveDistance;

        // 모든 집들에 대해서 더이상 배달과 수거를 하지 않아도 된다면 바로 종료.
        if (nextDeliveryIndex == 0 && deliveries[0] == 0 &&
            nextPickupIndex == 0 && pickups[0] == 0)
            break;
    }

    return answer * 2;
}