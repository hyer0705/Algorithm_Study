/**
 * 3163. String Compression 3
 * URL: https://leetcode.com/problems/string-compression-iii/description/
 * DIFFICULTY: MEDIUM
 * TOPIC: String
 * DATE: 2024.05.31(FRI)
 */

/**
 * @param {string} word
 * @return {string}
 */
// Discuss Tab에서 다른 사람들의 풀이법을 보고 풀이!
var compressedString = function (word) {
  // 연산 결과를 담을 변수 comp 선언 및 초기화
  let comp = "";

  // word 변수의 길이를 저장하는 wordLen 변수 선언 및 초기화
  const wordLen = word.length;

  // wordLen 만큼 반복
  for (let i = 0; i < wordLen; ) {
    // word의 i 번째 문자를 c 변수에 저장
    const c = word[i];
    // c의 반복 횟수를 저장하기 위한 변수 cnt 선언 및 초기화
    let cnt = 0;

    // i가 wordLen 보다 작고 word[i]의 값과 c의 값이 동일하고 cnt가 9보다 작을 때까지 반복
    while (i < wordLen && word[i] === c && cnt < 9) {
      // c 반복횟수 증가
      cnt++;
      // i 증가(word의 인덱스)
      i++;
    }

    // comp 변수에 연산 결과(c 반복 횟수 + c) 추가
    comp += cnt + c;
  }

  // 연산 결과를 담은 변수 comp 반환
  return comp;
};

// Time Limit Exceeded... 723 / 744 test cases passed.
var compressedString = function (word) {
  // 연산 결과를 담을 변수 comp 선언 및 초기화
  let comp = "";

  // word 변수가 빈 문자열이 아닌 경우 계속 반복
  while (word !== "") {
    // word의 첫 번째 문자를 c 변수에 저장
    const c = word[0];
    // RegExp 생성자 함수를 이용하여 c변수를 사용한 regexp 객체 생성
    // RegExp에서 `{1,9}` 는 최소 1개, 최대 9개 라는 뜻!
    const regex = new RegExp(`${c}{1,9}`, "g");

    // String.prototype.match() 메서들르 사용하여 regex와 일치하는 문자열을 찾음
    const matchRes = word.match(regex);

    // String.prototype.match()의 결과가 null이 아닌 경우
    if (matchRes !== null) {
      // String.prototype.match() 결과는 배열이기 때문에 첫 번째 요소를 matchStr 변수에 저장
      const matchStr = matchRes[0];
      // matchStr 변수의 길이 저장
      const matchStrLen = matchStr.length;
      // comp에 연산 결과 저장
      comp += matchStrLen + matchStr[0];

      // word에서 연산에 사용된 문자들 지우기
      word = word.slice(matchStrLen);
    }
  }

  // 연산 결과를 저장한 comp 변수 반환
  return comp;
};
