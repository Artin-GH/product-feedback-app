export function cls(...classes: Array<string | number | null | undefined>): string {
  let result = '';
  for (const class_ of classes) {
    if (class_) {
      result += ' ' + class_.toString();
    }
  }
  result = result.slice(1);
  return result;
}
