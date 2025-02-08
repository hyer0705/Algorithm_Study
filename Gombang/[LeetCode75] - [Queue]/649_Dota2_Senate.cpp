class Solution {
public:
    string predictPartyVictory(string senate) {
        queue<int> radiant_queue, dire_queue;
        int n = senate.size();

        for (int i = 0; i < n; i++) {
            if (senate[i] == 'R')
                radiant_queue.push(i);
            else
                dire_queue.push(i);
        }

        while (!radiant_queue.empty() && !dire_queue.empty()) {
            int radiantIndex = radiant_queue.front();
            radiant_queue.pop();

            int direIndex = dire_queue.front();
            dire_queue.pop();

            if (radiantIndex < direIndex)
                radiant_queue.push(radiantIndex + n);
            else
                dire_queue.push(direIndex + n);
        }

        return radiant_queue.empty() ? "Dire" : "Radiant";
    }
};