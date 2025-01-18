#include <string>
#include <set>
#include <vector>

using namespace std;

bool findTargetCards(set<int>& cards, set<int>& savedCards, int targetNumber)
{
    for (int num : cards)
    {
        auto it = savedCards.find(targetNumber - num);
        if (it != savedCards.end())
        {
            cards.erase(num);
            savedCards.erase(*it);
            return true;
        }
    }

    return false;
}

int solution(int coin, vector<int> cards) {
    set<int> myCards, savedCards;
    for (int i = 0; i < cards.size() / 3; i++)
    {
        myCards.insert(cards[i]);
    }

    int round = 1;
    int targetNumber = cards.size() + 1;
    int nextCardIndex = cards.size() / 3;

    for (int i = cards.size() / 3; i < cards.size(); i += 2)
    {
        savedCards.insert(cards[i]);
        savedCards.insert(cards[i + 1]);

        // 내 손에 든 카드만으로 낼 수 있다면,
        if (findTargetCards(myCards, myCards, targetNumber))
        {

        } // 코인을 하나 써서 내가 들고있는 카드와 저장되어있던 카드와 매칭하여 낼 수 있다면,
        else if (coin >= 1 && findTargetCards(myCards, savedCards, targetNumber))
        {
            coin -= 1;
        } // 코인을 두 개 써서 저장되어 있던 카드에서 낼 수 있다면
        else if (coin >= 2 && findTargetCards(savedCards, savedCards, targetNumber))
        {
            coin -= 2;
        }
        else
        {
            break;
        }

        round++;
    }

    return round;
}