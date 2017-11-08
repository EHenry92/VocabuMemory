/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Dictionary, Word} = require('../server/db/models')
const satList = [
  {word: 'abject', definition: 'of the most contemptible kind'},
  {word: 'aberration', definition: 'a state or condition markedly different from the norm'},
  {word: 'abjure', definition: 'formally reject or disavow a formerly held belief'},
  {word: 'abnegation', definition: 'the denial and rejection of a doctrine or belief'},
  {word: 'abrogate', definition: 'revoke formally'},
  {word: 'abscond', definition: 'run away, often taking something or somebody along'},
  {word:  'abstruse', definition: 'difficult to penetrate'},
  {word:  'accede', definition: "yield to another's wish or opinion"},
  {word:  'accost', definition: 'approach and speak to someone aggressively or insistently'},
  {word:  'accretion', definition: 'an increase by natural growth or addition'},
  {word: ' acumen', definition: 'shrewdness shown by keen insight'},
  {word:  'adamant', definition: 'impervious to pleas, persuasion, requests, reason'},
  {word:  'admonish', definition: 'scold or reprimand; take to task'},
  {word:  'adumbrate', definition: 'describe roughly or give the main points or summary of'},
  {word:  'adverse', definition: 'in an opposing direction'},
  {word:  'advocate', definition: 'a person who pleads for a person, cause, or idea'},
  {word:  'affluent', definition: 'having an abundant supply of money or possessions of value'},
  {word:  'aggrandize', definition: 'embellish; increase the scope, power, or importance of'},
  {word:  'alacrity', definition: 'liveliness and eagerness'},
  {word:  'alias', definition: 'a name that has been assumed temporarily'},
  {word:  'ambivalent', definition: 'uncertain or unable to decide about what course to follow'},
  {word:  'amenable', definition: 'disposed or willing to comply'},
  {word:  'amorphous', definition: 'having no definite form or distinct shape'},
  {word:  'anachronistic', definition: 'chronologically misplaced'},
  {word: ' anathema', definition: 'a formal ecclesiastical curse accompanied by excommunication'},
  {word:  'annex', definition: 'attach to'},
  {word:  'antediluvian', definition: 'of or relating to the period before the biblical flood'},
  {word:  'antiseptic', definition: 'thoroughly clean and free of disease-causing organisms'},
  {word:  'apathetic', definition: 'showing little or no emotion or animation'},
  {word:  'antithesis', definition: 'exact opposite'},
  {word:  'apocryphal', definition: 'being of questionable authenticity'},
  {word:  'approbation', definition: 'official approval'},
  {word:  'arbitrary', definition: 'based on or subject to individual discretion or preference'},
  {word:  'arboreal', definition: 'of or relating to or formed by trees'},
  {word:  'arcane', definition: 'requiring secret or mysterious knowledge'},
  {word:  'archetypal', definition: 'of an original type after which other things are patterned'},
  {word:  'arrogate', definition: 'seize and take control without authority'},
  {word:  'ascetic', definition: 'someone who practices self denial as a spiritual discipline'},
  {word:  'aspersion', definition: 'a disparaging remark'},
  {word:  'assiduous', definition: 'marked by care and persistent effort'},
  {word:  'atrophy', definition: 'a decrease in size of an organ caused by disease or disuse'},
  {word:  'bane', definition: 'something causing misery or death'},
  {word: 'bashful', definition: 'self-consciously timid'},
  {word: 'beguile', definition: 'influence by slyness'},
  {word: 'bereft', definition: 'sorrowful through loss or deprivation'},
  {word: 'blandishment', definition: 'flattery intended to persuade'},
  {word: 'bilk', definition: 'cheat somebody out of what is due, especially money'},
  {word: 'bombastic', definition: 'ostentatiously lofty in style'},
  {word: 'cajole', definition: 'influence or urge by gentle urging, caressing, or flattering'},
  {word:  'callous', definition: 'emotionally hardened'},
  {word: 'calumny', definition: 'a false accusation of an offense'},
  {word: 'camaraderie', definition: 'the quality of affording easy familiarity and sociability'},
  {word: 'candor', definition: 'the quality of being honest and straightforward'},
  {word: 'capitulate', definition: 'surrender under agreed conditions'},
  {word: 'carouse', definition: 'engage in boisterous, drunken merrymaking'},
  {word: 'carp', definition: 'any of various freshwater fish of the family Cyprinidae'},
  {word: 'caucus', definition: 'meet to select a candidate or promote a policy'},
  {word: 'cavort', definition: 'play boisterously'},
  {word: 'circumlocution', definition: 'an indirect way of expressing something'},
  {word: 'circumscribe', definition: 'draw a geometric figure around another figure'},
  {word: 'circumvent', definition: 'surround so as to force to give up'},
  {word: 'clamor', definition: 'utter or proclaim insistently and noisily'},
  {word: 'cleave', definition: 'separate or cut with a tool, such as a sharp instrument'},
  {word: 'cobbler', definition: 'a person who makes or repairs shoes'},
  {word: 'cogent', definition: 'powerfully persuasive'},
  {word: 'cognizant', definition: 'having or showing knowledge or understanding or realization'},
  {word: 'commensurate', definition: 'corresponding in size or degree or extent'},
  {word: 'complement', definition: 'something added to embellish or make perfect'},
  {word: 'compunction', definition: 'a feeling of deep regret, usually for some misdeed'},
  {word: 'concomitant', definition: 'following or accompanying as a consequence'},
  {word: 'conduit', definition: 'a passage through which water or electric wires can pass'},
  {word: 'conflagration', definition: 'a very intense and uncontrolled fire'},
  {word: 'congruity', definition: 'the quality of agreeing; being suitable and appropriate'},
  {word: 'connive', definition: 'form intrigues (for) in an underhand manner'},
  {word: 'consign', definition: 'give over to another for care or safekeeping'},
  {word: 'constituent', definition: 'one of the individual parts making up a composite entity'},
  {word: 'construe', definition: 'make sense of; assign a meaning to'},
  {word: 'contusion', definition: 'an injury in which the skin is not broken'},
  {word: 'contrite', definition: 'feeling or expressing pain or sorrow for sins or offenses'},
  {word: 'contentious', definition: 'showing an inclination to disagree'},
  {word: 'contravene', definition: 'go against, as of rules and laws'},
  {word: 'convivial', definition: 'occupied with or fond of the pleasures of good company'},
  {word: 'corpulence', definition: 'the property of excessive fatness'},
  {word: 'covet', definition: 'wish, long, or crave for'},
  {word: 'cupidity', definition: 'extreme greed for material wealth'},
  {word: 'dearth', definition: 'an insufficient quantity or number'},
  {word: 'debacle', definition: 'a sudden and violent collapse'},
  {word: 'debauch', definition: 'a wild gathering involving excessive drinking'},
  {word: 'debunk', definition: 'expose while ridiculing'},
  {word: 'defunct', definition: 'no longer in force or use; inactive'},
  {word: 'demagogue', definition: 'a leader who seeks support by appealing to popular passions'},
  {word: 'denigrate', definition: 'charge falsely or with malicious intent'},
  {word: 'derivative', definition:' a compound obtained from another compound'},
  {word: 'despot', definition: 'a cruel and oppressive dictator'},
  {word: 'diaphanous', definition: 'so thin as to transmit light'},
  {word: 'didactic', definition: 'instructive, especially excessively'},
  {word: 'dirge', definition: 'a song or hymn of mourning as a memorial to a dead person'},
  {word: 'disaffected', definition: 'discontented as toward authority'},
  {word: 'discomfit', definition: "cause to lose one's composure"},
  {word: 'disparate', definition: 'fundamentally different or distinct in quality or kind'},
  {word: 'dispel', definition: 'to cause to separate and go in different directions'},
  {word: 'disrepute', definition: 'the state of being held in low esteem'},
  {word: 'divisive', definition: 'dissenting with the majority opinion'},
  {word: 'dogmatic', definition: 'pertaining to a code of beliefs accepted as authoritative'},
  {word: 'dour', definition: 'showing a brooding ill humor'},
  {word: 'duplicity', definition: 'acting in bad faith'},
  {word: 'duress', definition: 'compulsory force or threat'},
  {word: 'eclectic', definition: 'selecting what seems best of various styles or ideas'},
  {word: 'edict', definition: 'a formal or authoritative proclamation'},
  {word: 'ebullient', definition: 'joyously unrestrained'},
  {word: 'egregious', definition: 'conspicuously and outrageously bad or reprehensible'},
  {word: 'elegy', definition: 'a mournful poem; a lament for the dead'},
  {word:  'elicit', definition: 'call forth, as an emotion, feeling, or response'},
  {word:  'embezzlement', definition: 'the fraudulent appropriation of funds or property'},
  {word:  'emend', definition: 'make corrections to'},
  {word:  'emollient', definition: 'a substance with a soothing effect when applied to the skin'},
  {word:  'empirical', definition: 'derived from experiment and observation rather than theory'},
  {word:  'emulate', definition: 'strive to equal or match, especially by imitating'},
  {word:  'enervate', definition: 'weaken mentally or morally'},
  {word:  'enfranchise', definition: 'grant freedom to, as from slavery or servitude'},
  {word:  'engender', definition: 'call forth'},
  {word:  'ephemeral', definition: 'anything short-lived, as an insect that lives only for a day'},
  {word:  'epistolary', definition: 'written in the form of letters or correspondence'},
  {word:  'equanimity', definition: 'steadiness of mind under stress'},
  {word:  'equivocal', definition: 'open to two or more interpretations'},
  {word:  'espouse', definition: 'choose and follow a theory, idea, policy, etc.'},
  {word:  'evanescent', definition: 'tending to vanish like vapor'},
  {word:  'evince', definition: 'give expression to'},
  {word:  'exacerbate', definition: 'make worse'},
  {word:  'exhort', definition: 'spur on or encourage especially by cheers and shouts'},
  {word:  'execrable', definition: 'unequivocally detestable'},
  {word:  'exigent', definition: 'demanding immediate attention'},
  {word:  'expedient', definition: 'appropriate to a purpose'},
  {word:  'expiate', definition: 'make amends for'},
  {word:  'expunge', definition: 'remove by erasing or crossing out or as if by drawing a line'},
  {word:  'extraneous', definition: 'not belonging to that in which it is contained'},
  {word:  'extol', definition: 'praise, glorify, or honor'},
  {word:  'extant', definition: 'still in existence; not extinct or destroyed or lost'},
  {word:  'expurgate', definition: 'edit by omitting or modifying parts considered indelicate'},
  {word:  'fallacious', definition: 'containing or based on incorrect reasoning'},
  {word:  'fatuous', definition: 'devoid of intelligence'},
  {word:  'fetter', definition: 'a shackle for the ankles or feet'},
  {word:  'flagrant', definition: 'conspicuously and outrageously bad or reprehensible'},
  {word:  'foil', definition: 'hinder or prevent, as an effort, plan, or desire'},
  {word:  'forbearance', definition: 'good-natured tolerance of delay or incompetence'},
  {word:  'fortuitous', definition: 'occurring by happy chance'},
  {word:  'fractious', definition: 'easily irritated or annoyed'},
  {word:  'garrulous', definition: 'full of trivial conversation'},
  {word:  'gourmand', definition: 'a person who is devoted to eating and drinking to excess'},
  {word:  'grandiloquent', definition: 'lofty in style'},
  {word:  'gratuitous', definition: 'unnecessary and unwarranted'},
  {word:  'hapless', definition: 'unfortunate and deserving pity'},
  {word:  'hegemony', definition: 'the dominance or leadership of one social group over others'},
  {word:  'heterogenous', definition: 'consisting of elements that are not of the same kind'},
  {word:  'iconoclast', definition: 'someone who attacks cherished ideas or institutions'},
  {word:  'idiosyncratic', definition: 'peculiar to the individual'},
  {word:  'impecunious', definition: 'not having enough money to pay for necessities'},
  {word:  'impetuous', definition: 'characterized by undue haste and lack of thought'},
  {word:  'impinge', definition: 'infringe upon'},
  {word:  'impute', definition: 'attribute or credit to'}
];

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'evlis@email.com', password: '789', admin: true})

  ])

  const dictionaries = await Promise.all([
    Dictionary.create({title: 'SAT Words', image: 'https://www.usnews.com/dims4/USNEWS/6265f15/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F96%2F8b%2F55ff0c9b43eb955698a681c6238e%2Fresizes%2F1500%2F160318-sat-stock.jpg'})
    .then(dictionary => {
      for (var i = 0; i < satList.length; i++){
        dictionary.createWord({
          word: satList[i].word,
          definition: satList[i].definition,
          level: 10,
          verified: true
        })
      }
    })
    .catch(err => console.log(err))
    ,
    Dictionary.create({title: 'Elementry Math', image: 'https://cdn.themeasuredmom.com/wp-content/uploads/2015/02/block-play.jpg'})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${dictionaries.length} dictionaries`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
