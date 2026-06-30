export interface WinnerEntry {
  year: number;
  champion: string;
  championAr: string;
  runnerUp: string;
  runnerUpAr: string;
  score: string;
  host: string;
  hostAr: string;
  championFlag: string;
}

export const worldCupWinners: WinnerEntry[] = [
  { year: 1930, champion: 'Uruguay', championAr: 'الأوروغواي', runnerUp: 'Argentina', runnerUpAr: 'الأرجنتين', score: '4-2', host: 'Uruguay', hostAr: 'الأوروغواي', championFlag: '🇺🇾' },
  { year: 1934, champion: 'Italy', championAr: 'إيطاليا', runnerUp: 'Czechoslovakia', runnerUpAr: 'تشيكوسلوفاكيا', score: '2-1', host: 'Italy', hostAr: 'إيطاليا', championFlag: '🇮🇹' },
  { year: 1938, champion: 'Italy', championAr: 'إيطاليا', runnerUp: 'Hungary', runnerUpAr: 'المجر', score: '4-2', host: 'France', hostAr: 'فرنسا', championFlag: '🇮🇹' },
  { year: 1950, champion: 'Uruguay', championAr: 'الأوروغواي', runnerUp: 'Brazil', runnerUpAr: 'البرازيل', score: '2-1', host: 'Brazil', hostAr: 'البرازيل', championFlag: '🇺🇾' },
  { year: 1954, champion: 'West Germany', championAr: 'ألمانيا الغربية', runnerUp: 'Hungary', runnerUpAr: 'المجر', score: '3-2', host: 'Switzerland', hostAr: 'سويسرا', championFlag: '🇩🇪' },
  { year: 1958, champion: 'Brazil', championAr: 'البرازيل', runnerUp: 'Sweden', runnerUpAr: 'السويد', score: '5-2', host: 'Sweden', hostAr: 'السويد', championFlag: '🇧🇷' },
  { year: 1962, champion: 'Brazil', championAr: 'البرازيل', runnerUp: 'Czechoslovakia', runnerUpAr: 'تشيكوسلوفاكيا', score: '3-1', host: 'Chile', hostAr: 'تشيلي', championFlag: '🇧🇷' },
  { year: 1966, champion: 'England', championAr: 'إنجلترا', runnerUp: 'West Germany', runnerUpAr: 'ألمانيا الغربية', score: '4-2', host: 'England', hostAr: 'إنجلترا', championFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { year: 1970, champion: 'Brazil', championAr: 'البرازيل', runnerUp: 'Italy', runnerUpAr: 'إيطاليا', score: '4-1', host: 'Mexico', hostAr: 'المكسيك', championFlag: '🇧🇷' },
  { year: 1974, champion: 'West Germany', championAr: 'ألمانيا الغربية', runnerUp: 'Netherlands', runnerUpAr: 'هولندا', score: '2-1', host: 'West Germany', hostAr: 'ألمانيا الغربية', championFlag: '🇩🇪' },
  { year: 1978, champion: 'Argentina', championAr: 'الأرجنتين', runnerUp: 'Netherlands', runnerUpAr: 'هولندا', score: '3-1', host: 'Argentina', hostAr: 'الأرجنتين', championFlag: '🇦🇷' },
  { year: 1982, champion: 'Italy', championAr: 'إيطاليا', runnerUp: 'West Germany', runnerUpAr: 'ألمانيا الغربية', score: '3-1', host: 'Spain', hostAr: 'إسبانيا', championFlag: '🇮🇹' },
  { year: 1986, champion: 'Argentina', championAr: 'الأرجنتين', runnerUp: 'West Germany', runnerUpAr: 'ألمانيا الغربية', score: '3-2', host: 'Mexico', hostAr: 'المكسيك', championFlag: '🇦🇷' },
  { year: 1990, champion: 'West Germany', championAr: 'ألمانيا الغربية', runnerUp: 'Argentina', runnerUpAr: 'الأرجنتين', score: '1-0', host: 'Italy', hostAr: 'إيطاليا', championFlag: '🇩🇪' },
  { year: 1994, champion: 'Brazil', championAr: 'البرازيل', runnerUp: 'Italy', runnerUpAr: 'إيطاليا', score: '0-0 (3-2 p)', host: 'USA', hostAr: 'الولايات المتحدة', championFlag: '🇧🇷' },
  { year: 1998, champion: 'France', championAr: 'فرنسا', runnerUp: 'Brazil', runnerUpAr: 'البرازيل', score: '3-0', host: 'France', hostAr: 'فرنسا', championFlag: '🇫🇷' },
  { year: 2002, champion: 'Brazil', championAr: 'البرازيل', runnerUp: 'Germany', runnerUpAr: 'ألمانيا', score: '2-0', host: 'Korea/Japan', hostAr: 'كوريا/اليابان', championFlag: '🇧🇷' },
  { year: 2006, champion: 'Italy', championAr: 'إيطاليا', runnerUp: 'France', runnerUpAr: 'فرنسا', score: '1-1 (5-3 p)', host: 'Germany', hostAr: 'ألمانيا', championFlag: '🇮🇹' },
  { year: 2010, champion: 'Spain', championAr: 'إسبانيا', runnerUp: 'Netherlands', runnerUpAr: 'هولندا', score: '1-0', host: 'South Africa', hostAr: 'جنوب أفريقيا', championFlag: '🇪🇸' },
  { year: 2014, champion: 'Germany', championAr: 'ألمانيا', runnerUp: 'Argentina', runnerUpAr: 'الأرجنتين', score: '1-0', host: 'Brazil', hostAr: 'البرازيل', championFlag: '🇩🇪' },
  { year: 2018, champion: 'France', championAr: 'فرنسا', runnerUp: 'Croatia', runnerUpAr: 'كرواتيا', score: '4-2', host: 'Russia', hostAr: 'روسيا', championFlag: '🇫🇷' },
  { year: 2022, champion: 'Argentina', championAr: 'الأرجنتين', runnerUp: 'France', runnerUpAr: 'فرنسا', score: '3-3 (4-2 p)', host: 'Qatar', hostAr: 'قطر', championFlag: '🇦🇷' },
];
