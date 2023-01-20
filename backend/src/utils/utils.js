export const getFormatDate = (dateForFormat) =>
  new Date(dateForFormat).toLocaleDateString();

export const log = (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  next();
};
