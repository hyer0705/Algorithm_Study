// 모범 풀이법.
// currNum이라는 값을 통해 양의 정수를 직접 표현.
// 중간중간에 currNum보다 작은 값이 들어오면 set에 데이터 저장.
class SmallestInfiniteSet {
public:

    SmallestInfiniteSet() {
        currNum = 1;
    }

    int popSmallest() {

        if (infiniteSet.size() > 0)
        {
            int smallestNumber = *infiniteSet.begin();
            infiniteSet.erase(infiniteSet.begin());
            return smallestNumber;
        }
        else
        {
            return currNum++;
        }
    }

    void addBack(int num) {

        if (num >= currNum)
            return;

        infiniteSet.insert(num);

    }

private:
    // 오름차순 정렬을 자동으로 지원해주기 때문에, 가장 앞에 있는 값이 최소값을 보장.
    set<int> infiniteSet;

    // 양의 정수를 담당하는 변수.
    int currNum;
};

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * SmallestInfiniteSet* obj = new SmallestInfiniteSet();
 * int param_1 = obj->popSmallest();
 * obj->addBack(num);
 */

// 첫 번째 풀이.
// 1부터 1000이라는 값을 그대로 넣어줘서 진행.
// 불필요한 코드들이 많았음.
class SmallestInfiniteSet {
public:
    SmallestInfiniteSet() {
        // At most 1000 calls 라는 것이 있어서 1000개의 데이터를 넣어줌.
        for (int i = 1; i <= 1000; i++)
        {
            infiniteSet.insert(i);
            minHeap.push(i);
        }
    }

    int popSmallest() {
        int minValue = minHeap.top();
        minHeap.pop();

        infiniteSet.erase(minValue);
        return minValue;
    }

    void addBack(int num) {
        if (infiniteSet.find(num) != infiniteSet.end())
            return;

        infiniteSet.insert(num);
        minHeap.push(num);
    }

private:
    priority_queue<int, vector<int>, greater<int>> minHeap;
    unordered_set<int> infiniteSet;
};