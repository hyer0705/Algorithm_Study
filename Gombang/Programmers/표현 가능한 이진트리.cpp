#include <string>
#include <vector>
#include <cmath>
#include <iostream>

using namespace std;

const int RIGHT_DIRECTION = 1;
const int LEFT_DIRECTION = -1;

bool IsRootNodeOne(vector<int>& vec, int start, int end)
{
    if (start >= end)
        return true;

    int middle = (start + end) / 2;
    if (vec[middle] == 0)
    {
        // 중간을 기준으로 좌측에 해당하는 곳에 1이라는 값이 하나라도 있다면, return false;
        for (int i = start; i <= middle - 1; i++)
        {
            if (vec[i] == 1)
                return false;
        }

        // 중간을 기준으로 우측에 해당하는 곳에 1이라는 값이 하나라도 있다면, return false;
        for (int i = middle + 1; i <= end; i++)
        {
            if (vec[i] == 1)
                return false;
        }
    }

    return IsRootNodeOne(vec, start, middle - 1) &&
        IsRootNodeOne(vec, middle + 1, end);
}

// 포화이진트리의 경우 노드의 개수가 2^n-1 개의 개수여야 한다.
// 따라서, 2^n-1개를 기준으로 부족한 개수만큼 0을 채워준다.
void AddZeroNumber(vector<int>& numVec)
{
    int degree = 0;
    while (true)
    {
        if (numVec.size() <= pow(2, degree) - 1)
            break;

        degree++;
    }

    for (int i = numVec.size(); i < pow(2, degree) - 1; i++)
    {
        numVec.push_back(0);
    }
}

vector<int> solution(vector<long long> numbers) {

    vector<int> answer;

    for (int index = 0; index < numbers.size(); index++)
    {
        long long number = numbers[index];
        vector<int> numVec;

        // 1. numbers[i]에 해당하는 숫자의 이진수를 구한다.
        while (number != 0)
        {
            numVec.push_back(number & 1);
            number = number >> 1;
        }

        // 2. 부족한 개수만큼 0의 개수 채워주기.
        AddZeroNumber(numVec);

        // 1 1 0 1 0 -->  

        // 3. 현재 벡터는 반대로 이진수가 들어가있는 상황이라, 교체를 진행해준다(swap)
        for (int j = 0; j < numVec.size() / 2; j++)
        {
            numVec[j] = numVec[j] + numVec[numVec.size() - 1 - j];
            numVec[numVec.size() - 1 - j] = numVec[j] - numVec[numVec.size() - 1 - j];
            numVec[j] = numVec[j] - numVec[numVec.size() - 1 - j];
        }

        // 4. 정중앙 값부터 시작하여, 서브트리의 루트노드가 1인지를 재귀적으로 계속 확인해간다.
        int middleIndex = numVec.size() / 2;
        bool isRootNodeOne = IsRootNodeOne(numVec, 0, numVec.size() - 1);

        answer.push_back(isRootNodeOne ? 1 : 0);
    }

    return answer;
}