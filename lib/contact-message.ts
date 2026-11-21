export const CONTACT_MESSAGE_MIN_LENGTH = 10;
export const CONTACT_MESSAGE_MAX_LENGTH = 500;

export function getContactMessageError(message: string) {
  if (message.trim().length < CONTACT_MESSAGE_MIN_LENGTH) {
    return `Please enter at least ${CONTACT_MESSAGE_MIN_LENGTH} characters in your message.`;
  }

  if (message.length > CONTACT_MESSAGE_MAX_LENGTH) {
    return `Please keep your message to ${CONTACT_MESSAGE_MAX_LENGTH} characters or fewer.`;
  }

  return null;
}
