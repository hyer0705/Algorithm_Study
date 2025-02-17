#include <string>
#include <vector>

using namespace std;

int discountRates[] = { 10, 20, 30, 40 };

// 백 트래킹 방식으로 조합 구성.
void generateCombination(vector<vector<int>>& discountLists, vector<int>& currCombination,
    int depth, int emoticonSize)
{
    if (depth == emoticonSize)
    {
        discountLists.push_back(currCombination);
        return;
    }

    for (int i = 0; i < 4; i++)
    {
        currCombination.push_back(discountRates[i]);
        generateCombination(discountLists, currCombination, depth + 1, emoticonSize);
        currCombination.pop_back();
    }
}

vector<int> solution(vector<vector<int>> users, vector<int> emoticons) {

    // 정답 제출용 변수 설정.
    int answerEmoticonPlusCount = 0;
    int answerPrice = 0;

    // 각 이모티콘에 대한 할인율 조합 변수 설정.
    vector<vector<int>> discountLists;
    vector<int> currCombination;

    // discountLists의 조합을 구하는 과정 진행.
    generateCombination(discountLists, currCombination, 0, emoticons.size());

    for (int i = 0; i < discountLists.size(); i++)
    {
        int newEmoticonPlusCount = 0;
        int newTotalPrice = 0;

        // 모든 유저들에 대해서 적용된 할인율에 대해서 구매하거나 이모티콘 플러스를 가입하는 과정.
        for (int userIndex = 0; userIndex < users.size(); userIndex++)
        {
            // users[userIndex][0] : 할인율 역치
            // users[userIndex][1] : 구매 비용 역치
            int sum = 0;

            for (int j = 0; j < emoticons.size(); j++)
            {
                if (users[userIndex][0] <= discountLists[i][j])
                    sum += (emoticons[j] * (100 - discountLists[i][j])) / 100;
            }

            if (sum >= users[userIndex][1])
                newEmoticonPlusCount++;
            else
                newTotalPrice += sum;
        }

        // 새로운 할인율을 적용했을 때, 더 많은 플러스 가입자가 있거나, 가입자 수는 같지만 판매 비용이 높으면
        if (answerEmoticonPlusCount < newEmoticonPlusCount ||
            (answerEmoticonPlusCount == newEmoticonPlusCount && answerPrice < newTotalPrice))
        {
            answerEmoticonPlusCount = newEmoticonPlusCount;
            answerPrice = newTotalPrice;
        }
    }


    return { answerEmoticonPlusCount, answerPrice };
}