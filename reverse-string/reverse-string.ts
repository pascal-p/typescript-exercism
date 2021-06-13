class ReverseString {
  static reverse(s: string): string {
    return s.split('').reduce((rs, c) => rs = c + rs, "")
  }
}

export default ReverseString
