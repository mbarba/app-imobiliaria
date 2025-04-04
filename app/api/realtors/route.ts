import { NextResponse } from 'next/server';
import { realtorService } from '@/services/realtors';

export async function GET() {
  try {
    const realtors = await realtorService.list();
    return NextResponse.json(realtors);
  } catch (error) {
    console.error('Error fetching realtors:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const realtor = await request.json();
    const newRealtor = await realtorService.create(realtor);
    return NextResponse.json(newRealtor, { status: 201 });
  } catch (error) {
    console.error('Error creating realtor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
