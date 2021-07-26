/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

export function BreadCrumbs({ items }) {
  if (!items || !items.length) {
    return "";
  }

  return (
    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
      <Link className="breadcrumb-item" style={{fontFamily:'Shabnam'}} to="/dashboard">
        داشبورد
      </Link>
      {items.map((item, index) => (
        <li className="breadcrumb-item" key={index}>
          <Link
            className="text-muted "
            to={{ pathname: item.pathname }}
            style={{fontFamily:'Shabnam'}}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
