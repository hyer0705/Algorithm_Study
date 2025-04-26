// 최소힙을 이용한 풀이.
class Solution {
public:

    int findKthLargest(vector<int>& nums, int k) {

        // k개의 개수만 유지하는 최소힙.
        priority_queue<int, vector<int>, greater<int>> minHeap(nums.begin(), nums.begin() + k);

        for (int i = k; i < nums.size(); i++)
        {
            if (nums[i] > minHeap.top())
            {
                minHeap.pop();
                minHeap.push(nums[i]);
            }
        }

        return minHeap.top();
    }
};

// 최대힙을 이용한 풀이
class Solution {
public:

    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>> pq;

        for (int num : nums)
            pq.push(num);

        for (int i = 0; i < k - 1; i++)
            pq.pop();

        return pq.top();
    }
};