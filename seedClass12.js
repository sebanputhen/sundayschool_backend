// seedClass12.js
// Usage: node seedClass12.js
// Make sure MONGODB_URI is set in your .env or environment

const mongoose = require('mongoose');
const Student = require('./models/Student'); // Adjust path to your Student model
require("dotenv").config({ path: "./config/.env" });

const students = [
  // ===== DIVISION A =====
  { name: "Alwin Saju", baptismName: "Abraham", gender: "Male", houseName: "Ariyamkulathu", phoneNumber: "9656819513", email: "sajusebastian2739@gmail.com", dateOfBirth: "2009-03-21", dateOfBaptism: "2009-07-11", dateOfHolyCommunion: "2009-07-11", fatherName: "Saju Sebastian", motherName: "Anu Saju", division: "A" },
  { name: "Kevin Babu", baptismName: "Kurian Joseph", gender: "Male", houseName: "Ariyamkulathu", phoneNumber: "9061677458", email: "derinbabu66@gmail.com", dateOfBirth: "2008-06-09", dateOfBaptism: "2008-08-28", dateOfHolyCommunion: "2008-08-28", fatherName: "Babu Sebastian", motherName: "Elizabeth Kurian", division: "A" },
  { name: "Stephinmol Saji", baptismName: "Mariya Saji", gender: "Female", houseName: "Chakiriyamthadathil", phoneNumber: "9446123318", email: "sajichakiri@gamil.com", dateOfBirth: "2009-03-02", dateOfBaptism: "2009-04-18", dateOfHolyCommunion: "2009-04-18", fatherName: "Saji Thomas", motherName: "Thresiamma Joseph", division: "A" },
  { name: "Jinu Jimmy", baptismName: "Thomas Jacob", gender: "Male", houseName: "Chengalikuzhiyil", phoneNumber: "7025553889", email: "shymoljimmy3@gmail.com", dateOfBirth: "2008-12-09", dateOfBaptism: "2009-04-26", dateOfHolyCommunion: "2024-08-18", fatherName: "Jimmy Jacob", motherName: "Shymol Thomas", division: "A" },
  { name: "Nanma Maria Aprem", baptismName: "Nanma Maria Aprem", gender: "Female", houseName: "Chukkananyil", phoneNumber: "8921368265", email: "sherinrinu000@gmail.com", dateOfBirth: "2009-04-11", dateOfBaptism: "2009-07-06", dateOfHolyCommunion: "2019-05-01", fatherName: "Rinu Thomas", motherName: "Sherin Sebastian", division: "A" },
  { name: "Alexa Rose Paul", baptismName: "Rose", gender: "Male", houseName: "Edackalathu", phoneNumber: "9446921350", email: "laly.03.johnk@gmail.com", dateOfBirth: "2008-12-06", dateOfBaptism: "2009-05-09", dateOfHolyCommunion: "2009-05-09", fatherName: "Paul", motherName: "Laly", division: "A" },
  { name: "Adarsh Joshy Edamamnel", baptismName: "Thomas George", gender: "Male", houseName: "Edamannel", phoneNumber: "9496113835", email: "joshyte@gmail.com", dateOfBirth: "2008-03-08", dateOfBaptism: "2008-06-28", dateOfHolyCommunion: "2008-06-28", fatherName: "Joshy Thomas", motherName: "Yamuna Jose", division: "A" },
  { name: "Teena Sojan", baptismName: "Mariya Cherian", gender: "Female", houseName: "Kiazhakkeparambil", phoneNumber: "9847267720", email: "thomassojan714@gmail.com", dateOfBirth: "2009-12-15", dateOfBaptism: "2010-05-08", dateOfHolyCommunion: "2024-09-22", fatherName: "Sojan Thomas", motherName: "Anu Sojan", division: "A" },
  { name: "Eric Kurian Rajesh", baptismName: "Kurian", gender: "Male", houseName: "Kilirooparambil House", phoneNumber: "9495514948", email: "tincyantonyk@gmail.com", dateOfBirth: "2009-05-25", dateOfBaptism: "2009-11-14", dateOfHolyCommunion: "2019-05-04", fatherName: "Rajesh Kurian", motherName: "Tincy Antony", division: "A" },
  { name: "Noel Joseph", baptismName: "Sebastian Joseph", gender: "Male", houseName: "Konduparambil", phoneNumber: "7012589254", email: "salinipadiyara1982@gmail.com", dateOfBirth: "2009-07-25", dateOfBaptism: "2009-09-08", dateOfHolyCommunion: "2019-05-04", fatherName: "Shobin Sebastian", motherName: "Salini Shobin", division: "A" },
  { name: "Ivan George", baptismName: "Joseph", gender: "Male", houseName: "Kureekkattu", phoneNumber: "9422491170", email: "ivangeorgekerala@gmail.com", dateOfBirth: "2009-05-30", dateOfBaptism: "2009-06-13", dateOfHolyCommunion: "2019-05-04", fatherName: "George Joseph K", motherName: "Rani George", division: "A" },
  { name: "Aron", baptismName: "Aron Varghese Renny", gender: "Male", houseName: "Mavelikulathil", phoneNumber: "6238942617", email: "alexmareyamrenny@gmail.com", dateOfBirth: "2008-06-06", dateOfBaptism: "2008-08-10", dateOfHolyCommunion: "2008-08-10", fatherName: "Renny Mathew", motherName: "Sali V", division: "A" },
  { name: "Merlit Joseph", baptismName: "Alphonsa Joseph", gender: "Female", houseName: "Mookilikattu House", phoneNumber: "9447212758", email: "bibinkurian1975@gmail.com", dateOfBirth: "2009-04-06", dateOfBaptism: "2009-08-22", dateOfHolyCommunion: "2019-05-04", fatherName: "Joseph Kurian", motherName: "Soniya Mathew", division: "A" },
  { name: "Anna Shijimon", baptismName: "Anna Martin Moolakunnel", gender: "Female", houseName: "Moolakunnel", phoneNumber: "7306340753", email: "antonydayana329@gmail.com", dateOfBirth: "2008-10-21", dateOfBaptism: "2008-11-30", dateOfHolyCommunion: "2019-05-04", fatherName: "Shijimon MK", motherName: "Dayana Elizabeth Antony", division: "A" },
  { name: "Jesso Jomon", baptismName: "Chako Thomas", gender: "Male", houseName: "Mukkattu", phoneNumber: "9562234948", email: "jessojomon1@gmail.com", dateOfBirth: "2009-02-25", dateOfBaptism: "2009-05-09", dateOfHolyCommunion: "2009-05-09", fatherName: "Jomon MC", motherName: "Silvy Jomon", division: "A" },
  { name: "Edison Anto Josen", baptismName: "Antony", gender: "Male", houseName: "Perunneparambil", phoneNumber: "9061206015", email: "rajagiri3366@gmail.com", dateOfBirth: "2009-08-20", dateOfBaptism: "2009-12-28", dateOfHolyCommunion: "2019-05-04", fatherName: "Josekutty Joseph", motherName: "Bindu Tonio", division: "A" },
  { name: "Mervin Antony", baptismName: "Thomas Alphons Antony", gender: "Male", houseName: "Polakkachira", phoneNumber: "9567944136", email: "daydreamer3120@gmail.com", dateOfBirth: "2009-08-31", dateOfBaptism: "2009-10-17", dateOfHolyCommunion: "2009-10-17", fatherName: "Antony Thomas", motherName: "Marlin Peter", division: "A" },
  { name: "Jais Joseph", baptismName: "Mathew Joseph", gender: "Male", houseName: "Poolanimattathil", phoneNumber: "7306311948", email: "tom2002joseph@gmail.com", dateOfBirth: "2008-10-17", dateOfBaptism: "2009-09-08", dateOfHolyCommunion: "2009-09-08", fatherName: "Joseph Thomas", motherName: "Darly Joseph", division: "A" },
  { name: "Rosariyo Jacob", baptismName: "Sebastian", gender: "Male", houseName: "Thadickal", phoneNumber: "9847251889", email: "rosariyo283@gmail.com", dateOfBirth: "2008-12-05", dateOfBaptism: "2009-05-16", dateOfHolyCommunion: "2019-05-04", fatherName: "Jacob Sebastian", motherName: "Rajimol", division: "A" },
  { name: "Aaibel Antony Kurian", baptismName: "Antony Kurian Thakidipurathu", gender: "Male", houseName: "Thakadipurathu", phoneNumber: "9946767910", email: "annamariakurian7@gmail.com", dateOfBirth: "2009-04-15", dateOfBaptism: "2009-05-09", dateOfHolyCommunion: "2009-05-09", fatherName: "Vinu Mon Antony", motherName: "Chithra Vinu", division: "A" },
  { name: "Aaron Martin Joseph", baptismName: "Joseph", gender: "Male", houseName: "Thalikaparambil", phoneNumber: "9495846812", email: "aaronmartinjoseph@gmail.com", dateOfBirth: "2010-06-27", dateOfBaptism: "2010-09-09", dateOfHolyCommunion: "2010-09-09", fatherName: "Joseph Joseph", motherName: "Jessy Joseph", division: "A" },
  { name: "Teenu Jomy", baptismName: "Theresa Vadassery", gender: "Female", houseName: "Vadassery", phoneNumber: "8590206709", email: "teenujomyj4772@gmail.com", dateOfBirth: "2009-09-01", dateOfBaptism: "2009-12-12", dateOfHolyCommunion: "2009-12-12", fatherName: "Jomy Joseph", motherName: "Shiji Jomy", division: "A" },
  { name: "Albin George", baptismName: "George", gender: "Male", houseName: "Vazhapparambil", phoneNumber: "8281787095", email: "georgealbin27@gmail.com", dateOfBirth: "2008-10-10", dateOfBaptism: "2009-06-13", dateOfHolyCommunion: "2019-05-04", fatherName: "Georty George", motherName: "Kochuthresiamma", division: "A" },
  { name: "Anjanarose Shaiju", baptismName: "Alphonsa Joseph", gender: "Female", houseName: "Vettukallamkuzhiyil", phoneNumber: "9747372853", email: "bbini3238@gmail.com", dateOfBirth: "2009-10-09", dateOfBaptism: "2009-12-12", dateOfHolyCommunion: "2019-05-04", fatherName: "Shaiju Antony", motherName: "Bini Shaiju", division: "A" },
  { name: "Mariyat Siby", baptismName: "Ann Mariya", gender: "Female", houseName: "Vezhakattu", phoneNumber: "9207842457", email: "mariyatsiby7@gmail.com", dateOfBirth: "2009-10-05", dateOfBaptism: "2010-01-02", dateOfHolyCommunion: "2024-08-18", fatherName: "Siby Thomas", motherName: "Sini Dominic", division: "A" },

  // ===== DIVISION B =====
  { name: "Della Benny", baptismName: "Mary Arimattathil", gender: "Female", houseName: "Arimattathil", phoneNumber: "9562745340", email: "siloomathews@gmail.com", dateOfBirth: "2008-10-01", dateOfBaptism: "2008-11-09", dateOfHolyCommunion: "2008-11-09", fatherName: "Benny Mathew", motherName: "Siloo Mathews", division: "B" },
  { name: "Amal George", baptismName: "Philip George", gender: "Male", houseName: "Arimattom", phoneNumber: "9446862155", email: "amalgeorgepknm@gmail.com", dateOfBirth: "2009-07-20", dateOfBaptism: "2010-01-20", dateOfHolyCommunion: "2019-05-04", fatherName: "George Mathew", motherName: "Anie Philip", division: "B" },
  { name: "Amal George", baptismName: "Philip George", gender: "Male", houseName: "Arimattom", phoneNumber: "9446862155", email: "georgeanie124@gmail.com", dateOfBirth: "2009-07-20", dateOfBaptism: "2010-01-20", dateOfHolyCommunion: "2009-07-20", fatherName: "George Mathew", motherName: "Anie George", division: "B" },
  { name: "Thomas James", baptismName: "Thomas", gender: "Male", houseName: "Ayalooparambil", phoneNumber: "6238896023", email: "sumajames97@gmail.com", dateOfBirth: "2008-10-31", dateOfBaptism: "2008-11-08", dateOfHolyCommunion: "2008-10-31", fatherName: "James K Eapen", motherName: "Suma James", division: "B" },
  { name: "Josu C Biju", baptismName: "Josekutty", gender: "Male", houseName: "Chittattuvadakkethil", phoneNumber: "6282958871", email: "jaimolbiju2@gmail.com", dateOfBirth: "2008-09-20", dateOfBaptism: "2009-01-10", dateOfHolyCommunion: "2009-01-10", fatherName: "Biju Joseph", motherName: "Jaimol PJ", division: "B" },
  { name: "Alphons Denzil", baptismName: "Alphons", gender: "Male", houseName: "Kattikaran", phoneNumber: "9207416282", email: "sollydenzil38@gmail.com", dateOfBirth: "2008-10-04", dateOfBaptism: "2008-12-13", dateOfHolyCommunion: "2008-12-13", fatherName: "John Denzil", motherName: "Solly Denzil", division: "B" },
  { name: "Albin Shaji", baptismName: "Gabriel Shaji", gender: "Male", houseName: "Keezheveettil", phoneNumber: "9744345887", email: "bernardsps938@gmail.com", dateOfBirth: "2008-12-20", dateOfBaptism: "2009-05-04", dateOfHolyCommunion: "2009-05-04", fatherName: "Shajimon KS", motherName: "Mariamma Joseph", division: "B" },
  { name: "Abel Bobin", baptismName: "Mathew John", gender: "Male", houseName: "Kottadikunnel House", phoneNumber: "7909128450", email: "abelbobin1@gmail.com", dateOfBirth: "2009-02-09", dateOfBaptism: "2009-05-03", dateOfHolyCommunion: "2009-05-03", fatherName: "Bobin K Sebastian", motherName: "Reeba Mathew", division: "B" },
  { name: "Analisa", baptismName: "Grace", gender: "Female", houseName: "Manayil", phoneNumber: "7994937802", email: "sharonjtc@gmail.com", dateOfBirth: "2009-12-07", dateOfBaptism: "2010-02-14", dateOfHolyCommunion: "2022-04-30", fatherName: "Jibin", motherName: "Sharon", division: "B" },
  { name: "Edwin Gibi", baptismName: "Antony John", gender: "Male", houseName: "Mandapathil", phoneNumber: "9446459856", email: "edwingibi52@gmail.com", dateOfBirth: "2009-06-18", dateOfBaptism: "2009-08-26", dateOfHolyCommunion: "2009-08-26", fatherName: "Gibi Jose", motherName: "Reni Joseph", division: "B" },
  { name: "Leo S John", baptismName: "George Maniparambil", gender: "Male", houseName: "Maniparambil", phoneNumber: "9447111175", email: "dr.resmysusan@gmail.com", dateOfBirth: "2024-07-16", dateOfBaptism: "2024-07-26", dateOfHolyCommunion: "2024-07-26", fatherName: "Shajul George", motherName: "Resmy Susan Babu", division: "B" },
  { name: "Anvitha Jince", baptismName: "Rose Jince", gender: "Female", houseName: "Mattamundayil", phoneNumber: "8590300034", email: "deumyjohn@gmail.com", dateOfBirth: "2008-09-19", dateOfBaptism: "2009-01-11", dateOfHolyCommunion: "2009-01-11", fatherName: "Jince Tonio", motherName: "Deumy John", division: "B" },
  { name: "Deumy John", baptismName: "Rose Jince", gender: "Female", houseName: "Mattamundayil", phoneNumber: "8547437375", email: "deumyjohn@sdck.in", dateOfBirth: "2008-09-19", dateOfBaptism: "2009-01-11", dateOfHolyCommunion: "2009-01-11", fatherName: "Jince Tonio", motherName: "Deumy John", division: "B" },
  { name: "Nella Mariya Sojan", baptismName: "Mariya", gender: "Female", houseName: "Nadackal", phoneNumber: "9496147051", email: "sijisojan10@gmail.com", dateOfBirth: "2009-01-03", dateOfBaptism: "2009-06-06", dateOfHolyCommunion: "2009-06-06", fatherName: "Sojan Mathew", motherName: "Siji Sojan", division: "B" },
  { name: "Alona Juby", baptismName: "Merlin Sebastian", gender: "Female", houseName: "Ozhukayil", phoneNumber: "8078350218", email: "josinyjuby1485@gmail.com", dateOfBirth: "2009-03-16", dateOfBaptism: "2009-05-17", dateOfHolyCommunion: "2009-05-17", fatherName: "Juby Philip", motherName: "Josiny Juby", division: "B" },
  { name: "Jesna Mathew", baptismName: "Elizabeth Mathew", gender: "Female", houseName: "Palamuriyil House", phoneNumber: "9447743574", email: "jennisaji8@gmail.com", dateOfBirth: "2009-03-18", dateOfBaptism: "2009-05-20", dateOfHolyCommunion: "2009-05-20", fatherName: "Saji Joseph", motherName: "Jenny Dominic", division: "B" },
  { name: "Emil Thomas", baptismName: "Mathew Poolanimattam", gender: "Male", houseName: "Poolanimattam", phoneNumber: "9847787814", email: "shijimathew8274@gmail.com", dateOfBirth: "2009-06-29", dateOfBaptism: "2009-11-14", dateOfHolyCommunion: "2019-05-04", fatherName: "Thomas Mathew", motherName: "Soumya Thomas", division: "B" },
  { name: "Emil Thomas", baptismName: "Mathew Thomas", gender: "Male", houseName: "Poolanimattathil", phoneNumber: "9961667814", email: "thomassoumya@gmail.com", dateOfBirth: "2009-06-29", dateOfBaptism: "2009-09-08", dateOfHolyCommunion: "2009-09-08", fatherName: "Thomas Mathew", motherName: "Soumya", division: "B" },
  { name: "Alba Alphonsa Sebastian", baptismName: "Alphonsa Sebastian", gender: "Female", houseName: "Pulickathundiyil", phoneNumber: "9497843422", email: "albaalphonsa45@gmail.com", dateOfBirth: "2008-10-09", dateOfBaptism: "2008-12-25", dateOfHolyCommunion: "2008-12-25", fatherName: "Sebastian Joseph", motherName: "Fini George", division: "B" },
  { name: "Alphonsa Joby", baptismName: "Alphonsa", gender: "Female", houseName: "Vazhapparambil", phoneNumber: "9497090553", email: "jobygeorge@690.com", dateOfBirth: "2009-09-17", dateOfBaptism: "2010-01-23", dateOfHolyCommunion: "2019-05-04", fatherName: "Joby George", motherName: "Bindhu Joby", division: "B" },
  { name: "Alphonsa Joby", baptismName: "Alphonsa", gender: "Female", houseName: "Vazhapparambill", phoneNumber: "9497090553", email: "bindhujoby840@gmail.com", dateOfBirth: "2009-09-17", dateOfBaptism: "2010-01-23", dateOfHolyCommunion: "2019-05-04", fatherName: "Joby George", motherName: "Bindhu Joby", division: "B" },

  // ===== DIVISION C =====
  { name: "Alan Joseph Xavier", baptismName: "Xavier Joseph", gender: "Male", houseName: "Arackathazhathu", phoneNumber: "8547467661", email: "xavierjoseph550@gmail.com", dateOfBirth: "2009-06-23", dateOfBaptism: "2009-08-01", dateOfHolyCommunion: "2019-05-04", fatherName: "Joseph Xavier", motherName: "Bindumol James", division: "C" },
  { name: "Rosmy Emmanuel", baptismName: "Mary", gender: "Female", houseName: "Aryamkulathu", phoneNumber: "9495394346", email: "jeejammamathew@gmail.com", dateOfBirth: "2009-09-29", dateOfBaptism: "2010-01-09", dateOfHolyCommunion: "2009-01-09", fatherName: "Emmanuel Kurian", motherName: "Jeejamma Mathew", division: "C" },
  { name: "Jithu Jimmy", baptismName: "Jacob Jacob", gender: "Male", houseName: "Chengalikuzhiyil", phoneNumber: "7025553889", email: "jithujimmy21@gmail.com", dateOfBirth: "2008-12-09", dateOfBaptism: "2009-04-26", dateOfHolyCommunion: "2024-08-18", fatherName: "Jimmy Jacob", motherName: "Shymol Thomas", division: "C" },
  { name: "Niya", baptismName: "Alphonsa", gender: "Female", houseName: "Chittattuvadakkethil", phoneNumber: "9446203506", email: "niyaby22@gmail.com", dateOfBirth: "2009-02-14", dateOfBaptism: "2009-06-06", dateOfHolyCommunion: "2009-06-06", fatherName: "Binoy", motherName: "Mini", division: "C" },
  { name: "Alphons Martin", baptismName: "Thomas Martin", gender: "Male", houseName: "Eroorickal", phoneNumber: "7510871366", email: "alphonsmartin16@gmail.com", dateOfBirth: "2008-08-11", dateOfBaptism: "2008-08-31", dateOfHolyCommunion: "2019-08-03", fatherName: "Martin Joseph", motherName: "Rani Martin", division: "C" },
  { name: "Aleena", baptismName: "Elizabeth", gender: "Female", houseName: "Ganapathipackal", phoneNumber: "9447288412", email: "bilcyganapathipackal@gmail.com", dateOfBirth: "2009-09-29", dateOfBaptism: "2009-11-28", dateOfHolyCommunion: "2009-11-28", fatherName: "George", motherName: "Bilcy", division: "C" },
  { name: "Leon Thomas", baptismName: "Abraham", gender: "Male", houseName: "Kalappurackal", phoneNumber: "8281481138", email: "littytony1981@gmail.com", dateOfBirth: "2009-04-19", dateOfBaptism: "2009-09-12", dateOfHolyCommunion: "2019-05-04", fatherName: "Thomas John", motherName: "Litty Thomas", division: "C" },
  { name: "Libin Thomas", baptismName: "Johonson", gender: "Male", houseName: "Kalappurackal", phoneNumber: "8281481138", email: "leaonrhomas462@gmail.com", dateOfBirth: "2008-03-09", dateOfBaptism: "2008-05-08", dateOfHolyCommunion: "2019-05-04", fatherName: "Thomas John", motherName: "Litty Thomas", division: "C" },
  { name: "Albie Abraham", baptismName: "Joseph Abraham", gender: "Male", houseName: "Kumbukkal", phoneNumber: "9400234114", email: "juliekumbukkal@gmail.com", dateOfBirth: "2009-03-18", dateOfBaptism: "2009-06-27", dateOfHolyCommunion: "2019-05-04", fatherName: "Shinoj Abraham", motherName: "Julie Joseph", division: "C" },
  { name: "Treesa Benny", baptismName: "Treesa Benny", gender: "Female", houseName: "Panavelil", phoneNumber: "7592954714", email: "annaros048@gmail.com", dateOfBirth: "2009-01-21", dateOfBaptism: "2009-05-09", dateOfHolyCommunion: "2019-05-04", fatherName: "Benny PM", motherName: "Annie MO", division: "C" },
  { name: "Mathew Roy", baptismName: "Mathew Joseph", gender: "Male", houseName: "Panthiruvelil", phoneNumber: "9526276606", email: "royjose792@gmail.com", dateOfBirth: "2008-08-11", dateOfBaptism: "2008-12-27", dateOfHolyCommunion: "2019-05-03", fatherName: "Jose Roy", motherName: "Linta Roy", division: "C" },
  { name: "Alen Roy", baptismName: "Thomas", gender: "Male", houseName: "Pereparambil", phoneNumber: "9961976185", email: "jollymathew6185@gmail.com", dateOfBirth: "2009-05-26", dateOfBaptism: "2009-06-20", dateOfHolyCommunion: "2019-05-04", fatherName: "Roy", motherName: "Jolly", division: "C" },
  { name: "Alphonsa", baptismName: "Alphonsa", gender: "Female", houseName: "Perumannil (H)", phoneNumber: "7306319725", email: "sibysheeja@gmail.com", dateOfBirth: "2009-05-19", dateOfBaptism: "2009-07-25", dateOfHolyCommunion: "2009-07-25", fatherName: "Siby P Joseph", motherName: "Sheeja Augustine", division: "C" },
  { name: "Alphonsa Sara Siby", baptismName: "Alphonsa Sara Siby", gender: "Female", houseName: "Perumannil (H)", phoneNumber: "7306319725", email: "sibysheeja6@gmail.com", dateOfBirth: "2009-05-19", dateOfBaptism: "2009-07-25", dateOfHolyCommunion: "2009-07-25", fatherName: "Siby P Joseph", motherName: "Sheeja Augustine", division: "C" },
  { name: "Edison Anto Josen", baptismName: "Antony Perunneparampil", gender: "Male", houseName: "Perunneparampil", phoneNumber: "9061206015", email: "jerinbinu7@gmail.com", dateOfBirth: "2009-08-20", dateOfBaptism: "2009-12-28", dateOfHolyCommunion: "2009-12-28", fatherName: "Josukutty Joseph", motherName: "Bindu Tonio", division: "C" },
  { name: "Binol Binoy", baptismName: "Maria", gender: "Female", houseName: "Puthenpurackal", phoneNumber: "9446226546", email: "bpkambadan@gmail.com", dateOfBirth: "2008-03-31", dateOfBaptism: "2016-11-01", dateOfHolyCommunion: "2019-05-04", fatherName: "Binoy PK", motherName: "Liji Binoy", division: "C" },
  { name: "Abhishek Antony Shyju", baptismName: "Antony Martin Puthuparambil", gender: "Male", houseName: "Puthuparambil", phoneNumber: "9633186655", email: "amalatreesa1857@gmail.com", dateOfBirth: "2009-05-08", dateOfBaptism: "2009-07-11", dateOfHolyCommunion: "2009-07-11", fatherName: "Shyju Antony", motherName: "Preethy Shyju", division: "C" },
  { name: "Abhishek Antony Shyju", baptismName: "Antony Martin Puthuparambil", gender: "Male", houseName: "Puthuparambil", phoneNumber: "9633186655", email: "shyjuantonyin@gmail.com", dateOfBirth: "2009-05-08", dateOfBaptism: "2009-07-11", dateOfHolyCommunion: "2009-07-11", fatherName: "Shyju Antony", motherName: "Preethy Shyju", division: "C" },
  { name: "Mariett Sunny", baptismName: "Elizabeth Thomas", gender: "Female", houseName: "Thazhackal", phoneNumber: "8848649406", email: "marietsunny27@gmail.com", dateOfBirth: "2008-10-27", dateOfBaptism: "2009-01-10", dateOfHolyCommunion: "2019-05-04", fatherName: "Sunny John", motherName: "Vineetha Antony", division: "C" },
  { name: "Kevin Jose", baptismName: "Varghese Joseph", gender: "Male", houseName: "Thazhackal", phoneNumber: "9207182077", email: "shincyjose2007@gmail.com", dateOfBirth: "2009-08-05", dateOfBaptism: "2009-10-10", dateOfHolyCommunion: "2009-10-10", fatherName: "Jose John", motherName: "Shincy Jose", division: "C" },
  { name: "Josni Anna Varghese", baptismName: "Annamma Varghese", gender: "Female", houseName: "Thekkekappil", phoneNumber: "9207338918", email: "anuvarghese645@gmail.com", dateOfBirth: "2008-10-08", dateOfBaptism: "2009-01-10", dateOfHolyCommunion: "2009-01-10", fatherName: "Varghese Jose", motherName: "Anu Varghese", division: "C" },
  { name: "Jennifer Jijo", baptismName: "Mariya Joseph", gender: "Female", houseName: "Urumbadayil", phoneNumber: "9656570030", email: "jijojerin69@gamil.com", dateOfBirth: "2008-11-07", dateOfBaptism: "2009-01-10", dateOfHolyCommunion: "2019-05-03", fatherName: "Jijo Joseph", motherName: "Bindu Jijo", division: "C" },
  { name: "Tolin Colines", baptismName: "Joseph Emmanuval", gender: "Male", houseName: "Vattakkattu", phoneNumber: "8086610001", email: "twinklecolines@gmail.com", dateOfBirth: "2009-04-20", dateOfBaptism: "2009-09-12", dateOfHolyCommunion: "2009-09-12", fatherName: "Colines Francis", motherName: "Twinkle Colines", division: "C" },
  { name: "Kesiya Mol VS", baptismName: "Saramma Vettickal", gender: "Female", houseName: "Vettickal", phoneNumber: "8594037176", email: "remyashiju@gmail.com", dateOfBirth: "2008-08-07", dateOfBaptism: "2010-11-03", dateOfHolyCommunion: "2016-05-04", fatherName: "Shiju VK", motherName: "Remya TM", division: "C" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    let inserted = 0;
    let skipped = 0;
    const errors = [];

    for (const s of students) {
      try {
        // Check if already exists by email
        const exists = await Student.findOne({ email: s.email.toLowerCase() });
        if (exists) {
          console.log(`SKIP (email exists): ${s.name} - ${s.email}`);
          skipped++;
          continue;
        }

        await Student.create({
          ...s,
          email: s.email.toLowerCase().trim(),
          className: '12',
          status: 'pending',
          registrationDate: new Date(),
          dateOfBirth: new Date(s.dateOfBirth),
          dateOfBaptism: new Date(s.dateOfBaptism),
          dateOfHolyCommunion: s.dateOfHolyCommunion ? new Date(s.dateOfHolyCommunion) : null,
        });

        console.log(`OK: ${s.name} (${s.division})`);
        inserted++;
      } catch (err) {
        console.error(`FAIL: ${s.name} - ${err.message}`);
        errors.push({ name: s.name, error: err.message });
      }
    }

    console.log('\n========== SUMMARY ==========');
    console.log(`Total: ${students.length}`);
    console.log(`Inserted: ${inserted}`);
    console.log(`Skipped (duplicate email): ${skipped}`);
    console.log(`Errors: ${errors.length}`);
    if (errors.length > 0) {
      console.log('Error details:');
      errors.forEach(e => console.log(`  - ${e.name}: ${e.error}`));
    }

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

seed();