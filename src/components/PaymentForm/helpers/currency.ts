import { PaymentCurrencyEnum } from '../../../models/payment';

export const isTestCurrency = (currency: unknown) => currency === PaymentCurrencyEnum.XTS;
export const VALID_TEST_PAYMENT_AMOUNT = 1;
