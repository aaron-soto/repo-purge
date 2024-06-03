import Airtable from 'airtable';
import { NextRequest, NextResponse } from 'next/server';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appZyEm40GFdmFLu7',
);

export async function POST(req: NextRequest) {
  try {
    const { fieldName, value } = await req.json();

    if (fieldName !== 'total_visitors' && fieldName !== 'total_repos_deleted') {
      return NextResponse.json(
        { error: 'Invalid field name' },
        { status: 400 },
      );
    }

    console.log(fieldName, value);

    let id = '';
    if (fieldName === 'total_visitors') {
      id = 'recqXQfeulFI0SfkP';
    } else if (fieldName === 'total_repos_deleted') {
      id = 'rec8ZzZPRuJgROlEA';
    }

    const record = await base('base_stats').find(id);

    if (record) {
      let newValue = Number(record.fields.value ?? 0) + value;

      await base('base_stats').update([
        {
          id: id,
          fields: {
            name: fieldName,
            value: newValue,
          },
        },
      ]);

      return NextResponse.json({ success: true, newValue }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error(`Error updating Airtable value:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
