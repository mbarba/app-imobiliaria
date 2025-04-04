import { NextResponse } from 'next/server';
import { contactService } from '@/services/contacts';

export async function GET() {
  try {
    const contacts = await contactService.list();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contact = await request.json();
    const newContact = await contactService.create(contact);
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
