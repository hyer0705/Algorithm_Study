// 체스판의 문자는 아스키코드 값으로 표현될 수 있기에, '아스키코드 값'과 '숫자'의 합을 통해서
// 두 수의 합이 짝수면 검은색 발판이고, 홀수면 하얀색 발판이라는 개념을 적용하여 문제를 풀이하였습니다.
public class Solution
{
	public bool CheckTwoChessboards(string coordinate1, string coordinate2)
	{
		bool firstIsBlack = (coordinate1[0] + coordinate1[1]) % 2 == 0;
		bool secondIsBlack = (coordinate2[0] + coordinate2[1]) % 2 == 0;

		return firstIsBlack == secondIsBlack;
	}
}