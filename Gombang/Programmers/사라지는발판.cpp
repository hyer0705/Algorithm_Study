#include <string>
#include <vector>

using namespace std;

// 좌표를 나타내는 구조체
struct Point {
    int x, y;
};
vector<vector<int>> map; // 맵 전역변수화
int n, m; // n : 세로, m : 가로

// 상하좌우
int dx[] = { -1,1,0,0 };
int dy[] = { 0,0,-1,1 };

// me : 현재 턴인 사람 // you : 상대방
int dfs(Point me, Point you) {
    int x = me.x;
    int y = me.y;
    if (map[x][y] == 0) return 0; // 발판이 사라졌다면 0 반환

    int result = 0; // 최종적인 턴 수
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i];
        int ny = y + dy[i];
        if (nx < 0 || ny < 0 || nx >= n || ny >= m || map[nx][ny] == 0) continue;

        map[x][y] = 0; // 전에 서있던 곳을 이동 불가능하게 만듦

        // 여기서 상대방 턴이기 때문에 매개변수로 dfs(you,me) 순서로 들어간다.
        int val = dfs(you, { nx,ny }) + 1; // 턴 수 + 1
        map[x][y] = 1; // 사용한것을 원상 복구

        // 지금까지 모두 진 경우고, 이번에 이겼을 때
        if (val % 2 == 1 && result % 2 == 0) result = val; // 바로 이긴걸로 바꿔줌

        // 지금까지도 졌고, 이 경우도 진 경우 -> 최대한 많이 움직인다.
        else if (val % 2 == 0 && result % 2 == 0) result = max(result, val);

        // 지금까지도 이겼고, 이 경우도 이긴 경우 -> 최대한 적게 움직인다.
        else if (val % 2 == 1 && result % 2 == 1) result = min(result, val);
    }

    return result;
}
int solution(vector<vector<int>> board, vector<int> aloc, vector<int> bloc) {
    int answer = -1;

    map = board;
    n = board.size();
    m = board[0].size();

    Point a = { aloc[0],aloc[1] };
    Point b = { bloc[0],bloc[1] };

    answer = dfs(a, b);
    return answer;
}