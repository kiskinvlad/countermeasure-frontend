/**
 * Taxes model.
 */
export class Disputed {
    disputed_t1_ta_id: number = 0;
    case_id: number = 0;
    taxpayer: string = '';
    year: number = 0;
    province: string;
    federal_tax_applies: boolean;
    provincial_tax_applies: boolean;
    filing_date: Date;
    estimated_interest_date: Date;
    TP_taxable_income: number = 0;
    TP_income_subject_to_gnp: number = 0;
    TP_net_federal_tax: number = 0;
    TP_net_provincial_tax: number = 0;
    TP_federal_non_refundable_tax_credits: number = 0;
    TP_provincial_non_refundable_tax_credits: number = 0;
    TP_other_amounts_payable: number = 0;
    TP_total_payable: number = 0;
    TP_credits_applied_on_filing: number = 0;
    TP_balance_before_penalties_and_interest: number = 0;
    TP_gross_negligence_penalty: number = 0;
    TP_late_filing_penalty_rate: number = 0;
    TP_late_filing_penalty: number = 0;
    TP_other_penalties: number = 0;
    TP_total_penalties: number = 0;
    TP_total_tax_and_penalties: number = 0;
    TP_initial_payment: number = 0;
    TP_estimated_interest: number = 0;
    TP_estimated_interest_rate: number = 0;
    TP_total_debt: number = 0;
    GP_taxable_income: number = 0;
    GP_income_subject_to_gnp: number = 0;
    GP_net_federal_tax: number = 0;
    GP_net_provincial_tax: number = 0;
    GP_federal_non_refundable_tax_credits: number = 0;
    GP_provincial_non_refundable_tax_credits: number = 0;
    GP_other_amounts_payable: number = 0;
    GP_total_payable: number = 0;
    GP_credits_applied_on_filing: number = 0;
    GP_balance_before_penalties_and_interest: number = 0;
    GP_gross_negligence_penalty: number = 0;
    GP_late_filing_penalty_rate: number = 0;
    GP_late_filing_penalty: number = 0;
    GP_other_penalties: number = 0;
    GP_total_penalties: number = 0;
    GP_total_tax_and_penalties: number = 0;
    GP_initial_payment: number = 0;
    GP_estimated_interest: number = 0;
    GP_estimated_interest_rate: number = 0;
    GP_total_debt: number = 0;
    DIFF_taxable_income: number = 0;
    DIFF_income_subject_to_gnp: number = 0;
    DIFF_net_federal_tax: number = 0;
    DIFF_net_provincial_tax: number = 0;
    DIFF_federal_non_refundable_tax_credits: number = 0;
    DIFF_provincial_non_refundable_tax_credits: number = 0;
    DIFF_other_amounts_payable: number = 0;
    DIFF_total_payable: number = 0;
    DIFF_credits_applied_on_filing: number = 0;
    DIFF_balance_before_penalties_and_interest: number = 0;
    DIFF_gross_negligence_penalty: number = 0;
    DIFF_late_filing_penalty_rate: number = 0;
    DIFF_late_filing_penalty: number = 0;
    DIFF_other_penalties: number = 0;
    DIFF_total_penalties: number = 0;
    DIFF_total_tax_and_penalties: number = 0;
    DIFF_initial_payment: number = 0;
    DIFF_estimated_interest: number = 0;
    DIFF_estimated_interest_rate: number = 0;
    DIFF_total_debt: number = 0;
}
