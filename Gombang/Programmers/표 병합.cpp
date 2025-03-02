#include <string>
#include <vector>
#include <sstream>
#include <unordered_map>
#include <iostream>

using namespace std;

const int ROWS = 51;
const int COLS = 51;

class Cell
{
public:
    Cell(int _y, int _x) : y(_y), x(_x), content("EMPTY") {}

    void UpdateContent(const string& newContent)
    {
        content = newContent;

        // 머지가 되어 있다면 머지된 Cell들에도 내용을 변경해준다.
        for (const auto& mergedCell : mergedCellMap)
        {
            (mergedCell.first)->onNotified(newContent);
        }
    }

    void MergeCell(Cell* cell)
    {
        // cell이 본인이거나, 기존에 저장되어 있는 cell이라면 return.
        if (cell == this ||
            mergedCellMap.find(cell) != mergedCellMap.end())
            return;

        mergedCellMap[cell]++;
        cell->MergeCell(this);

        for (auto& mergedCell : mergedCellMap)
        {
            (mergedCell.first)->MergeCell(cell);
            cell->MergeCell(mergedCell.first);
        }
    }

    // 병합 해제
    void UnMerge()
    {
        string tmpStr = this->content;

        // 머지되었던 셀들을 순회하면서 머지된 셀들의 mergedCellMap에 대해서 clear진행.
        for (auto& mergedCell : mergedCellMap)
        {
            (mergedCell.first)->ClearMergedCell();
        }

        // 본인의 mergedCellMap초기화.
        ClearMergedCell();
        UpdateContent(tmpStr);
    }

    string GetContent() const
    {
        return content;
    }

private:
    void onNotified(const string& newContent)
    {
        content = newContent;
    }

    void ClearMergedCell()
    {
        this->content = "EMPTY";
        mergedCellMap.clear();
    }

private:
    int y, x;
    string content;

    unordered_map<Cell*, int> mergedCellMap;
};

enum class CommandType
{
    UPDATE,
    MERGE,
    UNMERGE,
    PRINT
};

CommandType GetCommandType(string str)
{
    if (str == "UPDATE")
        return CommandType::UPDATE;
    else if (str == "MERGE")
        return CommandType::MERGE;
    else if (str == "UNMERGE")
        return CommandType::UNMERGE;
    else
        return CommandType::PRINT;
}

vector<string> answer;

void ExecuteCommand(CommandType commandType, vector<string>& args, vector<vector<Cell>>& table)
{
    switch (commandType)
    {
    case CommandType::UPDATE:
    {
        if (args.size() == 3)
        {
            // (args[0], args[1]) 위치의 내용을 args[2]로 바꾸기.
            int y = stoi(args[0]);
            int x = stoi(args[1]);

            table[y][x].UpdateContent(args[2]);
        }
        else if (args.size() == 2)
        {
            string currString = args[0];
            string nextString = args[1];

            // args[0]을 가지고 있는 모든 셀을 선택해서 args[1]로 바꾸기.
            for (int i = 0; i < ROWS; i++)
            {
                for (int j = 0; j < COLS; j++)
                {
                    if (table[i][j].GetContent() == currString)
                    {
                        table[i][j].UpdateContent(nextString);
                    }
                }
            }
        }
        else
        {
            // error
        }
    }
    break;

    case CommandType::MERGE:
    {
        // (args[0], args[1]) 위치의 셀과 (args[2], args[3]) 위치의 셀을 선택하여 병합.
        int y1 = stoi(args[0]);
        int x1 = stoi(args[1]);

        int y2 = stoi(args[2]);
        int x2 = stoi(args[3]);

        table[y1][x1].MergeCell(&table[y2][x2]);

        if (table[y1][x1].GetContent() != "EMPTY")
            table[y1][x1].UpdateContent(table[y1][x1].GetContent());
        else
        {
            if (table[y2][x2].GetContent() != "EMPTY")
            {
                table[y1][x1].UpdateContent(table[y2][x2].GetContent());
            }
        }
    }
    break;

    case CommandType::UNMERGE:
    {
        // (args[0], args[1])에 연결되어 있는 셀들의 병합을 해제한다.
        // 해제 시에 값을 가지고 있는 경우 (args[0], args[1]) 이 위치가 가져간다.

        int y = stoi(args[0]);
        int x = stoi(args[1]);

        table[y][x].UnMerge();
    }
    break;

    case CommandType::PRINT:
    {
        int y = stoi(args[0]);
        int x = stoi(args[1]);

        answer.push_back(table[y][x].GetContent());
        // (args[0], args[1]) 위치의 셀을 출력한다.

    }
    break;

    default:
        break;
    }
}

vector<string> solution(vector<string> commands) {
    
    // table초기화.
    vector<vector<Cell>> table;
    table.reserve(ROWS);
    for (int i = 0; i < ROWS; i++)
    {
        vector<Cell> row;
        row.reserve(COLS);
        for (int j = 0; j < COLS; j++)
        {
            row.push_back(Cell(i, j));
        }

        table.push_back(move(row));
    }

    for (string& command : commands)
    {
        // 빈칸을 기준으로 commandDatas에 데이터 추가.
        istringstream input(command);
        string tempString;
        vector<string> commandDatas;
        while (input >> tempString)
        {
            commandDatas.push_back(tempString);
        }

        // 0번째는 커맨드 타입에 대한 데이터이므로, args에 +1부터 end까지 깊은 복사 수행.
        vector<string> argVec(commandDatas.begin() + 1, commandDatas.end());
        CommandType commandType = GetCommandType(commandDatas[0]);

        // 커맨드 실행.
        ExecuteCommand(commandType, argVec, table);
    }

    return answer;
}