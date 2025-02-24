#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

int countLetters(string text);
int countWords(string text);
int countSentences(string text);

int main(void)
{

    string text = get_string("Text: ");

    int letters = countLetters(text);
    int words = countWords(text);
    int sentences = countSentences(text);

    float L = (float) letters / words * 100;
    float S = (float) sentences / words * 100;

    int gradeLevel = round(0.0588 * L - 0.296 * S - 15.8);

    if (gradeLevel >= 1 && gradeLevel <= 16)
    {
        printf("Grade %i\n", gradeLevel);
    }
    else if (gradeLevel < 1)
    {
        printf("Before Grade 1\n");
    }
    else
    {
        printf("Grade 16+\n");
    }
}

int countLetters(string text)
{
    int letterCount = 0;

    for (int i = 0, length = strlen(text); i < length; i++)
    {
        if (isalpha(text[i]))
        {
            letterCount += 1;
        }
    }
    return letterCount;
}

int countWords(string text)
{
    int wordCount = 0;

    for (int i = 0, length = strlen(text); i < length; i++)
    {
        if (isblank(text[i]))
        {
            wordCount += 1;
        }
    }
    return wordCount + 1;
}

int countSentences(string text)
{
    int sentenceCount = 0;

    for (int i = 0, length = strlen(text); i < length; i++)
    {
        if (text[i] == '.' || text[i] == '!' || text[i] == '?')
        {
            sentenceCount += 1;
        }
    }
    return sentenceCount;
}
