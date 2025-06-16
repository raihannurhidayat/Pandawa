// The “shape” of a full address
export interface Address {
  provinsi: string
  kota: string
  kecamatan: string
  kelurahan: string
  coordinats: any
}

// If you want to allow users to leave parts out, use Partial<>
export type PartialAddress = Partial<Address>

// A helper type that says “we store it as a JSON string, but it really is an Address”
export type JsonStringified<T> = string
