import { useParams } from "react-router-dom";

type UnionFromStringArray<T extends readonly string[]> = T[number];

const useSafeParams = <T extends string>(params: T[]) => {
  const urlParams = useParams();
  if (params.some((p) => !(p in urlParams))) throw new Error("some of the parameters you wanted are not in the current url");
  const extractedParams = Object.fromEntries(params.map((p) => [p, urlParams[p] as string]));
  return extractedParams as Record<UnionFromStringArray<ReadonlyArray<T>>, string>;
};

export default useSafeParams;
