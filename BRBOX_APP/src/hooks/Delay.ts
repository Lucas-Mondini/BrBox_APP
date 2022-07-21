/**
 * Add a delay to a set function
 * @param value any
 * @param setValueFunction (value: any) => void
 * @param delay number | undefined
 * @return () => void
 */
export default function useDelay(value: any, setValueFunction: (value: any) => void, delay: number = 500): () => void
{
  const a = setTimeout(() => {
    setValueFunction(value);
  }, delay);

  return () => {
    clearTimeout(a);
  }
}