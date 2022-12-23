function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          You are running this on {process.env.NODE_ENV} and the URL to it is <br />
          {process.env.REACT_APP_URL}
        </p>
      </header>
    </div>
  );
}

export default App;
