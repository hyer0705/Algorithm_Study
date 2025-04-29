#include <string>
#include <vector>

using namespace std;

int diffScore = 0;
vector<int> result;

bool hasMoreLowerScores(vector<int>& currVec, vector<int>& newVec)
{
    for (int i = 10; i >= 0; i--)
    {
        if (currVec[i] > newVec[i])
            return false;
        else if (currVec[i] < newVec[i])
            return true;
    }

    // 모든 값이 같은 경우.
    return false;
}

// n : 남은 발수, score : 현재 순회중인 점수 
void dfs(int n, vector<int>& info, int score, vector<int> lionVec)
{
    if (n == 0 || score == 0)
    {
        // 0점 예외처리. 마지막 남은 발수는 0점에 모두 쏘아야 한다.
        if (score == 0)
            lionVec[10] = n;

        int apeachScore = 0;
        int ryanScore = 0;
        for (int i = 0; i <= 10; i++)
        {
            // 어피치도 0발 쐈고, 라이언도 0발 쐈으면
            if (info[i] == 0 && lionVec[i] == 0)
                continue;

            // 어피치가 라이언보다 더 많이 맞췄으면 어피치점수로 계산.
            if (info[i] >= lionVec[i] && info[i] > 0)
                apeachScore += (10 - i);
            else
                ryanScore += (10 - i);
        }

        // diffScore와 result갱신.
        if (ryanScore > apeachScore)
        {
            int newDiffScore = ryanScore - apeachScore;

            // 기존에 저장되어 있던 점수가 새로운 점수보다 더 낮으면  
            if (diffScore < newDiffScore)
            {
                result = lionVec;
                diffScore = newDiffScore;
            }
            else if (diffScore == newDiffScore && hasMoreLowerScores(result, lionVec))
            {
                result = lionVec;
            }
        }

        return;
    }

    int index = 10 - score;
    // 라이언이 현재 score에 대한 점수를 획득하는 분기를 따로 타도록 한다.
    if (n > info[index])
    {
        vector<int> tempVec = lionVec;
        tempVec[index] = info[index] + 1;
        dfs(n - info[index] - 1, info, score - 1, tempVec);
    }

    // 현재 score를 쏘지 않는 분기.
    dfs(n, info, score - 1, lionVec);
}

vector<int> solution(int n, vector<int> info) {

    vector<int> lionVec(info.size(), 0);
    dfs(n, info, 10, lionVec);

    return result.empty() == false ? result : vector<int>{ -1 };
}