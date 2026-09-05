/**
 * Pre-approved Fellowship Roster & Superadmin Email Whitelist
 * Only users with emails on this whitelist (or added to Firestore `approved_fellows` collection)
 * can access the ABDN E-learning platform.
 */

export const SUPERADMIN_EMAILS = new Set<string>([
  'filimapatrick@gmail.com',
  'africanbraindatanetwork@gmail.com',
  'eberechi.wogu@uniport.edu.ng',
  'chinyemighodaro@gmail.com',
  'bnsaanee7@gmail.com',
]);

export const APPROVED_FELLOWSHIP_EMAILS = new Set<string>([
  // Superadmins
  'filimapatrick@gmail.com',
  'africanbraindatanetwork@gmail.com',
  'eberechi.wogu@uniport.edu.ng',
  'chinyemighodaro@gmail.com',
  'bnsaanee7@gmail.com',
  'filimapatrick30@gmail.com',

  // 2026 Fellowship Participants
  'dkhasowa@gmail.com',
  'samarmamdouh537@gmail.com',
  'gladyskomboshi.manamela@gmail.com',
  'olaoluwa.oluwayemisi@gmail.com',
  'boazongata@gmail.com',
  'anass.bouhlal.edu@gmail.com',
  'emongy@horus.edu.eg',
  'yasmine.abdelfattah@aucegypt.edu',
  'a.neuro.jo@gmail.com',
  'graceogunlade1@gmail.com',
  'efosaerousiosefe@gmail.com',
  'oladoyinidowu2020@gmail.com',
  'owenwogu651@gmail.com',
  'meriamdrine8@gmail.com',
  'oppongedward02@gmail.com',
  'oladejoabass2021@gmail.com',
  'thaboramotshwarapula@gmail.com',
  'ouedrock@gmail.com',
  'belalahmed7112005@gmail.com',
  'kumwendajohn@gmail.com',
  'alobatemiloluwa16@gmail.com',
  'kwakuhubert@gmail.com',
  'duruhjunior@gmail.com',
  'davidayele2@gmail.com',
  'shadymachinelearning52@gmail.com',
  'keahelijah@gmail.com',
  'bworsino@gmail.com',
  'jalene.mirgissa@aims.ac.rw',
  'happinessinyang22@gmail.com',
  'lionceauagre@gmail.com',
  'wanja.whoopie@gmail.com',
  'georgesichinga31@gmail.com',
  'sara.taha.94@outlook.com',
  'lightdiamonds401@gmail.com',
  'eseurhobodeborah@gmail.com',
  'samuelakingbulu0@gmail.com',
  'ayaeyad87@gmail.com',
  'petera@aims.ac.za',
  'alyasaa390@gmail.com',
  'soukaina.sghuri@um6p.ma',
  'elghali.oualialami@usmba.ac.ma',
  'visionbyangelic@gmail.com',
  'iryntracy@gmail.com',
  'esitwitawiah@gmail.com',
  'bonou.b.a.eudes@aims-senegal.org',
  'gobasi@andrew.cmu.edu',
  'johnbulltammy@yahoo.com',
  'cordie2age@gmail.com',

  // Teaching Assistants / Instructors / Researchers
  'n.vissers@ucl.ac.uk',
  'msuneuro22@hotmail.com',
  'raphaeltakyi@gmail.com',
  'nada.salah@ejust.edu.eg',
  'huimin1019@outlook.com',
  'apochiobed@gmail.com',
  'abdulrazaq.zubair@fuhsa.edu.ng',
  'aigbogunerichappiness@gmail.com',
  'anneshun5@gnail.com',
  'anneshun5@gmail.com',
  'ae.eshun@kccr.de',
  'lynn.ahabwe97@gmail.com',
]);

/**
 * Normalizes email address to lowercase and trimmed string
 */
export function normalizeEmail(email: string | null | undefined): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Synchronous check against local pre-approved roster
 */
export function isLocallyApprovedFellow(email: string | null | undefined): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return APPROVED_FELLOWSHIP_EMAILS.has(normalized);
}

/**
 * Synchronous check for superadmin privileges
 */
export function isSuperadminEmail(email: string | null | undefined): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return SUPERADMIN_EMAILS.has(normalized);
}
