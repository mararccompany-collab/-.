export interface FormationPlayer {
  number: number;
  name: string;
  nameAr: string;
  x: number;
  y: number;
  role: string;
  roleAr: string;
}

export interface TeamData {
  id: string;
  name: string;
  nameAr: string;
  flag: string;
  logo: string;
  group: string;
  groupAr: string;
  formation: string;
  players: FormationPlayer[];
  keyPlayers: string[];
  keyPlayersAr: string[];
  fifaRank: number;
  worldCups: number;
  coach: string;
  coachAr: string;
}

const playersByTeam: Record<string, FormationPlayer[]> = {};

function p(num: number, name: string, nameAr: string, x: number, y: number, role: string, roleAr: string): FormationPlayer {
  return { number: num, name, nameAr, x, y, role, roleAr };
}

// === Group A ===
playersByTeam['qatar'] = [
  p(1, 'Saad Al-Sheeb', 'سعد الشيب', 50, 92, 'GK', 'حارس'),
  p(2, 'Ró-Ró', 'رورو', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Abdelkarim Hassan', 'عبدالكريم حسن', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Mohammed Waad', 'محمد وعد', 35, 72, 'CB', 'مدافع'),
  p(5, 'Tarek Salman', 'طارق سلمان', 65, 72, 'CB', 'مدافع'),
  p(6, 'Abdulaziz Hatem', 'عبدالعزيز حاتم', 25, 55, 'CM', 'وسط'),
  p(7, 'Karim Boudiaf', 'كريم بوضيف', 55, 55, 'CM', 'وسط'),
  p(8, 'Hassan Al-Haydos', 'حسن الهيدوس', 75, 55, 'CAM', 'وسط هجومي'),
  p(9, 'Almoez Ali', 'المعز علي', 20, 30, 'ST', 'مهاجم'),
  p(10, 'Akram Afif', 'أكرم عفيف', 80, 30, 'ST', 'مهاجم'),
  p(11, 'Homam Ahmed', 'همام أحمد', 50, 40, 'LW', 'جناح أيسر'),
];

playersByTeam['ecuador'] = [
  p(1, 'Hernán Galíndez', 'إيرنان غالينديز', 50, 92, 'GK', 'حارس'),
  p(2, 'Ángelo Preciado', 'أنجيلو بريسيادو', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Pervis Estupiñán', 'بيرفس إستوبينان', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Piero Hincapié', 'بييرو هينكابي', 35, 72, 'CB', 'مدافع'),
  p(5, 'Félix Torres', 'فيليكس توريس', 65, 72, 'CB', 'مدافع'),
  p(6, 'Carlos Gruezo', 'كارلوس غروسو', 30, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Moisés Caicedo', 'مويسيس كايسيدو', 55, 55, 'CM', 'وسط'),
  p(8, 'Gonzalo Plata', 'غونزالو بلاتا', 20, 40, 'RW', 'جناح أيمن'),
  p(9, 'Michael Estrada', 'ميخائيل إسترادا', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Enner Valencia', 'إينير فالنسيا', 50, 42, 'CF', 'مهاجم'),
  p(11, 'Ángel Mena', 'أنجيل مينا', 80, 40, 'LW', 'جناح أيسر'),
];

playersByTeam['senegal'] = [
  p(1, 'Édouard Mendy', 'إدوارد ميندي', 50, 92, 'GK', 'حارس'),
  p(2, 'Kalidou Koulibaly', 'خاليدو كوليبالي', 50, 72, 'CB', 'مدافع'),
  p(3, 'Abdou Diallo', 'عبدو ديالو', 25, 78, 'CB', 'مدافع'),
  p(4, 'Ismaïla Sarr', 'إسماعيل سار', 20, 40, 'RW', 'جناح أيمن'),
  p(5, 'Idrissa Gueye', 'إدريسا غاي', 35, 55, 'CM', 'وسط'),
  p(6, 'Nampalys Mendy', 'نامباليس ميندي', 65, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Sadio Mané', 'ساديو ماني', 80, 40, 'LW', 'جناح أيسر'),
  p(8, 'Cheikhou Kouyaté', 'شيخو كوياتي', 50, 55, 'CM', 'وسط'),
  p(9, 'Boulaye Dia', 'بولايا ديا', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Famara Diédhiou', 'فامارا ديدهيو', 75, 30, 'ST', 'مهاجم'),
  p(11, 'Pape Sarr', 'باب سار', 85, 78, 'LB', 'ظهير أيسر'),
];

playersByTeam['netherlands'] = [
  p(1, 'Andries Noppert', 'أندريس نوبيرت', 50, 92, 'GK', 'حارس'),
  p(2, 'Jurriën Timber', 'يوريان تيمبر', 30, 78, 'CB', 'مدافع'),
  p(3, 'Virgil van Dijk', 'فيرجيل فان دايك', 50, 72, 'CB', 'مدافع'),
  p(4, 'Nathan Aké', 'ناثان أكي', 70, 78, 'CB', 'مدافع'),
  p(5, 'Denzel Dumfries', 'دينزيل دومفريس', 10, 60, 'RWB', 'ظهير أيمن'),
  p(6, 'Frenkie de Jong', 'فرينكي دي يونغ', 35, 55, 'CM', 'وسط'),
  p(7, 'Cody Gakpo', 'كودي غاكبو', 80, 60, 'LWB', 'ظهير أيسر'),
  p(8, 'Steven Berghuis', 'ستيفن بيرغويس', 65, 55, 'CM', 'وسط'),
  p(9, 'Memphis Depay', 'ممفيس ديباي', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Davy Klaassen', 'دافي كلاسن', 50, 42, 'CAM', 'وسط هجومي'),
  p(11, 'Steven Bergwijn', 'ستيفن بيرخوين', 20, 40, 'RW', 'جناح أيمن'),
];

// === Group B ===
playersByTeam['england'] = [
  p(1, 'Jordan Pickford', 'جوردان بيكفورد', 50, 92, 'GK', 'حارس'),
  p(2, 'Kyle Walker', 'كايل ووكر', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Luke Shaw', 'لوك شاو', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'John Stones', 'جون ستونز', 35, 72, 'CB', 'مدافع'),
  p(5, 'Harry Maguire', 'هاري ماغواير', 65, 72, 'CB', 'مدافع'),
  p(6, 'Declan Rice', 'ديكلان رايس', 50, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Bukayo Saka', 'بوكايو ساكا', 20, 40, 'RW', 'جناح أيمن'),
  p(8, 'Jude Bellingham', 'جود بيلينغهام', 60, 50, 'CM', 'وسط'),
  p(9, 'Harry Kane', 'هاري كين', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Raheem Sterling', 'رحيم ستيرلينغ', 80, 40, 'LW', 'جناح أيسر'),
  p(11, 'Mason Mount', 'ماسون ماونت', 40, 50, 'CM', 'وسط'),
];

playersByTeam['iran'] = [
  p(1, 'Alireza Beiranvand', 'علي رضا بيرانوند', 50, 92, 'GK', 'حارس'),
  p(2, 'Sadegh Moharrami', 'صادق محرمي', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Milad Mohammadi', 'ميلاد محمدي', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Morteza Pouraliganji', 'مرتضى بورعلي‌گنجي', 35, 72, 'CB', 'مدافع'),
  p(5, 'Majid Hosseini', 'ماجد حسيني', 65, 72, 'CB', 'مدافع'),
  p(6, 'Saeid Ezatolahi', 'سعيد عزت‌اللهي', 50, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Ahmad Nourollahi', 'أحمد نوراللهي', 65, 50, 'CM', 'وسط'),
  p(8, 'Ali Gholizadeh', 'علي غليزاده', 80, 40, 'LW', 'جناح أيسر'),
  p(9, 'Mehdi Taremi', 'مهدي طارمي', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Sardar Azmoun', 'سردار آزمون', 50, 38, 'CF', 'مهاجم'),
  p(11, 'Alireza Jahanbakhsh', 'علي رضا جهانبخش', 20, 40, 'RW', 'جناح أيمن'),
];

playersByTeam['usa'] = [
  p(1, 'Matt Turner', 'مات تيرنر', 50, 92, 'GK', 'حارس'),
  p(2, 'Sergiño Dest', 'سيرجينيو ديست', 85, 78, 'LB', 'ظهير أيسر'),
  p(3, 'Walker Zimmerman', 'ووكر زيمرمان', 35, 72, 'CB', 'مدافع'),
  p(4, 'Aaron Long', 'آرون لونغ', 65, 72, 'CB', 'مدافع'),
  p(5, 'DeAndre Yedlin', 'دي أندريه يدلين', 15, 78, 'RB', 'ظهير أيمن'),
  p(6, 'Weston McKennie', 'ويستون ماكيني', 65, 50, 'CM', 'وسط'),
  p(7, 'Giovanni Reyna', 'جيوفاني رينا', 50, 42, 'CAM', 'وسط هجومي'),
  p(8, 'Tyler Adams', 'تايلر آدامز', 35, 55, 'CDM', 'وسط دفاعي'),
  p(9, 'Christian Pulisic', 'كريستيان بوليسيتش', 80, 40, 'LW', 'جناح أيسر'),
  p(10, 'Tim Weah', 'تيم ويا', 20, 40, 'RW', 'جناح أيمن'),
  p(11, 'Haji Wright', 'هاجي رايت', 50, 30, 'ST', 'مهاجم'),
];

playersByTeam['wales'] = [
  p(1, 'Wayne Hennessey', 'واين هينيسي', 50, 92, 'GK', 'حارس'),
  p(2, 'Ben Davies', 'بن ديفيز', 50, 72, 'CB', 'مدافع'),
  p(3, 'Neco Williams', 'نيكو ويليامز', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Ethan Ampadu', 'إيثان أمبادو', 35, 55, 'CDM', 'وسط دفاعي'),
  p(5, 'Chris Mepham', 'كريس ميفام', 35, 72, 'CB', 'مدافع'),
  p(6, 'Joe Rodon', 'جو رودون', 65, 72, 'CB', 'مدافع'),
  p(7, 'Daniel James', 'دانيال جيمس', 80, 40, 'LW', 'جناح أيسر'),
  p(8, 'Aaron Ramsey', 'آرون رامزي', 55, 50, 'CM', 'وسط'),
  p(9, 'Kieffer Moore', 'كيفر مور', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Gareth Bale', 'غاريث بيل', 50, 38, 'CF', 'مهاجم'),
  p(11, 'Connor Roberts', 'كونور روبرتس', 15, 78, 'RB', 'ظهير أيمن'),
];

// === Group C ===
playersByTeam['argentina'] = [
  p(1, 'Emiliano Martínez', 'إيميليانو مارتينيز', 50, 92, 'GK', 'حارس'),
  p(2, 'Nahuel Molina', 'ناهويل مولينا', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Marcos Acuña', 'ماركوس أكونيا', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Cristian Romero', 'كريستيان روميرو', 35, 72, 'CB', 'مدافع'),
  p(5, 'Nicolás Otamendi', 'نيكولاس أوتامندي', 65, 72, 'CB', 'مدافع'),
  p(6, 'Rodrigo De Paul', 'رودريغو دي بول', 55, 55, 'CM', 'وسط'),
  p(7, 'Leandro Paredes', 'لياندرو باريديس', 30, 55, 'CDM', 'وسط دفاعي'),
  p(8, 'Ángel Di María', 'أنجيل دي ماريا', 20, 40, 'RW', 'جناح أيمن'),
  p(9, 'Lionel Messi', 'ليونيل ميسي', 50, 35, 'CAM', 'وسط هجومي'),
  p(10, 'Lautaro Martínez', 'لاوتارو مارتينيز', 50, 30, 'ST', 'مهاجم'),
  p(11, 'Alejandro Gómez', 'أليخاندرو غوميز', 80, 40, 'LW', 'جناح أيسر'),
];

playersByTeam['saudi-arabia'] = [
  p(1, 'Mohammed Al-Owais', 'محمد العويس', 50, 92, 'GK', 'حارس'),
  p(2, 'Sultan Al-Ghannam', 'سلطان الغنام', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Yasser Al-Shahrani', 'ياسر الشهراني', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Ali Al-Bulaihi', 'علي البليهي', 35, 72, 'CB', 'مدافع'),
  p(5, 'Abdulelah Al-Amri', 'عبدالإله العمري', 65, 72, 'CB', 'مدافع'),
  p(6, 'Mohamed Kanno', 'محمد كنو', 55, 55, 'CM', 'وسط'),
  p(7, 'Salman Al-Faraj', 'سلمان الفرج', 35, 55, 'CDM', 'وسط دفاعي'),
  p(8, 'Salem Al-Dawsari', 'سالم الدوسري', 80, 40, 'LW', 'جناح أيسر'),
  p(9, 'Firas Al-Buraikan', 'فراس البريكان', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Saleh Al-Shehri', 'صالح الشهري', 50, 38, 'CF', 'مهاجم'),
  p(11, 'Hattan Bahebri', 'هتان باهبري', 20, 40, 'RW', 'جناح أيمن'),
];

playersByTeam['mexico'] = [
  p(1, 'Guillermo Ochoa', 'غييرمو أوتشوا', 50, 92, 'GK', 'حارس'),
  p(2, 'Jorge Sánchez', 'خورخي سانشيز', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Jesús Gallardo', 'خيسوس غاياردو', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'César Montes', 'سيزار مونتيس', 35, 72, 'CB', 'مدافع'),
  p(5, 'Héctor Moreno', 'هيكتور مورينو', 65, 72, 'CB', 'مدافع'),
  p(6, 'Andrés Guardado', 'أندريس غواردادو', 35, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Edson Álvarez', 'إيدسون ألفاريز', 55, 55, 'CM', 'وسط'),
  p(8, 'Hirving Lozano', 'هيرفينغ لوزانو', 20, 40, 'RW', 'جناح أيمن'),
  p(9, 'Raúl Jiménez', 'راؤول خيمينيز', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Alexis Vega', 'أليكسيس فيغا', 80, 40, 'LW', 'جناح أيسر'),
  p(11, 'Carlos Rodríguez', 'كارلوس رودريغيز', 70, 50, 'CM', 'وسط'),
];

playersByTeam['poland'] = [
  p(1, 'Wojciech Szczęsny', 'فويتشيك شتشيسني', 50, 92, 'GK', 'حارس'),
  p(2, 'Matty Cash', 'ماتي كاش', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Jan Bednarek', 'يان بيدناريك', 50, 72, 'CB', 'مدافع'),
  p(4, 'Kamil Glik', 'كاميل غليك', 35, 78, 'CB', 'مدافع'),
  p(5, 'Jakub Kiwior', 'جاكوب كيويور', 65, 72, 'CB', 'مدافع'),
  p(6, 'Grzegorz Krychowiak', 'جيجي كريتشوفياك', 35, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Kamil Grosicki', 'كاميل غروشيتسكي', 80, 40, 'LW', 'جناح أيسر'),
  p(8, 'Piotr Zieliński', 'بيوتر زيلينسكي', 55, 55, 'CM', 'وسط'),
  p(9, 'Robert Lewandowski', 'روبرت ليفاندوفسكي', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Arkadiusz Milik', 'أركاديوش ميليك', 50, 38, 'CF', 'مهاجم'),
  p(11, 'Przemysław Frankowski', 'برزيميسلاف فرانكوفسكي', 20, 40, 'RW', 'جناح أيمن'),
];

// === Group D ===
playersByTeam['france'] = [
  p(1, 'Hugo Lloris', 'هوغو لوريس', 50, 92, 'GK', 'حارس'),
  p(2, 'Benjamin Pavard', 'بنجامين بافار', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Theo Hernandez', 'تيو هيرنانديز', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Raphaël Varane', 'رافاييل فاران', 35, 72, 'CB', 'مدافع'),
  p(5, 'Dayot Upamecano', 'دايو أوباميكانو', 65, 72, 'CB', 'مدافع'),
  p(6, 'Aurélien Tchouaméni', 'أوريلين تشواميني', 40, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Adrien Rabiot', 'أدريان رابيو', 60, 55, 'CM', 'وسط'),
  p(8, 'Antoine Griezmann', 'أنطوان غريزمان', 50, 40, 'CAM', 'وسط هجومي'),
  p(9, 'Kylian Mbappé', 'كيليان مبابي', 80, 30, 'LW', 'جناح أيسر'),
  p(10, 'Olivier Giroud', 'أوليفييه جيرو', 50, 30, 'ST', 'مهاجم'),
  p(11, 'Ousmane Dembélé', 'عثمان ديمبيلي', 20, 40, 'RW', 'جناح أيمن'),
];

playersByTeam['australia'] = [
  p(1, 'Mathew Ryan', 'ماثيو رايان', 50, 92, 'GK', 'حارس'),
  p(2, 'Miloš Degenek', 'ميلوش ديغينيك', 65, 72, 'CB', 'مدافع'),
  p(3, 'Aziz Behich', 'عزيز بيهيتش', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Trent Sainsbury', 'ترينت سينزبري', 35, 72, 'CB', 'مدافع'),
  p(5, 'Fran Karačić', 'فران كاراسيتش', 15, 78, 'RB', 'ظهير أيمن'),
  p(6, 'Aaron Mooy', 'آرون موي', 50, 55, 'CM', 'وسط'),
  p(7, 'Jackson Irvine', 'جاكسون إيرفين', 35, 55, 'CDM', 'وسط دفاعي'),
  p(8, 'Riley McGree', 'رايلي ماكغري', 65, 50, 'CM', 'وسط'),
  p(9, 'Martin Boyle', 'مارتن بويل', 20, 40, 'RW', 'جناح أيمن'),
  p(10, 'Mathew Leckie', 'ماثيو ليكي', 80, 40, 'LW', 'جناح أيسر'),
  p(11, 'Mitchell Duke', 'ميتشل دوك', 50, 30, 'ST', 'مهاجم'),
];

playersByTeam['denmark'] = [
  p(1, 'Kasper Schmeichel', 'كاسبر شمايكل', 50, 92, 'GK', 'حارس'),
  p(2, 'Joachim Andersen', 'يواكيم أندرسن', 35, 72, 'CB', 'مدافع'),
  p(3, 'Simon Kjær', 'سيمون كيير', 50, 72, 'CB', 'مدافع'),
  p(4, 'Jens Stryger Larsen', 'ينس ستريجر لارسن', 15, 78, 'RB', 'ظهير أيمن'),
  p(5, 'Joakim Mæhle', 'يواكيم ماهلي', 85, 78, 'LB', 'ظهير أيسر'),
  p(6, 'Pierre-Emile Højbjerg', 'بيير إيميل هويبيرغ', 55, 55, 'CM', 'وسط'),
  p(7, 'Thomas Delaney', 'توماس ديلاني', 35, 55, 'CDM', 'وسط دفاعي'),
  p(8, 'Christian Eriksen', 'كريستيان إريكسن', 50, 42, 'CAM', 'وسط هجومي'),
  p(9, 'Kasper Dolberg', 'كاسبر دولبرغ', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Andreas Skov Olsen', 'أندرياس سكوف أولسن', 20, 40, 'RW', 'جناح أيمن'),
  p(11, 'Mikkel Damsgaard', 'ميكيل دامسغارد', 80, 40, 'LW', 'جناح أيسر'),
];

playersByTeam['tunisia'] = [
  p(1, 'Aymen Dahmen', 'أيمن دحمان', 50, 92, 'GK', 'حارس'),
  p(2, 'Mohamed Dräger', 'محمد دراغر', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Ali Maâloul', 'علي معلول', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Yassine Meriah', 'ياسمين مرياح', 35, 72, 'CB', 'مدافع'),
  p(5, 'Nader Ghandri', 'نادر غندري', 65, 72, 'CB', 'مدافع'),
  p(6, 'Ellyes Skhiri', 'اليس صخيري', 50, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Aïssa Laïdouni', 'عيسى العيدوني', 55, 50, 'CM', 'وسط'),
  p(8, 'Wahbi Khazri', 'وهبي خزري', 50, 40, 'CAM', 'وسط هجومي'),
  p(9, 'Youssef Msakni', 'يوسف المساكني', 80, 40, 'LW', 'جناح أيسر'),
  p(10, 'Issam Jebali', 'عصام الجبالي', 50, 30, 'ST', 'مهاجم'),
  p(11, 'Anis Ben Slimane', 'أنيس بن سليمان', 20, 40, 'RW', 'جناح أيمن'),
];

// === Group E ===
playersByTeam['spain'] = [
  p(1, 'Unai Simón', 'يوناي سيمون', 50, 92, 'GK', 'حارس'),
  p(2, 'Dani Carvajal', 'داني كارفاخال', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Jordi Alba', 'جوردي ألبا', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Rodri', 'رودري', 50, 55, 'CDM', 'وسط دفاعي'),
  p(5, 'Aymeric Laporte', 'إيميريك لابورت', 35, 72, 'CB', 'مدافع'),
  p(6, 'Pau Torres', 'باو توريس', 65, 72, 'CB', 'مدافع'),
  p(7, 'Sergio Busquets', 'سيرجيو بوسكيتس', 50, 48, 'CM', 'وسط'),
  p(8, 'Gavi', 'جافي', 40, 55, 'CM', 'وسط'),
  p(9, 'Pedri', 'بيدري', 60, 55, 'CM', 'وسط'),
  p(10, 'Ferrán Torres', 'فيران توريس', 20, 40, 'RW', 'جناح أيمن'),
  p(11, 'Álvaro Morata', 'ألفارو موراتا', 50, 30, 'ST', 'مهاجم'),
  p(12, 'Dani Olmo', 'داني أولمو', 80, 40, 'LW', 'جناح أيسر'),
];

playersByTeam['costa-rica'] = [
  p(1, 'Keylor Navas', 'كيلور نافاس', 50, 92, 'GK', 'حارس'),
  p(2, 'Keysher Fuller', 'كايشر فولر', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Juan Pablo Vargas', 'خوان بابلو فارغاس', 35, 72, 'CB', 'مدافع'),
  p(4, 'Óscar Duarte', 'أوسكار دوارتي', 65, 72, 'CB', 'مدافع'),
  p(5, 'Bryan Oviedo', 'بريان أوفييدو', 85, 78, 'LB', 'ظهير أيسر'),
  p(6, 'Celso Borges', 'سيلسو بورخيس', 55, 55, 'CM', 'وسط'),
  p(7, 'Yeltsin Tejeda', 'يلتسين تيخيدا', 35, 55, 'CDM', 'وسط دفاعي'),
  p(8, 'Bryan Ruiz', 'بريان رويز', 50, 42, 'CAM', 'وسط هجومي'),
  p(9, 'Joel Campbell', 'جويل كامبل', 80, 40, 'LW', 'جناح أيسر'),
  p(10, 'Anthony Contreras', 'أنتوني كونتريراس', 50, 30, 'ST', 'مهاجم'),
  p(11, 'Jewison Bennette', 'جيويسون بينيت', 20, 40, 'RW', 'جناح أيمن'),
];

playersByTeam['germany'] = [
  p(1, 'Manuel Neuer', 'مانويل نوير', 50, 92, 'GK', 'حارس'),
  p(2, 'Antonio Rüdiger', 'أنطونيو روديغر', 50, 72, 'CB', 'مدافع'),
  p(3, 'Niklas Süle', 'نيكلاس زوله', 35, 78, 'CB', 'مدافع'),
  p(4, 'David Raum', 'ديفيد راوم', 85, 78, 'LB', 'ظهير أيسر'),
  p(5, 'Joshua Kimmich', 'يوشوا كيميش', 15, 78, 'RB', 'ظهير أيمن'),
  p(6, 'Ilkay Gündoğan', 'إيلكاي غوندوغان', 50, 55, 'CM', 'وسط'),
  p(7, 'Leon Goretzka', 'ليون غوريتسكا', 65, 55, 'CM', 'وسط'),
  p(8, 'Jamal Musiala', 'جمال موسيالا', 50, 40, 'CAM', 'وسط هجومي'),
  p(9, 'Serge Gnabry', 'سيرج غنابري', 80, 40, 'LW', 'جناح أيسر'),
  p(10, 'Thomas Müller', 'توماس مولر', 50, 38, 'CF', 'مهاجم'),
  p(11, 'Kai Havertz', 'كاي هافيرتز', 20, 40, 'RW', 'جناح أيمن'),
];

playersByTeam['japan'] = [
  p(1, 'Eiji Kawashima', 'إيوجي كاواشيما', 50, 92, 'GK', 'حارس'),
  p(2, 'Takehiro Tomiyasu', 'تاكيهيرو تومياسو', 50, 72, 'CB', 'مدافع'),
  p(3, 'Yuto Nagatomo', 'يوتو ناغاتومو', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Maya Yoshida', 'مايا يوشيدا', 35, 72, 'CB', 'مدافع'),
  p(5, 'Hiroki Sakai', 'هيروكي ساكاي', 15, 78, 'RB', 'ظهير أيمن'),
  p(6, 'Wataru Endo', 'واتارو إيندو', 55, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Hidemasa Morita', 'هيديماسا موريتا', 35, 55, 'CM', 'وسط'),
  p(8, 'Ritsu Dōan', 'ريتسو دوان', 20, 40, 'RW', 'جناح أيمن'),
  p(9, 'Daichi Kamada', 'دايتشي كامادا', 50, 42, 'CAM', 'وسط هجومي'),
  p(10, 'Takefusa Kubo', 'تاكيفوسا كوبو', 80, 40, 'LW', 'جناح أيسر'),
  p(11, 'Ayase Ueda', 'أياسي أويدا', 50, 30, 'ST', 'مهاجم'),
];

// === Group F ===
playersByTeam['belgium'] = [
  p(1, 'Thibaut Courtois', 'تيبو كورتوا', 50, 92, 'GK', 'حارس'),
  p(2, 'Toby Alderweireld', 'توبي ألدرفيريلد', 35, 72, 'CB', 'مدافع'),
  p(3, 'Jan Vertonghen', 'يان فيرتونغن', 50, 72, 'CB', 'مدافع'),
  p(4, 'Leander Dendoncker', 'لياندر ديندونكير', 65, 55, 'CDM', 'وسط دفاعي'),
  p(5, 'Timothy Castagne', 'تيموثي كاستاني', 15, 78, 'RB', 'ظهير أيمن'),
  p(6, 'Yannick Carrasco', 'يانيك كاراسكو', 85, 78, 'LB', 'ظهير أيسر'),
  p(7, 'Kevin De Bruyne', 'كيفن دي بروين', 50, 48, 'CM', 'وسط'),
  p(8, 'Youri Tielemans', 'يوري تيليمانس', 65, 50, 'CM', 'وسط'),
  p(9, 'Eden Hazard', 'إيدين هازارد', 50, 40, 'CAM', 'وسط هجومي'),
  p(10, 'Romelu Lukaku', 'روميلو لوكاكو', 50, 30, 'ST', 'مهاجم'),
  p(11, 'Dries Mertens', 'دريس ميرتنز', 20, 40, 'RW', 'جناح أيمن'),
];

playersByTeam['canada'] = [
  p(1, 'Milan Borjan', 'ميلان بوريان', 50, 92, 'GK', 'حارس'),
  p(2, 'Alistair Johnston', 'أليستير جونستون', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Sam Adekugbe', 'سام أديغبي', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Steven Vitória', 'ستيفن فيتوريا', 65, 72, 'CB', 'مدافع'),
  p(5, 'Kamaral Miller', 'كامارال ميلر', 35, 72, 'CB', 'مدافع'),
  p(6, 'Stephen Eustáquio', 'ستيفن أوستاكيو', 55, 55, 'CM', 'وسط'),
  p(7, 'Atiba Hutchinson', 'أتيبا هاتشينسون', 35, 55, 'CDM', 'وسط دفاعي'),
  p(8, 'David Davies', 'ديفيد ديفيز', 85, 55, 'LM', 'وسط أيسر'),
  p(9, 'Tajon Buchanan', 'تاجون بوكانان', 20, 40, 'RW', 'جناح أيمن'),
  p(10, 'Jonathan David', 'جوناثان ديفيد', 50, 30, 'ST', 'مهاجم'),
  p(11, 'Cyle Larin', 'سيل لارين', 50, 38, 'CF', 'مهاجم'),
];

playersByTeam['morocco'] = [
  p(1, 'Yassine Bounou', 'ياسين بونو', 50, 92, 'GK', 'حارس'),
  p(2, 'Achraf Hakimi', 'أشرف حكيمي', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Noussair Mazraoui', 'نوصير مزراوي', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Romain Saïss', 'رومان سايس', 50, 72, 'CB', 'مدافع'),
  p(5, 'Nayef Aguerd', 'نايف أكرد', 35, 72, 'CB', 'مدافع'),
  p(6, 'Sofyan Amrabat', 'سفيان أمرابط', 50, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Azzedine Ounahi', 'أز الدين أوناحي', 60, 50, 'CM', 'وسط'),
  p(8, 'Hakim Ziyech', 'حكيم زياش', 20, 40, 'RW', 'جناح أيمن'),
  p(9, 'Youssef En-Nesyri', 'يوسف النصيري', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Sofiane Boufal', 'سفيان بوفال', 80, 40, 'LW', 'جناح أيسر'),
  p(11, 'Bilal El Khannous', 'بلال الخنوس', 55, 42, 'CAM', 'وسط هجومي'),
];

playersByTeam['croatia'] = [
  p(1, 'Dominik Livaković', 'دومينيك ليفاكوفيتش', 50, 92, 'GK', 'حارس'),
  p(2, 'Josip Juranović', 'يوسيب يورانوفيتش', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Borna Barišić', 'بورنا باريسيتش', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Josko Gvardiol', 'يوسكو غفارديول', 35, 72, 'CB', 'مدافع'),
  p(5, 'Dejan Lovren', 'ديان لوفرين', 65, 72, 'CB', 'مدافع'),
  p(6, 'Luka Modrić', 'لوكا مودريتش', 55, 48, 'CM', 'وسط'),
  p(7, 'Mateo Kovačić', 'ماتيو كوفاسيتش', 60, 55, 'CM', 'وسط'),
  p(8, 'Marcelo Brozović', 'مارسيلو بروزوفيتش', 40, 55, 'CDM', 'وسط دفاعي'),
  p(9, 'Andrej Kramarić', 'أندري كراماريتش', 50, 38, 'CF', 'مهاجم'),
  p(10, 'Ivan Perišić', 'إيفان بيريشيتش', 80, 40, 'LW', 'جناح أيسر'),
  p(11, 'Nikola Vlašić', 'نيكولا فلاشيتش', 20, 40, 'RW', 'جناح أيمن'),
];

// === Group G ===
playersByTeam['brazil'] = [
  p(1, 'Alisson', 'أليسون', 50, 92, 'GK', 'حارس'),
  p(2, 'Danilo', 'دانيلو', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Alex Sandro', 'أليكس ساندرو', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Thiago Silva', 'تياغو سيلفا', 50, 72, 'CB', 'مدافع'),
  p(5, 'Marquinhos', 'ماركينيوس', 35, 72, 'CB', 'مدافع'),
  p(6, 'Casemiro', 'كاسيميرو', 50, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Lucas Paquetá', 'لوكاس باكيتا', 60, 50, 'CM', 'وسط'),
  p(8, 'Neymar Jr', 'نيمار', 50, 40, 'CAM', 'وسط هجومي'),
  p(9, 'Raphinha', 'رافينيا', 20, 40, 'RW', 'جناح أيمن'),
  p(10, 'Richarlison', 'ريتشارليسون', 50, 30, 'ST', 'مهاجم'),
  p(11, 'Vinícius Jr', 'فينيسيوس جونيور', 80, 30, 'LW', 'جناح أيسر'),
];

playersByTeam['serbia'] = [
  p(1, 'Vanja Milinković-Savić', 'فانيا ميلينكوفيتش-سافيتش', 50, 92, 'GK', 'حارس'),
  p(2, 'Strahinja Pavlović', 'ستراهينيا بافلوفيتش', 35, 72, 'CB', 'مدافع'),
  p(3, 'Miloš Veljković', 'ميلوش فيليكوفيتش', 65, 72, 'CB', 'مدافع'),
  p(4, 'Nikola Milenković', 'نيكولا ميلينكوفيتش', 50, 78, 'RB', 'ظهير أيمن'),
  p(5, 'Filip Kostić', 'فيليب كوستيتش', 85, 78, 'LB', 'ظهير أيسر'),
  p(6, 'Sergej Milinković-Savić', 'سيرجي ميلينكوفيتش-سافيتش', 55, 55, 'CM', 'وسط'),
  p(7, 'Saša Lukić', 'ساشا لوكيتش', 35, 55, 'CDM', 'وسط دفاعي'),
  p(8, 'Dušan Tadić', 'دوشان تاديتش', 50, 42, 'CAM', 'وسط هجومي'),
  p(9, 'Aleksandar Mitrović', 'ألكسندر ميتروفيتش', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Dušan Vlahović', 'دوشان فلاهوفيتش', 75, 30, 'ST', 'مهاجم'),
  p(11, 'Andrija Živković', 'أندريا جيفكوفيتش', 20, 40, 'RW', 'جناح أيمن'),
];

playersByTeam['switzerland'] = [
  p(1, 'Yann Sommer', 'يان سومر', 50, 92, 'GK', 'حارس'),
  p(2, 'Ricardo Rodríguez', 'ريكاردو رودريغيز', 85, 78, 'LB', 'ظهير أيسر'),
  p(3, 'Akanji Manuel', 'أكانجي مانويل', 50, 72, 'CB', 'مدافع'),
  p(4, 'Nico Elvedi', 'نيكو إلفيدي', 35, 78, 'CB', 'مدافع'),
  p(5, 'Silvan Widmer', 'سيلفان فيدمر', 15, 78, 'RB', 'ظهير أيمن'),
  p(6, 'Remo Freuler', 'ريمو فرويلر', 50, 55, 'CM', 'وسط'),
  p(7, 'Granit Xhaka', 'غرانيت تشاكا', 35, 55, 'CDM', 'وسط دفاعي'),
  p(8, 'Xherdan Shaqiri', 'جيردان شاكيري', 20, 40, 'RW', 'جناح أيمن'),
  p(9, 'Breel Embolo', 'بريل إمبولو', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Haris Seferović', 'هاريس سيفيروفيتش', 75, 30, 'ST', 'مهاجم'),
  p(11, 'Ruben Vargas', 'روبن فارغاس', 80, 40, 'LW', 'جناح أيسر'),
];

playersByTeam['cameroon'] = [
  p(1, 'André Onana', 'أندري أونانا', 50, 92, 'GK', 'حارس'),
  p(2, 'Nicolas Nkoulou', 'نيكولاس نكولو', 50, 72, 'CB', 'مدافع'),
  p(3, 'Jean-Charles Castelletto', 'جان شارل كاستيليتو', 35, 72, 'CB', 'مدافع'),
  p(4, 'Collins Fai', 'كولينز فاي', 15, 78, 'RB', 'ظهير أيمن'),
  p(5, 'Nouhou Tolo', 'نوهو تولو', 85, 78, 'LB', 'ظهير أيسر'),
  p(6, 'Samuel Oum Gouet', 'صامويل أوم غويت', 35, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'André-Frank Zambo Anguissa', 'أندريه فرانك زامبو أنغيسا', 55, 55, 'CM', 'وسط'),
  p(8, 'Vincent Aboubakar', 'فينسنت أبوبكر', 50, 30, 'ST', 'مهاجم'),
  p(9, 'Karl Toko Ekambi', 'كارل توكو إكامبي', 80, 40, 'LW', 'جناح أيسر'),
  p(10, 'Bryan Mbeumo', 'بريان مبومو', 20, 40, 'RW', 'جناح أيمن'),
  p(11, 'Eric Maxim Choupo-Moting', 'إريك ماكسيم تشوبو-موتينغ', 50, 38, 'CF', 'مهاجم'),
];

// === Group H ===
playersByTeam['portugal'] = [
  p(1, 'Diogo Costa', 'ديوغو كوستا', 50, 92, 'GK', 'حارس'),
  p(2, 'João Cancelo', 'جواو كانسيلو', 15, 78, 'RB', 'ظهير أيمن'),
  p(3, 'Raphaël Guerreiro', 'رافاييل غيريرو', 85, 78, 'LB', 'ظهير أيسر'),
  p(4, 'Rúben Dias', 'روبن دياز', 50, 72, 'CB', 'مدافع'),
  p(5, 'Pepe', 'بيبي', 35, 72, 'CB', 'مدافع'),
  p(6, 'Rúben Neves', 'روبن نيفيز', 40, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Bernardo Silva', 'برناردو سيلفا', 20, 40, 'RW', 'جناح أيمن'),
  p(8, 'Bruno Fernandes', 'برونو فيرنانديز', 55, 48, 'CM', 'وسط'),
  p(9, 'Cristiano Ronaldo', 'كريستيانو رونالدو', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Diogo Jota', 'ديوغو جوتا', 75, 30, 'ST', 'مهاجم'),
  p(11, 'João Félix', 'جواو فيليكس', 80, 40, 'LW', 'جناح أيسر'),
];

playersByTeam['ghana'] = [
  p(1, 'Lawrence Ati-Zigi', 'لورانس أتي-زيجي', 50, 92, 'GK', 'حارس'),
  p(2, 'Baba Rahman', 'بابا رحمن', 85, 78, 'LB', 'ظهير أيسر'),
  p(3, 'Daniel Amartey', 'دانيال أمارتي', 35, 72, 'CB', 'مدافع'),
  p(4, 'Mohammed Salisu', 'محمد ساليسو', 65, 72, 'CB', 'مدافع'),
  p(5, 'Tariq Lamptey', 'تاريك لامبتي', 15, 78, 'RB', 'ظهير أيمن'),
  p(6, 'Thomas Partey', 'توماس بارتي', 50, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Mohammed Kudus', 'محمد قدوس', 60, 50, 'CM', 'وسط'),
  p(8, 'Jordan Ayew', 'جوردان أيو', 20, 40, 'RW', 'جناح أيمن'),
  p(9, 'Kamaruddin Sulemana', 'كمال الدين سليمانا', 80, 40, 'LW', 'جناح أيسر'),
  p(10, 'André Ayew', 'أندري أيو', 50, 42, 'CAM', 'وسط هجومي'),
  p(11, 'Iñaki Williams', 'إيناكي ويليامز', 50, 30, 'ST', 'مهاجم'),
];

playersByTeam['uruguay'] = [
  p(1, 'Fernando Muslera', 'فرناندو موسليرا', 50, 92, 'GK', 'حارس'),
  p(2, 'Ronald Araújo', 'رونالد أراوخو', 35, 72, 'CB', 'مدافع'),
  p(3, 'Diego Godín', 'دييغو غودين', 50, 72, 'CB', 'مدافع'),
  p(4, 'Martín Cáceres', 'مارتين كاسيريس', 65, 72, 'CB', 'مدافع'),
  p(5, 'Matías Vecino', 'ماتياس فيسينو', 55, 55, 'CM', 'وسط'),
  p(6, 'Federico Valverde', 'فيديريكو فالفيردي', 60, 48, 'CM', 'وسط'),
  p(7, 'Rodrigo Bentancur', 'رودريغو بينتانكور', 40, 55, 'CDM', 'وسط دفاعي'),
  p(8, 'Facundo Pellistri', 'فاكوندو بيليستري', 20, 40, 'RW', 'جناح أيمن'),
  p(9, 'Luis Suárez', 'لويس سواريز', 50, 30, 'ST', 'مهاجم'),
  p(10, 'Edinson Cavani', 'إدينسون كافاني', 75, 30, 'ST', 'مهاجم'),
  p(11, 'Darwin Núñez', 'داروين نونيز', 80, 40, 'LW', 'جناح أيسر'),
];

playersByTeam['south-korea'] = [
  p(1, 'Kim Seung-gyu', 'كيم سيونغ-غيو', 50, 92, 'GK', 'حارس'),
  p(2, 'Kim Min-jae', 'كيم مين-جاي', 50, 72, 'CB', 'مدافع'),
  p(3, 'Kim Young-gwon', 'كيم يونغ-غوون', 35, 72, 'CB', 'مدافع'),
  p(4, 'Kwon Kyung-won', 'كوون كيونغ-وون', 65, 72, 'CB', 'مدافع'),
  p(5, 'Kim Jin-su', 'كيم جين-سو', 85, 78, 'LB', 'ظهير أيسر'),
  p(6, 'Jung Woo-young', 'جونغ وو-يونغ', 35, 55, 'CDM', 'وسط دفاعي'),
  p(7, 'Lee Jae-sung', 'لي جاي-سونغ', 55, 55, 'CM', 'وسط'),
  p(8, 'Hwang In-beom', 'هوانغ إن-بيوم', 60, 50, 'CM', 'وسط'),
  p(9, 'Heung-min Son', 'سون هيونغ-مين', 20, 40, 'LW', 'جناح أيسر'),
  p(10, 'Cho Gue-sung', 'تشو غيو-سونغ', 50, 30, 'ST', 'مهاجم'),
  p(11, 'Hwang Hee-chan', 'هوانغ هي-تشان', 80, 40, 'RW', 'جناح أيمن'),
];

export const allTeams: TeamData[] = [
  // Group A
  { id: 'qatar', name: 'Qatar', nameAr: 'قطر', flag: '🇶🇦', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/5037.png', group: 'A', groupAr: 'أ', formation: '5-3-2', players: playersByTeam['qatar'], keyPlayers: ['Akram Afif', 'Almoez Ali', 'Hassan Al-Haydos'], keyPlayersAr: ['أكرم عفيف', 'المعز علي', 'حسن الهيدوس'], fifaRank: 50, worldCups: 0, coach: 'Félix Sánchez', coachAr: 'فيليكس سانشيز' },
  { id: 'ecuador', name: 'Ecuador', nameAr: 'الإكوادور', flag: '🇪🇨', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/11728.png', group: 'A', groupAr: 'أ', formation: '4-4-2', players: playersByTeam['ecuador'], keyPlayers: ['Enner Valencia', 'Moisés Caicedo', 'Pervis Estupiñán'], keyPlayersAr: ['إينير فالنسيا', 'مويسيس كايسيدو', 'بيرفس إستوبينان'], fifaRank: 44, worldCups: 0, coach: 'Gustavo Alfaro', coachAr: 'غوستافو ألفارو' },
  { id: 'senegal', name: 'Senegal', nameAr: 'السنغال', flag: '🇸🇳', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3204.png', group: 'A', groupAr: 'أ', formation: '4-3-3', players: playersByTeam['senegal'], keyPlayers: ['Sadio Mané', 'Kalidou Koulibaly', 'Ismaïla Sarr'], keyPlayersAr: ['ساديو ماني', 'خاليدو كوليبالي', 'إسماعيل سار'], fifaRank: 18, worldCups: 0, coach: 'Aliou Cissé', coachAr: 'أليو سيسي' },
  { id: 'netherlands', name: 'Netherlands', nameAr: 'هولندا', flag: '🇳🇱', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/11057.png', group: 'A', groupAr: 'أ', formation: '3-4-3', players: playersByTeam['netherlands'], keyPlayers: ['Virgil van Dijk', 'Frenkie de Jong', 'Cody Gakpo'], keyPlayersAr: ['فيرجيل فان دايك', 'فرينكي دي يونغ', 'كودي غاكبو'], fifaRank: 8, worldCups: 0, coach: 'Louis van Gaal', coachAr: 'لويس فان غال' },
  // Group B
  { id: 'england', name: 'England', nameAr: 'إنجلترا', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3149.png', group: 'B', groupAr: 'ب', formation: '4-3-3', players: playersByTeam['england'], keyPlayers: ['Harry Kane', 'Jude Bellingham', 'Declan Rice'], keyPlayersAr: ['هاري كين', 'جود بيلينغهام', 'ديكلان رايس'], fifaRank: 5, worldCups: 1, coach: 'Gareth Southgate', coachAr: 'غاريث ساوثغيت' },
  { id: 'iran', name: 'Iran', nameAr: 'إيران', flag: '🇮🇷', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/15003.png', group: 'B', groupAr: 'ب', formation: '4-4-2', players: playersByTeam['iran'], keyPlayers: ['Mehdi Taremi', 'Sardar Azmoun', 'Alireza Beiranvand'], keyPlayersAr: ['مهدي طارمي', 'سردار آزمون', 'علي رضا بيرانوند'], fifaRank: 20, worldCups: 0, coach: 'Carlos Queiroz', coachAr: 'كارلوس كيروش' },
  { id: 'usa', name: 'USA', nameAr: 'الولايات المتحدة', flag: '🇺🇸', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/6585.png', group: 'B', groupAr: 'ب', formation: '4-3-3', players: playersByTeam['usa'], keyPlayers: ['Christian Pulisic', 'Weston McKennie', 'Tyler Adams'], keyPlayersAr: ['كريستيان بوليسيتش', 'ويستون ماكيني', 'تايلر آدامز'], fifaRank: 13, worldCups: 0, coach: 'Gregg Berhalter', coachAr: 'غريغ برهالتر' },
  { id: 'wales', name: 'Wales', nameAr: 'ويلز', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/48105.png', group: 'B', groupAr: 'ب', formation: '4-4-2', players: playersByTeam['wales'], keyPlayers: ['Gareth Bale', 'Aaron Ramsey', 'Daniel James'], keyPlayersAr: ['غاريث بيل', 'آرون رامزي', 'دانيال جيمس'], fifaRank: 19, worldCups: 0, coach: 'Rob Page', coachAr: 'روب بيج' },
  // Group C
  { id: 'argentina', name: 'Argentina', nameAr: 'الأرجنتين', flag: '🇦🇷', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2053.png', group: 'C', groupAr: 'ج', formation: '4-3-3', players: playersByTeam['argentina'], keyPlayers: ['Lionel Messi', 'Ángel Di María', 'Emiliano Martínez'], keyPlayersAr: ['ليونيل ميسي', 'أنجيل دي ماريا', 'إيميليانو مارتينيز'], fifaRank: 3, worldCups: 3, coach: 'Lionel Scaloni', coachAr: 'ليونيل سكالوني' },
  { id: 'saudi-arabia', name: 'Saudi Arabia', nameAr: 'السعودية', flag: '🇸🇦', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/5089.png', group: 'C', groupAr: 'ج', formation: '4-4-2', players: playersByTeam['saudi-arabia'], keyPlayers: ['Salem Al-Dawsari', 'Salman Al-Faraj', 'Mohammed Al-Owais'], keyPlayersAr: ['سالم الدوسري', 'سلمان الفرج', 'محمد العويس'], fifaRank: 51, worldCups: 0, coach: 'Hervé Renard', coachAr: 'إيرفي رينارد' },
  { id: 'mexico', name: 'Mexico', nameAr: 'المكسيك', flag: '🇲🇽', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/6602.png', group: 'C', groupAr: 'ج', formation: '4-3-3', players: playersByTeam['mexico'], keyPlayers: ['Hirving Lozano', 'Guillermo Ochoa', 'Raúl Jiménez'], keyPlayersAr: ['هيرفينغ لوزانو', 'غييرمو أوتشوا', 'راؤول خيمينيز'], fifaRank: 13, worldCups: 0, coach: 'Tata Martino', coachAr: 'تاتا مارتينو' },
  { id: 'poland', name: 'Poland', nameAr: 'بولندا', flag: '🇵🇱', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4071.png', group: 'C', groupAr: 'ج', formation: '4-4-2', players: playersByTeam['poland'], keyPlayers: ['Robert Lewandowski', 'Piotr Zieliński', 'Wojciech Szczęsny'], keyPlayersAr: ['روبرت ليفاندوفسكي', 'بيوتر زيلينسكي', 'فويتشيك شتشيسني'], fifaRank: 26, worldCups: 0, coach: 'Czesław Michniewicz', coachAr: 'تشيسلاف ميخنيفيتش' },
  // Group D
  { id: 'france', name: 'France', nameAr: 'فرنسا', flag: '🇫🇷', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3025.png', group: 'D', groupAr: 'د', formation: '4-3-3', players: playersByTeam['france'], keyPlayers: ['Kylian Mbappé', 'Antoine Griezmann', 'Olivier Giroud'], keyPlayersAr: ['كيليان مبابي', 'أنطوان غريزمان', 'أوليفييه جيرو'], fifaRank: 4, worldCups: 2, coach: 'Didier Deschamps', coachAr: 'ديدييه ديشان' },
  { id: 'australia', name: 'Australia', nameAr: 'أستراليا', flag: '🇦🇺', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/6829.png', group: 'D', groupAr: 'د', formation: '4-4-2', players: playersByTeam['australia'], keyPlayers: ['Aaron Mooy', 'Mathew Ryan', 'Mitchell Duke'], keyPlayersAr: ['آرون موي', 'ماثيو رايان', 'ميتشل دوك'], fifaRank: 38, worldCups: 0, coach: 'Graham Arnold', coachAr: 'غراهام أرنولد' },
  { id: 'denmark', name: 'Denmark', nameAr: 'الدنمارك', flag: '🇩🇰', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/6479.png', group: 'D', groupAr: 'د', formation: '4-3-3', players: playersByTeam['denmark'], keyPlayers: ['Christian Eriksen', 'Kasper Schmeichel', 'Simon Kjær'], keyPlayersAr: ['كريستيان إريكسن', 'كاسبر شمايكل', 'سيمون كيير'], fifaRank: 10, worldCups: 0, coach: 'Kasper Hjulmand', coachAr: 'كاسبر هيولماند' },
  { id: 'tunisia', name: 'Tunisia', nameAr: 'تونس', flag: '🇹🇳', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4974.png', group: 'D', groupAr: 'د', formation: '4-4-2', players: playersByTeam['tunisia'], keyPlayers: ['Wahbi Khazri', 'Youssef Msakni', 'Ellyes Skhiri'], keyPlayersAr: ['وهبي خزري', 'يوسف المساكني', 'اليس صخيري'], fifaRank: 30, worldCups: 0, coach: 'Jalel Kadri', coachAr: 'جلال القادري' },
  // Group E
  { id: 'spain', name: 'Spain', nameAr: 'إسبانيا', flag: '🇪🇸', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/6513.png', group: 'E', groupAr: 'ه', formation: '4-3-3', players: playersByTeam['spain'], keyPlayers: ['Pedri', 'Gavi', 'Rodri'], keyPlayersAr: ['بيدري', 'جافي', 'رودري'], fifaRank: 7, worldCups: 1, coach: 'Luis Enrique', coachAr: 'لويس إنريكي' },
  { id: 'costa-rica', name: 'Costa Rica', nameAr: 'كوستاريكا', flag: '🇨🇷', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/5870.png', group: 'E', groupAr: 'ه', formation: '4-4-2', players: playersByTeam['costa-rica'], keyPlayers: ['Keylor Navas', 'Bryan Ruiz', 'Joel Campbell'], keyPlayersAr: ['كيلور نافاس', 'بريان رويز', 'جويل كامبل'], fifaRank: 31, worldCups: 0, coach: 'Luis Fernando Suárez', coachAr: 'لويس فرناندو سواريز' },
  { id: 'germany', name: 'Germany', nameAr: 'ألمانيا', flag: '🇩🇪', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3329.png', group: 'E', groupAr: 'ه', formation: '4-3-3', players: playersByTeam['germany'], keyPlayers: ['Joshua Kimmich', 'Jamal Musiala', 'Manuel Neuer'], keyPlayersAr: ['يوشوا كيميش', 'جمال موسيالا', 'مانويل نوير'], fifaRank: 11, worldCups: 4, coach: 'Hansi Flick', coachAr: 'هانسي فليك' },
  { id: 'japan', name: 'Japan', nameAr: 'اليابان', flag: '🇯🇵', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/6199.png', group: 'E', groupAr: 'ه', formation: '4-3-3', players: playersByTeam['japan'], keyPlayers: ['Takefusa Kubo', 'Daichi Kamada', 'Wataru Endo'], keyPlayersAr: ['تاكيفوسا كوبو', 'دايتشي كامادا', 'واتارو إيندو'], fifaRank: 24, worldCups: 0, coach: 'Hajime Moriyasu', coachAr: 'هاجيمي موريياسو' },
  // Group F
  { id: 'belgium', name: 'Belgium', nameAr: 'بلجيكا', flag: '🇧🇪', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/5018.png', group: 'F', groupAr: 'و', formation: '4-3-3', players: playersByTeam['belgium'], keyPlayers: ['Kevin De Bruyne', 'Eden Hazard', 'Romelu Lukaku'], keyPlayersAr: ['كيفن دي بروين', 'إيدين هازارد', 'روميلو لوكاكو'], fifaRank: 2, worldCups: 0, coach: 'Roberto Martínez', coachAr: 'روبيرتو مارتينيز' },
  { id: 'canada', name: 'Canada', nameAr: 'كندا', flag: '🇨🇦', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/6421.png', group: 'F', groupAr: 'و', formation: '4-4-2', players: playersByTeam['canada'], keyPlayers: ['Alphonso Davies', 'Jonathan David', 'Cyle Larin'], keyPlayersAr: ['ألفونسو ديفيز', 'جوناثان ديفيد', 'سيل لارين'], fifaRank: 41, worldCups: 0, coach: 'John Herdman', coachAr: 'جون هيردمان' },
  { id: 'morocco', name: 'Morocco', nameAr: 'المغرب', flag: '🇲🇦', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4326.png', group: 'F', groupAr: 'و', formation: '4-4-2', players: playersByTeam['morocco'], keyPlayers: ['Achraf Hakimi', 'Hakim Ziyech', 'Yassine Bounou'], keyPlayersAr: ['أشرف حكيمي', 'حكيم زياش', 'ياسين بونو'], fifaRank: 22, worldCups: 0, coach: 'Walid Regragui', coachAr: 'وليد الركراكي' },
  { id: 'croatia', name: 'Croatia', nameAr: 'كرواتيا', flag: '🇭🇷', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/6909.png', group: 'F', groupAr: 'و', formation: '4-3-3', players: playersByTeam['croatia'], keyPlayers: ['Luka Modrić', 'Ivan Perišić', 'Josko Gvardiol'], keyPlayersAr: ['لوكا مودريتش', 'إيفان بيريشيتش', 'يوسكو غفارديول'], fifaRank: 12, worldCups: 0, coach: 'Zlatko Dalić', coachAr: 'زلاتكو داليتش' },
  // Group G
  { id: 'brazil', name: 'Brazil', nameAr: 'البرازيل', flag: '🇧🇷', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2882.png', group: 'G', groupAr: 'ز', formation: '4-3-3', players: playersByTeam['brazil'], keyPlayers: ['Neymar Jr', 'Vinícius Jr', 'Richarlison'], keyPlayersAr: ['نيمار', 'فينيسيوس جونيور', 'ريتشارليسون'], fifaRank: 1, worldCups: 5, coach: 'Tite', coachAr: 'تيتي' },
  { id: 'serbia', name: 'Serbia', nameAr: 'صربيا', flag: '🇷🇸', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4225.png', group: 'G', groupAr: 'ز', formation: '4-4-2', players: playersByTeam['serbia'], keyPlayers: ['Aleksandar Mitrović', 'Dušan Tadić', 'Dušan Vlahović'], keyPlayersAr: ['ألكسندر ميتروفيتش', 'دوشان تاديتش', 'دوشان فلاهوفيتش'], fifaRank: 25, worldCups: 0, coach: 'Dragan Stojković', coachAr: 'دراغان ستويكوفيتش' },
  { id: 'switzerland', name: 'Switzerland', nameAr: 'سويسرا', flag: '🇨🇭', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4949.png', group: 'G', groupAr: 'ز', formation: '4-4-2', players: playersByTeam['switzerland'], keyPlayers: ['Granit Xhaka', 'Xherdan Shaqiri', 'Breel Embolo'], keyPlayersAr: ['غرانيت تشاكا', 'جيردان شاكيري', 'بريل إمبولو'], fifaRank: 15, worldCups: 0, coach: 'Murat Yakin', coachAr: 'مراد ياكين' },
  { id: 'cameroon', name: 'Cameroon', nameAr: 'الكاميرون', flag: '🇨🇲', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4984.png', group: 'G', groupAr: 'ز', formation: '4-4-2', players: playersByTeam['cameroon'], keyPlayers: ['Vincent Aboubakar', 'André Onana', 'Karl Toko Ekambi'], keyPlayersAr: ['فينسنت أبوبكر', 'أندري أونانا', 'كارل توكو إكامبي'], fifaRank: 43, worldCups: 0, coach: 'Rigobert Song', coachAr: 'ريغوبير سونغ' },
  // Group H
  { id: 'portugal', name: 'Portugal', nameAr: 'البرتغال', flag: '🇵🇹', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4110.png', group: 'H', groupAr: 'ح', formation: '4-3-3', players: playersByTeam['portugal'], keyPlayers: ['Cristiano Ronaldo', 'Bruno Fernandes', 'João Cancelo'], keyPlayersAr: ['كريستيانو رونالدو', 'برونو فيرنانديز', 'جواو كانسيلو'], fifaRank: 9, worldCups: 0, coach: 'Fernando Santos', coachAr: 'فرناندو سانتوس' },
  { id: 'ghana', name: 'Ghana', nameAr: 'غانا', flag: '🇬🇭', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/5353.png', group: 'H', groupAr: 'ح', formation: '4-4-2', players: playersByTeam['ghana'], keyPlayers: ['Thomas Partey', 'Mohammed Kudus', 'André Ayew'], keyPlayersAr: ['توماس بارتي', 'محمد قدوس', 'أندري أيو'], fifaRank: 61, worldCups: 0, coach: 'Otto Addo', coachAr: 'أوتو أدو' },
  { id: 'uruguay', name: 'Uruguay', nameAr: 'الأوروغواي', flag: '🇺🇾', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/5318.png', group: 'H', groupAr: 'ح', formation: '4-4-2', players: playersByTeam['uruguay'], keyPlayers: ['Federico Valverde', 'Darwin Núñez', 'Luis Suárez'], keyPlayersAr: ['فيديريكو فالفيردي', 'داروين نونيز', 'لويس سواريز'], fifaRank: 14, worldCups: 2, coach: 'Diego Alonso', coachAr: 'دييغو ألونسو' },
  { id: 'south-korea', name: 'South Korea', nameAr: 'كوريا الجنوبية', flag: '🇰🇷', logo: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/6721.png', group: 'H', groupAr: 'ح', formation: '4-4-2', players: playersByTeam['south-korea'], keyPlayers: ['Heung-min Son', 'Kim Min-jae', 'Hwang Hee-chan'], keyPlayersAr: ['سون هيونغ-مين', 'كيم مين-جاي', 'هوانغ هي-تشان'], fifaRank: 28, worldCups: 0, coach: 'Paulo Bento', coachAr: 'باولو بينتو' },
];

export function getTeamById(id: string): TeamData | undefined {
  return allTeams.find(t => t.id === id);
}

export function getTeamByEnglishName(name: string): TeamData | undefined {
  return allTeams.find(t => t.name.toLowerCase() === name.toLowerCase());
}

export function getTeamsByGroup(group: string): TeamData[] {
  return allTeams.filter(t => t.group.toLowerCase() === group.toLowerCase());
}

export const groupLabels: Record<string, string> = {
  'A': 'أ', 'B': 'ب', 'C': 'ج', 'D': 'د',
  'E': 'ه', 'F': 'و', 'G': 'ز', 'H': 'ح',
};
