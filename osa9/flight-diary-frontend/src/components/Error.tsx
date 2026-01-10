interface ErrorProps {
  errorMessage: string | null;
}

const Error = ({ errorMessage }: ErrorProps) => {
  if (errorMessage === null) {
    return null;
  }

  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default Error;
