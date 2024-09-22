// C# 에서 제공하는 Convert.ToString 메소드를 사용하여 2진수 표현을 진행하였다.
// Convert.ToString 메소드의 첫 번째 인자는 대상이 되는 값이며, 두 번째 인자는 '진수'에 대한 값이다.

public class Solution
{
	public string ConvertDateToBinary(string date)
	{
		string[] splitedDateArray = date.Split('-');

		for (int i = 0; i < splitedDateArray.Length; i++)
		{
			int number = int.Parse(splitedDateArray[i]);
			splitedDateArray[i] = Convert.ToString(number, 2);
		}

		return string.Join("-", splitedDateArray); ;
	}
}