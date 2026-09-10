/**
 * ABDN Fellowship & Superadmin Email Whitelist Utilities
 * Dynamic whitelist management is controlled 100% via the Firestore `approved_fellows` collection,
 * managed via the Superadmin Dashboard.
 */

export const SUPERADMIN_EMAILS = new Set<string>([]);

/**
 * Normalizes email address to lowercase and trimmed string
 */
export function normalizeEmail(email: string | null | undefined): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Legacy static superadmin helper. Primary authorization and role assignment
 * are managed dynamically via the Firestore `approved_fellows` collection.
 */
export function isSuperadminEmail(email: string | null | undefined): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return SUPERADMIN_EMAILS.has(normalized);
}

/**
 * Legacy local check compatibility wrapper. Primary roster verification is performed
 * dynamically against the Firestore `approved_fellows` collection.
 */
export function isLocallyApprovedFellow(email: string | null | undefined): boolean {
  return isSuperadminEmail(email);
}
