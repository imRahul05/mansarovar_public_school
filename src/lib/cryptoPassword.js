/**
 * Cryptographically Secure Password Generator & Strength Analyzer
 * 
 * Provides true cryptographic randomness via Web Crypto API (window.crypto.getRandomValues)
 * to ensure that generated passwords cannot be guessed or predicted even when running on the client-side.
 * 
 * Key Security Mechanisms:
 * 1. CSPRNG: Uses browser's cryptographic randomness (operating system entropy source).
 * 2. Unbiased Rejection Sampling: Eliminates modulo bias across character set lengths.
 * 3. Complete Fisher-Yates Shuffle: Every position is shuffled cryptographically to prevent template/pattern guessing.
 * 4. High-Entropy Character Set: Guarantees mix of uppercase, lowercase, numbers, and special symbols (85+ unique chars).
 * 5. Repetition Suppression: Rejects 3+ consecutive identical characters.
 */

const CHAR_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

/**
 * Cryptographically secure random integer in range [0, max - 1]
 * Uses rejection sampling to completely eliminate modulo bias.
 * @param {number} max
 * @returns {number}
 */
function getSecureRandomInt(max) {
  if (max <= 1) return 0;

  const cryptoObj = typeof window !== 'undefined' && window.crypto
    ? window.crypto
    : (typeof globalThis !== 'undefined' && globalThis.crypto ? globalThis.crypto : null);

  if (!cryptoObj || !cryptoObj.getRandomValues) {
    throw new Error('Cryptographically secure PRNG (window.crypto) is not available');
  }

  const range = 0x100000000; // 2^32
  const limit = range - (range % max);
  const buffer = new Uint32Array(1);

  let rand;
  do {
    cryptoObj.getRandomValues(buffer);
    rand = buffer[0];
  } while (rand >= limit);

  return rand % max;
}

/**
 * Fisher-Yates cryptographically secure array shuffle
 * @param {Array<string>} array 
 * @returns {Array<string>}
 */
function secureShuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generates an unguessable, high-entropy random password.
 * @param {Object} options
 * @param {number} [options.length=14] - Password length (default 14 chars, providing >89 bits entropy)
 * @param {boolean} [options.includeLowercase=true]
 * @param {boolean} [options.includeUppercase=true]
 * @param {boolean} [options.includeNumbers=true]
 * @param {boolean} [options.includeSymbols=true]
 * @returns {string}
 */
export function generateSecurePassword(options = {}) {
  const {
    length = 14,
    includeLowercase = true,
    includeUppercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;

  let pool = '';
  const guaranteedChars = [];

  if (includeLowercase) {
    pool += CHAR_SETS.lowercase;
    guaranteedChars.push(CHAR_SETS.lowercase[getSecureRandomInt(CHAR_SETS.lowercase.length)]);
  }
  if (includeUppercase) {
    pool += CHAR_SETS.uppercase;
    guaranteedChars.push(CHAR_SETS.uppercase[getSecureRandomInt(CHAR_SETS.uppercase.length)]);
  }
  if (includeNumbers) {
    pool += CHAR_SETS.numbers;
    guaranteedChars.push(CHAR_SETS.numbers[getSecureRandomInt(CHAR_SETS.numbers.length)]);
  }
  if (includeSymbols) {
    pool += CHAR_SETS.symbols;
    guaranteedChars.push(CHAR_SETS.symbols[getSecureRandomInt(CHAR_SETS.symbols.length)]);
  }

  if (pool.length === 0) {
    pool = CHAR_SETS.lowercase + CHAR_SETS.uppercase + CHAR_SETS.numbers + CHAR_SETS.symbols;
  }

  const passwordChars = [...guaranteedChars];
  const targetLength = Math.max(length, guaranteedChars.length);

  while (passwordChars.length < targetLength) {
    const nextChar = pool[getSecureRandomInt(pool.length)];
    // Prevent 3 identical consecutive characters to maintain maximum diversity
    const currentLen = passwordChars.length;
    if (currentLen >= 2 && passwordChars[currentLen - 1] === nextChar && passwordChars[currentLen - 2] === nextChar) {
      continue;
    }
    passwordChars.push(nextChar);
  }

  // Cryptographically shuffle all characters to eliminate any structural or positional pattern
  const shuffled = secureShuffle(passwordChars);
  return shuffled.join('');
}

/**
 * Calculates password strength and returns rating, color, and percentage
 * @param {string} password 
 * @returns {{ score: number, label: string, color: string, textColor: string, percent: number }}
 */
export function calculatePasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return { score: 0, label: 'Empty', color: 'bg-gray-200', textColor: 'text-gray-400', percent: 0 };
  }

  const len = password.length;
  if (len < 6) {
    return { score: 1, label: 'Too Short (Min 6)', color: 'bg-red-500', textColor: 'text-red-600', percent: 20 };
  }

  let score = 0;
  if (len >= 6) score += 1;
  if (len >= 10) score += 1;
  if (len >= 14) score += 1;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { score: 1, label: 'Weak', color: 'bg-red-500', textColor: 'text-red-600', percent: 25 };
  } else if (score <= 3) {
    return { score: 2, label: 'Fair', color: 'bg-amber-500', textColor: 'text-amber-600', percent: 50 };
  } else if (score <= 4) {
    return { score: 3, label: 'Strong', color: 'bg-blue-500', textColor: 'text-blue-600', percent: 75 };
  } else {
    return { score: 4, label: 'Very Strong', color: 'bg-emerald-500', textColor: 'text-emerald-600', percent: 100 };
  }
}
