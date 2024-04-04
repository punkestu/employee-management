/* eslint-disable react/prop-types */
export function Rollup({ providers, children }) {
  return providers.reduce((acc, [Provider, value]) => {
    return <Provider.Provider value={value}>{acc}</Provider.Provider>;
  }, children);
}
