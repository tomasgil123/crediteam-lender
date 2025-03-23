import { NextResponse } from 'next/server';
import { getLoanById, updateLoan } from '@/services/loans';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = (await request.json()).record;

    console.log('loan_id', body);

    if (!body.loan_id) {
      return NextResponse.json(
        { error: 'Loan ID is required' },
        { status: 400 }
      );
    }

    // Get the loan
    const loan = await getLoanById(body.loan_id);

    if (!loan) {
      return NextResponse.json(
        { error: 'Loan not found' },
        { status: 404 }
      );
    }

    // Get all backers for the loan
    const { data: backers, error: backersError } = await supabase
      .from('loan_backings')
      .select('*')
      .eq('loan_id', body.loan_id);

    if (backersError) {
      console.error('Error fetching loan backers:', backersError);
      return NextResponse.json(
        { error: 'Failed to fetch loan backers' },
        { status: 500 }
      );
    }

    const currentBackersCount = backers.length;
    const minBackersRequired = loan.min_backers;

    // Check if minimum backers requirement is met
    if (currentBackersCount >= minBackersRequired) {
      // Update loan status to indicate minimum backers met
      const updatedLoan = await updateLoan(body.loan_id, { status: 'approved' });

      if (!updatedLoan) {
        return NextResponse.json(
          { error: 'Failed to update loan status' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Minimum backers requirement met',
        currentBackers: currentBackersCount,
        minBackersRequired,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Backers updated but minimum not yet met',
      currentBackers: currentBackersCount,
      minBackersRequired,
    });

  } catch (error) {
    console.error('Error updating loan status:', error);
    return NextResponse.json(
      { error: 'Failed to update loan status' },
      { status: 500 }
    );
  }
}
