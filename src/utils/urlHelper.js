export const fighterUrl = (fighter, param) => {
  if (typeof param == 'string') {
    return fighter.urlName;
  }
  return fighter.id;
};
