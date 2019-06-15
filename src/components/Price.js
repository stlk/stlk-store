export default ({ amount, currency }) =>
  new Intl.NumberFormat(
    typeof window !== `undefined` ? window.navigator.language : "en-US",
    {
      style: "currency",
      currency
    }
  ).format(amount);
