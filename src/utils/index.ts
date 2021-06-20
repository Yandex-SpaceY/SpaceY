export const fakeOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const { name, value } = e.target;
  console.log(`${name} - ${value}`);
};

export const fakeOnClick = (): void => console.log('onClick');

export {
  checkEmail,
  checkFieldNotEmpty,
  checkPassword,
  checkPhone,
} from './validations';
