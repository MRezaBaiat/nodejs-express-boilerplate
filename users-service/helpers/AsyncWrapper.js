// automatically handles error , can be used for middlewares and routes,
// also now you HAVE TO use async/await to cache errors
export default function AsyncWrapper (cb) {
  return (req, res, next) => {
    return cb(req, res, next).catch(next);
  };
};
