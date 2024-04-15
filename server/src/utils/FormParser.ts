/**
 * "form-data" content disposition parser
 */
export class FormParser {

  /**
   * Contains the entire request from the client submitted form
   */
  private data: string

  public constructor(formData: string) {
    this.data = formData
  }

  /**
   * Checks if the passed char is an alphabetic (a-z | A-Z) character
   * @param char 
   * @returns boolean if is an alphabetic char, false otherwise
   */
  private isAlpha(char: string): boolean {
    return new RegExp(/[a-zA-Z]/).test(char)
  }

  /**
   * Split the request line by line
   * @returns string array containing the lines which first character is an alphabetic char
   */
  private lines() {
    return this.data.split(/[\r\n]+/).filter(s => this.isAlpha(s))
  }

  /**
   * Parse the content in `this.data`
   * @returns A object containining 1 or more key-value pair where the key is the name specified at client submited form and the value, the value of the input
   */
  public getPairs(): {[k: string]: string} {
    const lines = this.lines()

    let key = ""
    let match = false
    const vals: {[k: string]: string} = {}

    for (const line of lines) {
      const split = line.split("; ")
      if (split.length === 2) {
        for (const char of split[1]) {
          if (char === '"') {
            match = !match
            continue // Skips the first double quote matched in the next strings like -> name="url"
          }

          if (match)
            key += char
        }
      } else {
        vals[key] = split[0]
        key = ""
      }
    }

    return vals
  }
}