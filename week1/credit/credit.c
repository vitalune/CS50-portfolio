#include <cs50.h>
#include <stdio.h>

checkSum(long card_number);

int main (void)
{

    do
    {
        long card_number = get_long("Please enter a card number: \n");
    }
    while (card_number < 0);

    checkSum(long card_number);
}

void checkSum(long card_number)
{
    
}
