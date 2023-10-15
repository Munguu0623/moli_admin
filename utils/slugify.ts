export const slugify = (text) => {
  if (!text) return "";

  // Preserve Cyrillic characters for Mongolian (\u0400-\u04FF)
  const preservedChars = /[a-zA-Z0-9\u0400-\u04FF]/g;

  return text
    .toString()
    .toLowerCase()
    .replace(preservedChars, (char) => {
      return char === "-" ? "-" : char;
    })
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from the start of text
    .replace(/-+$/, ""); // Trim - from the end of text
};
