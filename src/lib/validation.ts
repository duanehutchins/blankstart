/**
 * Encapsulates lead form validation to keep business checks outside React components.
 */

export interface LeadInput {
  name: string;
  email: string;
  consent: boolean;
}

/** Returns field errors for required lead inputs and consent gating rules. */
export function validateLeadInput(input: LeadInput): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!input.name.trim()) {
    errors.name = 'Name is required.';
  }

  const email = input.email.trim();
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!input.consent) {
    errors.consent = 'Consent is required before submission.';
  }

  return errors;
}
