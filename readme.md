# Craymel Quiz [![Continuous Integration](https://github.com/jameswilddev/craymel-quiz/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/craymel-quiz/actions) [![License](https://img.shields.io/github/license/jameswilddev/craymel-quiz.svg)](https://github.com/jameswilddev/craymel-quiz/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fcraymel-quiz.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fcraymel-quiz?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

Take the Tales of Eternia/Tales of Destiny II Craymel quiz online!

## Developing

Each of these commands can be accessed from Visual Studio Code by pressing (cmd/ctrl)+shift+B.

First, `npm install`.  Then, either `npm run prod` for a one-off, minified build after tests run, or, `npm run watch` to host locally at [127.0.0.1:8080](127.0.0.1:8080) and rebuild automatically on changes.

## Deployment

The [GitHub Action](./.github/workflows/continuous-integration.yaml) will build the SPA, upload it to a S3 bucket (configured to allow public HTTP reads), then invalidate a Cloudflare cache (which sits in front and provides HTTPS).

### Configuring GitHub secrets

Add the following secrets on GitHub:

#### DOMAIN

This is:

- The name of the S3 bucket which will be uploaded to.
- The public URL which Cloudflare will host.

For example, for `https://www.google.com/`, this would be `www.google.com` - no protocol, no trailing slash.

#### AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY

The access key ID and secret access key of an IAM user with the following permissions against the S3 bucket and objects within:

- `PutObject`
- `PutObjectAcl`
- `GetObject`
- `ListBucket`
- `DeleteObject`
- `GetBucketLocation`

#### CLOUDFLARE_TOKEN/CLOUDFLARE_ZONE

A Cloudflare access token with the `Zone.Cache Purge` permission.  The Zone ID can be found on your domain's dashboard.

### Triggering a deployment

To trigger a deployment, create a GitHub release.  The name/version of the GitHub release will be included in the deployed HTML.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fcraymel-quiz.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fcraymel-quiz?ref=badge_large)

## Reverse Engineering

This reverse engineering was done using the US release of Tales of Destiny II.

### Jumping directly to the quiz

- Apply [Gameshark code 30132748 0003](https://tcrf.net/Tales_of_Destiny_II_(PlayStation)#Debug_Room) and press Start at the title screen.
- Talk to Farah, Keele and Meredy to add them to your party (they will collapse when they are in your party).
- Press start to open the debug menu.
- Hold right on Town Map until room ID 312 is selected.
- Press X.

You are now in the room with the Craymel Quiz.  It might be tricky to get back into the accessible portion but you should be able to take the quiz as normal from here.

### Scoring

The following six memory addresses each refer to an unsigned byte representing the quizmaster's affinity for each Craymel:

| Memory Address | Craymel |
| -------------- | ------- |
| 0x000fe9fb     | Undine  |
| 0x000fe9fc     | Efreet  |
| 0x000fe9fd     | Sylph   |
| 0x000fe9fe     | Gnome   |
| 0x000fe9ff     | Celsius |
| 0x000fea00     | Volt    |

At the start of the quiz, these are reset to zero.

#### Primary Questions

10 of each of the 60 primary questions is associated with a particular Craymel.  On answering yes, that Craymel's score increments by 1.  On answering no, scores do not change.

The primary questions are as follows, and are asked in a random order:

| ID | Craymel | Question                                                                                            |
| -- | ------- | --------------------------------------------------------------------------------------------------- |
| 1  | Undine  | Do you feel confident talking to most anyone?                                                       |
| 2  | Undine  | When you're at your wit's end, do you lose the ability to think clearly?                            |
| 3  | Undine  | Would you agree with someone just to avoid conflict?                                                |
| 4  | Undine  | If you see people quarreling, do you avoid getting involved?                                        |
| 5  | Undine  | Do you put off for tomorrow what you don't have to do today?                                        |
| 6  | Undine  | Can you perform monotonous tasks over and over if it's required of you?                             |
| 7  | Undine  | Do you think of yourself as an ordinary sort of person?                                             |
| 8  | Undine  | Are you fairly satisfied with yourself as you are now?                                              |
| 9  | Undine  | Do you feel that you can't change the world around you?                                             |
| 10 | Undine  | Do you react emotionally to things only after some time has passed?                                 |
| 11 | Sylph   | Do you feel like people don't understand you?                                                       |
| 12 | Sylph   | Do you wish to express yourself through art?                                                        |
| 13 | Sylph   | Are you more drawn to tragedy than comedy?                                                          |
| 14 | Sylph   | Are you easily hurt by the littlest of things?                                                      |
| 15 | Sylph   | Do you feel you are as sensitive as most people?                                                    |
| 16 | Sylph   | Do you like to always have something move you emotionally?                                          |
| 17 | Sylph   | Are you an emotional person, and proud of it?                                                       |
| 18 | Sylph   | Do you frequently replay bad memories in your head?                                                 |
| 19 | Sylph   | Do you find it hard to belong to groups that have strict rules?                                     |
| 20 | Sylph   | Do you always believe in your self worth, even in the absence of others' approval?                  |
| 21 | Efreet  | Can you speak your mind without hesitation to almost everybody?                                     |
| 22 | Efreet  | Do you feel you can protect those who depend on you?                                                |
| 23 | Efreet  | If things don't go the way you think they should, do you lose interest?                             |
| 24 | Efreet  | Do you dislike depending on others?                                                                 |
| 25 | Efreet  | Do you agree with the philosophy, an eye for an eye?                                                |
| 26 | Efreet  | Are you the type who rarely gets upset, no matter what the circumstance?                            |
| 27 | Efreet  | If something isn't clearly either black or white, do you feel unsettled?                            |
| 28 | Efreet  | Are you able to ignore what others think of you?                                                    |
| 29 | Efreet  | Do you follow your own path without giving way, no matter the consequences?                         |
| 30 | Efreet  | Do you often find yourself in the role of leading others?                                           |
| 31 | Gnome   | Do you hate repeating the same task over and over?                                                  |
| 32 | Gnome   | If you see something new, do you immediately want to try it out?                                    |
| 33 | Gnome   | Do you make an effort to entertain those around you?                                                |
| 34 | Gnome   | Do you try just about anything you're curious about?                                                |
| 35 | Gnome   | Would you rather make compromises than bend over backwards to get things done?                      |
| 36 | Gnome   | Do you love lively places with lots of people?                                                      |
| 37 | Gnome   | Do you feel that you have a great imagination?                                                      |
| 38 | Gnome   | Are you the type that soon forgets bad things that happen?                                          |
| 39 | Gnome   | Can you make friends easily with almost anyone?                                                     |
| 40 | Gnome   | Are you often overly-optimistic about getting something done, only to end up in a panic at the end? |
| 41 | Celsius | Are you calm and even-tempered?                                                                     |
| 42 | Celsius | Are you bothered with noisy places filled with strangers?                                           |
| 43 | Celsius | Do you think things through thoroughly before you take action?                                      |
| 44 | Celsius | Do you hate having social life cut into your own private time?                                      |
| 45 | Celsius | Do you need time alone?                                                                             |
| 46 | Celsius | Do you hate relying on intuition or chance?                                                         |
| 47 | Celsius | When things get lively, would you rather just watch than participate?                               |
| 48 | Celsius | Do you learn things by fully understanding them, not by rote memorization?                          |
| 49 | Celsius | Are you sometimes criticized as being argumentative?                                                |
| 50 | Celsius | Are you bothered by illogical or inconsistent things?                                               |
| 51 | Volt    | Do you hope to improve yourself at least a little each day?                                         |
| 52 | Volt    | Do you think that favoritism is a bad thing?                                                        |
| 53 | Volt    | Do people often not notice when you are angry?                                                      |
| 54 | Volt    | Do people who do things halfheartedly upset you?                                                    |
| 55 | Volt    | Are you harder on yourself than on others?                                                          |
| 56 | Volt    | When you're planning something, do you concentrate on setting up a time-table first?                |
| 57 | Volt    | Do you do a lot of reflection upon your actions?                                                    |
| 58 | Volt    | Are you rather poor at making others laugh?                                                         |
| 59 | Volt    | Do you make special effort not to be rude to others?                                                |
| 60 | Volt    | Are you the type who can't keep quiet when you find a mistake?                                      |

(the question ID can be found at memory address 0x000fe5f0 while the game waits for the player to make a selection).

If after all 60 primary questions are answered and a single Craymel has a highest score, the quiz ends with that Craymel as the player's match.

### Tiebreaker Questions

If all 60 primary questions are answered and there is no single Craymel with the highest score, a fixed tree of tiebreaker questions are asked:

> Do you like being alone more than being with a crowd?

#### Yes

> Do you sometimes act on the emotion of the moment?

##### Yes

Sylph

##### No

> When you see a sloppy person, do you wonder why they're sloppy rather than get upset?

###### Yes

Celsius

###### No

Volt

#### No

> Do you fight to the bitter end, no matter the opposition?

##### Yes

Efreet

##### No

> Do you hate repetitive tasks?

###### Yes

Gnome

###### No

Undine
