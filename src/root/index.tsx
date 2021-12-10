import * as React from "react";
// TODO: whole JSON packaged
import { version } from "../../package.json";

const introLines: ReadonlyArray<string> = [
  `Shall I tell you which Craymel resides in you?`,
  `I will ask you many questions.  Do not answer with what you think you should say, but with how you truly feel.`,
  `We will begin.`,
];

const craymelNames: ReadonlyArray<string> = [
  `Undine`,
  `Sylph`,
  `Efreet`,
  `Gnome`,
  `Celsius`,
  `Volt`,
];

const craymelOutroLines: ReadonlyArray<ReadonlyArray<string>> = [
  [
    `The Craymel that resides in your heart is the Water Craymel, Undine.`,
    `You are fairly easily satisfied, and don't feel the need to take things too far.`,
    `You hate conflict and pressure, and you seldom express your opinions straight out.`,
    `...But the one who loses out in the end by putting things off or not speaking up is you.`,
  ],
  [
    `The Craymel that resides in your heart is the Wind Craymel, Sylph.`,
    `You are a rather emotional, moody person.`,
    `If you fail to follow through on your responsibilities because of your whims, you'll lose your friends' trust.`,
    `Rather than being disappointed when others don't understand you, work hard so that others will recognize your worth.`,
  ],
  [
    `The Craymel that resides in your heart is the Fire Craymel, Efreet.`,
    `Not wanting to show any weakness, do you often find yourself forcing others to do what you want?`,
    `If you are too overbearing, you can become somewhat of a dictator and risk losing your friends.`,
    `Leaders have to learn to listen to what others have to say, too.`,
  ],
  [
    `The Craymel that resides in your heart is the Earth Craymel, Gnome.`,
    `You go from one thing to the next, leaving many things half-finished in pursuit of fun, do you not?`,
    `If you spoil yourself too much, your friends just may give up on you.`,
    `Maybe you should put forth more effort to make what's already in front of you more fun.`,
  ],
  [
    `The Craymel that resides in your heart is the Ice Craymel, Celsius.`,
    `You have a wealth of knowledge, but aren't you rather unwilling to share it?`,
    `If you constantly judge others, people will never see past your faults and see the good person that you truly are.`,
    `Rather than keeping thoughts to yourself, why not try learning how to enjoy sharing time and knowledge with your friends?`,
  ],
  [
    `The Craymel that resides in your heart is the Lightning Craymel, Volt.`,
    `If you insist on the same level of perfection from others as from yourself, your friends will avoid you.`,
    `Understand that each person has his or her own way of doing things.`,
    `Things you are sure to be correct may sometimes be wrong, too.  Don't be too insistent on your ideals.`,
  ],
];

type CraymelTiebreaker = {
  readonly type: `craymel`;
  readonly craymelIndex: number;
};

type QuestionTiebreaker = {
  readonly type: `question`;
  readonly question: string;
  readonly yes: Tiebreaker;
  readonly no: Tiebreaker;
};

type Tiebreaker = CraymelTiebreaker | QuestionTiebreaker;

const tiebreakers: Tiebreaker = {
  type: `question`,
  question: `Do you like being alone more than being with a crowd?`,
  yes: {
    type: `question`,
    question: `Do you sometimes act on the emotion of the moment?`,
    yes: {
      type: `craymel`,
      craymelIndex: 1,
    },
    no: {
      type: `question`,
      question: `When you see a sloppy person, do you wonder why they're sloppy rather than get upset?`,
      yes: {
        type: `craymel`,
        craymelIndex: 4,
      },
      no: {
        type: `craymel`,
        craymelIndex: 5,
      },
    },
  },
  no: {
    type: `question`,
    question: `Do you fight to the bitter end, no matter the opposition?`,
    yes: {
      type: `craymel`,
      craymelIndex: 2,
    },
    no: {
      type: `question`,
      question: `Do you hate repetitive tasks?`,
      yes: {
        type: `craymel`,
        craymelIndex: 3,
      },
      no: {
        type: `craymel`,
        craymelIndex: 0,
      },
    },
  },
};

const primaryQuestions: ReadonlyArray<string> = [
  `Do you feel confident talking to most anyone?`,
  `When you're at your wit's end, do you lose the ability to think clearly?`,
  `Would you agree with someone just to avoid conflict?`,
  `If you see people quarreling, do you avoid getting involved?`,
  `Do you put off for tomorrow what you don't have to do today?`,
  `Can you perform monotonous tasks over and over if it's required of you?`,
  `Do you think of yourself as an ordinary sort of person?`,
  `Are you fairly satisfied with yourself as you are now?`,
  `Do you feel that you can't change the world around you?`,
  `Do you react emotionally to things only after some time has passed?`,
  `Do you feel like people don't understand you?`,
  `Do you wish to express yourself through art?`,
  `Are you more drawn to tragedy than comedy?`,
  `Are you easily hurt by the littlest of things?`,
  `Do you feel you are as sensitive as most people?`,
  `Do you like to always have something move you emotionally?`,
  `Are you an emotional person, and proud of it?`,
  `Do you frequently replay bad memories in your head?`,
  `Do you find it hard to belong to groups that have strict rules?`,
  `Do you always believe in your self worth, even in the absence of others' approval?`,
  `Can you speak your mind without hesitation to almost everybody?`,
  `Do you feel you can protect those who depend on you?`,
  `If things don't go the way you think they should, do you lose interest?`,
  `Do you dislike depending on others?`,
  `Do you agree with the philosophy, an eye for an eye?`,
  `Are you the type who rarely gets upset, no matter what the circumstance?`,
  `If something isn't clearly either black or white, do you feel unsettled?`,
  `Are you able to ignore what others think of you?`,
  `Do you follow your own path without giving way, no matter the consequences?`,
  `Do you often find yourself in the role of leading others?`,
  `Do you hate repeating the same task over and over?`,
  `If you see something new, do you immediately want to try it out?`,
  `Do you make an effort to entertain those around you?`,
  `Do you try just about anything you're curious about?`,
  `Would you rather make compromises than bend over backwards to get things done?`,
  `Do you love lively places with lots of people?`,
  `Do you feel that you have a great imagination?`,
  `Are you the type that soon forgets bad things that happen?`,
  `Can you make friends easily with almost anyone?`,
  `Are you often overly-optimistic about getting something done, only to end up in a panic at the end?`,
  `Are you calm and even-tempered?`,
  `Are you bothered with noisy places filled with strangers?`,
  `Do you think things through thoroughly before you take action?`,
  `Do you hate having social life cut into your own private time?`,
  `Do you need time alone?`,
  `Do you hate relying on intuition or chance?`,
  `When things get lively, would you rather just watch than participate?`,
  `Do you learn things by fully understanding them, not by rote memorization?`,
  `Are you sometimes criticized as being argumentative?`,
  `Are you bothered by illogical or inconsistent things?`,
  `Do you hope to improve yourself at least a little each day?`,
  `Do you think that favoritism is a bad thing?`,
  `Do people often not notice when you are angry?`,
  `Do people who do things halfheartedly upset you?`,
  `Are you harder on yourself than on others?`,
  `When you're planning something, do you concentrate on setting up a time-table first?`,
  `Do you do a lot of reflection upon your actions?`,
  `Are you rather poor at making others laugh?`,
  `Do you make special effort not to be rude to others?`,
  `Are you the type who can't keep quiet when you find a mistake?`,
];

// const cancellation = `I will cancel the inquiry.`;

export const Root = () => {
  const [state, setState] = React.useState<
    | {
      readonly type: `intro`;
      readonly introLineIndex: number;
    }
    | {
      readonly type: `primaryQuestion`;
      readonly craymelScores: ReadonlyArray<number>;
      readonly remainingPrimaryQuestionIndices: ReadonlyArray<number>;
    }
    | {
      readonly type: `tiebreaker`;
      readonly answers: ReadonlyArray<boolean>;
    }
    | {
      readonly type: `outro`;
      readonly craymelIndex: number;
      readonly lineIndex: number;
    }
    | {
      readonly type: `endMenu`;
    }
  >({ type: `intro`, introLineIndex: 0 });

  let article: JSX.Element;

  switch (state.type) {
    case `intro`: {
      article = (
        <article>
          <button
            className="message"
            onClick={() => {
              if (state.introLineIndex === introLines.length - 1) {
                const left = primaryQuestions.map((_, index) => index);

                const remainingPrimaryQuestionIndices: number[] = [];

                while (left.length > 0) {
                  const index = Math.floor(Math.random() * left.length);
                  remainingPrimaryQuestionIndices.push(left[index] as number);
                  left.splice(index, 1);
                }

                setState({
                  type: `primaryQuestion`,
                  craymelScores: craymelOutroLines.map(() => 0),
                  remainingPrimaryQuestionIndices,
                });
              } else {
                setState({
                  type: `intro`,
                  introLineIndex: state.introLineIndex + 1,
                });
              }
            }}
          >
            {introLines[state.introLineIndex]}
          </button>
        </article>
      );
      break;
    }

    case `primaryQuestion`: {
      const primaryQuestionIndex = state.remainingPrimaryQuestionIndices[0];

      const advance = (craymelScores: ReadonlyArray<number>) => {
        if (state.remainingPrimaryQuestionIndices.length === 1) {
          const greatestCraymelScore = Math.max(...craymelScores);

          const indexOfGreatestCraymelScore = craymelScores.indexOf(
            greatestCraymelScore
          );

          if (
            craymelScores.lastIndexOf(greatestCraymelScore) ===
            indexOfGreatestCraymelScore
          ) {
            setState({
              type: `outro`,
              craymelIndex: indexOfGreatestCraymelScore,
              lineIndex: 0,
            });
          } else {
            setState({
              type: `tiebreaker`,
              answers: [],
            });
          }
        } else {
          setState({
            type: `primaryQuestion`,
            craymelScores,
            remainingPrimaryQuestionIndices: state.remainingPrimaryQuestionIndices.slice(
              1
            ),
          });
        }
      };

      article = (
        <article>
          <p className="message">{primaryQuestions[primaryQuestionIndex]}</p>
          <div>
            <ul key={primaryQuestionIndex}>
              <li>
                <button
                  onClick={() => {
                    const craymelScoresCopy = [...state.craymelScores];
                    craymelScoresCopy[
                      Math.floor(
                        primaryQuestionIndex /
                        (primaryQuestions.length / craymelOutroLines.length)
                      )
                    ]++;

                    advance(craymelScoresCopy);
                  }}
                >
                  Yes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    advance(state.craymelScores);
                  }}
                >
                  No
                </button>
              </li>
            </ul>
          </div>
        </article>
      );
      break;
    }

    case `tiebreaker`: {
      let item = tiebreakers;

      for (const answer of state.answers) {
        item = item[answer ? `yes` : `no`] as QuestionTiebreaker;
      }

      const advance = (answer: boolean) => () => {
        const next = item[answer ? `yes` : `no`];

        if (next.type === `craymel`) {
          setState({
            type: `outro`,
            craymelIndex: next.craymelIndex,
            lineIndex: 0,
          });
        } else {
          setState({
            ...state,
            answers: [...state.answers, answer],
          });
        }
      };

      article = (
        <article>
          <p className="message">{item.question}</p>
          <div>
            <ul key={state.answers.join(``)}>
              <li>
                <button onClick={advance(true)}>Yes</button>
              </li>
              <li>
                <button onClick={advance(false)}>No</button>
              </li>
            </ul>
          </div>
        </article>
      );
      break;
    }

    case `outro`: {
      const outroLines = craymelOutroLines[state.craymelIndex];

      article = (
        <article>
          <button
            className="message"
            onClick={() => {
              if (state.lineIndex === outroLines.length - 1) {
                setState({
                  type: `endMenu`,
                });
              } else {
                setState({
                  ...state,
                  lineIndex: state.lineIndex + 1,
                });
              }
            }}
          >
            {outroLines[state.lineIndex]}
          </button>
        </article>
      );
      break;
    }

    case `endMenu`:
      article = (
        <article>
          <p className="message">
            We are finished. Live in harmony with your Craymel.
          </p>
          <div>
            <ul>
              {craymelNames.map((craymelName, craymelIndex) => (
                <li key={craymelName}>
                  <button
                    onClick={() => {
                      setState({
                        type: `outro`,
                        craymelIndex,
                        lineIndex: 0,
                      });
                    }}
                  >
                    See {craymelName}'s reading
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setState({
                      type: `intro`,
                      introLineIndex: 0,
                    });
                  }}
                >
                  Start Over
                </button>
              </li>
            </ul>
          </div>
        </article>
      );
      break;
  }

  return (
    <React.Fragment>
      <header>
        <h1>Craymel Quiz</h1>
        <div>v{version}</div>
      </header>
      {article}
    </React.Fragment>
  );
};
