import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { Root } from ".";

describe(`root`, () => {
  const introLines = [
    `Shall I tell you which Craymel resides in you?`,
    `I will ask you many questions.  Do not answer with what you think you should say, but with how you truly feel.`,
    `We will begin.`,
  ];

  const undineOutro = [
    `The Craymel that resides in your heart is the Water Craymel, Undine.`,
    `You are fairly easily satisfied, and don't feel the need to take things too far.`,
    `You hate conflict and pressure, and you seldom express your opinions straight out.`,
    `...But the one who loses out in the end by putting things off or not speaking up is you.`,
  ];

  const sylphOutro = [
    `The Craymel that resides in your heart is the Wind Craymel, Sylph.`,
    `You are a rather emotional, moody person.`,
    `If you fail to follow through on your responsibilities because of your whims, you'll lose your friends' trust.`,
    `Rather than being disappointed when others don't understand you, work hard so that others will recognize your worth.`,
  ];

  const efreetOutro = [
    `The Craymel that resides in your heart is the Fire Craymel, Efreet.`,
    `Not wanting to show any weakness, do you often find yourself forcing others to do what you want?`,
    `If you are too overbearing, you can become somewhat of a dictator and risk losing your friends.`,
    `Leaders have to learn to listen to what others have to say, too.`,
  ];

  const gnomeOutro = [
    `The Craymel that resides in your heart is the Earth Craymel, Gnome.`,
    `You go from one thing to the next, leaving many things half-finished in pursuit of fun, do you not?`,
    `If you spoil yourself too much, your friends just may give up on you.`,
    `Maybe you should put forth more effort to make what's already in front of you more fun.`,
  ];

  const celsiusOutro = [
    `The Craymel that resides in your heart is the Ice Craymel, Celsius.`,
    `You have a wealth of knowledge, but aren't you rather unwilling to share it?`,
    `If you constantly judge others, people will never see past your faults and see the good person that you truly are.`,
    `Rather than keeping thoughts to yourself, why not try learning how to enjoy sharing time and knowledge with your friends?`,
  ];

  const voltOutro = [
    `The Craymel that resides in your heart is the Lightning Craymel, Volt.`,
    `If you insist on the same level of perfection from others as from yourself, your friends will avoid you.`,
    `Understand that each person has his or her own way of doing things.`,
    `Things you are sure to be correct may sometimes be wrong, too.  Don't be too insistent on your ideals.`,
  ];

  const scenario = (
    description: string,
    answerYesTo?: ReadonlyArray<string>,
    answerNoTo?: ReadonlyArray<string>,
    resultingOutro?: ReadonlyArray<string>
  ): void => {
    it(description, () => {
      const testRenderer = ReactTestRenderer.create(<Root />);

      try {
        if (answerYesTo && answerNoTo && resultingOutro) {
          for (const line of introLines) {
            expect(testRenderer.toTree()).toEqual(
              jasmine.objectContaining({
                rendered: [
                  jasmine.objectContaining({
                    type: `header`,
                    props: {
                      children: [
                        jasmine.objectContaining({
                          type: `h1`,
                          props: {
                            children: `Craymel Quiz`,
                          },
                        }),
                        jasmine.objectContaining({
                          type: `div`,
                          props: {
                            children: [`v`, `999.999.999`],
                          },
                        }),
                      ],
                    },
                  }),
                  jasmine.objectContaining({
                    type: `article`,
                    props: {
                      children: jasmine.objectContaining({
                        type: `button`,
                        props: {
                          onClick: jasmine.any(Function),
                          className: `message`,
                          children: line,
                        },
                      }),
                    },
                  }),
                  jasmine.objectContaining({
                    type: `footer`,
                    props: {
                      children: jasmine.objectContaining({
                        type: `button`,
                        props: {
                          onClick: jasmine.any(Function),
                          children: `Skip to readings`,
                        },
                      }),
                    },
                  }),
                ],
              })
            );

            ReactTestRenderer.act(() => {
              testRenderer.root.findAllByType(`button`)[0].props[`onClick`]();
            });
          }

          const previousQuestions: string[] = [];

          let previousKey: null | React.Key = null;

          while (
            previousQuestions.length <
            answerYesTo.length + answerNoTo.length
          ) {
            expect(testRenderer.toTree()).toEqual(
              jasmine.objectContaining({
                rendered: [
                  jasmine.objectContaining({
                    type: `header`,
                    props: {
                      children: [
                        jasmine.objectContaining({
                          type: `h1`,
                          props: {
                            children: `Craymel Quiz`,
                          },
                        }),
                        jasmine.objectContaining({
                          type: `div`,
                          props: {
                            children: [`v`, `999.999.999`],
                          },
                        }),
                      ],
                    },
                  }),
                  jasmine.objectContaining({
                    type: `article`,
                    props: {
                      children: [
                        jasmine.objectContaining({
                          type: `p`,
                          props: {
                            className: `message`,
                            children: jasmine.any(String),
                          },
                        }),
                        jasmine.objectContaining({
                          type: `div`,
                          props: {
                            children: jasmine.objectContaining({
                              type: `ul`,
                              key: jasmine.anything(),
                              props: {
                                children: [
                                  jasmine.objectContaining({
                                    type: `li`,
                                    props: {
                                      children: jasmine.objectContaining({
                                        type: `button`,
                                        props: {
                                          onClick: jasmine.any(Function),
                                          children: `Yes`,
                                        },
                                      }),
                                    },
                                  }),
                                  jasmine.objectContaining({
                                    type: `li`,
                                    props: {
                                      children: jasmine.objectContaining({
                                        type: `button`,
                                        props: {
                                          onClick: jasmine.any(Function),
                                          children: `No`,
                                        },
                                      }),
                                    },
                                  }),
                                ],
                              },
                            }),
                          },
                        }),
                      ],
                    },
                  }),
                  jasmine.objectContaining({
                    type: `footer`,
                    props: {
                      children: jasmine.objectContaining({
                        type: `button`,
                        props: {
                          onClick: jasmine.any(Function),
                          children: `Skip to readings`,
                        },
                      }),
                    },
                  }),
                ],
              })
            );

            const p = testRenderer.root.findByType(`p`);
            const question = p.props[`children`];

            expect(previousQuestions).not.toContain(
              question,
              `Repeated question`
            );

            previousQuestions.push(question);

            expect([...answerNoTo, ...answerYesTo]).toContain(
              question,
              `Unexpected question`
            );

            const ul = testRenderer.root.findByType(`ul`);
            const key = (ul as any)._fiber.key;
            expect(key).not.toEqual(previousKey);
            previousKey = key;

            ReactTestRenderer.act(() => {
              testRenderer.root
                .findAllByType(`button`)
              [answerYesTo.includes(question) ? 0 : 1].props[`onClick`]();
            });
          }

          for (const line of resultingOutro) {
            expect(testRenderer.toTree()).toEqual(
              jasmine.objectContaining({
                rendered: [
                  jasmine.objectContaining({
                    type: `header`,
                    props: {
                      children: [
                        jasmine.objectContaining({
                          type: `h1`,
                          props: {
                            children: `Craymel Quiz`,
                          },
                        }),
                        jasmine.objectContaining({
                          type: `div`,
                          props: {
                            children: [`v`, `999.999.999`],
                          },
                        }),
                      ],
                    },
                  }),
                  jasmine.objectContaining({
                    type: `article`,
                    props: {
                      children: jasmine.objectContaining({
                        type: `button`,
                        props: {
                          onClick: jasmine.any(Function),
                          className: `message`,
                          children: line,
                        },
                      }),
                    },
                  }),
                  jasmine.objectContaining({
                    type: `footer`,
                    props: {
                      children: jasmine.objectContaining({
                        type: `button`,
                        props: {
                          onClick: jasmine.any(Function),
                          children: `Skip to readings`,
                        },
                      }),
                    },
                  }),
                ],
              })
            );

            ReactTestRenderer.act(() => {
              testRenderer.root.findAllByType(`button`)[0].props[`onClick`]();
            });
          }
        } else {
          expect(testRenderer.toTree()).toEqual(
            jasmine.objectContaining({
              rendered: [
                jasmine.objectContaining({
                  type: `header`,
                  props: {
                    children: [
                      jasmine.objectContaining({
                        type: `h1`,
                        props: {
                          children: `Craymel Quiz`,
                        },
                      }),
                      jasmine.objectContaining({
                        type: `div`,
                        props: {
                          children: [`v`, `999.999.999`],
                        },
                      }),
                    ],
                  },
                }),
                jasmine.objectContaining({
                  type: `article`,
                  props: {
                    children: jasmine.objectContaining({
                      type: `button`,
                      props: {
                        onClick: jasmine.any(Function),
                        className: `message`,
                        children: introLines[0],
                      },
                    }),
                  },
                }),
                jasmine.objectContaining({
                  type: `footer`,
                  props: {
                    children: jasmine.objectContaining({
                      type: `button`,
                      props: {
                        onClick: jasmine.any(Function),
                        children: `Skip to readings`,
                      },
                    }),
                  },
                }),
              ],
            })
          );

          ReactTestRenderer.act(() => {
            testRenderer.root.findAllByType(`button`)[1].props[`onClick`]();
          });
        }

        const outroLinesByCraymelIndex = [
          undineOutro,
          sylphOutro,
          efreetOutro,
          gnomeOutro,
          celsiusOutro,
          voltOutro,
        ];

        for (
          let craymelIndex = 0;
          craymelIndex < outroLinesByCraymelIndex.length;
          craymelIndex++
        ) {
          const craymelOutroLines = outroLinesByCraymelIndex[craymelIndex];

          expect(testRenderer.toTree()).toEqual(
            jasmine.objectContaining({
              rendered: [
                jasmine.objectContaining({
                  type: `header`,
                  props: {
                    children: [
                      jasmine.objectContaining({
                        type: `h1`,
                        props: {
                          children: `Craymel Quiz`,
                        },
                      }),
                      jasmine.objectContaining({
                        type: `div`,
                        props: {
                          children: [`v`, `999.999.999`],
                        },
                      }),
                    ],
                  },
                }),
                jasmine.objectContaining({
                  type: `article`,
                  props: {
                    children: [
                      jasmine.objectContaining({
                        type: `p`,
                        props: {
                          className: `message`,
                          children: `We are finished. Live in harmony with your Craymel.`,
                        },
                      }),
                      jasmine.objectContaining({
                        type: `div`,
                        props: {
                          children: jasmine.objectContaining({
                            type: `ul`,
                            props: {
                              children: [
                                [
                                  jasmine.objectContaining({
                                    type: `li`,
                                    props: {
                                      children: jasmine.objectContaining({
                                        type: `button`,
                                        props: {
                                          onClick: jasmine.any(Function),
                                          children: [
                                            `See `,
                                            `Undine`,
                                            `'s reading`,
                                          ],
                                        },
                                      }),
                                    },
                                  }),
                                  jasmine.objectContaining({
                                    type: `li`,
                                    props: {
                                      children: jasmine.objectContaining({
                                        type: `button`,
                                        props: {
                                          onClick: jasmine.any(Function),
                                          children: [
                                            `See `,
                                            `Sylph`,
                                            `'s reading`,
                                          ],
                                        },
                                      }),
                                    },
                                  }),
                                  jasmine.objectContaining({
                                    type: `li`,
                                    props: {
                                      children: jasmine.objectContaining({
                                        type: `button`,
                                        props: {
                                          onClick: jasmine.any(Function),
                                          children: [
                                            `See `,
                                            `Efreet`,
                                            `'s reading`,
                                          ],
                                        },
                                      }),
                                    },
                                  }),
                                  jasmine.objectContaining({
                                    type: `li`,
                                    props: {
                                      children: jasmine.objectContaining({
                                        type: `button`,
                                        props: {
                                          onClick: jasmine.any(Function),
                                          children: [
                                            `See `,
                                            `Gnome`,
                                            `'s reading`,
                                          ],
                                        },
                                      }),
                                    },
                                  }),
                                  jasmine.objectContaining({
                                    type: `li`,
                                    props: {
                                      children: jasmine.objectContaining({
                                        type: `button`,
                                        props: {
                                          onClick: jasmine.any(Function),
                                          children: [
                                            `See `,
                                            `Celsius`,
                                            `'s reading`,
                                          ],
                                        },
                                      }),
                                    },
                                  }),
                                  jasmine.objectContaining({
                                    type: `li`,
                                    props: {
                                      children: jasmine.objectContaining({
                                        type: `button`,
                                        props: {
                                          onClick: jasmine.any(Function),
                                          children: [
                                            `See `,
                                            `Volt`,
                                            `'s reading`,
                                          ],
                                        },
                                      }),
                                    },
                                  }),
                                ],
                                jasmine.objectContaining({
                                  type: `li`,
                                  props: {
                                    children: jasmine.objectContaining({
                                      type: `button`,
                                      props: {
                                        onClick: jasmine.any(Function),
                                        children: `Start Over`,
                                      },
                                    }),
                                  },
                                }),
                              ],
                            },
                          }),
                        },
                      }),
                    ],
                  },
                }),
                jasmine.objectContaining({
                  type: `footer`,
                  props: {
                    children: jasmine.objectContaining({
                      type: `button`,
                      props: {
                        onClick: jasmine.any(Function),
                        children: `Skip to readings`,
                      },
                    }),
                  },
                }),
              ],
            })
          );

          ReactTestRenderer.act(() => {
            testRenderer.root
              .findAllByType(`button`)
            [craymelIndex].props[`onClick`]();
          });

          for (const line of craymelOutroLines) {
            expect(testRenderer.toTree()).toEqual(
              jasmine.objectContaining({
                rendered: [
                  jasmine.objectContaining({
                    type: `header`,
                    props: {
                      children: [
                        jasmine.objectContaining({
                          type: `h1`,
                          props: {
                            children: `Craymel Quiz`,
                          },
                        }),
                        jasmine.objectContaining({
                          type: `div`,
                          props: {
                            children: [`v`, `999.999.999`],
                          },
                        }),
                      ],
                    },
                  }),
                  jasmine.objectContaining({
                    type: `article`,
                    props: {
                      children: jasmine.objectContaining({
                        type: `button`,
                        props: {
                          onClick: jasmine.any(Function),
                          className: `message`,
                          children: line,
                        },
                      }),
                    },
                  }),
                  jasmine.objectContaining({
                    type: `footer`,
                    props: {
                      children: jasmine.objectContaining({
                        type: `button`,
                        props: {
                          onClick: jasmine.any(Function),
                          children: `Skip to readings`,
                        },
                      }),
                    },
                  }),
                ],
              })
            );

            ReactTestRenderer.act(() => {
              testRenderer.root.findAllByType(`button`)[0].props[`onClick`]();
            });
          }
        }

        ReactTestRenderer.act(() => {
          testRenderer.root
            .findAllByType(`button`)
          [outroLinesByCraymelIndex.length].props[`onClick`]();
        });

        expect(testRenderer.toTree()).toEqual(
          jasmine.objectContaining({
            rendered: [
              jasmine.objectContaining({
                type: `header`,
                props: {
                  children: [
                    jasmine.objectContaining({
                      type: `h1`,
                      props: {
                        children: `Craymel Quiz`,
                      },
                    }),
                    jasmine.objectContaining({
                      type: `div`,
                      props: {
                        children: [`v`, `999.999.999`],
                      },
                    }),
                  ],
                },
              }),
              jasmine.objectContaining({
                type: `article`,
                props: {
                  children: jasmine.objectContaining({
                    type: `button`,
                    props: {
                      onClick: jasmine.any(Function),
                      className: `message`,
                      children: `Shall I tell you which Craymel resides in you?`,
                    },
                  }),
                },
              }),
              jasmine.objectContaining({
                type: `footer`,
                props: {
                  children: jasmine.objectContaining({
                    type: `button`,
                    props: {
                      onClick: jasmine.any(Function),
                      children: `Skip to readings`,
                    },
                  }),
                },
              }),
            ],
          })
        );
      } finally {
        testRenderer.unmount();
      }
    });
  };

  scenario(
    `undine`,
    [
      `Do you feel confident talking to most anyone?`,
      `When you're at your wit's end, do you lose the ability to think clearly?`,
      `If you see people quarreling, do you avoid getting involved?`,
      `Do you put off for tomorrow what you don't have to do today?`,
      `Can you perform monotonous tasks over and over if it's required of you?`,
      `Do you think of yourself as an ordinary sort of person?`,
      `Do you feel that you can't change the world around you?`,
      `Do you react emotionally to things only after some time has passed?`,
      `Do you feel like people don't understand you?`,
      `Do you wish to express yourself through art?`,
      `Are you more drawn to tragedy than comedy?`,
      `Are you easily hurt by the littlest of things?`,
      `Do you frequently replay bad memories in your head?`,
      `Do you find it hard to belong to groups that have strict rules?`,
      `Do you always believe in your self worth, even in the absence of others' approval?`,
      `Can you speak your mind without hesitation to almost everybody?`,
      `Do you feel you can protect those who depend on you?`,
      `If things don't go the way you think they should, do you lose interest?`,
      `If something isn't clearly either black or white, do you feel unsettled?`,
      `Are you able to ignore what others think of you?`,
      `Do you follow your own path without giving way, no matter the consequences?`,
      `Do you often find yourself in the role of leading others?`,
      `Do you hate repeating the same task over and over?`,
      `If you see something new, do you immediately want to try it out?`,
      `Do you make an effort to entertain those around you?`,
      `Do you try just about anything you're curious about?`,
      `Would you rather make compromises than bend over backwards to get things done?`,
      `Can you make friends easily with almost anyone?`,
      `Are you often overly-optimistic about getting something done, only to end up in a panic at the end?`,
      `Are you calm and even-tempered?`,
      `Are you bothered with noisy places filled with strangers?`,
      `Do you think things through thoroughly before you take action?`,
      `When things get lively, would you rather just watch than participate?`,
      `Do you learn things by fully understanding them, not by rote memorization?`,
      `Are you sometimes criticized as being argumentative?`,
      `Are you bothered by illogical or inconsistent things?`,
      `Do you hope to improve yourself at least a little each day?`,
      `Do you think that favoritism is a bad thing?`,
      `Do people often not notice when you are angry?`,
      `Do people who do things halfheartedly upset you?`,
      `Are you rather poor at making others laugh?`,
      `Do you make special effort not to be rude to others?`,
      `Are you the type who can't keep quiet when you find a mistake?`,
    ],
    [
      `Would you agree with someone just to avoid conflict?`,
      `Are you fairly satisfied with yourself as you are now?`,
      `Do you feel you are as sensitive as most people?`,
      `Do you like to always have something move you emotionally?`,
      `Are you an emotional person, and proud of it?`,
      `Do you dislike depending on others?`,
      `Do you agree with the philosophy, an eye for an eye?`,
      `Are you the type who rarely gets upset, no matter what the circumstance?`,
      `Do you love lively places with lots of people?`,
      `Do you feel that you have a great imagination?`,
      `Are you the type that soon forgets bad things that happen?`,
      `Do you hate having social life cut into your own private time?`,
      `Do you need time alone?`,
      `Do you hate relying on intuition or chance?`,
      `Are you harder on yourself than on others?`,
      `When you're planning something, do you concentrate on setting up a time-table first?`,
      `Do you do a lot of reflection upon your actions?`,
    ],
    undineOutro
  );

  scenario(
    `sylph`,
    [
      `Do you feel confident talking to most anyone?`,
      `When you're at your wit's end, do you lose the ability to think clearly?`,
      `Would you agree with someone just to avoid conflict?`,
      `If you see people quarreling, do you avoid getting involved?`,
      `Do you put off for tomorrow what you don't have to do today?`,
      `Can you perform monotonous tasks over and over if it's required of you?`,
      `Do you react emotionally to things only after some time has passed?`,
      `Do you feel like people don't understand you?`,
      `Do you wish to express yourself through art?`,
      `Are you easily hurt by the littlest of things?`,
      `Do you feel you are as sensitive as most people?`,
      `Do you like to always have something move you emotionally?`,
      `Are you an emotional person, and proud of it?`,
      `Do you find it hard to belong to groups that have strict rules?`,
      `Do you always believe in your self worth, even in the absence of others' approval?`,
      `Can you speak your mind without hesitation to almost everybody?`,
      `Do you feel you can protect those who depend on you?`,
      `Are you the type who rarely gets upset, no matter what the circumstance?`,
      `If something isn't clearly either black or white, do you feel unsettled?`,
      `Are you able to ignore what others think of you?`,
      `Do you follow your own path without giving way, no matter the consequences?`,
      `Do you often find yourself in the role of leading others?`,
      `Do you hate repeating the same task over and over?`,
      `If you see something new, do you immediately want to try it out?`,
      `Do you make an effort to entertain those around you?`,
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
      `Are you bothered by illogical or inconsistent things?`,
      `Do you hope to improve yourself at least a little each day?`,
      `Do you think that favoritism is a bad thing?`,
      `Do people often not notice when you are angry?`,
      `Do you do a lot of reflection upon your actions?`,
      `Are you rather poor at making others laugh?`,
      `Do you make special effort not to be rude to others?`,
      `Are you the type who can't keep quiet when you find a mistake?`,
    ],
    [
      `Do you think of yourself as an ordinary sort of person?`,
      `Are you fairly satisfied with yourself as you are now?`,
      `Do you feel that you can't change the world around you?`,
      `Are you more drawn to tragedy than comedy?`,
      `Do you frequently replay bad memories in your head?`,
      `If things don't go the way you think they should, do you lose interest?`,
      `Do you dislike depending on others?`,
      `Do you agree with the philosophy, an eye for an eye?`,
      `Do you try just about anything you're curious about?`,
      `Would you rather make compromises than bend over backwards to get things done?`,
      `Do you love lively places with lots of people?`,
      `When things get lively, would you rather just watch than participate?`,
      `Do you learn things by fully understanding them, not by rote memorization?`,
      `Are you sometimes criticized as being argumentative?`,
      `Do people who do things halfheartedly upset you?`,
      `Are you harder on yourself than on others?`,
      `When you're planning something, do you concentrate on setting up a time-table first?`,
    ],
    sylphOutro
  );

  scenario(
    `efreet`,
    [
      `Do you feel confident talking to most anyone?`,
      `When you're at your wit's end, do you lose the ability to think clearly?`,
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
      `Do you always believe in your self worth, even in the absence of others' approval?`,
      `Can you speak your mind without hesitation to almost everybody?`,
      `Do you feel you can protect those who depend on you?`,
      `If things don't go the way you think they should, do you lose interest?`,
      `Are you the type who rarely gets upset, no matter what the circumstance?`,
      `If something isn't clearly either black or white, do you feel unsettled?`,
      `Are you able to ignore what others think of you?`,
      `Do you follow your own path without giving way, no matter the consequences?`,
      `Do you often find yourself in the role of leading others?`,
      `Do you hate repeating the same task over and over?`,
      `If you see something new, do you immediately want to try it out?`,
      `Do you make an effort to entertain those around you?`,
      `Do you feel that you have a great imagination?`,
      `Are you the type that soon forgets bad things that happen?`,
      `Can you make friends easily with almost anyone?`,
      `Are you often overly-optimistic about getting something done, only to end up in a panic at the end?`,
      `Are you calm and even-tempered?`,
      `Are you bothered with noisy places filled with strangers?`,
      `Do you think things through thoroughly before you take action?`,
      `Do you hate having social life cut into your own private time?`,
      `Do you learn things by fully understanding them, not by rote memorization?`,
      `Are you sometimes criticized as being argumentative?`,
      `Are you bothered by illogical or inconsistent things?`,
      `Do you hope to improve yourself at least a little each day?`,
      `Do you think that favoritism is a bad thing?`,
      `When you're planning something, do you concentrate on setting up a time-table first?`,
      `Do you do a lot of reflection upon your actions?`,
      `Are you rather poor at making others laugh?`,
      `Do you make special effort not to be rude to others?`,
      `Are you the type who can't keep quiet when you find a mistake?`,
    ],
    [
      `Would you agree with someone just to avoid conflict?`,
      `If you see people quarreling, do you avoid getting involved?`,
      `Do you put off for tomorrow what you don't have to do today?`,
      `Are you an emotional person, and proud of it?`,
      `Do you frequently replay bad memories in your head?`,
      `Do you find it hard to belong to groups that have strict rules?`,
      `Do you dislike depending on others?`,
      `Do you agree with the philosophy, an eye for an eye?`,
      `Do you try just about anything you're curious about?`,
      `Would you rather make compromises than bend over backwards to get things done?`,
      `Do you love lively places with lots of people?`,
      `Do you need time alone?`,
      `Do you hate relying on intuition or chance?`,
      `When things get lively, would you rather just watch than participate?`,
      `Do people often not notice when you are angry?`,
      `Do people who do things halfheartedly upset you?`,
      `Are you harder on yourself than on others?`,
    ],
    efreetOutro
  );

  scenario(
    `gnome`,
    [
      `Do you feel confident talking to most anyone?`,
      `When you're at your wit's end, do you lose the ability to think clearly?`,
      `Would you agree with someone just to avoid conflict?`,
      `If you see people quarreling, do you avoid getting involved?`,
      `Are you fairly satisfied with yourself as you are now?`,
      `Do you feel that you can't change the world around you?`,
      `Do you react emotionally to things only after some time has passed?`,
      `Do you feel like people don't understand you?`,
      `Do you wish to express yourself through art?`,
      `Do you like to always have something move you emotionally?`,
      `Are you an emotional person, and proud of it?`,
      `Do you frequently replay bad memories in your head?`,
      `Do you find it hard to belong to groups that have strict rules?`,
      `Do you always believe in your self worth, even in the absence of others' approval?`,
      `Can you speak your mind without hesitation to almost everybody?`,
      `Do you feel you can protect those who depend on you?`,
      `If things don't go the way you think they should, do you lose interest?`,
      `Do you dislike depending on others?`,
      `Are you able to ignore what others think of you?`,
      `Do you follow your own path without giving way, no matter the consequences?`,
      `Do you often find yourself in the role of leading others?`,
      `Do you hate repeating the same task over and over?`,
      `If you see something new, do you immediately want to try it out?`,
      `Do you make an effort to entertain those around you?`,
      `Do you try just about anything you're curious about?`,
      `Do you feel that you have a great imagination?`,
      `Are you the type that soon forgets bad things that happen?`,
      `Can you make friends easily with almost anyone?`,
      `Are you often overly-optimistic about getting something done, only to end up in a panic at the end?`,
      `Are you calm and even-tempered?`,
      `Are you bothered with noisy places filled with strangers?`,
      `Do you think things through thoroughly before you take action?`,
      `Do you hate having social life cut into your own private time?`,
      `Do you learn things by fully understanding them, not by rote memorization?`,
      `Are you sometimes criticized as being argumentative?`,
      `Are you bothered by illogical or inconsistent things?`,
      `Do you hope to improve yourself at least a little each day?`,
      `Do you think that favoritism is a bad thing?`,
      `Do people often not notice when you are angry?`,
      `Do people who do things halfheartedly upset you?`,
      `Are you rather poor at making others laugh?`,
      `Do you make special effort not to be rude to others?`,
      `Are you the type who can't keep quiet when you find a mistake?`,
    ],
    [
      `Do you put off for tomorrow what you don't have to do today?`,
      `Can you perform monotonous tasks over and over if it's required of you?`,
      `Do you think of yourself as an ordinary sort of person?`,
      `Are you more drawn to tragedy than comedy?`,
      `Are you easily hurt by the littlest of things?`,
      `Do you feel you are as sensitive as most people?`,
      `Do you agree with the philosophy, an eye for an eye?`,
      `Are you the type who rarely gets upset, no matter what the circumstance?`,
      `If something isn't clearly either black or white, do you feel unsettled?`,
      `Would you rather make compromises than bend over backwards to get things done?`,
      `Do you love lively places with lots of people?`,
      `Do you need time alone?`,
      `Do you hate relying on intuition or chance?`,
      `When things get lively, would you rather just watch than participate?`,
      `Are you harder on yourself than on others?`,
      `When you're planning something, do you concentrate on setting up a time-table first?`,
      `Do you do a lot of reflection upon your actions?`,
    ],
    gnomeOutro
  );

  scenario(
    `celsius`,
    [
      `Do you feel confident talking to most anyone?`,
      `When you're at your wit's end, do you lose the ability to think clearly?`,
      `Would you agree with someone just to avoid conflict?`,
      `If you see people quarreling, do you avoid getting involved?`,
      `Do you put off for tomorrow what you don't have to do today?`,
      `Can you perform monotonous tasks over and over if it's required of you?`,
      `Do you react emotionally to things only after some time has passed?`,
      `Do you feel like people don't understand you?`,
      `Do you wish to express yourself through art?`,
      `Do you like to always have something move you emotionally?`,
      `Are you an emotional person, and proud of it?`,
      `Do you frequently replay bad memories in your head?`,
      `Do you find it hard to belong to groups that have strict rules?`,
      `Do you always believe in your self worth, even in the absence of others' approval?`,
      `Can you speak your mind without hesitation to almost everybody?`,
      `Do you feel you can protect those who depend on you?`,
      `If things don't go the way you think they should, do you lose interest?`,
      `Do you dislike depending on others?`,
      `Are you able to ignore what others think of you?`,
      `Do you follow your own path without giving way, no matter the consequences?`,
      `Do you often find yourself in the role of leading others?`,
      `Do you hate repeating the same task over and over?`,
      `If you see something new, do you immediately want to try it out?`,
      `Do you love lively places with lots of people?`,
      `Do you feel that you have a great imagination?`,
      `Are you the type that soon forgets bad things that happen?`,
      `Can you make friends easily with almost anyone?`,
      `Are you often overly-optimistic about getting something done, only to end up in a panic at the end?`,
      `Are you calm and even-tempered?`,
      `Are you bothered with noisy places filled with strangers?`,
      `Do you think things through thoroughly before you take action?`,
      `Do you hate relying on intuition or chance?`,
      `When things get lively, would you rather just watch than participate?`,
      `Do you learn things by fully understanding them, not by rote memorization?`,
      `Are you sometimes criticized as being argumentative?`,
      `Are you bothered by illogical or inconsistent things?`,
      `Do you hope to improve yourself at least a little each day?`,
      `Do you think that favoritism is a bad thing?`,
      `Do people often not notice when you are angry?`,
      `Do you do a lot of reflection upon your actions?`,
      `Are you rather poor at making others laugh?`,
      `Do you make special effort not to be rude to others?`,
      `Are you the type who can't keep quiet when you find a mistake?`,
    ],
    [
      `Do you think of yourself as an ordinary sort of person?`,
      `Are you fairly satisfied with yourself as you are now?`,
      `Do you feel that you can't change the world around you?`,
      `Are you more drawn to tragedy than comedy?`,
      `Are you easily hurt by the littlest of things?`,
      `Do you feel you are as sensitive as most people?`,
      `Do you agree with the philosophy, an eye for an eye?`,
      `Are you the type who rarely gets upset, no matter what the circumstance?`,
      `If something isn't clearly either black or white, do you feel unsettled?`,
      `Do you make an effort to entertain those around you?`,
      `Do you try just about anything you're curious about?`,
      `Would you rather make compromises than bend over backwards to get things done?`,
      `Do you hate having social life cut into your own private time?`,
      `Do you need time alone?`,
      `Do people who do things halfheartedly upset you?`,
      `Are you harder on yourself than on others?`,
      `When you're planning something, do you concentrate on setting up a time-table first?`,
    ],
    celsiusOutro
  );

  scenario(
    `volt`,
    [
      `If you see people quarreling, do you avoid getting involved?`,
      `Do you put off for tomorrow what you don't have to do today?`,
      `Can you perform monotonous tasks over and over if it's required of you?`,
      `Do you think of yourself as an ordinary sort of person?`,
      `Are you fairly satisfied with yourself as you are now?`,
      `Do you feel that you can't change the world around you?`,
      `Do you react emotionally to things only after some time has passed?`,
      `Do you feel like people don't understand you?`,
      `Do you wish to express yourself through art?`,
      `Do you like to always have something move you emotionally?`,
      `Are you an emotional person, and proud of it?`,
      `Do you frequently replay bad memories in your head?`,
      `Do you find it hard to belong to groups that have strict rules?`,
      `Do you always believe in your self worth, even in the absence of others' approval?`,
      `Can you speak your mind without hesitation to almost everybody?`,
      `Do you feel you can protect those who depend on you?`,
      `If things don't go the way you think they should, do you lose interest?`,
      `Do you dislike depending on others?`,
      `Are you able to ignore what others think of you?`,
      `Do you follow your own path without giving way, no matter the consequences?`,
      `Do you often find yourself in the role of leading others?`,
      `Do you hate repeating the same task over and over?`,
      `Would you rather make compromises than bend over backwards to get things done?`,
      `Do you love lively places with lots of people?`,
      `Do you feel that you have a great imagination?`,
      `Are you the type that soon forgets bad things that happen?`,
      `Can you make friends easily with almost anyone?`,
      `Are you often overly-optimistic about getting something done, only to end up in a panic at the end?`,
      `Are you calm and even-tempered?`,
      `Are you bothered with noisy places filled with strangers?`,
      `Do you think things through thoroughly before you take action?`,
      `When things get lively, would you rather just watch than participate?`,
      `Do you learn things by fully understanding them, not by rote memorization?`,
      `Are you sometimes criticized as being argumentative?`,
      `Are you bothered by illogical or inconsistent things?`,
      `Do you hope to improve yourself at least a little each day?`,
      `Do you think that favoritism is a bad thing?`,
      `Do people often not notice when you are angry?`,
      `When you're planning something, do you concentrate on setting up a time-table first?`,
      `Do you do a lot of reflection upon your actions?`,
      `Are you rather poor at making others laugh?`,
      `Do you make special effort not to be rude to others?`,
      `Are you the type who can't keep quiet when you find a mistake?`,
    ],
    [
      `Do you feel confident talking to most anyone?`,
      `When you're at your wit's end, do you lose the ability to think clearly?`,
      `Would you agree with someone just to avoid conflict?`,
      `Are you more drawn to tragedy than comedy?`,
      `Are you easily hurt by the littlest of things?`,
      `Do you feel you are as sensitive as most people?`,
      `Do you agree with the philosophy, an eye for an eye?`,
      `Are you the type who rarely gets upset, no matter what the circumstance?`,
      `If something isn't clearly either black or white, do you feel unsettled?`,
      `If you see something new, do you immediately want to try it out?`,
      `Do you make an effort to entertain those around you?`,
      `Do you try just about anything you're curious about?`,
      `Do you hate having social life cut into your own private time?`,
      `Do you need time alone?`,
      `Do you hate relying on intuition or chance?`,
      `Do people who do things halfheartedly upset you?`,
      `Are you harder on yourself than on others?`,
    ],
    voltOutro
  );

  const tiebreakerYes = [
    `Do you feel confident talking to most anyone?`,
    `When you're at your wit's end, do you lose the ability to think clearly?`,
    `Would you agree with someone just to avoid conflict?`,
    `Do you think of yourself as an ordinary sort of person?`,
    `Are you fairly satisfied with yourself as you are now?`,
    `Do you feel that you can't change the world around you?`,
    `Do you react emotionally to things only after some time has passed?`,
    `Do you feel like people don't understand you?`,
    `Do you wish to express yourself through art?`,
    `Do you like to always have something move you emotionally?`,
    `Are you an emotional person, and proud of it?`,
    `Do you frequently replay bad memories in your head?`,
    `Do you find it hard to belong to groups that have strict rules?`,
    `Do you always believe in your self worth, even in the absence of others' approval?`,
    `Can you speak your mind without hesitation to almost everybody?`,
    `Do you feel you can protect those who depend on you?`,
    `If things don't go the way you think they should, do you lose interest?`,
    `Do you dislike depending on others?`,
    `Are you able to ignore what others think of you?`,
    `Do you follow your own path without giving way, no matter the consequences?`,
    `Do you often find yourself in the role of leading others?`,
    `Do you hate repeating the same task over and over?`,
    `If you see something new, do you immediately want to try it out?`,
    `Do you make an effort to entertain those around you?`,
    `Do you try just about anything you're curious about?`,
    `Would you rather make compromises than bend over backwards to get things done?`,
    `Can you make friends easily with almost anyone?`,
    `Are you often overly-optimistic about getting something done, only to end up in a panic at the end?`,
    `Are you calm and even-tempered?`,
    `Are you bothered with noisy places filled with strangers?`,
    `Do you hate relying on intuition or chance?`,
    `When things get lively, would you rather just watch than participate?`,
    `Do you learn things by fully understanding them, not by rote memorization?`,
    `Are you sometimes criticized as being argumentative?`,
    `Are you bothered by illogical or inconsistent things?`,
    `Do you hope to improve yourself at least a little each day?`,
    `Do you think that favoritism is a bad thing?`,
    `Do people often not notice when you are angry?`,
    `Do you do a lot of reflection upon your actions?`,
    `Are you rather poor at making others laugh?`,
    `Do you make special effort not to be rude to others?`,
    `Are you the type who can't keep quiet when you find a mistake?`,
  ];

  const tiebreakerNo = [
    `If you see people quarreling, do you avoid getting involved?`,
    `Do you put off for tomorrow what you don't have to do today?`,
    `Can you perform monotonous tasks over and over if it's required of you?`,
    `Are you more drawn to tragedy than comedy?`,
    `Are you easily hurt by the littlest of things?`,
    `Do you feel you are as sensitive as most people?`,
    `Do you agree with the philosophy, an eye for an eye?`,
    `Are you the type who rarely gets upset, no matter what the circumstance?`,
    `If something isn't clearly either black or white, do you feel unsettled?`,
    `Do you love lively places with lots of people?`,
    `Do you feel that you have a great imagination?`,
    `Are you the type that soon forgets bad things that happen?`,
    `Do you think things through thoroughly before you take action?`,
    `Do you hate having social life cut into your own private time?`,
    `Do you need time alone?`,
    `Do people who do things halfheartedly upset you?`,
    `Are you harder on yourself than on others?`,
    `When you're planning something, do you concentrate on setting up a time-table first?`,
  ];

  scenario(
    `undine tiebreaker`,
    tiebreakerYes,
    [
      ...tiebreakerNo,
      `Do you like being alone more than being with a crowd?`,
      `Do you fight to the bitter end, no matter the opposition?`,
      `Do you hate repetitive tasks?`,
    ],
    undineOutro
  );

  scenario(
    `gnome tiebreaker`,
    [...tiebreakerYes, `Do you hate repetitive tasks?`],
    [
      ...tiebreakerNo,
      `Do you like being alone more than being with a crowd?`,
      `Do you fight to the bitter end, no matter the opposition?`,
    ],
    gnomeOutro
  );

  scenario(
    `efreet tiebreaker`,
    [
      ...tiebreakerYes,
      `Do you fight to the bitter end, no matter the opposition?`,
    ],
    [...tiebreakerNo, `Do you like being alone more than being with a crowd?`],
    efreetOutro
  );

  scenario(
    `volt tiebreaker`,
    [...tiebreakerYes, `Do you like being alone more than being with a crowd?`],
    [
      ...tiebreakerNo,
      `When you see a sloppy person, do you wonder why they're sloppy rather than get upset?`,
      `Do you sometimes act on the emotion of the moment?`,
    ],
    voltOutro
  );

  scenario(
    `celsius tiebreaker`,
    [
      ...tiebreakerYes,
      `Do you like being alone more than being with a crowd?`,
      `When you see a sloppy person, do you wonder why they're sloppy rather than get upset?`,
    ],
    [...tiebreakerNo, `Do you sometimes act on the emotion of the moment?`],
    celsiusOutro
  );

  scenario(
    `sylph tiebreaker`,
    [
      ...tiebreakerYes,
      `Do you like being alone more than being with a crowd?`,
      `Do you sometimes act on the emotion of the moment?`,
    ],
    [...tiebreakerNo],
    sylphOutro
  );

  scenario(`skip to end`);
});
