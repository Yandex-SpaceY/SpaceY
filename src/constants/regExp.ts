export const REG_EXPS = {
  PASSWORD: /(?=.*\d)(?=.*[a-z/а-я])(?=.*[A-Z/А-Я]).{8,}/,
  PHONE: /^((8|\+7)[- ]?)?((\?\d{3})?[- ]?)?[\d- ]{7,10}$/,
};
