export function formatSnakeCase(phrase: string) {
  // Remplace les underscores et les tirets par des espaces et met la première lettre en majuscule
  return phrase.replace(/[_-]/g, ' ').replace(/^\w/, (char) => char.toUpperCase());
}
