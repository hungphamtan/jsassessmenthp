import {
  PRODUCT_CATEGORY_GROCERIES,
  DISCOUNT_TYPE_EMPLOYEE,
  DISCOUNT_TYPE_AFFILIATE,
  DISCOUNT_TYPE_LOYALTY,
  DISCOUNT_TYPE_DEFAULT,
  DISCOUNT_AMOUNT,
  DISCOUNT_BILL_AMOUNT,
  YEARS_OF_LOYALTY
} from './store.config';

export class User {
  constructor(employee, affiliate, registedAt) {
    this.employee = employee;
    this.affiliate = affiliate;
    this.registedAt = registedAt;
  }
}
export class Bill {
  constructor(user, amount, category) {
    this.amount = amount;
    this.user = user;
    this.category = category;
  }

  getPercentageDiscounts() {
    if (this.user.employee) {
      return DISCOUNT_TYPE_EMPLOYEE;
    } else if (this.user.affiliate) {
      return DISCOUNT_TYPE_AFFILIATE;
    } else if (
      new Date().getFullYear() - this.user.registedAt >=
      YEARS_OF_LOYALTY
    ) {
      return DISCOUNT_TYPE_LOYALTY;
    } else {
      return 0;
    }
  }

  getAmountDiscounts() {
    // assumption is amount discount based on the amount after apply percentage disscount
    let discount = 0;
    let amountBill = this.amount * (1 - this.getPercentageDiscounts());

    while (amountBill >= DISCOUNT_BILL_AMOUNT) {
      discount += DISCOUNT_AMOUNT;
      amountBill -= DISCOUNT_BILL_AMOUNT;
    }
    return discount;
  }

  getDiscounts() {
    // assumption is percentage discount based on original amout of the bill
    let discountPercentBased = 0;
    if (this.category !== PRODUCT_CATEGORY_GROCERIES) {
      discountPercentBased = this.amount * this.getPercentageDiscounts();
    }
    return discountPercentBased + this.getAmountDiscounts();
  }

  getNetPayableAmount() {
    return this.amount - this.getDiscounts();
  }
}

module.exports = {
  PRODUCT_CATEGORY_GROCERIES,
  User,
  Bill
};
