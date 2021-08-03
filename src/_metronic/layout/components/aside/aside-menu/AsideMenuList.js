/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text" style={{ fontFamily: "Shabnam" }}>
              داشبورد
            </span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Components */}
        {/* begin::section */}
        <li className="menu-section ">
          <h3 style={{ fontFamily: "Shabnam" }}> آزمون ها</h3>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>

        <li
          className={`menu-item ${getMenuItemActive("/n-back", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/n-back">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text" style={{fontFamily:'Shabnam'}}>NBack (چنتا قبل)</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/cpt", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/cpt">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text" style={{fontFamily:'Shabnam'}}>CPT (عملکرد پیوسته)</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/go-nogo", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/go-nogo">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text" style={{fontFamily:'Shabnam'}}>GO-NOGO (برونرو)</span>
          </NavLink>
        </li>
        
        <li
          className={`menu-item ${getMenuItemActive("/stroop", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/stroop">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text" style={{fontFamily:'Shabnam'}}>Stroop (رنگ هارا دنبال کن)</span>
          </NavLink>
        </li>
        {/* end:: section */}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
