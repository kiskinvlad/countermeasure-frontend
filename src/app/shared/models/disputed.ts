/**
 * Taxes model.
 */
export class Disputed {
    disputed_t1_ta_id: number;
    case_id: number;
    taxpayer: string;
    year: number;
    province: string;
    federal_tax_applies: boolean;
    provincial_tax_applies: boolean;
    filing_date: Date;
    estimated_interest_date: Date;
    TP_taxable_income: number;
    TP_income_subject_to_gnp: number;
    TP_net_federal_tax: number;
    TP_net_provincial_tax: number;
    TP_federal_non_refundable_tax_credits: number;
    TP_provincial_non_refundable_tax_credits: number;
    TP_other_amounts_payable: number;
    TP_total_payable: number;
    TP_credits_applied_on_filing: number;
    TP_balance_before_penalties_and_interest: number;
    TP_gross_negligence_penalty: number;
    TP_late_filing_penalty_rate: number;
    TP_late_filing_penalty: number;
    TP_other_penalties: number;
    TP_total_penalties: number;
    TP_total_tax_and_penalties: number;
    TP_initial_payment: number;
    TP_estimated_interest: number;
    TP_estimated_interest_rate: number;
    TP_total_debt: number;
    GP_taxable_income: number;
    GP_income_subject_to_gnp: number;
    GP_net_federal_tax: number;
    GP_net_provincial_tax: number;
    GP_federal_non_refundable_tax_credits: number;
    GP_provincial_non_refundable_tax_credits: number;
    GP_other_amounts_payable: number;
    GP_total_payable: number;
    GP_credits_applied_on_filing: number;
    GP_balance_before_penalties_and_interest: number;
    GP_gross_negligence_penalty: number;
    GP_late_filing_penalty_rate: number;
    GP_late_filing_penalty: number;
    GP_other_penalties: number;
    GP_total_penalties: number;
    GP_total_tax_and_penalties: number;
    GP_initial_payment: number;
    GP_estimated_interest: number;
    GP_estimated_interest_rate: number;
    GP_total_debt: number;
    DIFF_taxable_income: number;
    DIFF_income_subject_to_gnp: number;
    DIFF_net_federal_tax: number;
    DIFF_net_provincial_tax: number;
    DIFF_federal_non_refundable_tax_credits: number;
    DIFF_provincial_non_refundable_tax_credits: number;
    DIFF_other_amounts_payable: number;
    DIFF_total_payable: number;
    DIFF_credits_applied_on_filing: number;
    DIFF_balance_before_penalties_and_interest: number;
    DIFF_gross_negligence_penalty: number;
    DIFF_late_filing_penalty_rate: number;
    DIFF_late_filing_penalty: number;
    DIFF_other_penalties: number;
    DIFF_total_penalties: number;
    DIFF_total_tax_and_penalties: number;
    DIFF_initial_payment: number;
    DIFF_estimated_interest: number;
    DIFF_estimated_interest_rate: number;
    DIFF_total_debt: number;
}
