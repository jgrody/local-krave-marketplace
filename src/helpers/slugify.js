export const slugify = function(string) {
  return string
    .split(" ")
    .map(s => {
      s = s.toLowerCase();
      return s.replace(/[^a-zA-Z ]/g, "");
    })
    .filter(s => s)
    .join("-");
};
