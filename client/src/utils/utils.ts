export type Nullable<T> = T | null

/**
 * Function taked as a reference in / from https://stackoverflow.com/a/16245768/18592727
 * 
 * Converts the b64encode encoding from python backend to a JavaScript BLOB 
 * @param b64String b64encode binary
 * @returns The converted BLOB if the conversion was correct
 */
export const b64ToBlob = (b64String: string): Blob => {
  let blobString = atob(b64String)
  let uint8ArrayBlob = new Uint8Array(b64String.length)

  for (let i = 0; i < b64String.length; i++) {
    uint8ArrayBlob[i] = blobString.charCodeAt(i)
  }

  return new Blob([uint8ArrayBlob], {
    type: "audio/mp4"
  })
}

export const In = <T>(element: T, array: T[]): boolean => {
  console.log("Array en in: ", array)
  for (let i = 0; i < array.length; i++)
    if (array[i] === element)
      return true

  return false

}