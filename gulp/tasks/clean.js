import del from 'del';

export const getCleanTask = (distFolder) => {
  return function clean() {
    return del(distFolder, { force: true });
  };
};
