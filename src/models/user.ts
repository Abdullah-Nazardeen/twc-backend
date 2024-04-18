import db from "../database/db";

export async function findUserByEmail(email: string): Promise<any> {
  return db.user.findUnique({ where: { email }, include: { contacts: true} });
}

export async function createUser(email: string, password: string): Promise<void> {
  await db.user.create({ data: { email, password } });
}
