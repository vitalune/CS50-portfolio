#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

string encrypt(string key, string plaintext);
bool noRepeatChars(string s);
bool onlyAlpha(string s);
bool twentySixChars(string s);

int main(int argc, string argv[])
{

    if (argc != 2)
    {
        printf("Key may only contain one argument.\n");
        return 1;
    }
    string key = argv[1];

    if (twentySixChars(key) == false)
    {
        printf("Key must be 26 characters long.\n");
        return 1;
    }
    if (onlyAlpha(key) == false)
    {
        printf("Key must only contain alphabetic letters.\n");
        return 1;
    }
    if (noRepeatChars(key) == false)
    {
        printf("Key cannot contain any duplicate characters.\n");
        return 1;
    }

    string plaintext = get_string("plaintext: ");

    printf("ciphertext: %s\n", encrypt(key, plaintext));
    return 0;
}

bool twentySixChars(string s)
{
    int count = 0;
    for (int i = 0, len = strlen(s); i < len; i++)
    {
        count++;
    }
    if (count == 26)
    {
        return true;
    }
    else
    {
        return false;
    }
}

bool onlyAlpha(string s)
{
    for (int i = 0, len = strlen(s); i < len; i++)
    {
        if (!isalpha(s[i]))
        {
            return false;
        }
    }
    return true;
}

bool noRepeatChars(string s)
{
    for (int i = 0, len = strlen(s); i < len; i++)
    {
        for (int j = i + 1; j < len; j++)
        {
            if (tolower(s[i]) == tolower(s[j]))
            {
                return false;
            }
        }
    }
    return true;
}

string encrypt(string key, string plaintext)
{
    string ciphertext = plaintext;

    for (int i = 0, len = strlen(plaintext); i < len; i++)
    {
        if (isupper(plaintext[i]))
        {
            ciphertext[i] = toupper(key[plaintext[i] - 'A']);
        }
        else if (islower(plaintext[i]))
        {
            ciphertext[i] = tolower(key[plaintext[i] - 'a']);
        }
        else
        {
            ciphertext[i] = plaintext[i];
        }
    }
    return ciphertext;
}
