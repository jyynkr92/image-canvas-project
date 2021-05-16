import { push } from 'lib/browserHistory';

function Header() {
  const onHomeClick = () => {
    push('/');
  };

  return (
    <header>
      <span onClick={onHomeClick}>HOME</span>
    </header>
  );
}

export default Header;
