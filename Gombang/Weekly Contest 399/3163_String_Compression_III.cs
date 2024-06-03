
// 기존에 string을 사용해서 '+=' 연산으로 진행하였었는데, 이때에는 Time Limit Exceeded 에러가 나왔었다.
// string의 '+=' 연산에 대해서 알아본 결과 문자열을 결합할 때마다 *새로운 string 객체*를 생성하고 기존 문자열의 내용을 복사하는데,
// 문자열의 길이가 길어질수록 메모리 할당과 복사 작업이 많아져 성능 저하가 발생하게 된다는 내용을 알게 되었다.

// 다른 방식을 알아보니, C#에서는 StringBuilder라는 것을 이용하면 많은 양의 문자열을 조작해야 할 때 성능적으로 큰 이점이 많다고 하여 사용해보니 해결되었다.
// StringBuilder방식은 내부적으로 배열을 사용하여 문자열을 저장하는 방식인데, 배열이 가득차게 되면 배열 크기를 두 배로 늘리면서 새로운 배열을 할당하고 복사하는 방식이다.
// 배열 크기를 두 배로 늘리는 방식 덕분에 배열 확장은 로그 시간 복잡도를 가지게 되어, 새로운 공간 할당에 대해서 좋은 성능을 갖게 된다.

// 하나 재미있었던 점은, Solution에서 C++의 풀이 방법을 확인해보니 알고리즘은 거의 유사하였지만 string의 '+=' 연산으로도 통과가 되는 것을 확인하였다.
// 그래서 C++의 string에 대해서 확인해본 결과, C#의 StringBuilder와 비슷한 방식으로 동작한다는 것을 알게 되었다(내부적으로 동적 배열을 사용하며, 필요에 따라 배열의 크기를 두 배로 증가시킨다).
// 동일한 자료형이더라도 각 언어마다의 차이가 있는 경우도 있으니, 내부적으로 어떻게 동작하는지에 대해서 알아보는 시간을 가져보는 것도
// 해당 언어에 대해서 더 깊은 이해를 할 수 있는 과정이 되지 않을까하는 생각을 하게 되었다.

public class Solution
{
    public string CompressedString(string word)
    {
        const int DEFAULT_COUNT = 1;
        const int MAX_REPEAT = 9;
        StringBuilder comp = new StringBuilder();

        char currChar = word[0];
        int repeatCharCount = DEFAULT_COUNT;
        for (int i = 1; i < word.Length; i++)
        {
            if (word[i] == currChar)
            {
                repeatCharCount++;

                if (repeatCharCount > MAX_REPEAT)
                {
                    comp.Append($"{MAX_REPEAT}{currChar}");
                    repeatCharCount = DEFAULT_COUNT;
                }
            }
            else
            {
                comp.Append($"{repeatCharCount}{currChar}");
                repeatCharCount = DEFAULT_COUNT;
                currChar = word[i];
            }
        }

        comp.Append($"{repeatCharCount}{currChar}");

        return comp.ToString();
    }
}