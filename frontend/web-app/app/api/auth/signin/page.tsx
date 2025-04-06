import EmptyPage from "@/app/components/EmptyPage";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const SignIn = ({ searchParams }: Props) => {
  return (
    <EmptyPage
      title="You need to login to access this page"
      subtitle="Please login to continue"
      type="login"
      callbackURl={searchParams.callbackUrl}
    />
  );
};

export default SignIn;
