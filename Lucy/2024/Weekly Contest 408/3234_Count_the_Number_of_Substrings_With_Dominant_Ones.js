/**
 * 3234. Count the Number of Substrings With Dominant Ones
 *
 * topic: String, Sliding Window, Enumeration
 * difficulty: Medium
 * date: 24.07.29(Mon)~
 */

/**
 * 두번째 풀이
 *
 * 중복 계산을 피하기 위해
 *  -> "누적합" 알고리즘을 사용하였습니다.
 *
 * 조건에 따른 최적화를 하기 위해
 *  -> 시작 인덱스를 고정한 후, 끝 인덱스를 늘려가면서 부분 문자열을 확인할 때,
 *  모든 끝 인덱스를 다 확인할 필요가 없습니다.특정 조건에서 더 이상 탐색을 진행할
 *  필요가 없으므로 건너뛸 수 있습니다.
 *
 * 건너뛰기 로직?
 *  첫 번째 조건: 만약 `0`의 개수의 제곱이 `1`의 개수보다 크다면?(zero ** 2 > one)?
 *      -> 현재 부분 문자열은 dominant가 아니며, 앞으로 나올 부분 문자열들도 dominant가
 *      될 가능성이 낮으므로 이 부분 문자열은 건너뜁니다
 * 두 번째 조건: zero ** 2 === one?
 *      -> 현재 부분 문자열만이 dominant하며, 이 경우에도 추가적인 계산을 줄이기 위해 건너뜁니다
 * 세 번째 조건: zero ** 2 < one?
 *      -> 현재 부분 문자열과 그 이후의 부분 문자열도 dominant일 가능성이 있으므로 이 경우는 계속 탐색!
 *
 * 참고 풀이
 * https://leetcode.com/problems/count-the-number-of-substrings-with-dominant-ones/discuss/5548547/Well-Explained-or-Very-Easy-or-Java
 */
var numberOfSubstrings = function (s) {
  const sLen = s.length;

  // 누적합 알고리즘을 사용하기 위해 문자열 길이만큼 배열 생성
  const prefix = new Array(sLen).fill(0);

  // s문자열의 0번째 인덱스에 위치한 문자가 "1"인 경우? 1을 아닌 경우 0 대입
  prefix[0] = s[0] === "1" ? 1 : 0;

  // prefix 배열 초기화
  for (let i = 1; i < sLen; i++) {
    prefix[i] = prefix[i - 1] + (s[i] === "1" ? 1 : 0);
  }

  // dominant 경우를 카운트하는 변수
  let res = 0;

  for (let i = 0; i < sLen; i++) {
    // "1"의 갯수
    let one = 0;
    // "0"의 갯수
    let zero = 0;

    for (let j = i; j < sLen; j++) {
      one = prefix[j] - (i === 0 ? 0 : prefix[i - 1]);
      zero = j - i + 1 - one;

      // `0`의 개수의 제곱이 `1`의 개수보다 큰 경우 -> dominant가 될 수 없음, 건너뜀
      if (zero ** 2 > one) {
        j += zero ** 2 - one - 1;
      }
      // `0`의 개수의 제곱이 `1`의 개수와 동일한 경우, dominant인 경우!
      else if (zero ** 2 == one) {
        res++;
      }
      // `0`의 개수의 제곱이 `1`의 개수보다 작은 경우, dominant인 경우!
      else if (zero ** 2 < one) {
        res++;

        // 현재 부분 문자열의 상태를 고려했을 때, 다음 탐색에서 건너뛸 수 있는 인덱스의 수 계산
        // 현재까지의 `1`의 개수를 제곱근으로 변환한 값 - 현재까지의 `0`의 개수
        let diff = Math.floor(Math.sqrt(one)) - zero;
        // 다음 j를 계산
        let nextJ = j + diff;

        if (nextJ >= sLen) res += sLen - j - 1;
        else res += diff;

        j = nextJ;
      }
    }
  }
  return res;
};

/**
 * 첫번째 풀이
 * Time Limit Exceeded
 * 870 / 881 test cases passed.
 *
 * 사실 Chat GPT 한테 물어봤다. 관련된 토픽으로 Sliding Window 라고 되어 있기에 해당 알고리즘이 뭔지 찾아보고
 * 처음 보는 알고리즘이어서 고민하다가 당당하게 물어봤다.
 *
 * 그래서 아래와 같은 풀이를 내게 답변해줬는데 2중 for문을 썼기에 흠... 이거 통과 못할 수도 있겠는데?라고 생각했는데
 * 역시나 통과를 못했다...
 *
 * Sliding Window Algorithm?
 *  고정된 크기 또는 가변 크기의 구간(윈도우)을 배열이나 문자열 위에서 이동시키면서 데이터를 효율적으로 처리하는 기법
 */
/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings1 = function (s) {
  const sLen = s.length;
  let cnt = 0;

  for (let i = 0; i < sLen; i++) {
    let ones = 0,
      zeros = 0;

    for (let j = i; j < sLen; j++) {
      if (s[j] === "1") {
        ones++;
      } else {
        zeros++;
      }

      if (ones >= zeros ** 2) {
        cnt++;
      }
    }
  }

  return cnt;
};

console.log(numberOfSubstrings("101101"));
