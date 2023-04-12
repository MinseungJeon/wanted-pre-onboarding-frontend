import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </>
  );
};

export default Home;
