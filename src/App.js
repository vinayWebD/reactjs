import React from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <li>
        <Link to="/todoLists">TodoLists</Link>
      </li>

      <li>
        <Link to="/weatherApp">WeatherApp</Link>
      </li>
    </div>
  );
}
