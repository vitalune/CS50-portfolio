#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int numCoins = 0;
    int quarter = 25;
    int dime = 10;
    int nickel = 5;
    int penny = 1;
    int change;

    do
    {
        change = get_int("Change owed: ");
    }
    while (change < 0);

    while (change > 0)
    {
        if (change >= quarter)
        {
            change -= quarter;
            numCoins++;
        }
        else if (change >= dime)
        {
            change -= dime;
            numCoins++;
        }
        else if (change >= nickel)
        {
            change -= nickel;
            numCoins++;
        }
        else if (change >= penny)
        {
            change -= penny;
            numCoins++;
        }
    }
    printf("%i\n", numCoins);
}
