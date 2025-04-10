class Solution {
public:
    bool canVisitAllRooms(vector<vector<int>>& rooms) {

        vector<bool> visited(rooms.size(), false);
        queue<int> queue;

        // 큐 초기화
        const int FIRST_ROOM = 0;
        visited[FIRST_ROOM] = true;
        for (auto& keyNumber : rooms[FIRST_ROOM])
        {
            queue.push(keyNumber);
        }

        while (queue.size() > 0)
        {
            int key = queue.front();
            queue.pop();

            if (visited[key])
                continue;

            visited[key] = true;

            for (auto& keyNumber : rooms[key])
            {
                queue.push(keyNumber);
            }
        }

        for (int i = 0; i < visited.size(); i++)
        {
            if (visited[i] == false)
                return false;
        }

        return true;
    }
};