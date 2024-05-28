// ---------------------
//  세 번째 풀이. 통과
// ---------------------
//
// 해설 : nums를 순회하며 특별한 인덱스인 경우에는 int값을 그대로 넣어주고,
//       특별하지 않은 인덱스일 때에는 int++ 값을 compareArray라는 배열 변수에 넣어준다.
//       최종적으로는 compareArray의 배열을 from, to를 통해 값을 비교해준다.

//       만약, from인덱스에 해당하는 값과 to인덱스에 해당하는 값이 동일한 값이라면,
//             from에서 to까지는 int값의 변화가 없었다는 뜻이므로 이는 특별한 인덱스라는 뜻이므로 true.

//             from인덱스에 해당하는 값과 to인덱스에 해당하는 값이 동일하지 않은 값이라면,
//             from에서 to까지 int값의 변화가 있었다는 뜻이므로 특별하지 않은 인덱스라는 뜻이어서 false.
//       
// 
public class Solution
{
    public bool[] IsArraySpecial(int[] nums, int[][] queries)
    {
        // [1] 변수 설정.
         bool[] answer = new bool[queries.Length];
        int[] compareArray = new int[nums.Length];

        int value = 0;
        compareArray[0] = value;

        // [2]인접한 요소를 비교해가면서 스페셜하지 않은 인덱스의 경우,
        //    value의 값을 하나 증가시켜서 complareArray에 넣어준다.
        for (int i = 1; i < nums.Length; i++)
        {
            bool notSpecial = (nums[i - 1] + nums[i]) % 2 == 0;
            if (notSpecial)
            {
                value++;
            }

            compareArray[i] = value;
        }

        // [3]compareArray의 from인덱스에 해당하는 값과 to인덱스에 해당하는 값이 같으면,
        //    위 로직에서 value값이 하나도 증가되지 않은 것이므로 특별한 배열이기에, true를 정답에 넣어준다.
        for (int i = 0; i < queries.Length; i++)
        {
            int from = queries[i][0];
            int to = queries[i][1];

            answer[i] = (compareArray[from] == compareArray[to]);
        }

        return answer;
    }
}

// -------------------------------------------
//   두 번째 풀이. Time Limit Excceeded[523]
// -------------------------------------------
//
// 해설 : nums배열의 길이만큼을 순회하면서 특별하지 않은 인덱스들에 대해서 from, to를 미리 얻어내는 방법을 시도.
//        이 방법 역시 Time Limit Excceeded에러 발생. 아래의 [4]에 해당하는 부분때문에 발생한 것으로 추정.

// public class Solution
// {
//     class AdjacentIndex
//     {
//         public int from;
//         public int to;

//         public AdjacentIndex(int from, int to)
//         {
//             this.from = from;
//             this.to = to;
//         }
//     }

//     public bool[] IsArraySpecial(int[] nums, int[][] queries)
//     {
//         // [1] 결과 배열 할당.
//         //     기본적으로는 true를 넣은 상태로 시작.
//         bool[] results = new bool[queries.Length];
//         for (int i = 0; i < results.Length; i++)
//         {
//             results[i] = true;
//         }

//         // [2] 인접한 두 인덱스가 특별하지 않은 인덱스들을 nums를 돌리면서 먼저 구한다.
//         List<AdjacentIndex> notSepcialIndexList = new List<AdjacentIndex>();
//         for (int i = 0; i < nums.Length - 1; i++)
//         {
//             // 인접한 요소 두 개를 더했을 때 짝수가 나왔다면 특별한 배열이 아니다.
//             if ((nums[i] + nums[i + 1]) % 2 == 0)
//             {
//                 notSepcialIndexList.Add(new AdjacentIndex(i, i + 1));
//             }
//         }

//         // [3] 첫 번째 풀이에서 타임 에러가 났던 부분은 이 예외처리를 통해 통과가 됨.
//         //     이 예외처리는 nums배열이 모두 특별했을 경우, 바로 결과를 return 할 수 있었다.
//         if (notSepcialIndexList.Count == 0)
//             return results;

//         // [4] 이 부분에서 타임 에러가 난 것으로 추정.
//         //     굉장히 큰 queries인 경우, 아래의 'Exists'를 호출하는 방식은
//         //     각 쿼리마다 리스트를 전부 순회해야 하기 때문에 쿼리가 많을 경우 시간 복잡도가 급격히 증가하게 된다.
//         for (int i = 0; i < queries.Length; i++)
//         {
//             int from = queries[i][0];
//             int to = queries[i][1];

//             if (notSepcialIndexList.Exists(k => from <= k.from && to >= k.to))
//             {
//                 results[i] = false;
//             }
//         }

//         return results;
//     }
// }


// ---------------------------------------
//    첫 풀이. Time Limit Excceeded [535]
// ---------------------------------------
//
// 해설 : 3151_Special_Array_I 번 문제와 비슷한 문제이기에 해당 방식으로 풀이 진행.
//        Time Limit Excceeded 발생.
//

// public class Solution
// {
//     public bool[] IsArraySpecial(int[] nums, int[][] queries)
//     {
//         bool[] results = new bool[queries.Length];
//         for (int i = 0; i < results.Length; i++)
//         { 
//             results[i] = true;
//         }

//         for (int i = 0; i < queries.Length; i++)
//         {

//             int from = queries[i][0];
//             int to = queries[i][1];

//             for (int j = from; j < to; j++)
//             {
//                 // 인접한 요소 두 개를 더했을 때 짝수가 나왔다면 특별한 배열이 아니다.
//                 if ((nums[j] + nums[j + 1]) % 2 == 0)
//                 {
//                     results[i] = true;
//                     break;
//                 }
//             }
//         }

//         return results;
//     }
// }