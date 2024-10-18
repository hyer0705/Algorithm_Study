class Solution {
public:
    string reverseVowels(string s) {

        // unordered_set은 해시 테이블을 기반으로 동작하는 자료구조.
        unordered_set<char> vowels = { 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U' };

        int left = 0;
        int right = s.size() - 1;

        // left와 right의 두 인덱스를 통해 서로 모음을 찾았을 경우 스왑.
        while (left < right)
        {
            // vowels.end()는 마지막 요소의 다음을 가리키는 반복자.
            while (left < right && vowels.find(s[left]) == vowels.end())
                left++;

            while (left < right && vowels.find(s[right]) == vowels.end())
                right--;

            if (left < right)
            {
                swap(s[left], s[right]);
                left++;
                right--;
            }
        }

        return s;
    }
};