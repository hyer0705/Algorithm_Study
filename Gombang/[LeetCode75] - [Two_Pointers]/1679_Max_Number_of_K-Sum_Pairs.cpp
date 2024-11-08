
// 두 번째 풀이. two pointer풀이.
class Solution {
public:
    int maxOperations(vector<int>& nums, int k) {

        sort(nums.begin(), nums.end());

        int result = 0;
        int left = 0, right = nums.size() - 1;

        while (left < right)
        {
            if (nums[left] + nums[right] == k)
            {
                left++;
                right--;
                result++;
            }
            else if (nums[left] + nums[right] < k)
            {
                left++;
            }
            else
            {
                right--;
            }
        }

        return result;
    }
};


// 첫 번째 풀이. map을 이용하여 빈도수로 푼 방법.
class Solution {
public:
    int maxOperations(vector<int>& nums, int k) {

        unordered_map<int, int> freqNums;
        for (int num : nums)
        {
            freqNums[num]++;
        }

        int result = 0;
        for (auto it = freqNums.begin(); it != freqNums.end(); ++it)
        {
            if (it->second == 0)
                continue;

            int num = it->first;
            int targetNum = k - num;

            // 같은 숫자로 페어를 만드는 경우.
            if (num == targetNum)
            {
                int sameNumberPairCount = freqNums[num] / 2;
                result += sameNumberPairCount;
                freqNums[num] = 0;
                continue;
            }

            // targetNum이 존재하지 않거나, targetNum에 대한 빈도수가 없는 경우에는 continue.
            if (freqNums.find(targetNum) == freqNums.end() || freqNums[targetNum] == 0)
                continue;

            int diffNumberPairCount = min(freqNums[num], freqNums[targetNum]);
            result += diffNumberPairCount;
            freqNums[num] -= diffNumberPairCount;
            freqNums[targetNum] -= diffNumberPairCount;
        }

        return result;
    }
};