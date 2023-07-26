function TruncateString(str: string) {
  if (str.length > 16) {
    return str.substring(0, 13) + "...";
  } else {
    return str;
  }
}

export { TruncateString };
