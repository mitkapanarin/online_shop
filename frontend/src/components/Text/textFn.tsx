export const textLimiter = ({
  text,
  limit = 60,
}: {
  text: string;
  limit: number;
}) => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};
