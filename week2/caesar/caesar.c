#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool onlyDigits(string input);
string caesarCipher(string plaintext, int key);

int main(int argc, string argv[])
{

    if (argc != 2)
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    if (!onlyDigits(argv[1]))
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    int key = atoi((argv[1]));
    string plaintext = get_string("plaintext: ");

    printf("Ciphertext: %s\n", caesarCipher(plaintext, key));
}

bool onlyDigits(string input)
{
    for (int i = 0, len = strlen(input); i < len; i++)
    {
        if (!isdigit(input[i]))
        {
            return false;
        }
    }
    return true;
}

string caesarCipher(string plaintext, int key)
{
    string ciphertext = plaintext;

    for (int i = 0, len = strlen(plaintext); i < len; i++)
    {
        if (isupper(plaintext[i]))
        {
            // apply key and encipher, normalize using - 'A'
            ciphertext[i] = ((plaintext[i] - 'A' + key) % 26) + 'A';
        }
        else if (islower(plaintext[i]))
        {
            // apply key and encipher, normalize using - 'a'
            ciphertext[i] = ((plaintext[i] - 'a' + key) % 26) + 'a';
        }
    }
    return ciphertext;
}
