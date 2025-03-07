#include <string>
#include <vector>

using namespace std;

// 현재 위치에서 이용 가능한 다음 문자를 구하는 함수.
char getAvailableNextChar(int n, int m, int& currX, int& currY)
{
    // 현재 x좌표가 마지막 좌표가 아니라면
    if (currX < n)
    {
        currX++;
        return 'd';
    }
    else if (currY > 1)
    {
        currY--;
        return 'l';
    }
    else if (currY < m)
    {
        currY++;
        return 'r';
    }

    currX--;
    return 'u';
}

string solution(int n, int m, int x, int y, int r, int c, int k) {
    string answer = "";

    // 최소 이동 거리보다 k값이 작으면 impossible.
    int minDistance = abs(r - x) + abs(c - y);
    if (minDistance > k)
        return "impossible";

    // 이동해야 할 x성분과 y성분의 합이 홀수일 때는 k도 홀수여야 하고,
    // 이동해야 할 x성분과 y성분의 합이 짝수일 때는 k도 짝수여야 한다.
    if ((minDistance + k) % 2 != 0)
        return "impossible";

    int currX = x;
    int currY = y;
    int endX = r;
    int endY = c;

    // d → l → r → u
    while (true)
    {
        // 현재 위치에서 목표 위치까지의 거리를 구했을 때 충분히 움직일 수 있는 위치라면
        if (minDistance != k)
        {
            answer += getAvailableNextChar(n, m, currX, currY);
            k--;
        }
        else // 현재 위치에서 목표 위치까지 딱 맞아 떨어지게 움직일 수 있다면 문자열 마무리 정리.
        {
            for (int i = 0; i < endX - currX; i++)
            {
                answer += "d";
            }

            for (int i = 0; i < currY - endY; i++)
            {
                answer += 'l';
            }

            for (int i = 0; i < endY - currY; i++)
            {
                answer += "r";
            }

            for (int i = 0; i < currX - endX; i++)
            {
                answer += "u";
            }

            break;
        }

        minDistance = abs(r - currX) + abs(c - currY);
    }

    return answer;
}