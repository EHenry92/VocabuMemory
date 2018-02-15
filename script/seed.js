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
  {word: 'acumen', definition: 'shrewdness shown by keen insight', sentence: 'John’s business acumen, along with his computer skills, made him an asset to the software company.'},
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
  {word: 'anathema', definition: 'a formal ecclesiastical curse accompanied by excommunication'},
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
  {word: 'derivative', definition: 'a compound obtained from another compound'},
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


  {word: 'cajole', definition: 'influence or urge by gentle urging, caressing, or flattering', sentence: ''},
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
];
const sensoryWords = [
  {word: 'damp', definition: 'slightly wet', image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjSxcOPibrXAhUc0IMKHW1LBSQQjRwIBw&url=http%3A%2F%2Fwww.envirovent.com%2Fblog%2Fkeep-condensation-and-damp-out-this-winter%2F&psig=AOvVaw1n5ycDdw5aZCvh9VbALFKL&ust=1510611615451846'},
  {word: 'sharp', definition: 'having an edge or point that is able to cut or pierce something.', image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.mcourts-haberdashery.co.uk%2Fekmps%2Fshops%2Fdonnablackman%2Fimages%2Fa30sr-8-1-2-serra-sharp-scissors-794-p.jpg&imgrefurl=http%3A%2F%2Fwww.mcourts-haberdashery.co.uk%2Fa30sr---8-12-serra-sharp-scissors-794-p.asp&docid=myBpLvHXjxGNyM&tbnid=S2adSTC1lNpzQM%3A&vet=10ahUKEwj4_azHirrXAhVFSSYKHdo2CT0QMwilASgDMAM..i&w=600&h=338&safe=strict&bih=696&biw=721&q=sharp%20sissors&ved=0ahUKEwj4_azHirrXAhVFSSYKHdo2CT0QMwilASgDMAM&iact=mrc&uact=8'},
  {word: 'burning', definition: 'very hot or bright', image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fblog.theclymb.com%2Fwp-content%2Fuploads%2F2013%2F08%2FCaveman-Campfire.jpg&imgrefurl=http%3A%2F%2Fwww.theclymb.com%2Fstories%2Fout-there%2F6-camp-recipes-so-easy-a-caveman-could-make-them%2F&docid=r5Hp33I4RVBwJM&tbnid=Jzd6kUTn4e_5rM%3A&vet=10ahUKEwjN9OPMibrXAhXDLSYKHZhrDTcQMwj4ASgFMAU..i&w=550&h=368&safe=strict&bih=696&biw=721&q=camp%20fire&ved=0ahUKEwjN9OPMibrXAhXDLSYKHZhrDTcQMwj4ASgFMAU&iact=mrc&uact=8'},
  {word: 'snoring', definition: 'breathe sound while asleep', image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.jdshospital.com%2Fwp-content%2Fuploads%2F2011%2F03%2Fme-snoring.jpg&imgrefurl=http%3A%2F%2Fwww.jdshospital.com%2Fsnoring%2F&docid=UPzLmE7nLvT6dM&tbnid=N5YMhmT7K6t1QM%3A&vet=10ahUKEwiS7PPjibrXAhXINSYKHRTOCFQQMwiVAigEMAQ..i&w=300&h=216&safe=strict&bih=696&biw=721&q=snoring&ved=0ahUKEwiS7PPjibrXAhXINSYKHRTOCFQQMwiVAigEMAQ&iact=mrc&uact=8'},
  {word: 'sloppy', definition: 'messy', image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj449X5ibrXAhUE34MKHe0nA4MQjRwIBw&url=https%3A%2F%2Fwww.c2educate.com%2Fblog%2Fwhy-a-messy-bedroom-might-do-lasting-harm%2F&psig=AOvVaw2N_nhr6WjyWO5FS14Whu8O&ust=1510611886292328'},
  {word: 'whisper', definition: 'speak very softly', image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fclipart-library.com%2Fdata_images%2F53083.jpg&imgrefurl=http%3A%2F%2Fclipart-library.com%2Fwhisper-cliparts.html&docid=CKdK6qJSWhW7CM&tbnid=pElMZP_kp26xpM%3A&vet=10ahUKEwjb9OuDirrXAhWGYiYKHYxFDGYQMwjKASgIMAg..i&w=800&h=559&safe=strict&bih=696&biw=721&q=whisper&ved=0ahUKEwjb9OuDirrXAhWGYiYKHYxFDGYQMwjKASgIMAg&iact=mrc&uact=8'},
  {word: 'mushy', definition: 'soft and pulpy', image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.seriouseats.com%2Frecipes%2Fassets_c%2F2012%2F07%2F201207-216410-british-bites-mushy-peas-thumb-625xauto-260323.jpg&imgrefurl=http%3A%2F%2Fwww.seriouseats.com%2Frecipes%2F2012%2F07%2Fmushy-peas-british-recipe.html&docid=uHH-pR1R1-SNYM&tbnid=QWtPvcJZGfbUeM%3A&vet=10ahUKEwjLi7uNirrXAhWBOSYKHTjOBZEQMwg_KAAwAA..i&w=625&h=469&safe=strict&bih=696&biw=721&q=mushy&ved=0ahUKEwjLi7uNirrXAhWBOSYKHTjOBZEQMwg_KAAwAA&iact=mrc&uact=8'},
  {word: 'rotten', definition: 'suffering from decay', image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjWm4itirrXAhVsw4MKHYpaABQQjRwIBw&url=http%3A%2F%2Fsni.scholastic.com%2FSN1%2F10_03_15_SN1%2F&psig=AOvVaw18n4ksFTfh8T0Plo7d-5J2&ust=1510611970924867'},
  {word: 'fluffy', definition: 'light or airy.', image: 'https://opengameart.org/sites/default/files/cloud4.png'},
  {word: 'shiny', definition: 'bright or glossy', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhUXNA1jVEkkibgsgt_59MlRaWBKH95WxM7ClZKjvlMlP7icQV'}


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

const engineeringWords = [
  {word: 'debounce function', definition: 'A function that limits the rate at which a function can fire.', sentence: 'function debounce(func, wait, immediate) {var timeout;  return function() {   var context = this, args = arguments;   var later = function() {    timeout = null;    if (!immediate) func.apply(context, args);   };   var callNow = immediate && !timeout;   clearTimeout(timeout);   timeout = setTimeout(later, wait);   if (callNow) func.apply(context, args);  }; };', verified: true},
  {word: 'hoisting', definition: "JavaScript's default behavior of moving declarations to the top.", sentence: '	x = 5; // Assign 5 to x ' + '\n' + 'elem = document.getElementById("demo"); // Find an element' + '\n' + 'elem.innerHTML = x;// Display x in the element' + '\n' + 'var x; // Declare x', verified: true},
  {word: 'algorithm', definition: 'A set of well-defined rules for the solution to a problem in a finite number of steps.Generally implemented as a logical or mathematical test or calculation. ', sentence: '', verified: true},
  {word: 'application', definition: 'One or more software executables designed to fulfill a specific set of business functions individually or in cooperation with other applications. ', sentence: '', verified: true},
  {word: 'bandwidth', definition: 'The capacity of a communications channel. ', sentence: '', verified: true},
  {word: 'baseline', definition: 'A set of software components and documents to that has been formerly reviewed and accepted, that serves as the basis for further development or current production, which can be changed only through formal change control procedures.', sentence: '', verified: true},
  {word: 'component', definition: 'One of the parts that make up a system. May be hardware, software, or firmware and may be subdivided.', sentence: '', verified: true},
  {word: 'computer software', definition: 'Detailed, pre-programmed instructions that control and coordinate the work of computer hardware and firmware components in an information system. ', sentence: '', verified: true},
  {word: 'database', definition: 'A set of related data tables and other database objects, such as a data dictionary, that are organized as a group.  A collection of data organized to service many applications at the same time. ', sentence: '', verified: true},
  {word: 'database management system (DBMS)', definition: 'Software used to create and maintain a database and enable individual business applications to extract the data they need without having to create separate files or data definitions for their own use. ', sentence: '', verified: true},
  {word: 'encryption', definition: 'The coding and scrambling of messages to prevent unauthorized access to or understanding of the data being stored or transmitted. ', sentence: '', verified: true},
  {word: 'executable', definition: 'A binary data file that can be run by the operating system to perform a specific set of functions', sentence: '', verified: true},
  {word: 'foreign key', definition: 'A field or set of fields in a table whose value must match a primary key in another table when joind with it.', sentence: '', verified: true},
  {word: 'form', definition: 'A screen formatted to facilitate data entry and review.  Utilizes data entry fields, option selection tools, and control objects such as buttons and menu items. ', sentence: '', verified: true},
  {word: 'hardware', definition: 'Physical computer equipment and peripherals used to process, store, or transmit software applications or data', sentence: '', verified: true},
  {word: 'hypertext markup language (HTML)', definition: 'A programming toll that uses HyperText to establish dynamic links to other documents stored in the same or remote computers.', sentence: '', verified: true},
  {word: 'metadata', definition: 'Data that describes the structure, organization, and/or location of data', sentence: 'Metadata is data about data', verified: true},
  {word: 'primary key', definition: 'A field or fields whose individual or combined values uniquely identify a record in a database. ', sentence: '', verified: true},
  {word: 'pusedocode', definition:'A combination of programming language constructs and natural language used to define an algorighm or business rule', sentence: 'Pseudocode is often used as a communications bridge between end-users and analysts or programmers. ', verified: true},
  {word: 'query', definition: 'A statement structured to direct the retrieval or manipulation of data in a database. ', sentence: '', verified: true},
  {word: 'relational database management System (RDMS)', definition: 'A database management application that can create, organize, and store data. ', sentence: '', verified: true},
  {word: 'software', definition: 'Computer programs, procedures, and associated documentation pertaining to the operation of an application.  The detailed in structions that control the operation of a computer system. ', sentence: '', verified: true},
  {word: 'unit testing', definition: 'The isolated testing of each logical path of a specific implementation element or groups of related elements.  The expected output from the execution of the logical path is pre-defined to allow comparisons of the planned output against the actual outpu', sentence: '', verified: true},
  {word: 'user interface', definition: 'The part of the application through which the end-user interacts with the system. ', sentence: '', verified: true},
  {word: 'window', definition: 'A parent element in the chain of traceability that has no child elements associated with it. ', sentence: '', verified: true}
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
    Dictionary.create({title: 'Sensory Words', image: 'http://1069thefox.com/wp-content/blogs.dir/8/files/2015/02/five-senses.jpg'})
    .then(_ => {
      for (var m = 0; m < sensoryWords.length; m++)  {
        Word.create({
          word: sensoryWords[m].word,
          definition: sensoryWords[m].definition,
          verified: true,
          image: sensoryWords[m].image,
          level: 2
        })
      }
    })
    .then(_ => {
      for (var j = 1; j <= sensoryWords.length; j++) {
        Group.create({
          wordId: j, dictionaryId: 1
        })
      }
    })
    .catch(err => console.log(err))
    ,
    Dictionary.create({title: 'Elementry Math', image: 'https://cdn.themeasuredmom.com/wp-content/uploads/2015/02/block-play.jpg'})
    .then(_ => {
      for (var i = 0; i < mathList.length; i++){
        Word.create({
          word: mathList[i].word,
          definition: mathList[i].definition,
          level: 3,
          image: mathList[i].image,
          sentence: mathList[i].sentence,
          verified: true
        })
      }
    })
    .then(_ => {
      for (var j = (sensoryWords.length + 1) ; j <= (mathList.length + sensoryWords.length); j++) {
        Group.create({
          wordId: j, dictionaryId: 2
        })
      }
    })
    .catch(err => console.log(err))
    ,
    Dictionary.create({title: 'SAT Words', image: 'https://www.usnews.com/dims4/USNEWS/6265f15/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F96%2F8b%2F55ff0c9b43eb955698a681c6238e%2Fresizes%2F1500%2F160318-sat-stock.jpg'})
    .then(_ => {
      for (var i = 0; i < satList.length; i++){
        Word.create({
          word: satList[i].word,
          definition: satList[i].definition,
          level: 5,
          sentence: satList[i].sentence,
          image: satList[i].image,
          verified: true
        })
      }
    })
    .then(_ => {
      for (var j = (sensoryWords.length + mathList.length + 1); j <= (satList.length + mathList.length + sensoryWords.length); j++) {
        Group.create({
          wordId: j, dictionaryId: 3
        })
      }
    })
    .catch(err => console.log(err))
    ,
    Dictionary.create({title: 'Software Engineering', image:'https://media-exp2.licdn.com/mpr/mpr/AAEAAQAAAAAAAAdxAAAAJDBkZmQ4NmQ4LTRjOTktNDdiYi04NmFkLWE1ZTA1NjI1Y2M1Yg.jpg'})
    .then(_ => {
      for (var i = 0; i < engineeringWords.length; i++){
        Word.create({
          word: engineeringWords[i].word,
          definition: engineeringWords[i].definition,
          level: 4,
          sentence: engineeringWords[i].sentence,
          image: engineeringWords.image,
          verified: true
        })
      }
    })
    .then(_ => {
      for (var j = (sensoryWords.length + mathList.length + satList.length + 1); j <= (satList.length + mathList.length + sensoryWords.length + engineeringWords.length); j++) {
        Group.create({
          wordId: j, dictionaryId: 4
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
  {word: 'even'},
  {word: 'odd'},
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
    {word: 'derivative', definition:'a compound obtained from another compound'},
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


/*


1	damp	slightly wet	2	https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjSxcOPibrXAhUc0IMKHW1LBSQQjRwIBw&url=http%3A%2F%2Fwww.envirovent.com%2Fblog%2Fkeep-condensation-and-damp-out-this-winter%2F&psig=AOvVaw1n5ycDdw5aZCvh9VbALFKL&ust=1510611615451846	TRUE	Don't put that damp towel into the bag.	2017-11-25 15:22:28.865+00	2017-11-25 15:22:28.865+00
2	sharp	having an edge or point that is able to cut or pierce something.	2	https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.mcourts-haberdashery.co.uk%2Fekmps%2Fshops%2Fdonnablackman%2Fimages%2Fa30sr-8-1-2-serra-sharp-scissors-794-p.jpg&imgrefurl=http%3A%2F%2Fwww.mcourts-haberdashery.co.uk%2Fa30sr---8-12-serra-sharp-scissors-794-p.asp&docid=myBpLvHXjxGNyM&tbnid=S2adSTC1lNpzQM%3A&vet=10ahUKEwj4_azHirrXAhVFSSYKHdo2CT0QMwilASgDMAM..i&w=600&h=338&safe=strict&bih=696&biw=721&q=sharp%20sissors&ved=0ahUKEwj4_azHirrXAhVFSSYKHdo2CT0QMwilASgDMAM&iact=mrc&uact=8	TRUE	The scissors are not sharp.	2017-11-25 15:22:28.865+00	2017-11-25 15:22:28.865+00
3	burning	very hot or bright	2	https://www.google.com/imgres?imgurl=http%3A%2F%2Fblog.theclymb.com%2Fwp-content%2Fuploads%2F2013%2F08%2FCaveman-Campfire.jpg&imgrefurl=http%3A%2F%2Fwww.theclymb.com%2Fstories%2Fout-there%2F6-camp-recipes-so-easy-a-caveman-could-make-them%2F&docid=r5Hp33I4RVBwJM&tbnid=Jzd6kUTn4e_5rM%3A&vet=10ahUKEwjN9OPMibrXAhXDLSYKHZhrDTcQMwj4ASgFMAU..i&w=550&h=368&safe=strict&bih=696&biw=721&q=camp%20fire&ved=0ahUKEwjN9OPMibrXAhXDLSYKHZhrDTcQMwj4ASgFMAU&iact=mrc&uact=8	TRUE	A burning pain started in her stomach and ended up in ther eyes.	2017-11-25 15:22:28.865+00	2017-11-25 15:22:28.865+00
4	snoring	breathe sound while asleep	2	https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.jdshospital.com%2Fwp-content%2Fuploads%2F2011%2F03%2Fme-snoring.jpg&imgrefurl=http%3A%2F%2Fwww.jdshospital.com%2Fsnoring%2F&docid=UPzLmE7nLvT6dM&tbnid=N5YMhmT7K6t1QM%3A&vet=10ahUKEwiS7PPjibrXAhXINSYKHRTOCFQQMwiVAigEMAQ..i&w=300&h=216&safe=strict&bih=696&biw=721&q=snoring&ved=0ahUKEwiS7PPjibrXAhXINSYKHRTOCFQQMwiVAigEMAQ&iact=mrc&uact=8	TRUE	Tom lay in bed, snoring slightly.	2017-11-25 15:22:28.865+00	2017-11-25 15:22:28.865+00
5	sloppy	messy, careless	2	https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj449X5ibrXAhUE34MKHe0nA4MQjRwIBw&url=https%3A%2F%2Fwww.c2educate.com%2Fblog%2Fwhy-a-messy-bedroom-might-do-lasting-harm%2F&psig=AOvVaw2N_nhr6WjyWO5FS14Whu8O&ust=1510611886292328	TRUE	We complained about Janet's sloppy cleaning when we found traces of mud in an unused room.	2017-11-25 15:22:28.865+00	2017-11-25 15:22:28.865+00
6	whisper	speak very softly	2	https://www.google.com/imgres?imgurl=http%3A%2F%2Fclipart-library.com%2Fdata_images%2F53083.jpg&imgrefurl=http%3A%2F%2Fclipart-library.com%2Fwhisper-cliparts.html&docid=CKdK6qJSWhW7CM&tbnid=pElMZP_kp26xpM%3A&vet=10ahUKEwjb9OuDirrXAhWGYiYKHYxFDGYQMwjKASgIMAg..i&w=800&h=559&safe=strict&bih=696&biw=721&q=whisper&ved=0ahUKEwjb9OuDirrXAhWGYiYKHYxFDGYQMwjKASgIMAg&iact=mrc&uact=8	TRUE	Jackson pretended to whisper, but said loud enough for anyone to hear.	2017-11-25 15:22:28.866+00	2017-11-25 15:22:28.866+00
7	mushy	soft and pulpy	2	https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.seriouseats.com%2Frecipes%2Fassets_c%2F2012%2F07%2F201207-216410-british-bites-mushy-peas-thumb-625xauto-260323.jpg&imgrefurl=http%3A%2F%2Fwww.seriouseats.com%2Frecipes%2F2012%2F07%2Fmushy-peas-british-recipe.html&docid=uHH-pR1R1-SNYM&tbnid=QWtPvcJZGfbUeM%3A&vet=10ahUKEwjLi7uNirrXAhWBOSYKHTjOBZEQMwg_KAAwAA..i&w=625&h=469&safe=strict&bih=696&biw=721&q=mushy&ved=0ahUKEwjLi7uNirrXAhWBOSYKHTjOBZEQMwg_KAAwAA&iact=mrc&uact=8	TRUE	Due to the extensive rain showers, the mushy ground required everyone to wear boots or their shoes would sink into the mud.	2017-11-25 15:22:28.866+00	2017-11-25 15:22:28.866+00
8	rotten	suffering from decay.	2	https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjWm4itirrXAhVsw4MKHYpaABQQjRwIBw&url=http%3A%2F%2Fsni.scholastic.com%2FSN1%2F10_03_15_SN1%2F&psig=AOvVaw18n4ksFTfh8T0Plo7d-5J2&ust=1510611970924867	TRUE	On the outside, the apple looked good, but the inside was rotten.	2017-11-25 15:22:28.866+00	2017-11-25 15:22:28.866+00
9	sum	an amount added together	2		TRUE	The total sum of money from the tournament equals over three thousand dollars.	2017-11-25 15:22:28.882+00	2017-11-25 15:22:28.882+00
10	product	the result of multiplying two numbers	2		TRUE	6 is the product of 2 and 3	2017-11-25 15:22:28.882+00	2017-11-25 15:22:28.882+00
11	difference	the result of subtracting two numbers	2		TRUE	The difference between 7 and 12 is 5	2017-11-25 15:22:28.882+00	2017-11-25 15:22:28.882+00
12	quotient	the result of dividng two numbers	2		TRUE	The quotient of 50 and 5 is 10	2017-11-25 15:22:28.882+00	2017-11-25 15:22:28.882+00
13	improper fraction	a fraction whose numberator is greater than its denominator	2		TRUE		2017-11-25 15:22:28.882+00	2017-11-25 15:22:28.882+00
14	absolute value	the distance between a number and zero	2		TRUE		2017-11-25 15:22:28.882+00	2017-11-25 15:22:28.882+00
15	evaluate	find the value of	2		TRUE		2017-11-25 15:22:28.883+00	2017-11-25 15:22:28.883+00
16	degree	the unit of measure of an angle	2		TRUE		2017-11-25 15:22:28.883+00	2017-11-25 15:22:28.883+00
17	equation	a mathematical statment that sets two expressions equal to each other	2		TRUE		2017-11-25 15:22:28.883+00	2017-11-25 15:22:28.883+00
18	graph	a type of drawing used to represent data	2		TRUE		2017-11-25 15:22:28.883+00	2017-11-25 15:22:28.883+00
19	mixed number	a number written as a whole number and a fraction	2		TRUE		2017-11-25 15:22:28.883+00	2017-11-25 15:22:28.883+00
20	integer	positive and negative numbers	2		TRUE		2017-11-25 15:22:28.883+00	2017-11-25 15:22:28.883+00
21	congruent	figures or angles that have the same size and same shape	2		TRUE		2017-11-25 15:22:28.884+00	2017-11-25 15:22:28.884+00
22	similar	figures or angles that have the same shape but different sizes	2		TRUE		2017-11-25 15:22:28.884+00	2017-11-25 15:22:28.884+00
23	aberration	a state or condition markedly different from the norm	5		TRUE	A person with one blue eye and one green eye is said to have a genetic aberration.	2017-11-25 15:22:28.884+00	2017-11-25 15:22:28.884+00
24	abject	of the most contemptible kind	5		TRUE	While I am feeling a little sad at the moment, I do not plan on being abject for much longer.	2017-11-25 15:22:28.884+00	2017-11-25 15:22:28.884+00
25	abjure	formally reject or disavow a formerly held belief	5		TRUE	Even though Tom made a promise to abjure from criminal acts, he continued to break the law.	2017-11-25 15:22:28.884+00	2017-11-25 15:22:28.884+00
26	abnegation	the denial and rejection of a doctrine or belief	5		TRUE	After growing up in a very religious household, Cara knew a great deal about the abnegation of materialistic items	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
27	abrogate	revoke formally	5		TRUE	If you talk out loud in class, I will abrogate your right to choose where to sit.	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
28	abstruse	difficult to penetrate	5		TRUE	Some of the classic novels are too abstruse for beginning readers to understand.	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
29	abscond	run away, often taking something or somebody along	5		TRUE	The robbers’ plan was to abscond with all of the millionaire’s valuable paintings and jewels.	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
30	accede	yield to another's wish or opinion	5		TRUE	At your insistence and to avoid a prolonged argument, I will accede to your contract terms.	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
31	accost	approach and speak to someone aggressively or insistently	5		TRUE	The policemen asked Greg to describe the man who accosted him.	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
32	accretion	an increase by natural growth or addition	5		TRUE	Sophia was convinced that the accretion of ice on her car’s windshield was preventing her wipers from operating correctly.	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
33	 acumen	shrewdness shown by keen insight	5		TRUE	John’s business acumen, along with his computer skills, made him an asset to the software company.	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
34	adamant	impervious to pleas, persuasion, requests, reason	5		TRUE	He is so adamant in his beliefs that no one can change his mind!	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
35	admonish	scold or reprimand; take to task	5		TRUE	I hope my boss does not admonish me for being late.	2017-11-25 15:22:28.885+00	2017-11-25 15:22:28.885+00
36	adumbrate	describe roughly or give the main points or summary of	5		TRUE	When my mother lit the candle in the darkness, it was nice to see the light adumbrate our shadows on the wall.	2017-11-25 15:22:28.886+00	2017-11-25 15:22:28.886+00
37	adverse	in an opposing direction	5		TRUE	Adverse weather conditions forced us to pull off of the road and wait until things cleared up.	2017-11-25 15:22:28.886+00	2017-11-25 15:22:28.886+00
38	bane	something causing misery or death	5		TRUE	In Dr. Seuss’s famous story, the Grinch was the bane of Christmas in Whoville, but ultimately his cold heart could not stand up to the true Christmas spirit.	2017-11-25 15:22:28.886+00	2017-11-25 15:22:28.886+00
39	bashful	self-consciously timid	5		TRUE	Because Sally is bashful she won’t speak in public.	2017-11-25 15:22:28.886+00	2017-11-25 15:22:28.886+00
40	beguile	influence by slyness	5		TRUE	The realtor hoped to beguile buyers by decorating the house with fancy furnishings.	2017-11-25 15:22:28.886+00	2017-11-25 15:22:28.886+00
41	bereft	sorrowful through loss or deprivation	5		TRUE	After learning she had won the lottery, Betty was bereft of speech.	2017-11-25 15:22:28.886+00	2017-11-25 15:22:28.886+00
42	blandishment	flattery intended to persuade	5		TRUE	Despite his nervousness at meeting his in-laws, Dylan was able to offer just the right blandishment to get their approval.	2017-11-25 15:22:28.886+00	2017-11-25 15:22:28.886+00
43	bilk	cheat somebody out of what is due, especially money	5		TRUE	She hoped it was clear that this charity was not just another way to bilk citizens out of what little funds they had.	2017-11-25 15:22:28.886+00	2017-11-25 15:22:28.886+00
44	bombastic	ostentatiously lofty in style	5		TRUE	The cheerleading squad led the crowd in bombastic cheers. 	2017-11-25 15:22:28.886+00	2017-11-25 15:22:28.886+00
45	execrable	unequivocally detestable	5		TRUE	Because the conditions in that restaurant were so execrable, several diners became ill and the Health Department was called in to shut it down.	2017-11-25 15:22:28.887+00	2017-11-25 15:22:28.887+00
46	expiate	make amends for	5		TRUE	The boy gave his younger sister a cookie to expiate for breaking her toy.	2017-11-25 15:22:28.887+00	2017-11-25 15:22:28.887+00
47	exigent	demanding immediate attention	5		TRUE	The drought made water an exigent concern for the regional government.	2017-11-25 15:22:28.887+00	2017-11-25 15:22:28.887+00
48	expedient	appropriate to a purpose	5		TRUE	It is expedient that the hospital staff take all life-saving methods.	2017-11-25 15:22:28.887+00	2017-11-25 15:22:28.887+00
49	expunge	remove by erasing or crossing out or as if by drawing a line	5		TRUE	Because the court has decided to expunge my record, there will be no evidence of my past misdeeds.	2017-11-25 15:22:28.887+00	2017-11-25 15:22:28.887+00
50	extraneous	not belonging to that in which it is contained	5		TRUE		2017-11-25 15:22:28.887+00	2017-11-25 15:22:28.887+00
51	extol	praise, glorify, or honor	5		TRUE		2017-11-25 15:22:28.888+00	2017-11-25 15:22:28.888+00
52	extant	still in existence; not extinct or destroyed or lost	5		TRUE		2017-11-25 15:22:28.888+00	2017-11-25 15:22:28.888+00
53	expurgate	edit by omitting or modifying parts considered indelicate	5		TRUE		2017-11-25 15:22:28.888+00	2017-11-25 15:22:28.888+00
54	fallacious	containing or based on incorrect reasoning	5		TRUE		2017-11-25 15:22:28.888+00	2017-11-25 15:22:28.888+00
55	fatuous	devoid of intelligence	5		TRUE		2017-11-25 15:22:28.888+00	2017-11-25 15:22:28.888+00
56	fetter	a shackle for the ankles or feet	5		TRUE		2017-11-25 15:22:28.888+00	2017-11-25 15:22:28.888+00
57	flagrant	conspicuously and outrageously bad or reprehensible	5		TRUE		2017-11-25 15:22:28.888+00	2017-11-25 15:22:28.888+00
58	elegy	a mournful poem; a lament for the dead	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
59	elicit	call forth, as an emotion, feeling, or response	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
60	embezzlement	the fraudulent appropriation of funds or property	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
61	emend	make corrections to	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
62	emollient	a substance with a soothing effect when applied to the skin	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
63	empirical	derived from experiment and observation rather than theory	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
64	emulate	strive to equal or match, especially by imitating	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
65	enervate	weaken mentally or morally	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
66	enfranchise	grant freedom to, as from slavery or servitude	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
67	engender	call forth	5		TRUE		2017-11-25 15:22:28.889+00	2017-11-25 15:22:28.889+00
68	ephemeral	anything short-lived, as an insect that lives only for a day	5		TRUE		2017-11-25 15:22:28.89+00	2017-11-25 15:22:28.89+00
69	epistolary	written in the form of letters or correspondence	5		TRUE		2017-11-25 15:22:28.89+00	2017-11-25 15:22:28.89+00
70	equanimity	steadiness of mind under stress	5		TRUE		2017-11-25 15:22:28.89+00	2017-11-25 15:22:28.89+00
71	equivocal	open to two or more interpretations	5		TRUE		2017-11-25 15:22:28.89+00	2017-11-25 15:22:28.89+00
72	espouse	choose and follow a theory, idea, policy, etc.	5		TRUE		2017-11-25 15:22:28.89+00	2017-11-25 15:22:28.89+00
73	evanescent	tending to vanish like vapor	5		TRUE		2017-11-25 15:22:28.89+00	2017-11-25 15:22:28.89+00
74	evince	give expression to	5		TRUE		2017-11-25 15:22:28.89+00	2017-11-25 15:22:28.89+00
75	exacerbate	make worse	5		TRUE		2017-11-25 15:22:28.89+00	2017-11-25 15:22:28.89+00
76	advocate	a person who pleads for a person, cause, or idea	5		TRUE		2017-11-25 15:22:28.891+00	2017-11-25 15:22:28.891+00
77	affluent	having an abundant supply of money or possessions of value	5		TRUE		2017-11-25 15:22:28.891+00	2017-11-25 15:22:28.891+00
78	aggrandize	embellish; increase the scope, power, or importance of	5		TRUE		2017-11-25 15:22:28.891+00	2017-11-25 15:22:28.891+00
79	alacrity	liveliness and eagerness	5		TRUE		2017-11-25 15:22:28.891+00	2017-11-25 15:22:28.891+00
80	alias	a name that has been assumed temporarily	5		TRUE		2017-11-25 15:22:28.891+00	2017-11-25 15:22:28.891+00
81	ambivalent	uncertain or unable to decide about what course to follow	5		TRUE		2017-11-25 15:22:28.891+00	2017-11-25 15:22:28.891+00
82	amenable	disposed or willing to comply	5		TRUE		2017-11-25 15:22:28.891+00	2017-11-25 15:22:28.891+00
83	amorphous	having no definite form or distinct shape	5		TRUE		2017-11-25 15:22:28.891+00	2017-11-25 15:22:28.891+00
84	anachronistic	chronologically misplaced	5		TRUE		2017-11-25 15:22:28.892+00	2017-11-25 15:22:28.892+00
85	 anathema	a formal ecclesiastical curse accompanied by excommunication	5		TRUE		2017-11-25 15:22:28.892+00	2017-11-25 15:22:28.892+00
86	annex	attach to	5		TRUE		2017-11-25 15:22:28.892+00	2017-11-25 15:22:28.892+00
87	antediluvian	of or relating to the period before the biblical flood	5		TRUE		2017-11-25 15:22:28.892+00	2017-11-25 15:22:28.892+00
88	antiseptic	thoroughly clean and free of disease-causing organisms	5		TRUE		2017-11-25 15:22:28.892+00	2017-11-25 15:22:28.892+00
89	apathetic	showing little or no emotion or animation	5		TRUE		2017-11-25 15:22:28.893+00	2017-11-25 15:22:28.893+00
90	antithesis	exact opposite	5		TRUE		2017-11-25 15:22:28.893+00	2017-11-25 15:22:28.893+00
91	apocryphal	being of questionable authenticity	5		TRUE		2017-11-25 15:22:28.893+00	2017-11-25 15:22:28.893+00
92	approbation	official approval	5		TRUE		2017-11-25 15:22:28.893+00	2017-11-25 15:22:28.893+00
93	arbitrary	based on or subject to individual discretion or preference	5		TRUE		2017-11-25 15:22:28.893+00	2017-11-25 15:22:28.893+00
94	arboreal	of or relating to or formed by trees	5		TRUE		2017-11-25 15:22:28.893+00	2017-11-25 15:22:28.893+00
95	arcane	requiring secret or mysterious knowledge	5		TRUE		2017-11-25 15:22:28.893+00	2017-11-25 15:22:28.893+00
96	archetypal	of an original type after which other things are patterned	5		TRUE		2017-11-25 15:22:28.893+00	2017-11-25 15:22:28.893+00
97	arrogate	seize and take control without authority	5		TRUE		2017-11-25 15:22:28.893+00	2017-11-25 15:22:28.893+00
98	ascetic	someone who practices self denial as a spiritual discipline	5		TRUE		2017-11-25 15:22:28.894+00	2017-11-25 15:22:28.894+00
99	aspersion	a disparaging remark	5		TRUE		2017-11-25 15:22:28.894+00	2017-11-25 15:22:28.894+00
100	assiduous	marked by care and persistent effort	5		TRUE		2017-11-25 15:22:28.894+00	2017-11-25 15:22:28.894+00
101	dour	showing a brooding ill humor	5		TRUE		2017-11-25 15:22:28.894+00	2017-11-25 15:22:28.894+00
102	duplicity	acting in bad faith	5		TRUE		2017-11-25 15:22:28.894+00	2017-11-25 15:22:28.894+00
103	atrophy	a decrease in size of an organ caused by disease or disuse	5		TRUE		2017-11-25 15:22:28.894+00	2017-11-25 15:22:28.894+00
104	callous	emotionally hardened	5		TRUE		2017-11-25 15:22:28.894+00	2017-11-25 15:22:28.894+00
105	calumny	a false accusation of an offense	5		TRUE		2017-11-25 15:22:28.894+00	2017-11-25 15:22:28.894+00
106	camaraderie	the quality of affording easy familiarity and sociability	5		TRUE		2017-11-25 15:22:28.894+00	2017-11-25 15:22:28.894+00
107	candor	the quality of being honest and straightforward	5		TRUE		2017-11-25 15:22:28.895+00	2017-11-25 15:22:28.895+00
108	capitulate	surrender under agreed conditions	5		TRUE		2017-11-25 15:22:28.895+00	2017-11-25 15:22:28.895+00
109	carouse	engage in boisterous, drunken merrymaking	5		TRUE		2017-11-25 15:22:28.895+00	2017-11-25 15:22:28.895+00
110	carp	any of various freshwater fish of the family Cyprinidae	5		TRUE		2017-11-25 15:22:28.895+00	2017-11-25 15:22:28.895+00
111	caucus	meet to select a candidate or promote a policy	5		TRUE		2017-11-25 15:22:28.895+00	2017-11-25 15:22:28.895+00
112	cavort	play boisterously	5		TRUE		2017-11-25 15:22:28.895+00	2017-11-25 15:22:28.895+00
113	circumlocution	an indirect way of expressing something	5		TRUE		2017-11-25 15:22:28.895+00	2017-11-25 15:22:28.895+00
114	circumscribe	draw a geometric figure around another figure	5		TRUE		2017-11-25 15:22:28.895+00	2017-11-25 15:22:28.895+00
115	circumvent	surround so as to force to give up	5		TRUE		2017-11-25 15:22:28.895+00	2017-11-25 15:22:28.895+00
116	clamor	utter or proclaim insistently and noisily	5		TRUE		2017-11-25 15:22:28.896+00	2017-11-25 15:22:28.896+00
117	cogent	powerfully persuasive	5		TRUE		2017-11-25 15:22:28.896+00	2017-11-25 15:22:28.896+00
118	commensurate	corresponding in size or degree or extent	5		TRUE		2017-11-25 15:22:28.896+00	2017-11-25 15:22:28.896+00
119	cognizant	having or showing knowledge or understanding or realization	5		TRUE		2017-11-25 15:22:28.896+00	2017-11-25 15:22:28.896+00
120	complement	something added to embellish or make perfect	5		TRUE		2017-11-25 15:22:28.896+00	2017-11-25 15:22:28.896+00
121	compunction	a feeling of deep regret, usually for some misdeed	5		TRUE		2017-11-25 15:22:28.896+00	2017-11-25 15:22:28.896+00
122	concomitant	following or accompanying as a consequence	5		TRUE		2017-11-25 15:22:28.896+00	2017-11-25 15:22:28.896+00
123	conduit	a passage through which water or electric wires can pass	5		TRUE		2017-11-25 15:22:28.896+00	2017-11-25 15:22:28.896+00
124	conflagration	a very intense and uncontrolled fire	5		TRUE		2017-11-25 15:22:28.896+00	2017-11-25 15:22:28.896+00
125	congruity	the quality of agreeing; being suitable and appropriate	5		TRUE		2017-11-25 15:22:28.897+00	2017-11-25 15:22:28.897+00
126	connive	form intrigues (for) in an underhand manner	5		TRUE		2017-11-25 15:22:28.897+00	2017-11-25 15:22:28.897+00
127	consign	give over to another for care or safekeeping	5		TRUE		2017-11-25 15:22:28.897+00	2017-11-25 15:22:28.897+00
128	constituent	one of the individual parts making up a composite entity	5		TRUE		2017-11-25 15:22:28.897+00	2017-11-25 15:22:28.897+00
129	construe	make sense of; assign a meaning to	5		TRUE		2017-11-25 15:22:28.897+00	2017-11-25 15:22:28.897+00
130	contusion	an injury in which the skin is not broken	5		TRUE		2017-11-25 15:22:28.897+00	2017-11-25 15:22:28.897+00
131	contrite	feeling or expressing pain or sorrow for sins or offenses	5		TRUE		2017-11-25 15:22:28.897+00	2017-11-25 15:22:28.897+00
132	contentious	showing an inclination to disagree	5		TRUE		2017-11-25 15:22:28.897+00	2017-11-25 15:22:28.897+00
133	contravene	go against, as of rules and laws	5		TRUE		2017-11-25 15:22:28.898+00	2017-11-25 15:22:28.898+00
134	corpulence	the property of excessive fatness	5		TRUE		2017-11-25 15:22:28.898+00	2017-11-25 15:22:28.898+00
135	cupidity	extreme greed for material wealth	5		TRUE		2017-11-25 15:22:28.898+00	2017-11-25 15:22:28.898+00
136	covet	wish, long, or crave for	5		TRUE		2017-11-25 15:22:28.898+00	2017-11-25 15:22:28.898+00
137	defunct	no longer in force or use; inactive	5		TRUE		2017-11-25 15:22:28.898+00	2017-11-25 15:22:28.898+00
138	demagogue	a leader who seeks support by appealing to popular passions	5		TRUE		2017-11-25 15:22:28.898+00	2017-11-25 15:22:28.898+00
139	denigrate	charge falsely or with malicious intent	5		TRUE		2017-11-25 15:22:28.898+00	2017-11-25 15:22:28.898+00
140	derivative	 a compound obtained from another compound	5		TRUE		2017-11-25 15:22:28.898+00	2017-11-25 15:22:28.898+00
141	despot	a cruel and oppressive dictator	5		TRUE		2017-11-25 15:22:28.898+00	2017-11-25 15:22:28.898+00
142	diaphanous	so thin as to transmit light	5		TRUE		2017-11-25 15:22:28.899+00	2017-11-25 15:22:28.899+00
143	didactic	instructive, especially excessively	5		TRUE		2017-11-25 15:22:28.899+00	2017-11-25 15:22:28.899+00
144	dirge	a song or hymn of mourning as a memorial to a dead person	5		TRUE		2017-11-25 15:22:28.899+00	2017-11-25 15:22:28.899+00
145	debauch	a wild gathering involving excessive drinking	5		TRUE		2017-11-25 15:22:28.899+00	2017-11-25 15:22:28.899+00
146	debunk	expose while ridiculing	5		TRUE		2017-11-25 15:22:28.899+00	2017-11-25 15:22:28.899+00
147	disaffected	discontented as toward authority	5		TRUE		2017-11-25 15:22:28.9+00	2017-11-25 15:22:28.9+00
148	discomfit	cause to lose one's composure	5		TRUE		2017-11-25 15:22:28.9+00	2017-11-25 15:22:28.9+00
149	disparate	fundamentally different or distinct in quality or kind	5		TRUE		2017-11-25 15:22:28.901+00	2017-11-25 15:22:28.901+00
150	dispel	to cause to separate and go in different directions	5		TRUE		2017-11-25 15:22:28.901+00	2017-11-25 15:22:28.901+00
151	disrepute	the state of being held in low esteem	5		TRUE		2017-11-25 15:22:28.901+00	2017-11-25 15:22:28.901+00
152	cajole	influence or urge by gentle urging, caressing, or flattering	5		TRUE		2017-11-25 15:22:28.902+00	2017-11-25 15:22:28.902+00
153	cleave	separate or cut with a tool, such as a sharp instrument	5		TRUE		2017-11-25 15:22:28.902+00	2017-11-25 15:22:28.902+00
154	convivial	occupied with or fond of the pleasures of good company	5		TRUE		2017-11-25 15:22:28.902+00	2017-11-25 15:22:28.902+00
155	cobbler	a person who makes or repairs shoes	5		TRUE		2017-11-25 15:22:28.902+00	2017-11-25 15:22:28.902+00
156	dearth	an insufficient quantity or number	5		TRUE		2017-11-25 15:22:28.902+00	2017-11-25 15:22:28.902+00
157	debacle	a sudden and violent collapse	5		TRUE		2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
158	divisive	dissenting with the majority opinion	5		TRUE		2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
159	duress	compulsory force or threat	5		TRUE		2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
160	dogmatic	pertaining to a code of beliefs accepted as authoritative	5		TRUE	The vet said Scampi was licking her nose because she was stressed out, but I didn’t think she had been under any duress.	2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
161	edict	a formal or authoritative proclamation	5		TRUE	A crowd formed outside the courthouse to protest the jury’s edict that set the defendant free.	2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
162	eclectic	selecting what seems best of various styles or ideas	5		TRUE	The restaurant’s eclectic menu included foods from a number of ethnic groups and cultures.	2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
163	ebullient	joyously unrestrained	5		TRUE	The ebullient song was so uplifting that I danced in my chair. 	2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
164	exhort	spur on or encourage especially by cheers and shouts	5		TRUE	In her monthly speech, the school counselor will exhort the students to plan for their futures so they will be prepared for life.	2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
165	egregious	conspicuously and outrageously bad or reprehensible	5		TRUE	After cheating on the exam, the students were warned that further egregious violations would have then expelled from school.	2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
166	foil	hinder or prevent, as an effort, plan, or desire	5		TRUE	The neighborhood watch program has helped the police department foil many crimes.	2017-11-25 15:22:28.903+00	2017-11-25 15:22:28.903+00
167	forbearance	good-natured tolerance of delay or incompetence	5		TRUE	Since she was ill and temporarily unable to work, the bank granted her forbearance on her  loan.	2017-11-25 15:22:28.904+00	2017-11-25 15:22:28.904+00
168	fortuitous	occurring by happy chance	5		TRUE	Mark proved to be fortuitous by selecting all six winning lotto numbers.	2017-11-25 15:22:28.904+00	2017-11-25 15:22:28.904+00
169	fractious	easily irritated or annoyed	5		TRUE		2017-11-25 15:22:28.904+00	2017-11-25 15:22:28.904+00
170	garrulous	full of trivial conversation	5		TRUE	The garrulous gentleman held up the checkout line as he rambled on to the cashier about his pets.	2017-11-25 15:22:28.904+00	2017-11-25 15:22:28.904+00
171	grandiloquent	lofty in style	5		TRUE	The speech was full of grandiloquent language, but it contained no new ideas.	2017-11-25 15:22:28.904+00	2017-11-25 15:22:28.904+00
172	gourmand	a person who is devoted to eating and drinking to excess	5		TRUE	There was enough at the book launch last week to satisfy the most exacting social gourmand.	2017-11-25 15:22:28.904+00	2017-11-25 15:22:28.904+00
173	gratuitous	unnecessary and unwarranted	5		TRUE	Because I didn’t ask for his gratuitous advice, I felt under no obligation to do what he suggested.	2017-11-25 15:22:28.904+00	2017-11-25 15:22:28.904+00
174	hegemony	the dominance or leadership of one social group over others	5		TRUE	The musical icons are the individuals who will have a lasting hegemony over many generations of music lovers.	2017-11-25 15:22:28.904+00	2017-11-25 15:22:28.904+00
175	hapless	unfortunate and deserving pity	5		TRUE	The hapless rabbit could not escape from the trap.	2017-11-25 15:22:28.904+00	2017-11-25 15:22:28.904+00
176	iconoclast	someone who attacks cherished ideas or institutions	5		TRUE	Jared was an iconoclast who dared to question the company’s mission. 	2017-11-25 15:22:28.905+00	2017-11-25 15:22:28.905+00
177	heterogenous	consisting of elements that are not of the same kind	5		TRUE	Surprisingly, the concert was filled with a heterogeneous audience and not just the usual crowd.	2017-11-25 15:22:28.905+00	2017-11-25 15:22:28.905+00
178	idiosyncrasy	an odd habit or peculiar behavior	5		TRUE	The home’s colorful idiosyncrasy made it stand out in the neighborhood of white houses.	2017-11-25 15:22:28.905+00	2017-11-25 15:22:28.905+00
179	impetuous	characterized by undue haste and lack of thought	5		TRUE	We made an impetuous decision to go swimming in the lake in December.	2017-11-25 15:22:28.905+00	2017-11-25 15:22:28.905+00
180	impecunious	not having enough money to pay for necessities	5		TRUE	Although Vincent died an impecunious artist without a penny to his name, his paintings are now highly valued by art collectors.	2017-11-25 15:22:28.905+00	2017-11-25 15:22:28.905+00
181	impute	credit to or lay responsibility on	5		TRUE	On Monday, Ellen will impute her failure to complete the project on her malfunctioning computer.	2017-11-25 15:22:28.905+00	2017-11-25 15:22:28.905+00
182	impinge	infringe upon	5		TRUE	Hopefully the bad weather will move in a different direction and not impinge upon our plans for an outdoor reception.	2017-11-25 15:22:28.905+00	2017-11-25 15:22:28.905+00


*/
