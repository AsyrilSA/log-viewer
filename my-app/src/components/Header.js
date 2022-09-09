import './Header.css';

function Header(props)
{
  return (
    <div>
      <div className="date-log">{props.title}</div>
      <h2>Log Viewer</h2>
    </div>
  );
}




export default Header
