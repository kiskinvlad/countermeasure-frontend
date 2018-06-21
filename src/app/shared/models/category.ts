/**
 * Category model.
 */
export class Category {
    category_id: number;
    case_id: number;
    disputed_t1_ta_id: number;
    order_position: number;
    name: string;
    taxable_income: number;
    income_subject_to_gnp: number;
    other_amounts_payable: number;
    credits_applied_on_filing: number;
    federal_non_refundable_tax_credits: number;
    provincial_non_refundable_tax_credits: number;
    other_penalties: number;
}
