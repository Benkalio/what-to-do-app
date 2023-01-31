
const ListHeader = ({ listName }) => {

  const signOut = () => {
    console.log('logout');
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create">ADD NEW</button>
        <button className="logout" onClick={signOut}>SIGN OUT</button>
      </div>
    </div>
  );
};

export default ListHeader;
