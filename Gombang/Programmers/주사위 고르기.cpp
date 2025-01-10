#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <iostream>

using namespace std;

// 백트래킹 방식으로 주사위 조합 구학
void generateCombination(int depth, int startIndex, int targetSize, vector<vector<int>>& result, vector<int>& currentCombination)
{
    if (depth == targetSize)
    {
        result.push_back(currentCombination);
        return;
    }

    for (int i = startIndex; i < targetSize * 2; i++)
    {
        currentCombination.push_back(i);
        generateCombination(depth + 1, i + 1, targetSize, result, currentCombination);
        currentCombination.pop_back();
    }
}

void calculateDiceSumFreq(const vector<vector<int>>& dice, const vector<int>& indices, unordered_map<int, int>& myDiceSumFreqMap, int currentIndex, int currentSum)
{
    // 종료조건.
    if (currentIndex == indices.size())
    {
        myDiceSumFreqMap[currentSum]++;
        return;
    }

    int diceIndex = indices[currentIndex];
    for (int value : dice[diceIndex])
    {
        calculateDiceSumFreq(dice, indices, myDiceSumFreqMap, currentIndex + 1, currentSum + value);
    }
}

vector<int> getDiceKeys(const unordered_map<int, int>& myDiceSumFreqMap)
{
    vector<int> vec;
    for (const auto& pair : myDiceSumFreqMap)
    {
        vec.push_back(pair.first);
    }

    return vec;
}

void saveVictoryCountMap(const vector<vector<int>>& dice, vector<int>& myDiceIndices, vector<int>& otherDiceIndices, unordered_map<int, vector<int>>& victoryCountMap)
{
    // 가지고 있는 주사위를 모두 던졌을 때 나올수 있는 숫자의 빈도수를 저장하는 Map.
    unordered_map<int, int> myDiceSumFreqMap, otherDiceSumFreqMap;
    calculateDiceSumFreq(dice, myDiceIndices, myDiceSumFreqMap, 0, 0);
    calculateDiceSumFreq(dice, otherDiceIndices, otherDiceSumFreqMap, 0, 0);

    // 주사위를 던졌을 때 나올 수 있는 주사위의 합들을 뽑아서 진행.
    vector<int> myDiceSums = getDiceKeys(myDiceSumFreqMap);
    vector<int> otherDiceSums = getDiceKeys(otherDiceSumFreqMap);

    int totalVictoryCount = 0;
    int totalDefeatCount = 0;
    for (int i = 0; i < myDiceSums.size(); i++)
    {
        int victoryCount = 0;
        int defeatCount = 0;
        for (int j = 0; j < otherDiceSums.size(); j++)
        {
            if (myDiceSums[i] > otherDiceSums[j])
                victoryCount += otherDiceSumFreqMap[otherDiceSums[j]];
            else if (myDiceSums[i] < otherDiceSums[j])
                defeatCount += otherDiceSumFreqMap[otherDiceSums[j]];
        }

        totalVictoryCount += myDiceSumFreqMap[myDiceSums[i]] * victoryCount;
        totalDefeatCount += myDiceSumFreqMap[myDiceSums[i]] * defeatCount;
    }

    if (totalVictoryCount >= totalDefeatCount)
    {
        victoryCountMap[totalVictoryCount] = myDiceIndices;
    }
    else
    {
        victoryCountMap[totalDefeatCount] = otherDiceIndices;
    }
}

vector<int> solution(vector<vector<int>> dice) {

    vector<vector<int>> combinations;
    vector<int> currentCombination;

    // 선택할 주사위의 인덱스 조합 구하기.
    generateCombination(0, 0, dice.size() / 2, combinations, currentCombination);

    unordered_map<int, vector<int>> victoryCountMap; // 승리 횟수가 Key, 선택한 주사위 Value;
    for (int i = 0; i < combinations.size() / 2; i++)
    {
        saveVictoryCountMap(dice, combinations[i], combinations[combinations.size() - 1 - i], victoryCountMap);
    }

    int highVictoryCount = 0;
    for (const auto& map : victoryCountMap)
    {
        highVictoryCount = max(highVictoryCount, map.first);
    }

    vector<int> answer = victoryCountMap[highVictoryCount];
    for (int& val : answer)
    {
        val += 1; // 주사위 번호를 위해 +1씩 추가.
    }

    return answer;
}