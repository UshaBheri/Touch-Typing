const Box = (props) => {
  const { className, boxText } = props;
  const containerClassName = `box-size ${className}`;

  return (
    <div className={containerClassName}>
      <p className="box-text">{boxText}</p>
    </div>
  );
};

const element = (
  <div className="card-container">
    <h1 className="heading">Boxes</h1>
    <div className="box-container">
      <Box className="large-box" boxText="Large" />
      <Box className="medium-box" boxText="Medium" />
      <Box className="small-box" boxText="Small" />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
