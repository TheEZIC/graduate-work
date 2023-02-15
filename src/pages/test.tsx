import { NextPage, NextPageContext } from "next";
import Layout from "../components/Layout";

type TestBackendProps = {
  title: string;
}

type TestContext = NextPageContext & {
  query: TestBackendProps;
}

type TestProps = TestBackendProps & {
}

const Test: NextPage<TestProps> = ({title}) => {
  return (
    <Layout>
      <h1>{title}</h1>
    </Layout>
  );
};

Test.getInitialProps = (ctx: TestContext) => {
  return {
    title: ctx.query.title,
  };
}

export default Test;
