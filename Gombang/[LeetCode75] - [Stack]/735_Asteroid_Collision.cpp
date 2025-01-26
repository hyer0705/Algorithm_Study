class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        stack<int> asteroidStack;
        for (int newAsteroid : asteroids)
        {
            while (true)
            {
                if (asteroidStack.empty())
                {
                    asteroidStack.push(newAsteroid);
                    break;
                }

                int topAsteroid = asteroidStack.top();

                // 서로 같은 방향 또는 충돌이 일어나지 않는 방향이면 충돌하지 않는다.
                if ((topAsteroid > 0 && newAsteroid > 0) ||
                    (topAsteroid < 0 && newAsteroid < 0) ||
                    (topAsteroid < 0 && newAsteroid > 0))
                {
                    asteroidStack.push(newAsteroid);
                    break;
                }

                // 충돌
                int newAsteroidSize = abs(newAsteroid);
                int topAsteroidSize = abs(topAsteroid);
                if (newAsteroidSize < topAsteroidSize)
                    break;

                asteroidStack.pop();
                if (newAsteroidSize == topAsteroidSize)
                    break;
            }
        }

        vector<int> result;
        while (asteroidStack.empty() == false)
        {
            result.push_back(asteroidStack.top());
            asteroidStack.pop();
        }

        // swap
        for (int i = 0; i < result.size() / 2; i++)
        {
            result[i] = result[i] + result[result.size() - i - 1];
            result[result.size() - i - 1] = result[i] - result[result.size() - i - 1];
            result[i] = result[i] - result[result.size() - i - 1];
        }

        //reverse(result.begin(), result.end());
        return result;
    }
};