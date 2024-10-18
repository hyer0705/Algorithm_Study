class Solution {
public:
	bool canPlaceFlowers(vector<int>& flowerbed, int n) {

		const int EMPTY = 0;
		const int NOT_EMPTY = 1;
		const int JUMP_INDEX = 2; // 현재 위치에 놓게 되면 인접한 곳에 놓을 수 없으므로, 2만큼 점프.

		int currIndex = 0;

		// i인덱스가 요소 끝까지 순회하지 않았고, n의 값이 아직 남아있다면 계속 루프를 돌린다.
		while (currIndex < flowerbed.size() && n > 0)
		{
			// currIndex에 꽃이 놓여져 있다면 continue;
			if (flowerbed[currIndex] == NOT_EMPTY)
			{
				currIndex++;
				continue;
			}

			int prevIndex = currIndex - 1;
			int nextIndex = currIndex + 1;

			// prevIndex와 nextIndex가 배열 범위를 벗어났다면 currIndex에 꽃을 놓는 것에는 영향을 미치지 않으므로,
			// 놓을 수 있다는 처리를 위해 임의로 currIndex값을 넣어준다.
			if (prevIndex < 0) prevIndex = currIndex;
			if (nextIndex >= flowerbed.size()) nextIndex = currIndex;

			// 놓을 수 있다.
			if (flowerbed[prevIndex] == EMPTY &&
				flowerbed[nextIndex] == EMPTY)
			{
				flowerbed[currIndex] = NOT_EMPTY;
				n--;
				currIndex += JUMP_INDEX;
			}
			else //놓을 수 없으면 다음 인덱스 체크.
			{
				currIndex++;
			}
		}

		return n == 0;
	}
};