/**
 * 3227. Vowels Game in a String
 * url: https://leetcode.com/problems/vowels-game-in-a-string/
 * date: 2024.07.21(SUN)~
 * topic: Math, String, Braineteaser, Game Theory
 * difficulty: Medium
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var doesAliceWin = function (s) {
  const GAME_RES = Object.freeze({
    WINNER_ALICE: true,
    WINNER_BOB: false,
  });

  // 파라미터 s 복사
  let copiedStr = s.slice();
  // 문자열 s에서 모음의 위치(index) 값들을 저장한 배열을 indexesOfVowel에 저장
  let indexesOfVowel = findIndexOfVowel(s);

  // s 문자열에서 모음의 갯수가 0개인 경우 BOB의 승리 반환!
  //  why? Alice는 빈 문자열이 아니고, 모음의 갯수가 홀수개인 문자열을 제거해야하기 때문에! 이 경우 Alice는 문자열을 잘라낼 수 없어 BOB의 승리가 된다
  if (indexesOfVowel.length === 0) return GAME_RES.WINNER_BOB;

  // s 문자열에서 모음의 갯수가 홀수개인 경우, Alice의 승리 반환!
  //  why? Alice가 모든 문자열을 제거해버리면 Bob은 제거할 문자열이 없어지기 때문에 Alice의 승리가 된다
  if (indexesOfVowel.length % 2 === 1) return GAME_RES.WINNER_ALICE;

  // s 문자열에서 모음의 갯수가 짝수개인 경우, Alice가 게임에서 이길 수 있도록 문자열을 잘라낼 것이다.
  // s 문자열을 복사한 변수 copiedStr을 for문으로 순회하면서 게임을 실제 하는 것처럼 코드로 구현하여 문제를 풀이
  let res = GAME_RES.WINNER_ALICE;

  for (let i = 0; copiedStr.length > 0 || indexesOfVowel.length > 0; i++) {
    // Alice 차례인 경우
    if (isAliceTurn(i)) {
      // 문자열을 잘라낼 인덱스 값 계산
      const sliceIdx = indexesOfVowel.length - 2;

      // indexesOfVowel의 길이가 비어있는 경우, 더 이상 잘라낼 문자열이 없으므로 현재 turn을 진행하고 있는 자가 Winner!
      if (isEmpty(indexesOfVowel)) return GAME_RES.WINNER_ALICE;

      // 계산된 sliceIdx를 기준으로 copiedStr 문자열 잘라내기, 게임 결과를 저장하는 res 변수 수정, indexesOfVowel에 저장된 idx 제거
      copiedStr = s.slice(indexesOfVowel[sliceIdx] + 1);
      res = GAME_RES.WINNER_ALICE;
      indexesOfVowel = indexesOfVowel.slice(sliceIdx + 1);
    }
    // Bob의 차례인 경우
    else if (isBobTurn(i)) {
      // 문자열을 잘라낼 인덱스 값 계산
      const sliceIdx = indexesOfVowel.length - 1;

      // indexesOfVowel의 길이가 비어있는 경우, 더 이상 잘라낼 문자열이 없으므로 현재 turn을 진행하고 있는 자가 Winner!
      if (isEmpty(indexesOfVowel)) return GAME_RES.WINNER_BOB;

      // 계산된 sliceIdx를 기준으로 copiedStr 문자열 잘라내기, 게임 결과를 저장하는 res 변수 수정, indexesOfVowel에 저장된 idx 제거
      copiedStr = s.slice(indexesOfVowel[sliceIdx]);
      res = GAME_RES.WINNER_BOB;
      indexesOfVowel = indexesOfVowel.slice(sliceIdx + 1);
    }
  }

  return res;
};

const findIndexOfVowel = (s) => {
  const findIndexes = new Array();

  for (let i = 0; i < s.length; i++) {
    const currCh = s[i];
    if (isVowel(currCh)) {
      findIndexes.push(i);
    }
  }

  return findIndexes;
};

const isVowel = (ch) => {
  const vowels = ["a", "e", "i", "o", "u"];

  return vowels.includes(ch);
};

const isAliceTurn = (idx) => idx % 2 === 0;
const isBobTurn = (idx) => idx % 2 === 1;
const isEmpty = (vowels) => vowels.length < 0;

console.log(doesAliceWin("bbcd"));
