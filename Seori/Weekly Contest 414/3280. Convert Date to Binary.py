class Solution:
    def convertDateToBinary(self, date: str) -> str:
        # format() 함수에 'b'를 사용하면 2진수로 변환할 수 있다. You can convert to binary using 'b' in the format() function.
        year, month, day = map(int, date.split("-"))
        year = format(year, 'b')
        month = format(month, 'b')
        day = format(day, 'b')
        return year + '-' + month + '-' + day