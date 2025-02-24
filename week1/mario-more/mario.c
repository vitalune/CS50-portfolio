#include <cs50.h>
#include <stdio.h>

void printPyramids(int num, int i);

int main(void)
{
    int num;

    // ask user for number. Continue program if desired number range is met, or continue asking user
    // for number until desired number range is met.
    do
    {
        num = get_int("Please provide a number between 1 and 8, inclusive: ");
    }
    while (num < 1 || num > 8);

    // set i = 1 because that is the first amount of hashes that will be printed nevertheless user
    // response; prints rows until the desired number of rows are printed
    for (int i = 1; i <= num; i++)
    {
        printPyramids(num, i);
    }
}

// num = total number of rows to be printed; i = current row position
void printPyramids(int num, int i)
{
    // num - i = the difference between the number of rows to be printed and the current amount of
    // hashes to be printed
    for (int space = 0; space < num - i; space++)
    {
        printf(" ");
    }

    // print hashes according to which row position we're currently in
    for (int hash = 0; hash < i; hash++)
    {
        printf("#");
    }
    printf("  ");

    for (int hash = 0; hash < i; hash++)
    {
        printf("#");
    }
    printf("\n");
}
