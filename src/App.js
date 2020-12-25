import React, { useEffect, useState } from "react";
import "./styles.css";

var xxx = [
    {
      id: 16,
      prob: 0.0,
      label: 1,
      start_offset: 0,
      end_offset: 4
    },
    {
      id: 19,
      prob: 0.0,
      label: 2,
      start_offset: 6,
      end_offset: 7
    }
  ];

export default function App() {
  const initial =
    "(born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.";
  

  const [data, setData] = useState([]);

  let s
  let endoooo;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //load xxx data
        setData(fill(xxx));
      } catch (error) {}
    };

    fetchData();
  }, [0]);

  function fill(xxx) {
    let result = [];
    for (let i = 0; i < xxx.length; i++) {
      result.push({
        v: initial.substring(xxx[i].start_offset, xxx[i].end_offset + 1),
        marked: true
      });

      if (xxx.length > i + 1) {
        result.push({
          v: initial.substring(xxx[i].end_offset + 1, xxx[i + 1].start_offset),
          marked: false
        });
      } else {
        result.push({
          v: initial.substring(xxx[i].end_offset + 1, initial.length - 1),
          marked: false
        });
      }
    }

    return result;
  }

  function setSelectedRange(e) {
    let start;
    let end;
    if (window.getSelection) {
      const range = window.getSelection().getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(e);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      start = preSelectionRange.toString().length;
      end = start + range.toString().length;
    } else if (document.selection && document.selection.type !== "Control") {
      const selectedTextRange = document.selection.createRange();
      const preSelectionTextRange = document.body.createTextRange();
      preSelectionTextRange.moveToElementText(e);
      preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
      start = preSelectionTextRange.text.length;
      end = start + selectedTextRange.text.length;
    }

    s = start;
    endoooo = end ;
    //this.startOffset = start;
    //this.endOffset = end;
    console.log(start, end );
  }

  function mark() {
    xxx.push({
      start_offset: s,
      end_offset: endoooo
    });

    xxx.sort((a, b) => (a.start_offset > b.start_offset) ? 1 : -1)

    setData(fill(xxx));
  }

  return (
    <div className="App">
      <button onClick={() => mark()}>mark</button>
      <div
        id="content"
        onClick={(e) => setSelectedRange(document.getElementById("content"))}
      >
        {data.map((item) => {
          return (
            <span style={{ backgroundColor: item.marked ? "red" : "" }}>
              {item.v}
            </span>
          );
        })}
      </div>
    </div>
  );
}
