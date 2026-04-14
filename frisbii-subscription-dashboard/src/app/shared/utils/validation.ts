export const checkPropsNotNull = (props: { [key: string]: any }): void => {
  if (props === null || props === undefined) {
    console.error('Required argument is undefined!');
    throw Error('Required argument is undefined!');
  }

  const entries = Object.entries(props);

  if (entries.length === 0) {
    console.error('No props given!');
    throw Error('No props given!');
  }

  entries.forEach(([key, value]) => {
    if (value === null || value === undefined) {
      const msg = `Required argument ${key} is undefined!`;
      console.error(msg);
      throw Error(msg);
    }
  });
};