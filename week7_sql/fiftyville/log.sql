-- Keep a log of any SQL queries you execute as you solve the mystery.

-- First, let's explore the database schema to understand what tables are available
-- .schema

-- Now let's look for the crime scene report for July 28, 2023 on Humphrey Street
-- The CS50 Fiftyville mystery states the theft occurred on July 28, 2023 on Humphrey Street

-- Let's check what data we have first
SELECT * FROM crime_scene_reports LIMIT 10;

-- Search for Humphrey Street reports
SELECT * FROM crime_scene_reports WHERE street LIKE '%Humphrey%';

-- Found the CS50 duck theft! ID 295 on 2024-07-28 at 10:15am at Humphrey Street bakery
-- Report says: "Theft of the CS50 duck took place at 10:15am at the Humphrey Street bakery.
-- Interviews were conducted today with three witnesses who were present at the time – each of their interview transcripts mentions the bakery."

-- Now let's get the witness interviews from July 28, 2024 that mention the bakery
SELECT * FROM interviews WHERE year = 2024 AND month = 7 AND day = 28 AND transcript LIKE '%bakery%';

-- Key witness testimonies:
-- Ruth: Thief got into a car in bakery parking lot within 10 minutes of theft (10:15-10:25am)
-- Eugene: Saw thief at ATM on Leggett Street earlier that morning
-- Raymond: Thief called someone after leaving bakery, planning to take earliest flight out of Fiftyville tomorrow (July 29, 2024)

-- Check bakery security logs for cars leaving between 10:15-10:25am
SELECT * FROM bakery_security_logs WHERE year = 2024 AND month = 7 AND day = 28 AND hour = 10 AND minute >= 15 AND minute <= 25 AND activity = 'exit';

-- Check ATM transactions on Leggett Street on July 28, 2024
SELECT * FROM atm_transactions WHERE year = 2024 AND month = 7 AND day = 28 AND atm_location = 'Leggett Street';

-- Check short phone calls (less than 60 seconds) on July 28, 2024
SELECT * FROM phone_calls WHERE year = 2024 AND month = 7 AND day = 28 AND duration < 60;

-- Find people with license plates that left bakery
SELECT people.name, people.phone_number, people.passport_number, people.license_plate
FROM people
WHERE license_plate IN ('5P2BI95', '94KL13X', '6P58WS2', '4328GD8', 'G412CB7', 'L93JTIZ', '322W7JE', '0NTHK55');

-- Find people who made ATM withdrawals on Leggett Street
SELECT people.name, people.phone_number, people.passport_number, people.license_plate
FROM people
JOIN bank_accounts ON people.id = bank_accounts.person_id
WHERE bank_accounts.account_number IN (28500762, 28296815, 76054385, 49610011, 16153065, 25506511, 81061156, 26013199);

-- Cross-referencing suspects: Bruce, Diana, Iman, and Luca appear in both bakery exit and ATM withdrawal lists

-- Check which suspects made short phone calls on July 28
SELECT name, phone_number FROM people
WHERE phone_number IN ('(367) 555-5533', '(770) 555-1861', '(829) 555-5269', '(389) 555-5198')
AND phone_number IN (SELECT caller FROM phone_calls WHERE year = 2024 AND month = 7 AND day = 28 AND duration < 60);
-- Results: Diana and Bruce both made short calls

-- Find Fiftyville airport
SELECT * FROM airports WHERE city = 'Fiftyville';
-- CSF|Fiftyville Regional Airport|Fiftyville (id = 8)

-- Find earliest flight from Fiftyville on July 29, 2024
SELECT * FROM flights WHERE origin_airport_id = 8 AND year = 2024 AND month = 7 AND day = 29 ORDER BY hour, minute LIMIT 1;
-- Flight 36, departing 8:20am to airport id 4

-- Check if Diana or Bruce were on flight 36
SELECT people.name, people.passport_number
FROM people
JOIN passengers ON people.passport_number = passengers.passport_number
WHERE passengers.flight_id = 36 AND people.name IN ('Diana', 'Bruce');
-- Result: Bruce was on the flight!

-- Find destination city of flight 36
SELECT airports.city FROM airports JOIN flights ON airports.id = flights.destination_airport_id WHERE flights.id = 36;
-- New York City

-- Find Bruce's accomplice by checking who he called
SELECT receiver FROM phone_calls
WHERE caller = '(367) 555-5533' AND year = 2024 AND month = 7 AND day = 28 AND duration < 60;
-- (375) 555-8161

-- Find name of accomplice
SELECT name FROM people WHERE phone_number = '(375) 555-8161';
-- Robin
