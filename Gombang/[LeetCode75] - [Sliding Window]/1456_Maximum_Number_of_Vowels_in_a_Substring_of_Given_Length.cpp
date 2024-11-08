// 두 번째 풀이법.
// 카운팅만 하는 방법.
class Solution {
public:
    int maxVowels(string s, int k) {
        const unordered_set<char> vowels = { 'a', 'e', 'i', 'o', 'u' };

        int maxVowelCount = 0;
        for (int i = 0; i < k; i++)
        {
            if (vowels.find(s[i]) != vowels.end())
                maxVowelCount++;
        }

        int count = maxVowelCount;
        for (int i = k; i < s.size(); i++)
        {
            if (vowels.find(s[i - k]) != vowels.end())
                count--;

            if (vowels.find(s[i]) != vowels.end())
                count++;

            maxVowelCount = max(maxVowelCount, count);
        }

        return maxVowelCount;
    }
};

// 첫 번째 출이법. 
// 직접 문자열을 만들어서 제거 및 추가를 하면서 카운팅 하는 방법. 
// 실행시간이 길다...
class Solution {
public:
    int maxVowels(string s, int k) {
        const unordered_set<char> vowels = { 'a', 'e', 'i', 'o', 'u' };

        // 0부터 k-1까지 문자열 생성.
        string windowStr = "";
        for (int i = 0; i < k; i++)
        {
            windowStr.push_back(s[i]);
        }

        // 현재 문자열에 대해서 모음이 최대 몇 개인지 카운팅.
        int maxVowelCount = 0;
        for (int i = 0; i < windowStr.size(); i++)
        {
            if (vowels.find(windowStr[i]) != vowels.end())
                maxVowelCount++;
        }

        int vowelCount = maxVowelCount;
        for (int i = k; i < s.size(); i++)
        {
            // 지우려고 하는 데이터가 모음이라면 vowelCount감소
            if (vowels.find(windowStr[0]) != vowels.end())
                vowelCount--;

            // 맨 앞에 요소 제거.
            windowStr.erase(windowStr.begin());

            // 추가하려는 데이터가 모음이라면 vowelCount증가
            if (vowels.find(s[i]) != vowels.end())
                vowelCount++;

            // 맨 뒤에 데이터 추가.
            windowStr.push_back(s[i]);

            maxVowelCount = max(maxVowelCount, vowelCount);

            // 최대로 가능한 값이 k이므로, maxVowelcount가 k라면 바로 return;
            if (maxVowelCount == k)
                return maxVowelCount;
        }

        return maxVowelCount;
    }
};

