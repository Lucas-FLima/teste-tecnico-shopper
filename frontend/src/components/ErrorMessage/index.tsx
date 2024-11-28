type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="text-red-500 text-sm mt-4">{message}</div>;
};