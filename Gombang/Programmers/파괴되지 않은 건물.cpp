#include <string>
#include <vector>

using namespace std;

int sumArray[1010][1010];
int N, M;

int solution(vector<vector<int>> board, vector<vector<int>> skill) {
    N = board.size(), M = board[0].size();

    for (auto sk : skill) {
        int degree = sk[5];
        if (sk[0] == 1) degree = -degree;

        sumArray[sk[1]][sk[2]] += degree;
        sumArray[sk[3] + 1][sk[4] + 1] += degree;
        sumArray[sk[1]][sk[4] + 1] -= degree;
        sumArray[sk[3] + 1][sk[2]] -= degree;
    }

    // 왼쪽에서 오른쪽으로 누적합을 구하는 과정.
    for (int i = 0; i < N + 1; ++i) {
        for (int j = 0; j < M; ++j) {
            sumArray[i][j + 1] += sumArray[i][j];
        }
    }

    // 위에서 아래로 누적합을 구하는 과정.
    for (int j = 0; j < M + 1; ++j) { 
        for (int i = 0; i < N; ++i) {
            sumArray[i + 1][j] += sumArray[i][j];
        }
    }

    // 최종적으로 보드에 대해 sumArray적용.
    int answer = 0;
    for (int i = 0; i < N; ++i) { 
        for (int j = 0; j < M; ++j) {
            if (board[i][j] + sumArray[i][j] > 0) answer++;
        }
    }

    return answer;
}