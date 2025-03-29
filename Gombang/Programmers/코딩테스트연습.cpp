#include <string>
#include <vector>
#include <climits>

using namespace std;

int solution(int alp, int cop, vector<vector<int>> problems) {

    // d[i][j] : 알고력 i, 코딩력 j를 달성하는데 필요한 최소 시간.
    int d[152][152];
    int maxAlp = 0;
    int maxCop = 0;
    for (vector<int>& problem : problems)
    {
        maxAlp = max(maxAlp, problem[0]);
        maxCop = max(maxCop, problem[1]);
    }

    // 초기의 알고력과 코딩력에 대해서 정리.
    alp = min(alp, maxAlp);
    cop = min(cop, maxCop);
    for (int i = 0; i <= maxAlp; i++)
    {
        for (int j = 0; j <= maxCop; j++)
        {
            d[i][j] = INT_MAX;
        }
    }

    d[alp][cop] = 0;
    for (int i = alp; i <= maxAlp; i++)
    {
        for (int j = cop; j <= maxCop; j++)
        {
            d[i + 1][j] = min(d[i + 1][j], d[i][j] + 1);
            d[i][j + 1] = min(d[i][j + 1], d[i][j] + 1);

            for (vector<int>& problem : problems)
            {
                int alp_req, cop_req, alp_rwd, cop_rwd, cost;
                alp_req = problem[0];
                cop_req = problem[1];
                alp_rwd = problem[2];
                cop_rwd = problem[3];
                cost = problem[4];

                if (i < alp_req || j < cop_req)
                    continue;

                int nextAlp = min(maxAlp, i + alp_rwd);
                int nextCop = min(maxCop, j + cop_rwd);
                d[nextAlp][nextCop] = min(d[nextAlp][nextCop], d[i][j] + cost);
            }
        }
    }

    return d[maxAlp][maxCop];
}