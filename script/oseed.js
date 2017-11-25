const db = require('../server/db')
const {User, Dictionary, Word, Group} = require('../server/db/models')
const satList = [
  {word: 'abject', definition: 'of the most contemptible kind', sentence: 'While I am feeling a little sad at the moment, I do not plan on being abject for much longer.'},
  {word: 'aberration', definition: 'a state or condition markedly different from the norm', sentence: 'A person with one blue eye and one green eye is said to have a genetic aberration.'},
  {word: 'abjure', definition: 'formally reject or disavow a formerly held belief', sentence: 'Even though Tom made a promise to abjure from criminal acts, he continued to break the law.'},
  {word: 'abnegation', definition: 'the denial and rejection of a doctrine or belief', sentence: 'After growing up in a very religious household, Cara knew a great deal about the abnegation of materialistic items'},
  {word: 'abrogate', definition: 'revoke formally', sentence: 'If you talk out loud in class, I will abrogate your right to choose where to sit.'},
  {word: 'abscond', definition: 'run away, often taking something or somebody along', sentence: 'The robbers’ plan was to abscond with all of the millionaire’s valuable paintings and jewels.'},
  {word:  'abstruse', definition: 'difficult to penetrate', sentence: 'Some of the classic novels are too abstruse for beginning readers to understand.'},
  {word: 'accede', definition: "yield to another's wish or opinion", sentence: 'At your insistence and to avoid a prolonged argument, I will accede to your contract terms.'},
  {word:  'accost', definition: 'approach and speak to someone aggressively or insistently', sentence: 'The policemen asked Greg to describe the man who accosted him.'},
  {word:  'accretion', definition: 'an increase by natural growth or addition', sentence: 'Sophia was convinced that the accretion of ice on her car’s windshield was preventing her wipers from operating correctly.'},
  {word: ' acumen', definition: 'shrewdness shown by keen insight', sentence: 'John’s business acumen, along with his computer skills, made him an asset to the software company.'},
  {word:  'adamant', definition: 'impervious to pleas, persuasion, requests, reason', sentence: 'He is so adamant in his beliefs that no one can change his mind!'},
  {word:  'admonish', definition: 'scold or reprimand; take to task', sentence: 'I hope my boss does not admonish me for being late.'},
  {word:  'adumbrate', definition: 'describe roughly or give the main points or summary of', sentence: 'When my mother lit the candle in the darkness, it was nice to see the light adumbrate our shadows on the wall.'},
  {word:  'adverse', definition: 'in an opposing direction', sentence: 'Adverse weather conditions forced us to pull off of the road and wait until things cleared up.'},
  {word:  'bane', definition: 'something causing misery or death', sentence: 'In Dr. Seuss’s famous story, the Grinch was the bane of Christmas in Whoville, but ultimately his cold heart could not stand up to the true Christmas spirit.'},
  {word: 'bashful', definition: 'self-consciously timid', sentence: 'Because Sally is bashful she won’t speak in public.'},
  {word: 'beguile', definition: 'influence by slyness', sentence: 'The realtor hoped to beguile buyers by decorating the house with fancy furnishings.'},
  {word: 'bereft', definition: 'sorrowful through loss or deprivation', sentence: 'After learning she had won the lottery, Betty was bereft of speech.'},
  {word: 'blandishment', definition: 'flattery intended to persuade', sentence: 'Despite his nervousness at meeting his in-laws, Dylan was able to offer just the right blandishment to get their approval.'},
  {word: 'bilk', definition: 'cheat somebody out of what is due, especially money', sentence: 'She hoped it was clear that this charity was not just another way to bilk citizens out of what little funds they had.'},
  {word: 'bombastic', definition: 'ostentatiously lofty in style', sentence: 'The cheerleading squad led the crowd in bombastic cheers. '},
];
const sensoryWords = [
  {word: 'damp', definition: 'slightly wet',image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjSxcOPibrXAhUc0IMKHW1LBSQQjRwIBw&url=http%3A%2F%2Fwww.envirovent.com%2Fblog%2Fkeep-condensation-and-damp-out-this-winter%2F&psig=AOvVaw1n5ycDdw5aZCvh9VbALFKL&ust=1510611615451846'},
  {word: 'sharp', definition: 'having an edge or point that is able to cut or pierce something.',image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.mcourts-haberdashery.co.uk%2Fekmps%2Fshops%2Fdonnablackman%2Fimages%2Fa30sr-8-1-2-serra-sharp-scissors-794-p.jpg&imgrefurl=http%3A%2F%2Fwww.mcourts-haberdashery.co.uk%2Fa30sr---8-12-serra-sharp-scissors-794-p.asp&docid=myBpLvHXjxGNyM&tbnid=S2adSTC1lNpzQM%3A&vet=10ahUKEwj4_azHirrXAhVFSSYKHdo2CT0QMwilASgDMAM..i&w=600&h=338&safe=strict&bih=696&biw=721&q=sharp%20sissors&ved=0ahUKEwj4_azHirrXAhVFSSYKHdo2CT0QMwilASgDMAM&iact=mrc&uact=8'},
  {word: 'burning', definition: 'very hot or bright',image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fblog.theclymb.com%2Fwp-content%2Fuploads%2F2013%2F08%2FCaveman-Campfire.jpg&imgrefurl=http%3A%2F%2Fwww.theclymb.com%2Fstories%2Fout-there%2F6-camp-recipes-so-easy-a-caveman-could-make-them%2F&docid=r5Hp33I4RVBwJM&tbnid=Jzd6kUTn4e_5rM%3A&vet=10ahUKEwjN9OPMibrXAhXDLSYKHZhrDTcQMwj4ASgFMAU..i&w=550&h=368&safe=strict&bih=696&biw=721&q=camp%20fire&ved=0ahUKEwjN9OPMibrXAhXDLSYKHZhrDTcQMwj4ASgFMAU&iact=mrc&uact=8'},
  {word: 'snoring', definition: 'breathe sound while asleep',image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.jdshospital.com%2Fwp-content%2Fuploads%2F2011%2F03%2Fme-snoring.jpg&imgrefurl=http%3A%2F%2Fwww.jdshospital.com%2Fsnoring%2F&docid=UPzLmE7nLvT6dM&tbnid=N5YMhmT7K6t1QM%3A&vet=10ahUKEwiS7PPjibrXAhXINSYKHRTOCFQQMwiVAigEMAQ..i&w=300&h=216&safe=strict&bih=696&biw=721&q=snoring&ved=0ahUKEwiS7PPjibrXAhXINSYKHRTOCFQQMwiVAigEMAQ&iact=mrc&uact=8'},
  {word: 'sloppy', definition: 'messy',image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj449X5ibrXAhUE34MKHe0nA4MQjRwIBw&url=https%3A%2F%2Fwww.c2educate.com%2Fblog%2Fwhy-a-messy-bedroom-might-do-lasting-harm%2F&psig=AOvVaw2N_nhr6WjyWO5FS14Whu8O&ust=1510611886292328'},
  {word: 'whisper', definition: 'speak very softly',image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fclipart-library.com%2Fdata_images%2F53083.jpg&imgrefurl=http%3A%2F%2Fclipart-library.com%2Fwhisper-cliparts.html&docid=CKdK6qJSWhW7CM&tbnid=pElMZP_kp26xpM%3A&vet=10ahUKEwjb9OuDirrXAhWGYiYKHYxFDGYQMwjKASgIMAg..i&w=800&h=559&safe=strict&bih=696&biw=721&q=whisper&ved=0ahUKEwjb9OuDirrXAhWGYiYKHYxFDGYQMwjKASgIMAg&iact=mrc&uact=8'},
  {word: 'mushy', definition: 'soft and pulpy' , image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.seriouseats.com%2Frecipes%2Fassets_c%2F2012%2F07%2F201207-216410-british-bites-mushy-peas-thumb-625xauto-260323.jpg&imgrefurl=http%3A%2F%2Fwww.seriouseats.com%2Frecipes%2F2012%2F07%2Fmushy-peas-british-recipe.html&docid=uHH-pR1R1-SNYM&tbnid=QWtPvcJZGfbUeM%3A&vet=10ahUKEwjLi7uNirrXAhWBOSYKHTjOBZEQMwg_KAAwAA..i&w=625&h=469&safe=strict&bih=696&biw=721&q=mushy&ved=0ahUKEwjLi7uNirrXAhWBOSYKHTjOBZEQMwg_KAAwAA&iact=mrc&uact=8'},
  {word: 'rotten', definition: 'suffering from decay.',image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjWm4itirrXAhVsw4MKHYpaABQQjRwIBw&url=http%3A%2F%2Fsni.scholastic.com%2FSN1%2F10_03_15_SN1%2F&psig=AOvVaw18n4ksFTfh8T0Plo7d-5J2&ust=1510611970924867'},
]
const mathList = [
  {word: 'sum', definition: 'an amount added together'},
  {word: 'difference', definition: 'the result of subtracting two numbers'},
  {word: 'product', definition: 'the result of multiplying two numbers'},
  {word: 'quotient', definition: 'the result of dividng two numbers'},
  {word: 'improper fraction', definition: 'a fraction whose numberator is greater than its denominator'},
  {word: 'absolute value', definition: 'the distance between a number and zero'},
  {word: 'evaluate', definition: 'find the value of'},
  {word: 'degree', definition: 'the unit of measure of an angle'},
  {word: 'equation', definition: 'a mathematical statment that sets two expressions equal to each other'},
  {word: 'graph', definition: 'a type of drawing used to represent data'},
  {word: 'mixed number', definition: 'a number written as a whole number and a fraction'},
  {word: 'integer', definition: 'positive and negative numbers'},
  {word: 'congruent', definition: 'figures or angles that have the same size and same shape'},
  {word: 'similar', definition: 'figures or angles that have the same shape but different sizes'}
]





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
    Dictionary.create({title: 'Sensory Words', image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiKqtmXjLrXAhWf0YMKHfSpAFkQjRwIBw&url=https%3A%2F%2Fercare24.com%2Ffive-senses%2F&psig=AOvVaw07I5ff4QpSlCb8Xmf4RIZ2&ust=1510612485883176'})
    .then(book => {
      for (var m = 0; m < sensoryWords.length; m++)  {
        book.createWord({
          word: sensoryWords[m].word,
          definition: sensoryWords[m].definition,
          verified: true,
          image: sensoryWords[m].image
        })
      }
    })
    .catch(err => console.log(err)),
    Dictionary.create({title: 'SAT Words', image: 'https://www.usnews.com/dims4/USNEWS/6265f15/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F96%2F8b%2F55ff0c9b43eb955698a681c6238e%2Fresizes%2F1500%2F160318-sat-stock.jpg'})
    .then(dictionary => {
      for (var i = 0; i < satList.length; i++){
        dictionary.createWord({
          word: satList[i].word,
          definition: satList[i].definition,
          level: 5,
          sentence: satList[i].sentence,
          image: satList[i].image,
          verified: true
        })
      }
    })
    .catch(err => console.log(err))
    ,
    Dictionary.create({title: 'Elementry Math', image: 'https://cdn.themeasuredmom.com/wp-content/uploads/2015/02/block-play.jpg'})
    .then(dictionary => {
      for (var i = 0; i < mathList.length; i++){
        dictionary.createWord({
          word: mathList[i].word,
          definition: mathList[i].definition,
          level: 2,
          image: mathList[i].image,
          sentence: mathList[i].sentence,
          verified: true
        })
      }
    })
    .catch(err => console.log(err))
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
seed({force: true})
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    console.log('db connection closed')
    db.close()
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')


const thirdGrade = [
  {word: 'multiply', definition: 'obtain from (a number) another that contains the first number a specified number of times'},
  {word: 'product'},
  {word: 'divide', definition: 'seperate or be seperated into parts'},
  {word: 'quotient', definitions: 'a result obtained by dividing one quantity by another'},
  {word: 'array'},
  {word: 'even' },
  {word: 'odd' },
  {word: 'fraction bar'},
  {word: 'numerator'},
  {word: 'denominator'},
  {word: 'area'},
  {word: 'perimeter'},
  {word: 'quadrilaterals'},
  {word: 'equivalent'},
  {word: 'variable'},
  {word: 'factor'}
]

const fourthGrade = [
  {word: 'Multiples'},
  {word: 'prime'},
  {word: 'composite'},
  {word: 'equation'},
  {word: 'mixed number'},
  {word: 'improper fraction'},
  {word: 'decimal'},
  {word: 'lineplot'},
  {word: 'degrees'},
  {word: 'right angle'},
  {word: 'acute angle'},
  {word: 'obtuse angle'},
  {word: 'parallel lines'},
  {word: 'perpendicular lines'}
]

const fifthGrade = [
  {word: 'parenthesis'},
  {word: 'numerical expression'},
  {word: 'evaluate'},
  {word: 'ordered pairs'},
  {word: 'coordinate plane'},
  {word: 'powers of 10'},
  {word: 'volume'},
  {word: 'origin'},
  {word: 'x-coordiante'},
  {word: 'y-coordinate'},
  {word: 'x-axis'},
  {word: 'y-axis'},
  {word: 'formula'}
]

//Extra SAT Words
/*
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
    {word: 'dour', definition: 'showing a brooding ill humor'},
    {word: 'duplicity', definition: 'acting in bad faith'},
    {word:  'atrophy', definition: 'a decrease in size of an organ caused by disease or disuse'},
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
    {word: 'corpulence', definition: 'the property of excessive fatness'},
    {word: 'covet', definition: 'wish, long, or crave for'},
    {word: 'cupidity', definition: 'extreme greed for material wealth'},
    {word: 'defunct', definition: 'no longer in force or use; inactive'},
    {word: 'demagogue', definition: 'a leader who seeks support by appealing to popular passions'},
    {word: 'denigrate', definition: 'charge falsely or with malicious intent'},
    {word: 'derivative', definition:' a compound obtained from another compound'},
    {word: 'despot', definition: 'a cruel and oppressive dictator'},
    {word: 'diaphanous', definition: 'so thin as to transmit light'},
    {word: 'didactic', definition: 'instructive, especially excessively'},
    {word: 'dirge', definition: 'a song or hymn of mourning as a memorial to a dead person'},
    {word: 'debauch', definition: 'a wild gathering involving excessive drinking'},
    {word: 'debunk', definition: 'expose while ridiculing'},
    {word: 'disaffected', definition: 'discontented as toward authority'},
    {word: 'discomfit', definition: "cause to lose one's composure"},
    {word: 'disparate', definition: 'fundamentally different or distinct in quality or kind'},
    {word: 'dispel', definition: 'to cause to separate and go in different directions'},
    {word: 'disrepute', definition: 'the state of being held in low esteem'},


    {word: 'cajole', definition: 'influence or urge by gentle urging, caressing, or flattering', sentence: ""},
    {word: 'cleave', definition: 'separate or cut with a tool, such as a sharp instrument'},
    {word: 'cobbler', definition: 'a person who makes or repairs shoes'},
    {word: 'convivial', definition: 'occupied with or fond of the pleasures of good company'},
    {word: 'dearth', definition: 'an insufficient quantity or number'},
    {word: 'debacle', definition: 'a sudden and violent collapse'},

    {word: 'divisive', definition: 'dissenting with the majority opinion'},
    {word: 'dogmatic', definition: 'pertaining to a code of beliefs accepted as authoritative'},

    {word: 'duress', definition: 'compulsory force or threat'},
    {word: 'eclectic', definition: 'selecting what seems best of various styles or ideas'},
    {word: 'edict', definition: 'a formal or authoritative proclamation'},
    {word: 'ebullient', definition: 'joyously unrestrained'},
    {word: 'egregious', definition: 'conspicuously and outrageously bad or reprehensible'},

    {word:  'exhort', definition: 'spur on or encourage especially by cheers and shouts'},

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


*/
