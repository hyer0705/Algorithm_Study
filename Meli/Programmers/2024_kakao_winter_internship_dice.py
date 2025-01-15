def solution(dice):
    
    from itertools import combinations
    
    answer = []
    best_a_win = 0
    count = int(len(dice)/2)
    a_combs = combinations(list(range(len(dice))), count)
    
    def cal_possible_scores(dice):
        arrs = [0]*(6**count)
        i = count-1
        for d in dice:
            arr = []
            for nu in d:
                arr.extend([nu]*(6**i))
            if count-1-i > 0:
                arr = arr*(6**count-1-i)
            for n in range(6**count):
                arrs[n] += arr[n]
            i -= 1
        
        return arrs
    
    for c in a_combs:
        win_count = 0
        a_dice = [dice[i] for i in c]
        b_dice = [dice[i] for i in range(len(dice)) if i not in c]
        a_possible_scores = cal_possible_scores(a_dice)
        b_possible_scores = cal_possible_scores(b_dice)

        for a_score in a_possible_scores:
            for b_score in b_possible_scores:
                if a_score > b_score:
                    win_count += 1
        
        if win_count > best_a_win:
            best_a_win = win_count
            answer = sorted(list(c))
    
    return [i+1 for i in answer]
