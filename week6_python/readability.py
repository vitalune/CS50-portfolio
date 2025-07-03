from cs50 import get_string

text = get_string("Text: ")

def count_letters(text):
    letters = 0
    for char in text:
        if char.isalpha():
            letters += 1
    return letters

def count_words(text):
    words = 1
    for char in text:
        if char.isspace():
            words += 1
    return words

def count_sentences(text):
    sentences = 0
    for char in text:
        if char in '.!?':
            sentences += 1
    return sentences

def coleman_liau_index(letters, words, sentences):
    index = 0.0588 * (letters / words * 100) - 0.296 * (sentences / words * 100) - 15.8
    return round(index)

def grade_score(index):
    if index < 1:
        print("Before Grade 1")
    elif index >= 16:
        print("Grade 16+")
    else:
        print(f"Grade {index}")

letters = count_letters(text)
words = count_words(text)
sentences = count_sentences(text)
index = coleman_liau_index(letters, words, sentences)
grade_score(index)
