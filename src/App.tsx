function App() {
  fetch("http://localhost:8080/books/getBooks")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return <div>test</div>;
}

export default App;
