// 두 번째 풀이
class RecentCounter {
public:

    RecentCounter() {

    }

    int ping(int t) {
        queue.push(t);

        while (queue.size() > 0 && queue.front() < t - 3000)
        {
            queue.pop();
        }

        return queue.size();
    }

private:

    queue<int> queue;
};


// 첫 번째 풀이
// 582 ms
class RecentCounter {
public:

    RecentCounter() {

    }

    int ping(int t) {
        requests.push_back(t);

        int min = t - 3000;
        int max = t;
        int count = 0;

        for (int i = 0; i < requests.size(); i++)
        {
            if (requests[i] >= min && requests[i] <= max)
                count++;
        }

        return count;
    }

private:

    vector<int> requests;
};