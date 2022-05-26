import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RestaurantDetails from "./Components/RestaurantDetails";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [ratingOrder, setRatingOrder] = useState("asc");
  const [costOrder, setCostOrder] = useState("asc");
  const [filterRating, setFilterRating] = useState(0);
  const [q, setQ] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetchData(page, ratingOrder, costOrder, filterRating, q);
  }, [page, ratingOrder, costOrder, filterRating, q]);

  const fetchData = async (page, ratingOrder, costOrder, filterRating, q) => {
    setLoading(true);
    axios({
      method: "get",
      url: "http://localhost:3000/food",
      params: {
        _page: page,
        _limit: 10,
        _sort: "rating,cost",
        _order: `${ratingOrder},${costOrder}`,
        rating_gte: filterRating,
        q: q,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <h1>Restaurant Details</h1>
      {loading && <div>loading</div>}
      <div>
        <h3>SEARCH</h3>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => setQ(text)}>Search</button>
      </div>
      <div>
        <button
          disabled={costOrder === "desc"}
          onClick={() => setCostOrder("desc")}
        >
          sort by cost desc
        </button>
        <button
          disabled={costOrder === "asc"}
          onClick={() => setCostOrder("asc")}
        >
          sort by cost asc
        </button>
      </div>

      <div>
        <button
          disabled={ratingOrder === "desc"}
          onClick={() => setRatingOrder("desc")}
        >
          sort by rating desc
        </button>
        <button
          disabled={ratingOrder === "asc"}
          onClick={() => setRatingOrder("asc")}
        >
          sort by rating asc
        </button>
      </div>
      <div>
        <h1>Filter Rating</h1>
        <button onClick={() => setFilterRating(4)}>greater then 4</button>
        <button onClick={() => setFilterRating(3)}>greater then 3</button>
        <button onClick={() => setFilterRating(2)}>greater then 2</button>
        <button onClick={() => setFilterRating(1)}>greater then 1</button>
        <button onClick={() => setFilterRating(0)}>All</button>
      </div>
      <div>
        {/* {pagination} */}
        <button disabled={page == 1} onClick={() => setPage(page - 1)}>
          prev
        </button>
        <PaginationComponent
          currentPage={page}
          lastPage={5}
          onPageChange={setPage}
        />
        <button onClick={() => setPage(page + 1)}>next</button>
      </div>
      <div>
        {data.map((item) => (
          <RestaurantDetails key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

// given the current page
// given the last page
// create a pagination component

const PaginationComponent = ({ currentPage, lastPage, onPageChange }) => {
  const arr = new Array(lastPage).fill(0);
  return (
    <div>
      {arr.map((item, page) => (
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 === currentPage}
        >
          {" "}
          {page + 1}{" "}
        </button>
      ))}
    </div>
  );
};

export default App;
