from cs50 import get_int

pyramid_height = get_int("Enter the height of the pyramid, between 1-8: ")
while (pyramid_height < 1 or pyramid_height > 8):
    pyramid_height = get_int("Enter the height of the pyramid, between 1-8: ")

for i in range(pyramid_height):
    for j in range(pyramid_height - i - 1):
        print(" ", end="")
    for k in range(i + 1):
        print("#", end="")
    print("  ", end="")
    for l in range(i + 1):
        print("#", end="")
    print()
