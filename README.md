# Useful-Bitcoin-Checker
A useful chrome extension that will tell the user the current 5-Day growth of Bitcoin. It will also make a prediction about the data and will tell the user to either Buy, Sell, or Hold.

## How it works
1. This software uses a python program that runs on the Google Cloud Compute Engine to collect the relevant information that will be displayed to the user in the Chrome Extension.
2. The data is then compiled and sent to a FireBase Realtime Database in JSON format.
3. The Chrome Extension then loads the data from FireBase and displays the information to the user.
