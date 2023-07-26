function TruncateString(str: string, count: number = 16) {
  if (str.length > count) {
    return str.substring(0, count-3) + "...";
  } else {
    return str;
  }
}

export { TruncateString };
