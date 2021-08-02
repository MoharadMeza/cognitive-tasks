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
            <span className="menu-text" style={{fontFamily:'Shabnam'}}>داشبورد</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}



        {/* Components */}
        {/* begin::section */}
        <li className="menu-section ">
          <h3 style={{ fontFamily: 'Shabnam' }}> آزمون ها</h3>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>

        <li
          className={`menu-item ${getMenuItemActive("/nback", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/nback">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">NBack</span>
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
            <span className="menu-text">CPT</span>
          </NavLink>
        </li>
        {/* end:: section */}

        {/* Material-UI */}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/gonogo", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/gonogo">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">Go-noGO</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive("/stroop", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/Stroop">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Cap-2.svg")} />
            </span>
            <span className="menu-text">Stroop</span>
          </NavLink>
        </li>
        {/* ////////////////////////////// */}
        {/* /////////////////////////////// */}



        {/*end::1 Level*/}


        {/*end::1 Level*/}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
