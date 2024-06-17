public class Solution
{
    public int NumberOfChild(int n, int k)
    {
        const int RIGHT = 1;
        const int LEFT = -1;

        int current = 0;
        int direction = RIGHT;

        for (int i = 0; i < k; i++)
        {
            current += direction;

            if (current == n - 1)
                direction = LEFT;
            else if (current == 0)
                direction = RIGHT;
        }

        return current;
    }
}