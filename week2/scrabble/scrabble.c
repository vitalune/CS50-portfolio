#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int computeScore(string word);

// create scrabble game point system array
int points[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

int main(void)
{
    string word1 = get_string("Player 1: ");
    string word2 = get_string("Player 2: ");

    int score1 = computeScore(word1);
    int score2 = computeScore(word2);

    if (score1 > score2)
    {
        printf("Player 1 wins! \n");
    }
    else if (score2 > score1)
    {
        printf("Player 2 wins! \n");
    }
    else
    {
        printf("Tie! \n");
    }
}

int computeScore(string word)
{
    int score = 0;

    // 1. index through each char in word
    // 2. calculate associated point value for each char
    // 3. add up point values to total score of word
    for (int i = 0, length = strlen(word); i < length; i++)
    {
        if (isupper(word[i]))
        {
            // using 'A' and 'a' for normalization (zero-based indexing):
            // shifts given letter to corresponding value on scores array (e.g. 'B' = 3 and 'e' = 1)
            score += points[word[i] - 'A'];
        }
        else if (islower(word[i]))
        {
            score += points[word[i] - 'a'];
        }
    }
    return score;
}
