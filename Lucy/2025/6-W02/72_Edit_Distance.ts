// 6ms
function minDistance(word1: string, word2: string): number {
  // word1 혹은 word2가 빈 문자열인 경우: 다른 문자열의 길이만큼 작업 필요
  if (word1.length === 0) return word2.length;
  if (word2.length === 0) return word1.length;

  const word1Len = word1.length;
  const word2Len = word2.length;

  const dp = Array.from({ length: word1Len + 1 }, () => new Array(word2Len + 1).fill(0));

  // 첫 번째 행: word1이 빈 문자열("")일 때, word2의 j글자를 만들려면 insert를 j번 해야 함
  for (let col = 1; col <= word2Len; col++) {
    dp[0][col] = col;
  }

  // 첫 번째 열: word2가 빈 문자열("")일 때, word1의 i글자를 만들려면 delete를 i번 해야 함
  for (let row = 1; row <= word1Len; row++) {
    dp[row][0] = row;
  }

  // 나머지 dp 채우기
  for (let i = 1; i <= word1Len; i++) {
    for (let j = 1; j <= word2Len; j++) {
      // 연산이 필요하지 않은 경우 => "두 글자가 같아서 아무 연산 필요 없음"
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // delete 연산
          dp[i][j - 1] + 1, // insert 연산
          dp[i - 1][j - 1] + 1 // replace 연산
        );
      }
    }
  }

  return dp[word1Len][word2Len];
}
