import React from "react";
import ReactDOM from "react-dom";

import "./App.css";

const App = () => {
  const [data, dataSet] = React.useState({});
  const [columns, columnsSet] = React.useState([]);
  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: "performance:metric:request" }, (d) => {
      dataSet(d);
      const metrics = {};
      Object.values(d).map((site) =>
        Object.keys(site).map((metric) => (metrics[metric] = true))
      );
      columnsSet(Object.keys(metrics));
    });
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th width="50%">Page</th>
            {columns.map((c, i) => (
              <th key={i} width="10%" style={{ textAlign: "right" }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((site, j) => (
            <tr key={j}>
              <td width="50%">{site.slice(0, 40)}</td>
              {columns.map((c, k) => (
                <td width="10%" key={k} style={{ textAlign: "right" }}>
                  {data[site][c] === undefined
                    ? ""
                    : Math.round(data[site][c].average).toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

const j = {
  "https://tinaandcarlton.com/hawaii": {
    FCP: { values: [412.01499999442603], average: 412.01499999442603 },
    TTFB: { values: [113.37999999523163], average: 113.37999999523163 },
    FID: { values: [1.830000001064036], average: 1.830000001064036 },
    LCP: { values: [473.669], average: 473.669 },
    CLS: { values: [0], average: 0 },
  },
  "https://www.youtube.com/": {
    FCP: { values: [313.8699999981327], average: 313.8699999981327 },
    TTFB: { values: [183.8449999995646], average: 183.8449999995646 },
    FID: { values: [2.6900000011664815], average: 2.6900000011664815 },
    LCP: { values: [2332.15], average: 2332.15 },
  },
  "https://www.youtube.com/watch?v=ZQDzA28DAaM": {
    CLS: { values: [0.025130141509853567], average: 0.025130141509853567 },
  },
};
