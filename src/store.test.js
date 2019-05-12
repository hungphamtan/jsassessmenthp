import { Bill, User } from './store';
import {
  PRODUCT_CATEGORY_GROCERIES,
  DISCOUNT_TYPE_EMPLOYEE,
  DISCOUNT_TYPE_AFFILIATE,
  DISCOUNT_TYPE_LOYALTY,
  DISCOUNT_TYPE_DEFAULT,
  YEARS_OF_LOYALTY
} from './store.config';
function setupBill(
  isUserEmployee,
  isUserAffiliate,
  registedAt,
  billAmout,
  billCategory
) {
  const user = new User(isUserEmployee, isUserAffiliate, registedAt);
  return new Bill(user, billAmout, billCategory);
}
describe('the discounts on groceries category', () => {
  let result;
  const isUserEmployee = false;
  const isUserAffiliate = false;
  const registedAt = 2018;
  const billAmout = 990;
  const billCategory = PRODUCT_CATEGORY_GROCERIES;

  const amountDiscountBasedExpected = 45;
  const netPayableAmountExpected = 945;

  beforeEach(() => {
    result = setupBill(
      isUserEmployee,
      isUserAffiliate,
      registedAt,
      billAmout,
      billCategory
    );
  });

  test(`discount amount based for a bill ${billAmout} should be ${amountDiscountBasedExpected}`, () => {
    expect(result.getAmountDiscounts()).toEqual(amountDiscountBasedExpected);
  });

  test(`the net payable amount of an employee with bill ${billAmout} should be ${netPayableAmountExpected}`, () => {
    expect(result.getNetPayableAmount()).toEqual(netPayableAmountExpected);
  });
});

describe('the discounts apply not on groceries category of an employee user', () => {
  let result;
  const isUserEmployee = true;
  const isUserAffiliate = false;
  const registedAt = 2018;
  const billAmout = 990;
  const billCategory = 'toy and game';
  const netPayableAmountExpected = 663;
  beforeEach(() => {
    result = setupBill(
      isUserEmployee,
      isUserAffiliate,
      registedAt,
      billAmout,
      billCategory
    );
  });

  test(`discount percentage amount based should be ${DISCOUNT_TYPE_EMPLOYEE *
    100}% for an employee user`, () => {
    expect(result.getPercentageDiscounts()).toEqual(DISCOUNT_TYPE_EMPLOYEE);
  });

  test(`the net payable amount of an employee with bill ${billAmout} should be ${netPayableAmountExpected}`, () => {
    expect(result.getNetPayableAmount()).toEqual(netPayableAmountExpected);
  });
});

describe('the discounts apply not on groceries category of an affiliate user', () => {
  let result;
  const isUserEmployee = false;
  const isUserAffiliate = true;
  const registedAt = 2018;
  const billAmout = 990;
  const billCategory = 'toy and game';
  const netPayableAmountExpected = 851;
  beforeEach(() => {
    result = setupBill(
      isUserEmployee,
      isUserAffiliate,
      registedAt,
      billAmout,
      billCategory
    );
  });

  test(`discount percentage amount based should be ${DISCOUNT_TYPE_AFFILIATE *
    100}% for an employee user`, () => {
    expect(result.getPercentageDiscounts()).toEqual(DISCOUNT_TYPE_AFFILIATE);
  });

  test(`the net payable amount of an employee with bill ${billAmout} should be ${netPayableAmountExpected}`, () => {
    expect(result.getNetPayableAmount()).toEqual(netPayableAmountExpected);
  });
});

describe('the discounts apply not on groceries category of an loyalty user', () => {
  let result;
  const isUserEmployee = false;
  const isUserAffiliate = false;
  const registedAt = new Date().getFullYear() - YEARS_OF_LOYALTY;
  const billAmout = 990;
  const billCategory = 'toy and game';
  const netPayableAmountExpected = 895.5;
  beforeEach(() => {
    result = setupBill(
      isUserEmployee,
      isUserAffiliate,
      registedAt,
      billAmout,
      billCategory
    );
  });

  test(`discount percentage amount based should be ${DISCOUNT_TYPE_LOYALTY *
    100}% for an employee registeed at ${registedAt}`, () => {
    expect(result.getPercentageDiscounts()).toEqual(DISCOUNT_TYPE_LOYALTY);
  });

  test(`the net payable amount of an employee with bill ${billAmout} should be ${netPayableAmountExpected}`, () => {
    expect(result.getNetPayableAmount()).toEqual(netPayableAmountExpected);
  });
});

describe('the discounts apply not on groceries category of none loyalty user', () => {
  let result;
  const isUserEmployee = false;
  const isUserAffiliate = false;
  const registedAt = new Date().getFullYear();
  const billAmout = 990;
  const billCategory = 'toy and game';
  const netPayableAmountExpected = 945;
  beforeEach(() => {
    result = setupBill(
      isUserEmployee,
      isUserAffiliate,
      registedAt,
      billAmout,
      billCategory
    );
  });

  test(`discount percentage amount based should be ${DISCOUNT_TYPE_DEFAULT}% for an employee registeed at ${registedAt}`, () => {
    expect(result.getPercentageDiscounts()).toEqual(DISCOUNT_TYPE_DEFAULT);
  });

  test(`the net payable amount of an employee with bill ${billAmout} should be ${netPayableAmountExpected}`, () => {
    expect(result.getNetPayableAmount()).toEqual(netPayableAmountExpected);
  });
});
