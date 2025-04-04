import { NextResponse } from 'next/server';
import { realtorService } from '@/services/realtors';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const realtor = await realtorService.getById(params.id);
    return NextResponse.json(realtor);
  } catch (error) {
    console.error('Error fetching realtor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const realtor = await realtorService.update(params.id, updates);
    return NextResponse.json(realtor);
  } catch (error) {
    console.error('Error updating realtor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await realtorService.delete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting realtor:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
