import { hash, compare } from 'bcrypt';

export async function hashPassword(text: string): Promise<string> {
  return await hash(text, 13);
}

export async function verifyPassword(hash: string) {
  return await compare(hash);
}
