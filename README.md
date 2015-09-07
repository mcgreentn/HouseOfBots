# HOUSE OF BOTS

### "A Procedurally Generated Bureaucratic Circus"
PennApps XII Project with TJ Potenza, Chase Brewster, Munad Mahinoor, Michael Green

### Index:
1. Description
2. Install
3. Using House of Bots



## Description

House of Bots is a script that allows the user to procedurally generate syntactically correct (but contextually confusing) tweets for a parody Twitter account, by combining the Twitter feeds from other various accounts.  Through the use of Markov Chains, you can build your own politician, musician, or make fun of your friends (if you have any...any at all...)

## Install

### Prereqs: Node

To install House of Bots, simply clone or fork the repo to your computer.  Then, after creating a parody Twitter account from which to aim tweets at, obtain the correct OAuth tokens for that account and put the credentials in the .creds file.  Edit the generateData.js file and add your .creds file to the argument check on lines 41-45.

## Using House of Bots

To run the script, 
type:
  "node generateData -t (parodyTwitterhandle) (originhandle) (originhandle) (originhandle)..."

Note: you can have as many origin handles follow the parody twitter handle as you want.  This means you can pull from as many twitter accounts as desired.  You're welcome.

PS. Not our fault if you get banned.  We recommend not tweeting at people on the regular, as that may induce Twitter's wrath.
