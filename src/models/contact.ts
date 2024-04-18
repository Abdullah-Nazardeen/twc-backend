import db from "../database/db";

async function create(
  name: string,
  email: string,
  phone: string,
  gender: string,
  userId: string
): Promise<any> {
  return db.contact.create({
    data: {
      name,
      email,
      phone,
      gender,
      userId,
    },
  });
}

async function update(
  contactId: string,
  name: string,
  email: string,
  phone: string,
  gender: string
): Promise<any> {
  return db.contact.update({
    where: { id: contactId },
    data: {
      name,
      email,
      phone,
      gender,
    },
  });
}

async function getAll(userId: string): Promise<any> {
  return db.contact.findMany({
    where: { userId },
  });
}

async function deleteRecord(contactId: string): Promise<void> {
  await db.contact.delete({
    where: { id: contactId },
  });
}

export { create, update, getAll, deleteRecord };
