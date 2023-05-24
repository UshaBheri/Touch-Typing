const element = (
  <div className="container">
    <h1 className="main-heading">Congratulations</h1>
    <div className="cards-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/congrats-card-profile-img.png"
        className="profile-img"
      />
      <h1 className="heading">Kiran V</h1>
      <p className="description">
        Vishnu Institute of computer Education and Technology, Bhimavaram
      </p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/congrats-card-watch-img.png"
        className="watch-img"
      />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
