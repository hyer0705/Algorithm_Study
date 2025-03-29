# 첫 번째 풀이
def solution(coin, cards):
    n = len(cards)
    card_hand = cards[:n//3]
    card_deck = cards[n//3:]
    card_buyable = []
    
    target = n + 1
    answer = 1
    while card_deck:
        case = 0
        card_buyable.append(card_deck.pop(0))
        card_buyable.append(card_deck.pop(0))
        
        # [1] 카드를 사지 않고도 다음 라운드로 갈 수 있는가
        for card in card_hand:
            if (target - card) in card_hand:
                card_hand.remove(card)
                card_hand.remove(target - card)
                answer += 1
                case = 1
                break
        
        if case == 1: continue
        
        # [2] 카드를 하나 구매해서 다음 라운드로 갈 수 있는가
        if coin < 1: break
        for card in card_hand:
            if (target - card) in card_buyable:
                card_hand.remove(card)
                coin -= 1
                card_buyable.remove(target - card)
                answer += 1
                case = 2
                break
        
        if case == 2: continue
        
        # [3] 카드를 두 개 구매해서 다음 라운드로 갈 수 있는가
        if coin < 2: break
        for card in card_buyable:
            if (target - card) in card_buyable:
                coin -= 2
                card_buyable.remove(card)
                card_buyable.remove(target - card)
                answer += 1
                case = 3
                break
        
        if case != 3: break
        
    return answer





# 두 번째 풀이. 최적화
def solution(coin, cards):
    n = len(cards)
    card_hand = cards[:n//3]
    card_deck = cards[n//3:]
    card_usable = [0] * (n + 1)
    
    target = n + 1
    for card in card_hand:
        card_usable[card] += 1
        card_usable[target - card] += 1
    
    answer = 1
    while card_deck:
        case = 0
        card = card_deck.pop(0)
        card_usable[card] += 3
        card_usable[target - card] += 3
        card = card_deck.pop(0)
        card_usable[card] += 3
        card_usable[target - card] += 3
        
        
        # [1] 카드를 사지 않고도 다음 라운드로 갈 수 있는가
        for card in card_hand:
            if card_usable[card] == 2:
                card_usable[card] = 0
                card_usable[target - card] = 0
                answer += 1
                case = 1
                break
        
        if case == 1: continue
        
        # [2] 카드를 하나 구매해서 다음 라운드로 갈 수 있는가
        if coin < 1: break
        for card in card_hand:
            if card_usable[card] == 4:
                coin -= 1
                card_usable[card] = 0
                card_usable[target - card] = 0
                answer += 1
                case = 2
                break
        
        if case == 2: continue
        
        # [3] 카드를 두 개 구매해서 다음 라운드로 갈 수 있는가
        if coin < 2: break
        for card in range(len(card_usable)):
            if card_usable[card] == 6:
                coin -= 2
                card_usable[card] = 0
                card_usable[target - card] = 0
                answer += 1
                case = 3
                break
        
        if case != 3: break
        
    return answer