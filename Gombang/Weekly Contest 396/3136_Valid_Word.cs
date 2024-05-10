//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace algorhtim
//{
//    public class Solution
//    {
//        char[] vowelArray = new char[] { 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U' };

//        public bool IsValid(string word)
//        {
//            if (word.Length < 3)
//                return false;

//            bool hasVowel = false;
//            bool hasConsonant = false;

//            for (int i = 0; i < word.Length; i++)
//            {
//                bool isLetter = char.IsLetter(word[i]);
//                bool isDigit = char.IsDigit(word[i]);

//                if (!(isLetter || isDigit))
//                    return false;

//                if (isLetter)
//                {
//                    // 모음이 포함되어 있는지 체크.
//                    if (vowelArray.Contains(word[i]))
//                    {
//                        hasVowel = true;
//                        continue;
//                    }

//                    // 자음이 포함되어 있는지 체크.
//                    if (word[i] >= 'a' && word[i] <= 'z' ||
//                        word[i] >= 'A' && word[i] <= 'Z')
//                    {
//                        hasConsonant = true;
//                    }
//                }
//            }

//            return hasVowel && hasConsonant;
//        }
//    }
//}
