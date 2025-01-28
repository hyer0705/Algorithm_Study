#include <string>
#include <vector>

using namespace std;

// a[i] : i번째에 해당하는 사다리꼴 타일을 \ 모양의 마름모로 채우는 경우의 수.
// 
// ex) a[0] : 1가지의 경우가 나온다.
// 
// b[i] : i번째에 해당하는 사다리꼴 타일을 \ 모양의 마름모로 채우는 경우를 제외한 경우의 수.
//
// ex) b[0] : top이 있으면 총 3가지의 경우가 나오고, top이 없으면 2가지의 경우가 나온다.

int solution(int n, vector<int> tops) {
    const int MOD = 10007;
    vector<int> a(n, 0), b(n, 0);

    a[0] = 1;
    b[0] = tops[0] == 1 ? 3 : 2;

    for (int i = 1; i < n; i++)
    {
        if (tops[i] == 1)
        {
            a[i] = (a[i - 1] + b[i - 1]) % MOD;
            b[i] = (a[i - 1] * 2 + b[i - 1] * 3) % MOD;
        }
        else
        {
            a[i] = (a[i - 1] + b[i - 1]) % MOD;
            b[i] = (a[i - 1] + b[i - 1] * 2) % MOD;
        }
    }

    return (a[n - 1] + b[n - 1]) % MOD;
}