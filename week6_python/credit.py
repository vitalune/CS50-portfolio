from cs50 import get_int
import re

card_number = get_int("Number: ")

if not re.match(r'^\d+$', str(card_number)):
    print("INVALID")
    exit()


def luhn_algorithm(card_number):
    total = 0
    reverse_digits = str(card_number)[::-1]
    for i, digit in enumerate(reverse_digits):
        n = int(digit)
        if i % 2 == 1:
            n *= 2
            if n > 9:
                n -= 9
        total += n
    return total % 10 == 0

if not luhn_algorithm(card_number):
    print("INVALID")
    exit()
else:
    print("VALID")
card_number_str = str(card_number)
length = len(card_number_str)

if length == 15 and card_number_str.startswith(('34', '37')):
    print("AMEX")
elif length == 16 and card_number_str.startswith(('51', '52', '53', '54', '55')):
    print("MASTERCARD")
elif (length == 13 or length == 16) and card_number_str.startswith('4'):
    print("VISA")
else:
    print("INVALID")
