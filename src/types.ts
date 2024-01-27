interface ReadFileResult {
  currentState: number;
  acceptedTokens: string[];
}
export type ReadFileType = (text: string) => ReadFileResult;
