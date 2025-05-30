def solution(n, k):

    def prime_number(num):
        if num <= 1:
            return False
        if num <= 3:
            return True
        if num % 2 == 0 or num % 3 == 0:
            return False
        i = 5
        while i*i <= num:
            if num%i == 0 or num%(i+2) == 0:
                return False
            i += 6
        return True
    
    k_number = ""
    while n > 0:
        n, r = divmod(n, k)
        k_number = str(r) + k_number
    
    answer = 0
    check_number = ""
    for i in range(len(k_number)):
        if int(k_number[i]) == 0 and check_number:
            if prime_number(int(check_number)):
                answer += 1
            check_number = ""
        else:
            check_number += k_number[i]
    if check_number and prime_number(int(check_number)):
        answer += 1
    return answer