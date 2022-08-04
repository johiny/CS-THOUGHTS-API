interface RequestError extends Error{
  status?: number,
  mesagge?: string
}

export {RequestError}
