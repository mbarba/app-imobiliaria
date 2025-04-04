import { NextResponse } from 'next/server';
import { propertyService } from '@/services/properties';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const property = await propertyService.getById(params.id);
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const property = await propertyService.update(params.id, updates);
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await propertyService.delete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
