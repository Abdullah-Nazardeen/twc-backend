import { Request, Response } from "express";
import {
  create,
  update,
  getAll,
  deleteRecord,
} from "../models/contact";

interface ContactRequest extends Request {
  userId?: string;
}

async function createContact(
  req: ContactRequest,
  res: Response
): Promise<void> {
  const { name, email, phone, gender } = req.body;
  const userId = req.userId!;

  try {
    const contact = await create(name, email, phone, gender, userId);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateContact(req: Request, res: Response): Promise<void> {
  const contactId = req.params.id;
  const { name, email, phone, gender } = req.body;

  try {
    const updatedContact = await update(
      contactId,
      name,
      email,
      phone,
      gender
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllContacts(
  req: ContactRequest,
  res: Response
): Promise<void> {
  const userId = req.userId!;

  try {
    const contacts = await getAll(userId);
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteContact(req: Request, res: Response): Promise<void> {
  const contactId = req.params.id;

  try {
    await deleteRecord(contactId);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { createContact, updateContact, getAllContacts, deleteContact };
