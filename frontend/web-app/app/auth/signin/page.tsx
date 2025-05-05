import EmptyPage from "@/app/components/EmptyPage";

type Props = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

const SignIn = async ({ searchParams }: Props) => {
  const { callbackUrl } = await searchParams;
  return (
    <EmptyPage
      title="You need to login to access this page"
      subtitle="Please login to continue"
      type="login"
      callbackUrl={callbackUrl}
    />
  );
};

export default SignIn;
