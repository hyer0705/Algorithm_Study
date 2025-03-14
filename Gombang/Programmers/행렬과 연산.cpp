///////////////////////////////////////
///////// 해설을 참고하여 풀이 //////////
///////////////////////////////////////

#include <string>
#include <vector>
#include <deque>

using namespace std;

vector<vector<int>> solution(vector<vector<int>> rc, vector<string> operations) {

    int row = rc.size();
    int col = rc[0].size();

    deque<int> left;
    deque<int> right;
    deque<deque<int>> middle;

    for (int i = 0; i < row; i++)
    {
        left.push_back(rc[i][0]);
        right.push_back(rc[i][col - 1]);

        deque<int> tempRow;
        for (int j = 1; j < col - 1; j++)
        {
            tempRow.push_back(rc[i][j]);
        }
        middle.push_back(tempRow);
    }

    for (string operation : operations)
    {
        if (operation == "ShiftRow")
        {
            left.push_front(left.back());
            left.pop_back();

            middle.push_front(move(middle.back()));
            middle.pop_back();

            right.push_front(right.back());
            right.pop_back();
        }
        else
        {
            deque<int>& firstRow = middle.front();
            deque<int>& lastRow = middle.back();

            firstRow.push_front(left.front());
            left.pop_front();

            right.push_front(firstRow.back());
            firstRow.pop_back();

            lastRow.push_back(right.back());
            right.pop_back();

            left.push_back(lastRow.front());
            lastRow.pop_front();
        }
    }

    vector<vector<int>> answer(row);

    for (int i = 0; i < row; i++)
    {
        answer[i].push_back(left[i]);

        for (int j = 0; j < middle[i].size(); j++)
        {
            answer[i].push_back(middle[i][j]);
        }

        answer[i].push_back(right[i]);
    }

    return answer;
}



///////////////////////////////////////
///////// 두 번째 풀이 실패 ////////////
///////////////////////////////////////
#include <string>
#include <vector>

using namespace std;

const string SHIFT_ROW = "ShiftRow";
const string ROTATE = "Rotate";

// 인덱스에 대한 좌표 구하기.
pair<int, int> getCoordinates(int i, int row, int col)
{
    int topCount = col;
    int rightCount = row - 1;
    int bottomCount = col - 1;
    int leftCount = row - 2;

    if (i < topCount)
        return { 0, i };

    i -= topCount;
    if (i < rightCount)
        return { i + 1, col - 1 };

    i -= rightCount;
    if (i < bottomCount)
        return { row - 1, col - i - 2 };

    i -= bottomCount;
    if (i < leftCount)
        return { row - 2 - i, 0 };

    return { -1, -1 };
}

void ExecuteRotateCommand(int commandCount, vector<vector<int>>& rc)
{
    int row = rc.size();
    int col = rc[0].size();
    int totalLoopCount = col * row - ((row - 2) * (col - 2));
    // 본 코드 실패 후 이 코드를 추가하였지만 동일한 점수가 나옴.
    if (commandCount == totalLoopCount)
        return;

    vector<vector<int>> prevArray = rc;

    for (int i = 0; i < totalLoopCount; i++)
    {
        auto [y1, x1] = getCoordinates(i, row, col);
        auto [y2, x2] = getCoordinates((i + commandCount) % totalLoopCount, row, col);

        rc[y2][x2] = prevArray[y1][x1];
    }
}

void ExecuteShiftRowCommand(int commandCount, vector<vector<int>>& rc)
{
    int row = rc.size();
    int col = rc[0].size();
    // 본 코드 실패 후 이 코드를 추가하였지만 동일한 점수가 나옴.
    if (row == commandCount)
        return;

    vector<vector<int>> prevArray = rc;

    for (int i = 0; i < row; i++)
    {
        int index1 = i;
        int index2 = (i + commandCount) % row;

        rc[index2] = prevArray[index1];
    }
}

vector<vector<int>> solution(vector<vector<int>> rc, vector<string> operations) {

    string savedCommand = operations[0];
    int commandCount = 1;
    for (int i = 1; i <= operations.size(); i++)
    {
        if (i == operations.size() || savedCommand != operations[i])
        {
            if (savedCommand == SHIFT_ROW)
                ExecuteShiftRowCommand(commandCount, rc);
            else
                ExecuteRotateCommand(commandCount, rc);

            if (i < operations.size())
            {
                savedCommand = operations[i];
                commandCount = 1;
            }
        }
        else
        {
            commandCount++;
        }
    }

    return rc;
}


///////////////////////////////////////
///////// 첫 번째 풀이 실패 ////////////
///////////////////////////////////////
#include <string>
#include <vector>

using namespace std;

const string SHIFT_ROW = "ShiftRow";
const string ROTATE = "Rotate";

// 인덱스에 대한 좌표 구하기.
pair<int, int> getCoordinates(int i, int row, int col)
{
    int topCount = col;
    int rightCount = row - 1;
    int bottomCount = col - 1;
    int leftCount = row - 2;

    if (i < topCount)
        return { 0, i };

    i -= topCount;
    if (i < rightCount)
        return { i + 1, col - 1 };

    i -= rightCount;
    if (i < bottomCount)
        return { row - 1, col - i - 2 };

    i -= bottomCount;
    if (i < leftCount)
        return { row - 2 - i, 0 };

    return { -1, -1 };
}

void ExecuteCommand(string command, vector<vector<int>>& rc)
{
    if (command == SHIFT_ROW)
    {
        vector<int> tempVec = rc[0];
        vector<int> mySavedVec;

        for (int i = 1; i < rc.size(); i++)
        {
            mySavedVec = rc[i];
            rc[i] = tempVec;
            tempVec = mySavedVec;
        }

        // rc의 0번에 마지막 데이터를 옮겨주는 작업 진행.
        rc[0] = tempVec;
    }
    else
    {
        int row = rc.size();
        int col = rc[0].size();

        int temp = rc[0][0];
        int savedMyValue;

        int totalLoopCount = col * row - ((row - 2) * (col - 2));
        for (int i = 1; i < totalLoopCount; i++)
        {
            auto [y, x] = getCoordinates(i, row, col);
            savedMyValue = rc[y][x];
            rc[y][x] = temp;
            temp = savedMyValue;
        }

        rc[0][0] = temp;
    }
}

vector<vector<int>> solution(vector<vector<int>> rc, vector<string> operations) {

    for (string command : operations)
    {
        ExecuteCommand(command, rc);
    }

    return rc;
}